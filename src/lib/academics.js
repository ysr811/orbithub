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
