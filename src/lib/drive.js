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
async function listFolders(drive, parentId) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name)",
    orderBy: "name",
    pageSize: 100,
  });
  return res.data.files || [];
}

async function listFiles(drive, parentId) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name, mimeType, size)",
    orderBy: "name",
    pageSize: 200,
  });
  return res.data.files || [];
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

// ─── High-Performance Concurrent Tree Crawler ────────────────────────
// Uses Promise.all at each tree depth to execute concurrent requests instead of sequential loops
async function crawlDrive() {
  const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!rootId) {
    throw new Error("GOOGLE_DRIVE_ROOT_FOLDER_ID environment variable is missing");
  }

  const drive = getDriveClient();

  // 1. Level folders (e.g., level_1, level_2)
  const levels = await listFolders(drive, rootId);

  // 2. Concurrently traverse all levels
  const summariesNested = await Promise.all(
    levels.map(async (levelFolder) => {
      const level = extractNumber(levelFolder.name);
      const semesters = await listFolders(drive, levelFolder.id);

      // 3. Concurrently traverse all semesters
      const semesterResults = await Promise.all(
        semesters.map(async (semesterFolder) => {
          const semester = extractNumber(semesterFolder.name);
          const subjects = await listFolders(drive, semesterFolder.id);

          // 4. Concurrently traverse all subjects
          const subjectResults = await Promise.all(
            subjects.map(async (subjectFolder) => {
              const subject = subjectFolder.name;
              const instructors = await listFolders(drive, subjectFolder.id);

              // 5. Concurrently traverse all instructors and retrieve their files
              const instructorResults = await Promise.all(
                instructors.map(async (instructorFolder) => {
                  const instructor = instructorFolder.name;
                  const files = await listFiles(drive, instructorFolder.id);

                  return files.map((file, index) => ({
                    id: index + 1,
                    driveId: file.id,
                    title: file.name,
                    level,
                    semester,
                    subject,
                    instructor,
                    mimeType: file.mimeType,
                    sizeMB: bytesToMB(file.size),
                    viewUrl: buildViewUrl(file.id),
                    downloadUrl: buildDownloadUrl(file.id),
                  }));
                })
              );

              return instructorResults.flat();
            })
          );

          return subjectResults.flat();
        })
      );

      return semesterResults.flat();
    })
  );

  return summariesNested.flat();
}

// ─── Server Cache (1 Hour TTL with 'summaries' Tag) ──────────────────
export const getSummaries = unstable_cache(
  async () => crawlDrive(),
  ["orbithub-summaries-v2"],
  {
    revalidate: 3600,
    tags: ["summaries"],
  }
);
