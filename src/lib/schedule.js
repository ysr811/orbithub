import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import defaultCsSchedule from "@/data/schedules/cs_semester_1.json";
import sampleUpdates from "@/data/schedules/sample_updates.json";

// ─── Google Drive Client Initialization ──────────────────────────────
function getDriveClient() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  let private_key = process.env.GOOGLE_PRIVATE_KEY;

  if (!client_email || !private_key) {
    return null;
  }

  private_key = private_key.trim();
  if (
    (private_key.startsWith('"') && private_key.endsWith('"')) ||
    (private_key.startsWith("'") && private_key.endsWith("'"))
  ) {
    private_key = private_key.slice(1, -1);
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

// ─── Helper: Find Folder by Name ─────────────────────────────────────
async function findSubfolder(drive, parentId, folderName) {
  try {
    const res = await drive.files.list({
      q: `'${parentId}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.shortcut') and trashed = false`,
      fields: "files(id, name, mimeType, shortcutDetails)",
      pageSize: 50,
    });

    const files = res.data.files || [];
    const target = files.find(
      (f) => f.name.toLowerCase() === folderName.toLowerCase()
    );

    if (!target) return null;

    if (target.mimeType === "application/vnd.google-apps.shortcut") {
      return target.shortcutDetails?.targetId || null;
    }

    return target.id;
  } catch (err) {
    console.error("[Schedule] Error finding subfolder:", err?.message || err);
    return null;
  }
}

// ─── Helper: Fetch and Parse JSON File from Drive ────────────────────
async function fetchJsonFile(drive, parentId, fileNamePattern) {
  try {
    const res = await drive.files.list({
      q: `'${parentId}' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'`,
      fields: "files(id, name, mimeType)",
      pageSize: 50,
    });

    const files = res.data.files || [];
    const match = files.find((f) =>
      f.name.toLowerCase().includes(fileNamePattern.toLowerCase())
    );

    if (!match) return null;

    const fileContent = await drive.files.get(
      { fileId: match.id, alt: "media" },
      { responseType: "text" }
    );

    if (typeof fileContent.data === "string") {
      return JSON.parse(fileContent.data);
    }
    return fileContent.data;
  } catch (err) {
    console.error(
      `[Schedule] Error fetching JSON file ${fileNamePattern}:`,
      err?.message || err
    );
    return null;
  }
}

// ─── Raw Schedule Fetcher ────────────────────────────────────────────
async function fetchScheduleFromDrive(major = "cs", level = 2, semester = 1) {
  const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  const drive = getDriveClient();

  let driveScheduleOverride = null;
  let driveUpdates = [];

  if (drive && rootId) {
    try {
      // Find 'schedule' or 'الجدول' folder
      let scheduleFolderId = await findSubfolder(drive, rootId, "schedule");
      if (!scheduleFolderId) {
        scheduleFolderId = await findSubfolder(drive, rootId, "الجدول");
      }

      if (scheduleFolderId) {
        // Look for custom schedule override e.g. cs_level_2.json
        const customSchedule = await fetchJsonFile(
          drive,
          scheduleFolderId,
          `${major}_level_${level}.json`
        );
        if (customSchedule) {
          driveScheduleOverride = customSchedule;
        }

        // Look for updates file e.g. cs_level_2_updates.json or updates.json
        const updatesData =
          (await fetchJsonFile(
            drive,
            scheduleFolderId,
            `${major}_level_${level}_updates.json`
          )) ||
          (await fetchJsonFile(drive, scheduleFolderId, "updates.json"));

        if (updatesData?.updates && Array.isArray(updatesData.updates)) {
          driveUpdates = updatesData.updates;
        }
      }
    } catch (err) {
      console.error("[Schedule] Error connecting to Drive for schedule:", err?.message || err);
    }
  }

  // Base schedule fallback from default dataset
  const levelStr = String(level);
  const baseLevelData =
    driveScheduleOverride?.schedule ||
    defaultCsSchedule.levels?.[levelStr]?.schedule ||
    defaultCsSchedule.levels?.["2"]?.schedule ||
    {};

  const resolvedUpdates =
    driveUpdates.length > 0
      ? driveUpdates
      : Number(level) === 2
      ? sampleUpdates.updates || []
      : [];

  return {
    major: String(major).toLowerCase(),
    level: Number(level),
    semester: Number(semester),
    academicYear: defaultCsSchedule.academicYear || "2026-2027",
    faculty: defaultCsSchedule.faculty || "كلية الحاسبات وتقنية المعلومات",
    department: defaultCsSchedule.department || "قسم علوم الحاسوب",
    periods: defaultCsSchedule.periods,
    days: defaultCsSchedule.days,
    schedule: baseLevelData,
    updates: resolvedUpdates,
  };
}

// ─── Cached Schedule Getter (1 Hour Revalidation) ────────────────────
export const getSchedule = unstable_cache(
  async (major = "cs", level = 2, semester = 1) => {
    return await fetchScheduleFromDrive(major, level, semester);
  },
  ["orbithub-schedule-v3"],
  {
    revalidate: 3600,
    tags: ["schedules"],
  }
);
