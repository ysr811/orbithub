export const STORAGE_KEY = "user_preferences";

export const STORAGE_KEYS = {
  USER_PREFERENCES: STORAGE_KEY,
};

// Safe JSON parser for localStorage
function getRawPreferences() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    const major = localStorage.getItem("user_major");
    const level = localStorage.getItem("user_level");
    const semester = localStorage.getItem("user_semester");
    const onboarding = localStorage.getItem("onboarding_completed");
    if (major || level || semester || onboarding) {
      return {
        major: major || "",
        level: level || "",
        semester: semester || "",
        onboarding_completed: onboarding === "true",
      };
    }
    return {};
  } catch {
    return {};
  }
}

// Safe JSON serializer for localStorage
function saveRawPreferences(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota or disabled localStorage errors
  }
}

export function isOnboardingCompleted() {
  if (typeof window === "undefined") return true;
  const prefs = getRawPreferences();
  return Boolean(prefs.onboarding_completed);
}

export function setOnboardingCompleted(completed = true) {
  if (typeof window === "undefined") return;
  const prefs = getRawPreferences();
  if (completed) {
    prefs.onboarding_completed = true;
  } else {
    delete prefs.onboarding_completed;
  }
  saveRawPreferences(prefs);
}

export function getUserPreferences() {
  if (typeof window === "undefined") return { major: "", level: "", semester: "" };
  const prefs = getRawPreferences();
  return {
    major: prefs.major ? String(prefs.major) : "",
    level: prefs.level ? String(prefs.level) : "",
    semester: prefs.semester ? String(prefs.semester) : "",
  };
}

export function setUserPreferences({ major, level, semester }) {
  if (typeof window === "undefined") return;
  const prefs = getRawPreferences();

  if (major) prefs.major = String(major);
  else delete prefs.major;

  if (level) prefs.level = String(level);
  else delete prefs.level;

  if (semester) prefs.semester = String(semester);
  else delete prefs.semester;

  saveRawPreferences(prefs);
  window.dispatchEvent(new Event("preferences_updated"));
}

export function resetUserPreferences() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("preferences_updated"));
}
