"use client";

import {
  useState,
  useMemo,
  useDeferredValue,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  EMPTY_PREFERENCES,
  EMPTY_FILTERS,
  getUserPreferences,
  getSavedMaterialsFilters,
  saveMaterialsFilters,
  subscribeStorageKey,
} from "@/lib/userPreferences";

const CASCADE_KEYS = ["major", "level", "semester", "subject", "instructor"];

// Module-level snapshot caches preserve referential stability for useSyncExternalStore
let cachedPrefsRaw = null;
let cachedPrefsObj = EMPTY_PREFERENCES;

function getPreferencesSnapshot() {
  const next = getUserPreferences();
  const serialized = JSON.stringify(next);
  if (serialized !== cachedPrefsRaw) {
    cachedPrefsRaw = serialized;
    cachedPrefsObj = next;
  }
  return cachedPrefsObj;
}

let cachedFiltersRaw = null;
let cachedFiltersObj = EMPTY_FILTERS;

function getFiltersSnapshot() {
  const next = getSavedMaterialsFilters() || EMPTY_FILTERS;
  const serialized = JSON.stringify(next);
  if (serialized !== cachedFiltersRaw) {
    cachedFiltersRaw = serialized;
    cachedFiltersObj = next;
  }
  return cachedFiltersObj;
}

function subscribePreferences(cb) {
  return subscribeStorageKey("preferences_updated", cb);
}

function subscribeFilters(cb) {
  return subscribeStorageKey("materials_filters_updated", cb);
}

/**
 * Shared academic scope matcher used by filtering and empty-state checks.
 */
export function matchesScope(item, scope) {
  if (
    scope.major &&
    item.major &&
    item.major.toLowerCase() !== scope.major.toLowerCase()
  ) {
    return false;
  }
  if (scope.level && item.level !== Number(scope.level)) return false;
  if (scope.semester && item.semester !== Number(scope.semester)) return false;
  return true;
}

