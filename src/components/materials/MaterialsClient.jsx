"use client";

import React, { useMemo } from "react";
import { useMaterialsFilter } from "@/hooks/useMaterialsFilter";
import MaterialCard from "@/components/materials/MaterialCard";
import MaterialFilterBar from "@/components/materials/MaterialFilterBar";
import MaterialFilterDrawer from "@/components/materials/MaterialFilterDrawer";
import MaterialActiveChips from "@/components/materials/MaterialActiveChips";
import MaterialEmptyState from "@/components/materials/MaterialEmptyState";
import { FileStack } from "lucide-react";

export default function MaterialsClient({ summaries = [] }) {
  const {
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
    totalCount,
    activeFilterCount,
    hasActiveFilters,
    isSearching,
    savedPreferences,
  } = useMaterialsFilter(summaries);

  // Active filters human-readable labels for the empty state
  const activeFiltersSummary = useMemo(() => {
    const list = [];
    if (filters.major) list.push(filters.major === "it" ? "تقنية المعلومات (IT)" : "علوم الحاسوب (CS)");
    if (filters.level) list.push(`المستوى ${filters.level}`);
    if (filters.semester) list.push(`الترم ${filters.semester}`);
    if (filters.subject) list.push(filters.subject);
    if (filters.instructor) list.push(filters.instructor);
    if (searchQuery.trim()) list.push(`بحث: "${searchQuery.trim()}"`);
    return list;
  }, [filters, searchQuery]);

  // Detect if there are no materials at all for the selected major & level in the dataset
  const isLevelEmpty = useMemo(() => {
    if (!filters.level) return false;
    return !summaries.some(
      (s) =>
        (!filters.major || !s.major || s.major.toLowerCase() === filters.major.toLowerCase()) &&
        s.level === Number(filters.level)
    );
  }, [summaries, filters.major, filters.level]);

  return (
    <div className="flex-1 flex flex-col gap-4 sm:gap-5 w-full font-cairo">
      {/* ─── Responsive Toolbar: Search & Results Counter ────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <MaterialFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
          isSearching={isSearching}
        />

        {/* Minimal Results Counter */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0 pt-0.5 sm:pt-0">
          <FileStack className="size-3.5 text-primary" />
          <span>
            {hasActiveFilters ? (
              <>
                عرض <strong className="text-foreground font-bold">{filteredSummaries.length}</strong> من{" "}
                <strong className="text-foreground font-bold">{totalCount}</strong> ملزمة
              </>
            ) : (
              <>
                إجمالي <strong className="text-foreground font-bold">{totalCount}</strong> ملزمة متاحة
              </>
            )}
          </span>
        </div>
      </div>

      {/* ─── Active Filter Chips Bar (Dismissible Tags) ─────────────── */}
      <MaterialActiveChips
        filters={filters}
        searchQuery={searchQuery}
        onClearFilter={clearFilter}
        onResetAll={resetAll}
        savedPreferences={savedPreferences}
      />

      {/* ─── Filter Drawer ──────────────────────────────────────────── */}
      <MaterialFilterDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        filters={filters}
        setMajor={setMajor}
        setLevel={setLevel}
        setSemester={setSemester}
        setSubject={setSubject}
        setInstructor={setInstructor}
        resetAll={resetAll}
        options={options}
        activeFilterCount={activeFilterCount}
        savedPreferences={savedPreferences}
      />

      {/* ─── Materials Grid or Empty State ──────────────────────────── */}
      {filteredSummaries.length === 0 ? (
        <MaterialEmptyState
          type={isLevelEmpty || (!hasActiveFilters && !searchQuery.trim()) ? "drive-empty" : "filter"}
          title={isLevelEmpty ? "لا توجد ملازم مضافة لهذا المستوى" : undefined}
          onReset={resetAll}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredSummaries.map((file) => (
            <MaterialCard key={file.driveId} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
