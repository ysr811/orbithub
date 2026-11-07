import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY;
const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
const secret = process.env.REVALIDATE_SECRET;

console.log("\n==========================================");
console.log("     OrbitHub - Google Drive Indexer        ");
console.log("==========================================\n");

if (!clientEmail || !privateKey || !rootFolderId) {
  console.error("Error: Missing credentials in .env.local");
  console.error("Required variables: GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_DRIVE_ROOT_FOLDER_ID");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

async function listItems(parentId) {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, size)",
    pageSize: 100,
    orderBy: "name",
  });
  return res.data.files || [];
}

async function runIndex() {
  console.log(`Connected Service Account: ${clientEmail}`);
  console.log(`Root Folder ID: ${rootFolderId}\n`);

  const rootItems = await listItems(rootFolderId);
  const rootFolders = rootItems.filter((i) => i.mimeType === "application/vnd.google-apps.folder");
  const rootFiles = rootItems.filter((i) => i.mimeType !== "application/vnd.google-apps.folder");

  if (rootFiles.length > 0) {
    console.warn("Warning: Files found directly in root folder (will not be indexed; must be inside an instructor folder):");
    rootFiles.forEach((f) => console.warn(`   - ${f.name}`));
    console.log("");
  }

  let totalFiles = 0;
  const tree = [];

  for (const levelFolder of rootFolders) {
    console.log(`[Level]: ${levelFolder.name}`);
    const semesters = await listItems(levelFolder.id);

    const semFolders = semesters.filter((i) => i.mimeType === "application/vnd.google-apps.folder");
    const semFiles = semesters.filter((i) => i.mimeType !== "application/vnd.google-apps.folder");

    if (semFiles.length > 0) {
      console.warn(`   Warning: Files placed directly in ${levelFolder.name} (must be in semester -> subject -> instructor):`);
      semFiles.forEach((f) => console.warn(`      - ${f.name}`));
    }

    for (const semFolder of semFolders) {
      console.log(`   [Semester]: ${semFolder.name}`);
      const subjects = await listItems(semFolder.id);

      const subjFolders = subjects.filter((i) => i.mimeType === "application/vnd.google-apps.folder");
      const subjFiles = subjects.filter((i) => i.mimeType !== "application/vnd.google-apps.folder");

      if (subjFiles.length > 0) {
        console.warn(`      Warning: Files placed directly in ${semFolder.name} (must be in subject -> instructor):`);
        subjFiles.forEach((f) => console.warn(`         - ${f.name}`));
      }

      for (const subjFolder of subjFolders) {
        console.log(`      [Subject]: ${subjFolder.name}`);
        const instructors = await listItems(subjFolder.id);

        const instFolders = instructors.filter((i) => i.mimeType === "application/vnd.google-apps.folder");
        const instFiles = instructors.filter((i) => i.mimeType !== "application/vnd.google-apps.folder");

        if (instFiles.length > 0) {
          console.warn(`         Warning: Files placed directly in ${subjFolder.name} (must be inside an instructor folder):`);
          instFiles.forEach((f) => console.warn(`            - ${f.name}`));
        }

        for (const instFolder of instFolders) {
          console.log(`         [Instructor]: ${instFolder.name}`);
          const files = await listItems(instFolder.id);

          for (const file of files) {
            if (file.mimeType !== "application/vnd.google-apps.folder") {
              totalFiles++;
              const sizeMB = file.size ? (Number(file.size) / (1024 * 1024)).toFixed(2) : "0";
              console.log(`            [File] ${file.name} (${sizeMB} MB)`);
              tree.push({
                level: levelFolder.name,
                semester: semFolder.name,
                subject: subjFolder.name,
                instructor: instFolder.name,
                file: file.name,
              });
            }
          }
        }
      }
    }
  }

  console.log("\n==========================================");
  console.log(`Total valid files indexed: ${totalFiles}`);
  console.log("==========================================\n");

  // Trigger on-demand cache revalidation if server is reachable
  const targetUrl = process.argv[2] || process.env.SITE_URL || "http://localhost:3000";
  if (secret) {
    try {
      const res = await fetch(`${targetUrl.replace(/\/$/, "")}/api/revalidate?secret=${secret}`);
      if (res.ok) {
        console.log(`Revalidation signal successfully sent to (${targetUrl}) - Cache refreshed.`);
      }
    } catch {
      // Server might not be running locally, which is expected
    }
  }
}

runIndex().catch((err) => {
  console.error("Error during indexing:", err?.message || err);
  process.exit(1);
});
