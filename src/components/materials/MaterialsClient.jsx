"use client";

import { useMemo } from "react";
import { useMaterialsFilter, matchesScope } from "@/hooks/useMaterialsFilter";
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

  // Detect if there are no materials at all for the selected major and level
  const isLevelEmpty = useMemo(() => {
    if (!filters.level) return false;
    return !summaries.some((s) =>
      matchesScope(s, { major: filters.major, level: filters.level })
    );
  }, [summaries, filters.major, filters.level]);

  return (
    <div className="flex-1 flex flex-col gap-4 sm:gap-5 w-full mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <MaterialFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          isSearching={isSearching}
        />

        <div className="lg:flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0 pt-0.5 sm:pt-0 hidden">
          <FileStack className="size-3.5 text-primary" />
          <span>
            {hasActiveFilters ? (
              <>
                عرض{" "}
                <strong className="text-foreground font-bold">
                  {filteredSummaries.length}
                </strong>{" "}
                من <strong className="text-foreground font-bold">{totalCount}</strong>{" "}
                ملزمة
              </>
            ) : (
              <>
                إجمالي{" "}
                <strong className="text-foreground font-bold">{totalCount}</strong>{" "}
                ملزمة متاحة
              </>
            )}
          </span>
        </div>
      </div>

      <MaterialActiveChips
        filters={filters}
        searchQuery={searchQuery}
        onClearFilter={clearFilter}
        onResetAll={resetAll}
        savedPreferences={savedPreferences}
      />

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

      {filteredSummaries.length === 0 ? (
        <MaterialEmptyState
          type={hasActiveFilters ? "filter" : "empty"}
          title={
            !hasActiveFilters && isLevelEmpty
              ? "لا توجد ملازم مضافة لهذا المستوى"
              : undefined
          }
          onReset={resetAll}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredSummaries.map((file) => (
            <MaterialCard
              key={`${file.major}-${file.level}-${file.semester}-${file.subject}-${file.instructor}-${file.driveId}`}
              file={file}
            />
          ))}
        </div>
      )}
    </div>
  );
}
