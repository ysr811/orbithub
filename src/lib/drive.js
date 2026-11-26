import { google } from "googleapis";
import { cacheLife, cacheTag } from "next/cache";

const DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder";
const DRIVE_SHORTCUT_MIME = "application/vnd.google-apps.shortcut";
const MAX_CONCURRENCY = 6;

function getDriveClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Drive credentials in environment variables");
  }

  privateKey = privateKey.trim();
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

function isRetryableDriveError(error) {
  const status = error?.code || error?.status || error?.response?.status;
  if (status === 429 || (status >= 500 && status < 600)) return true;
  const reason = error?.errors?.[0]?.reason;
  return reason === "userRateLimitExceeded" || reason === "rateLimitExceeded";
}

async function withRetry(fn, retries = 2) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries || !isRetryableDriveError(error)) {
        throw error;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, 300 * 2 ** attempt)
      );
      attempt += 1;
    }
  }
}

/**
 * Shared global semaphore so recursive Drive tree traversal never exceeds `limit` concurrent API calls.
 */
function createLimiter(limit = MAX_CONCURRENCY) {
  let active = 0;
  const queue = [];

  return function runLimited(fn) {
    return new Promise((resolve, reject) => {
      const execute = async () => {
        active += 1;
        try {
          resolve(await fn());
        } catch (error) {
          reject(error);
        } finally {
          active -= 1;
          if (queue.length > 0) {
            queue.shift()();
          }
        }
      };

      if (active < limit) {
        execute();
      } else {
        queue.push(execute);
      }
    });
  };
}

async function listAllDriveItems(drive, limit, params, allowMissing = false) {
  const collected = [];
  let pageToken;

  try {
    do {
      const res = await limit(() =>
        withRetry(() =>
          drive.files.list({
            ...params,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
            pageToken,
          })
        )
      );
      if (res.data.files?.length) {
        collected.push(...res.data.files);
      }
      pageToken = res.data.nextPageToken;
    } while (pageToken);
  } catch (error) {
    const status = error?.code || error?.status || error?.response?.status;
    if (allowMissing && (status === 403 || status === 404)) {
      console.warn(
        `[Drive Crawler] Skipping inaccessible item:`,
        error?.message || status
      );
      return [];
    }
    throw error;
  }

  return collected;
}

async function listFolders(drive, limit, parentId, allowMissing = false) {
  const files = await listAllDriveItems(
    drive,
    limit,
    {
      q: `'${parentId}' in parents and (mimeType = '${DRIVE_FOLDER_MIME}' or mimeType = '${DRIVE_SHORTCUT_MIME}') and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType, shortcutDetails)",
      orderBy: "name",
      pageSize: 100,
    },
    allowMissing
  );

  return files
    .map((folder) => {
      if (folder.mimeType === DRIVE_SHORTCUT_MIME) {
        if (
          folder.shortcutDetails?.targetMimeType !== DRIVE_FOLDER_MIME ||
          !folder.shortcutDetails?.targetId
        ) {
          return null;
        }
        return { id: folder.shortcutDetails.targetId, name: folder.name };
      }
      return { id: folder.id, name: folder.name };
    })
    .filter(Boolean);
}

async function listFiles(drive, limit, parentId) {
  const files = await listAllDriveItems(
    drive,
    limit,
    {
      q: `'${parentId}' in parents and mimeType != '${DRIVE_FOLDER_MIME}' and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType, size, shortcutDetails)",
      orderBy: "name",
      pageSize: 200,
    },
    true
  );

  return files.filter((file) => {
    if (file.mimeType === DRIVE_SHORTCUT_MIME) {
      return (
        file.shortcutDetails?.targetMimeType !== DRIVE_FOLDER_MIME &&
        Boolean(file.shortcutDetails?.targetId)
      );
    }
    return true;
  });
}

function extractMajor(name) {
  const clean = String(name || "").trim().toLowerCase();
  if (
    /\bit\b/.test(clean) ||
    clean.includes("it_") ||
    clean.includes("تقنية") ||
    clean.includes("information technology")
  ) {
    return "it";
  }
  if (
    /\bcs\b/.test(clean) ||
    clean.includes("cs_") ||
    clean.includes("علوم") ||
    clean.includes("computer science")
  ) {
    return "cs";
  }
  return "";
}

function extractNumber(name) {
  const match = String(name || "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function bytesToMB(bytes) {
  const parsed = parseInt(bytes, 10);
  if (!parsed || Number.isNaN(parsed)) return null;
  const mb = parsed / (1024 * 1024);
  return mb < 0.01 ? "< 0.01" : mb.toFixed(2);
}

async function crawlLevelFolder(drive, limit, levelFolder, major = "cs") {
  const level = extractNumber(levelFolder.name);
  if (level <= 0) return [];

  const semesters = await listFolders(drive, limit, levelFolder.id, true);

  const semesterResults = await Promise.all(
    semesters.map(async (semesterFolder) => {
      const semester = extractNumber(semesterFolder.name);
      if (semester <= 0) return [];

      const subjects = await listFolders(drive, limit, semesterFolder.id, true);

      const subjectResults = await Promise.all(
        subjects.map(async (subjectFolder) => {
          const subject = subjectFolder.name;
          const instructors = await listFolders(
            drive,
            limit,
            subjectFolder.id,
            true
          );

          const instructorResults = await Promise.all(
            instructors.map(async (instructorFolder) => {
              const instructor = instructorFolder.name;
              const files = await listFiles(drive, limit, instructorFolder.id);

              return files.map((file) => {
                const isShortcut = file.mimeType === DRIVE_SHORTCUT_MIME;
                const driveId = isShortcut
                  ? file.shortcutDetails.targetId
                  : file.id;
                const mimeType = isShortcut
                  ? file.shortcutDetails?.targetMimeType || file.mimeType
                  : file.mimeType;

                return {
                  driveId,
                  title: file.name,
                  major,
                  level,
                  semester,
                  subject,
                  instructor,
                  mimeType,
                  sizeMB: bytesToMB(file.size),
                };
              });
            })
          );

          return instructorResults.flat();
        })
      );

      return subjectResults.flat();
    })
  );

  return semesterResults.flat();
}

async function crawlDrive() {
  const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!rootId) {
    throw new Error("GOOGLE_DRIVE_ROOT_FOLDER_ID environment variable is missing");
  }

  const drive = getDriveClient();
  const limit = createLimiter(MAX_CONCURRENCY);
  const rootFolders = await listFolders(drive, limit, rootId, false);

  const results = await Promise.all(
    rootFolders.map(async (folder) => {
      const detectedMajor = extractMajor(folder.name);
      if (detectedMajor) {
        const levels = await listFolders(drive, limit, folder.id, true);
        const levelResults = await Promise.all(
          levels.map((lvlFolder) =>
            crawlLevelFolder(drive, limit, lvlFolder, detectedMajor)
          )
        );
        return levelResults.flat();
      }

      return crawlLevelFolder(drive, limit, folder, "cs");
    })
  );

  return results.flat();
}

/**
 * Fetches indexed materials from Google Drive using Next.js 16 'use cache'.
 * Throws on transient upstream failures so errors never poison the cache.
 */
export async function getSummaries() {
  "use cache";
  cacheLife("hours");
  cacheTag("summaries");

  const data = await crawlDrive();
  console.log(`[Drive Crawler] Successfully crawled ${data.length} materials.`);
  return data;
}
