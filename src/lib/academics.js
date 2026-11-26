export const MAJOR_OPTIONS = [
  { value: "cs", label: "علوم الحاسوب (CS)" },
  { value: "it", label: "تقنية المعلومات (IT)" },
];

export const DEFAULT_LEVELS = [1, 2, 3, 4];
export const DEFAULT_SEMESTERS = [1, 2];

const ORDINAL_LABELS = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
};

const MAJOR_LABELS = Object.fromEntries(
  MAJOR_OPTIONS.map((opt) => [opt.value, opt.label])
);

export const LEVEL_OPTIONS = DEFAULT_LEVELS.map((level) => ({
  value: String(level),
  label: getLevelLabel(level),
}));

export const SEMESTER_OPTIONS = DEFAULT_SEMESTERS.map((semester) => ({
  value: String(semester),
  label: getSemesterLabel(semester),
}));

export function getMajorLabel(major) {
  if (!major) return "";
  const normalized = String(major).toLowerCase();
  return MAJOR_LABELS[normalized] || String(major).toUpperCase();
}

export function getLevelLabel(level) {
  if (!level) return "";
  const num = Number(level);
  return ORDINAL_LABELS[num] ? `المستوى ${ORDINAL_LABELS[num]}` : `المستوى ${level}`;
}

export function getShortLevelLabel(level) {
  return level ? `المستوى ${level}` : "";
}

export function getSemesterLabel(semester) {
  if (!semester) return "";
  const num = Number(semester);
  return ORDINAL_LABELS[num] ? `الترم ${ORDINAL_LABELS[num]}` : `الترم ${semester}`;
}

export function getShortSemesterLabel(semester) {
  return semester ? `الترم ${semester}` : "";
}

const SUBJECT_PHRASE_RULES = [
  [/\badvanced software design\s*(&|and)\s*development\b/gi, "Adv. SW Design"],
  [/\bcomputer organization\s*(&|and)\s*architecture\b/gi, "Comp. Org"],
  [/\bfundamentals of computer networks\b/gi, "Comp. Networks"],
  [
    /\bintroduction to (probability|statistics|statics)\s*(&|and)\s*(probability|statistics|statics)\b/gi,
    "Prob. & Stat.",
  ],
  [/\bmobile application development\b/gi, "Mobile App Dev"],
  [/\bobject[- ]oriented programming\b/gi, "OOP"],
  [/\bdecision support systems?\b/gi, "DSS"],
  [/\bdatabase administration\b/gi, "DB Admin"],
  [/\bartificial intelligence\b/gi, "AI"],
  [/\btheory of computation\b/gi, "Theory of Comp."],
  [/\bsoftware engineering\b/gi, "Software Eng."],
  [/\bcomputer programming\b/gi, "Comp. Prog."],
  [/\bvisual programming\b/gi, "Visual Prog."],
  [/\bdifferential calculus\b/gi, "Diff. Calculus"],
  [/\binformation technology\b/gi, "IT"],
  [/\bcomputer science\b/gi, "CS"],
  [/\blanguage\b/gi, ""],
  [/^introduction\b/i, "Intro"],
];

export function abbreviateSubject(subject) {
  if (!subject) return "";
  let text = String(subject).trim();

  if (/[\u0600-\u06FF]/.test(text)) {
    return text;
  }

  for (const [pattern, replacement] of SUBJECT_PHRASE_RULES) {
    text = text.replace(pattern, replacement);
  }

  return text.replace(/\s+/g, " ").trim();
}

export function cleanFileTitle(title) {
  if (!title) return "";
  return String(title)
    .replace(/\.(pdf|docx?|pptx?|xlsx?|png|jpe?g)$/i, "")
    .replace(/_/g, " ");
}

export function getDriveUrls(driveId, mimeType) {
  const viewUrl = `https://drive.google.com/file/d/${driveId}/view`;
  const type = mimeType ? String(mimeType).toLowerCase() : "";

  let downloadUrl = `https://drive.google.com/uc?id=${driveId}&export=download`;
  if (type === "application/vnd.google-apps.document") {
    downloadUrl = `https://docs.google.com/document/d/${driveId}/export?format=pdf`;
  } else if (type === "application/vnd.google-apps.presentation") {
    downloadUrl = `https://docs.google.com/presentation/d/${driveId}/export/pdf`;
  } else if (type === "application/vnd.google-apps.spreadsheet") {
    downloadUrl = `https://docs.google.com/spreadsheets/d/${driveId}/export?format=xlsx`;
  }

  return { viewUrl, downloadUrl };
}
