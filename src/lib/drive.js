import { google } from "googleapis";
import { unstable_cache } from "next/cache";

// ─── Google Drive Client Initialization ──────────────────────────────
function getDriveClient() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  let private_key = process.env.GOOGLE_PRIVATE_KEY;

  if (!client_email || !private_key) {
    throw new Error("Missing Google Drive credentials in environment variables");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key: private_key.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

// ─── Pure Utility Helpers ────────────────────────────────────────────
// Retrieves both native Google Drive folders and folder shortcuts
async function listFolders(drive, parentId) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.shortcut') and trashed = false`,
    fields: "files(id, name, mimeType, shortcutDetails)",
    orderBy: "name",
    pageSize: 100,
  });

  const files = res.data.files || [];
  return files
    .map((folder) => {
      const isShortcut = folder.mimeType === "application/vnd.google-apps.shortcut";
      if (isShortcut) {
        // Only resolve shortcut if target is a folder
        if (folder.shortcutDetails?.targetMimeType !== "application/vnd.google-apps.folder") {
          return null;
        }
        return {
          id: folder.shortcutDetails.targetId,
          name: folder.name,
        };
      }
      return {
        id: folder.id,
        name: folder.name,
      };
    })
    .filter(Boolean);
}

// Retrieves files, transparently resolving file shortcuts
async function listFiles(drive, parentId) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name, mimeType, size, shortcutDetails)",
    orderBy: "name",
    pageSize: 200,
  });

  const files = res.data.files || [];
  return files.filter((file) => {
    // If it is a shortcut, verify target is not a folder
    if (file.mimeType === "application/vnd.google-apps.shortcut") {
      return file.shortcutDetails?.targetMimeType !== "application/vnd.google-apps.folder";
    }
    return true;
  });
}

// Normalize and detect academic major/department (CS vs IT)
function extractMajor(name) {
  const clean = String(name || "").trim().toLowerCase();
  if (clean === "it" || clean.includes("it_") || clean.includes("تقنية") || clean.includes("information technology")) {
    return "it";
  }
  if (clean === "cs" || clean.includes("cs_") || clean.includes("علوم") || clean.includes("computer science")) {
    return "cs";
  }
  return "";
}

// Strip non-digit characters to safely parse folder numbers (e.g., 'level_1' -> 1)
const extractNumber = (name) => {
  const digits = String(name || "").replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

// Convert bytes to megabytes with 2 decimal places
const bytesToMB = (bytes) => {
  if (!bytes) return "0.00";
  return (parseInt(bytes, 10) / (1024 * 1024)).toFixed(2);
};

const buildViewUrl = (id) => `https://drive.google.com/file/d/${id}/view`;
const buildDownloadUrl = (id) => `https://drive.google.com/uc?id=${id}&export=download`;

// Concurrently crawl a level folder (contains semesters -> subjects -> instructors -> files)
async function crawlLevelFolder(drive, levelFolder, major = "cs") {
  const level = extractNumber(levelFolder.name);
  const semesters = await listFolders(drive, levelFolder.id);

  const semesterResults = await Promise.all(
    semesters.map(async (semesterFolder) => {
      const semester = extractNumber(semesterFolder.name);
      const subjects = await listFolders(drive, semesterFolder.id);

      const subjectResults = await Promise.all(
        subjects.map(async (subjectFolder) => {
          const subject = subjectFolder.name;
          const instructors = await listFolders(drive, subjectFolder.id);

          const instructorResults = await Promise.all(
            instructors.map(async (instructorFolder) => {
              const instructor = instructorFolder.name;
              const files = await listFiles(drive, instructorFolder.id);

              return files.map((file, index) => {
                const isShortcut = file.mimeType === "application/vnd.google-apps.shortcut";
                const targetDriveId = isShortcut && file.shortcutDetails?.targetId
                  ? file.shortcutDetails.targetId
                  : file.id;
                const targetMimeType = isShortcut && file.shortcutDetails?.targetMimeType
                  ? file.shortcutDetails.targetMimeType
                  : file.mimeType;

                return {
                  id: index + 1,
                  driveId: targetDriveId,
                  title: file.name,
                  major,
                  level,
                  semester,
                  subject,
                  instructor,
                  mimeType: targetMimeType,
                  sizeMB: bytesToMB(file.size),
                  viewUrl: buildViewUrl(targetDriveId),
                  downloadUrl: buildDownloadUrl(targetDriveId),
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

// ─── High-Performance Concurrent Tree Crawler ────────────────────────
// Supports:
// 1. Major-rooted hierarchy: Root -> Major (CS/IT) -> Level -> Semester -> Subject -> Instructor -> Files
// 2. Level-rooted hierarchy (Legacy): Root -> Level -> Semester -> Subject -> Instructor -> Files
// 3. Full support for Google Drive Shortcuts (files and folders)
async function crawlDrive() {
  const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!rootId) {
    throw new Error("GOOGLE_DRIVE_ROOT_FOLDER_ID environment variable is missing");
  }

  const drive = getDriveClient();
  const rootFolders = await listFolders(drive, rootId);

  const results = await Promise.all(
    rootFolders.map(async (folder) => {
      const detectedMajor = extractMajor(folder.name);

      if (detectedMajor) {
        // Folder is a major root (e.g. CS or IT)
        const levels = await listFolders(drive, folder.id);
        const levelResults = await Promise.all(
          levels.map((lvlFolder) => crawlLevelFolder(drive, lvlFolder, detectedMajor))
        );
        return levelResults.flat();
      }

      // Folder is directly a level folder (defaults to CS)
      const level = extractNumber(folder.name);
      if (level > 0) {
        return crawlLevelFolder(drive, folder, "cs");
      }

      return [];
    })
  );

  return results.flat();
}

// ─── Server Cache (1 Hour TTL with 'summaries' Tag) ──────────────────
export const getSummaries = unstable_cache(
  async () => {
    try {
      const data = await crawlDrive();
      console.log(`[Drive Crawler] Successfully crawled ${data.length} materials.`);
      return data;
    } catch (error) {
      console.error("[Drive Crawler] Error fetching Google Drive summaries:", error?.message || error);
      return [];
    }
  },
  ["orbithub-summaries-v5"],
  {
    revalidate: 3600,
    tags: ["summaries"],
  }
);
