const PREFERENCES_KEY = "user_preferences";
const FILTERS_KEY = "materials_filters";

export const EMPTY_PREFERENCES = Object.freeze({
  major: "",
  level: "",
  semester: "",
});

export const EMPTY_FILTERS = Object.freeze({
  major: "",
  level: "",
  semester: "",
  subject: "",
  instructor: "",
});

function readJson(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or disabled localStorage errors
  }
}

function removeKey(key) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore disabled localStorage errors
  }
}

export function normalizeFilters(raw) {
  return {
    major: raw?.major ? String(raw.major).toLowerCase() : "",
    level: raw?.level ? String(raw.level) : "",
    semester: raw?.semester ? String(raw.semester) : "",
    subject: raw?.subject ? String(raw.subject) : "",
    instructor: raw?.instructor ? String(raw.instructor) : "",
  };
}

export function isOnboardingCompleted() {
  return Boolean(readJson(PREFERENCES_KEY)?.onboarding_completed);
}

export function setOnboardingCompleted(completed = true) {
  const prefs = readJson(PREFERENCES_KEY) || {};
  if (completed) {
    prefs.onboarding_completed = true;
  } else {
    delete prefs.onboarding_completed;
  }
  writeJson(PREFERENCES_KEY, prefs);
}

export function getUserPreferences() {
  const prefs = readJson(PREFERENCES_KEY);
  if (!prefs) return EMPTY_PREFERENCES;
  return {
    major: prefs.major ? String(prefs.major).toLowerCase() : "",
    level: prefs.level ? String(prefs.level) : "",
    semester: prefs.semester ? String(prefs.semester) : "",
  };
}

export function setUserPreferences({ major, level, semester }) {
  if (typeof window === "undefined") return;
  const prevPrefs = getUserPreferences();
  const prefs = readJson(PREFERENCES_KEY) || {};

  const nextMajor = major ? String(major).toLowerCase() : "";
  const nextLevel = level ? String(level) : "";
  const nextSemester = semester ? String(semester) : "";

  if (nextMajor) prefs.major = nextMajor;
  else delete prefs.major;

  if (nextLevel) prefs.level = nextLevel;
  else delete prefs.level;

  if (nextSemester) prefs.semester = nextSemester;
  else delete prefs.semester;

  writeJson(PREFERENCES_KEY, prefs);

  // Clear stale subject/instructor when academic scope changes
  const scopeChanged =
    prevPrefs.major !== nextMajor ||
    prevPrefs.level !== nextLevel ||
    prevPrefs.semester !== nextSemester;

  if (scopeChanged) {
    const savedFilters = getSavedMaterialsFilters();
    if (savedFilters) {
      saveMaterialsFilters({
        ...savedFilters,
        major: nextMajor,
        level: nextLevel,
        semester: nextSemester,
        subject: "",
        instructor: "",
      });
    }
  }

  window.dispatchEvent(new Event("preferences_updated"));
}

export function getSavedMaterialsFilters() {
  const parsed = readJson(FILTERS_KEY);
  return parsed ? normalizeFilters(parsed) : null;
}

export function saveMaterialsFilters(filters) {
  const normalized = normalizeFilters(filters);
  const hasValues = Object.values(normalized).some(Boolean);

  if (!hasValues) {
    removeKey(FILTERS_KEY);
  } else {
    writeJson(FILTERS_KEY, normalized);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("materials_filters_updated"));
  }
}

export function subscribeStorageKey(eventName, callback) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(eventName, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(eventName, handler);
    window.removeEventListener("storage", handler);
  };
}
