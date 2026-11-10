export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: "onboarding_completed",
  USER_MAJOR: "user_major",
  USER_LEVEL: "user_level",
  USER_SEMESTER: "user_semester",
};

export function isOnboardingCompleted() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === "true";
}

export function setOnboardingCompleted(completed = true) {
  if (typeof window === "undefined") return;
  if (completed) {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, "true");
  } else {
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
  }
}

export function getUserPreferences() {
  if (typeof window === "undefined") return { major: "", level: "", semester: "" };
  return {
    major: localStorage.getItem(STORAGE_KEYS.USER_MAJOR) || "",
    level: localStorage.getItem(STORAGE_KEYS.USER_LEVEL) || "",
    semester: localStorage.getItem(STORAGE_KEYS.USER_SEMESTER) || "",
  };
}

export function setUserPreferences({ major, level, semester }) {
  if (typeof window === "undefined") return;

  if (major) localStorage.setItem(STORAGE_KEYS.USER_MAJOR, String(major));
  else localStorage.removeItem(STORAGE_KEYS.USER_MAJOR);

  if (level) localStorage.setItem(STORAGE_KEYS.USER_LEVEL, String(level));
  else localStorage.removeItem(STORAGE_KEYS.USER_LEVEL);

  if (semester) localStorage.setItem(STORAGE_KEYS.USER_SEMESTER, String(semester));
  else localStorage.removeItem(STORAGE_KEYS.USER_SEMESTER);

  window.dispatchEvent(new Event("preferences_updated"));
}

export function resetUserPreferences() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
  localStorage.removeItem(STORAGE_KEYS.USER_MAJOR);
  localStorage.removeItem(STORAGE_KEYS.USER_LEVEL);
  localStorage.removeItem(STORAGE_KEYS.USER_SEMESTER);
  window.dispatchEvent(new Event("preferences_updated"));
}
