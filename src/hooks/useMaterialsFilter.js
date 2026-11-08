"use client";

import { useState, useMemo, useDeferredValue, useCallback, useEffect } from "react";
import { getUserPreferences } from "@/lib/userPreferences";

const INITIAL_FILTERS = {
  level: "",
  semester: "",
  subject: "",
  instructor: "",
};

export function useMaterialsFilter(summaries = []) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [savedPreferences, setSavedPreferences] = useState({ level: "", semester: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Synchronize filters with user's saved preferences
  useEffect(() => {
    const applySaved = () => {
      const { level, semester } = getUserPreferences();
      const cleanLevel = level ? String(level) : "";
      const cleanSemester = semester ? String(semester) : "";
      setSavedPreferences({ level: cleanLevel, semester: cleanSemester });
      setFilters((prev) => ({
        ...prev,
        level: cleanLevel || prev.level,
        semester: cleanSemester || prev.semester,
      }));
    };

    applySaved();
    window.addEventListener("preferences_updated", applySaved);
    return () => window.removeEventListener("preferences_updated", applySaved);
  }, []);

  // Responsive search query with deferred value for performance
  const deferredSearch = useDeferredValue(searchQuery.trim().toLowerCase());

  // Filter setters
  const setLevel = useCallback((level) => {
    setFilters((prev) => ({
      ...prev,
      level: level ? String(level) : "",
      semester: "",
      subject: "",
      instructor: "",
    }));
  }, []);

  const setSemester = useCallback((semester) => {
    setFilters((prev) => ({
      ...prev,
      semester: semester ? String(semester) : "",
      subject: "",
      instructor: "",
    }));
  }, []);

  const setSubject = useCallback((subject) => {
    setFilters((prev) => ({
      ...prev,
      subject: subject || "",
      instructor: "",
    }));
  }, []);

  const setInstructor = useCallback((instructor) => {
    setFilters((prev) => ({
      ...prev,
      instructor: instructor || "",
    }));
  }, []);

  const clearFilter = useCallback((key) => {
    if (key === "level") {
      setLevel("");
    } else if (key === "semester") {
      setSemester("");
    } else if (key === "subject") {
      setSubject("");
    } else if (key === "instructor") {
      setInstructor("");
    } else if (key === "search") {
      setSearchQuery("");
    }
  }, [setLevel, setSemester, setSubject, setInstructor]);

  // Reset transient filters back to default saved preferences
  const resetAll = useCallback(() => {
    setFilters({
      level: savedPreferences.level || "",
      semester: savedPreferences.semester || "",
      subject: "",
      instructor: "",
    });
    setSearchQuery("");
  }, [savedPreferences]);

  // Derived options for dropdowns based on current scope
  const options = useMemo(() => {
    const levels = [...new Set(summaries.map((s) => s.level))]
      .filter(Boolean)
      .sort((a, b) => a - b);

    const levelFiltered = filters.level
      ? summaries.filter((s) => s.level === Number(filters.level))
      : summaries;

    const semesters = [...new Set(levelFiltered.map((s) => s.semester))]
      .filter(Boolean)
      .sort((a, b) => a - b);

    const semesterFiltered = filters.semester
      ? levelFiltered.filter((s) => s.semester === Number(filters.semester))
      : levelFiltered;

    const subjects = [...new Set(semesterFiltered.map((s) => s.subject))]
      .filter(Boolean)
      .sort();

    const subjectFiltered = filters.subject
      ? semesterFiltered.filter((s) => s.subject === filters.subject)
      : semesterFiltered;

    const instructors = [...new Set(subjectFiltered.map((s) => s.instructor))]
      .filter(Boolean)
      .sort();

    return { levels, semesters, subjects, instructors };
  }, [summaries, filters.level, filters.semester, filters.subject]);

  // Filtered materials
  const filteredSummaries = useMemo(() => {
    return summaries.filter((item) => {
      if (filters.level && item.level !== Number(filters.level)) return false;
      if (filters.semester && item.semester !== Number(filters.semester)) return false;
      if (filters.subject && item.subject !== filters.subject) return false;
      if (filters.instructor && item.instructor !== filters.instructor) return false;

      if (deferredSearch) {
        const titleMatch = item.title?.toLowerCase().includes(deferredSearch);
        const subjectMatch = item.subject?.toLowerCase().includes(deferredSearch);
        const instructorMatch = item.instructor?.toLowerCase().includes(deferredSearch);
        return Boolean(titleMatch || subjectMatch || instructorMatch);
      }

      return true;
    });
  }, [summaries, filters, deferredSearch]);

  // Active filter count (counts user-applied transient filters)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.level && !savedPreferences.level) count += 1;
    if (filters.semester && !savedPreferences.semester) count += 1;
    if (filters.subject) count += 1;
    if (filters.instructor) count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [filters, searchQuery, savedPreferences]);

  const hasActiveFilters = activeFilterCount > 0;

  return {
    filters,
    searchQuery,
    setSearchQuery,
    isFiltersOpen,
    setIsFiltersOpen,
    isDrawerOpen,
    setIsDrawerOpen,
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
    hasActiveFilters,
    isSearching: searchQuery.trim().toLowerCase() !== deferredSearch,
    savedPreferences,
  };
}