export function useMaterialsFilter(summaries = []) {
  const savedPreferences = useSyncExternalStore(
    subscribePreferences,
    getPreferencesSnapshot,
    () => EMPTY_PREFERENCES
  );
  const storedFilters = useSyncExternalStore(
    subscribeFilters,
    getFiltersSnapshot,
    () => EMPTY_FILTERS
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Merge locked saved preferences with persisted filter overrides and prune invalid dataset values
  const filters = useMemo(() => {
    const resolvedMajor = savedPreferences.major || storedFilters.major || "";
    const resolvedLevel = savedPreferences.level || storedFilters.level || "";
    const resolvedSemester =
      savedPreferences.semester || storedFilters.semester || "";

    const scopeMismatch =
      Boolean(
        savedPreferences.major &&
          storedFilters.major &&
          savedPreferences.major !== storedFilters.major
      ) ||
      Boolean(
        savedPreferences.level &&
          storedFilters.level &&
          savedPreferences.level !== storedFilters.level
      ) ||
      Boolean(
        savedPreferences.semester &&
          storedFilters.semester &&
          savedPreferences.semester !== storedFilters.semester
      );

    let validSubject = scopeMismatch ? "" : storedFilters.subject || "";
    let validInstructor = scopeMismatch ? "" : storedFilters.instructor || "";

    if (summaries.length > 0 && (validSubject || validInstructor)) {
      const scopeItems = summaries.filter((item) =>
        matchesScope(item, {
          major: resolvedMajor,
          level: resolvedLevel,
          semester: resolvedSemester,
        })
      );

      if (validSubject && !scopeItems.some((item) => item.subject === validSubject)) {
        validSubject = "";
        validInstructor = "";
      } else if (
        validInstructor &&
        !scopeItems.some(
          (item) =>
            (!validSubject || item.subject === validSubject) &&
            item.instructor === validInstructor
        )
      ) {
        validInstructor = "";
      }
    }

    return {
      major: resolvedMajor,
      level: resolvedLevel,
      semester: resolvedSemester,
      subject: validSubject,
      instructor: validInstructor,
    };
  }, [summaries, savedPreferences, storedFilters]);

  const deferredSearch = useDeferredValue(searchQuery.trim().toLowerCase());

  const updateFilter = useCallback(
    (key, value) => {
      const idx = CASCADE_KEYS.indexOf(key);
      if (idx === -1) return;

      const next = { ...filters };
      next[key] =
        key === "major" && value ? String(value).toLowerCase() : String(value || "");

      for (let i = idx + 1; i < CASCADE_KEYS.length; i += 1) {
        const childKey = CASCADE_KEYS[i];
        next[childKey] = savedPreferences[childKey] || "";
      }

      saveMaterialsFilters(next);
    },
    [filters, savedPreferences]
  );

  const setMajor = useCallback((v) => updateFilter("major", v), [updateFilter]);
  const setLevel = useCallback((v) => updateFilter("level", v), [updateFilter]);
  const setSemester = useCallback((v) => updateFilter("semester", v), [updateFilter]);
  const setSubject = useCallback((v) => updateFilter("subject", v), [updateFilter]);
  const setInstructor = useCallback(
    (v) => updateFilter("instructor", v),
    [updateFilter]
  );

  const clearFilter = useCallback(
    (key) => {
      if (key === "search") {
        setSearchQuery("");
      } else {
        updateFilter(key, "");
      }
    },
    [updateFilter]
  );

  const resetAll = useCallback(() => {
    saveMaterialsFilters(EMPTY_FILTERS);
    setSearchQuery("");
  }, []);

  const options = useMemo(() => {
    const majorFiltered = filters.major
      ? summaries.filter((s) => matchesScope(s, { major: filters.major }))
      : summaries;

    const levels = [...new Set(majorFiltered.map((s) => s.level))]
      .filter(Boolean)
      .sort((a, b) => a - b);

    const levelFiltered = filters.level
      ? majorFiltered.filter((s) => s.level === Number(filters.level))
      : majorFiltered;

    const semesters = [...new Set(levelFiltered.map((s) => s.semester))]
      .filter(Boolean)
      .sort((a, b) => a - b);

    const semesterFiltered = filters.semester
      ? levelFiltered.filter((s) => s.semester === Number(filters.semester))
      : levelFiltered;

    const subjects = [...new Set(semesterFiltered.map((s) => s.subject))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "ar"));

    const subjectFiltered = filters.subject
      ? semesterFiltered.filter((s) => s.subject === filters.subject)
      : semesterFiltered;

    const instructors = [...new Set(subjectFiltered.map((s) => s.instructor))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "ar"));

    return { levels, semesters, subjects, instructors };
  }, [
    summaries,
    filters.major,
    filters.level,
    filters.semester,
    filters.subject,
  ]);

  const filteredSummaries = useMemo(() => {
    return summaries.filter((item) => {
      if (!matchesScope(item, filters)) return false;
      if (filters.subject && item.subject !== filters.subject) return false;
      if (filters.instructor && item.instructor !== filters.instructor) return false;

      if (deferredSearch) {
        const titleMatch = item.title?.toLowerCase().includes(deferredSearch);
        const subjectMatch = item.subject?.toLowerCase().includes(deferredSearch);
        const instructorMatch = item.instructor
          ?.toLowerCase()
          .includes(deferredSearch);
        return Boolean(titleMatch || subjectMatch || instructorMatch);
      }

      return true;
    });
  }, [summaries, filters, deferredSearch]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.major && !savedPreferences.major) count += 1;
    if (filters.level && !savedPreferences.level) count += 1;
    if (filters.semester && !savedPreferences.semester) count += 1;
    if (filters.subject) count += 1;
    if (filters.instructor) count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [filters, searchQuery, savedPreferences]);

  return {
    filters,
    searchQuery,
    setSearchQuery,
    isDrawerOpen,
    setIsDrawerOpen,
    setMajor,
    setLevel,
    setSemester,
    setSubject,
    setInstructor,
    clearFilter,
    resetAll,
    options,
    filteredSummaries,
    totalCount: summaries.length,
    activeFilterCount,
    hasActiveFilters: activeFilterCount > 0,
    isSearching: searchQuery.trim().toLowerCase() !== deferredSearch,
    savedPreferences,
  };
}
