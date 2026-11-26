"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FunnelPlus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select";
import {
  MAJOR_OPTIONS,
  DEFAULT_LEVELS,
  DEFAULT_SEMESTERS,
  getShortLevelLabel,
  getShortSemesterLabel,
} from "@/lib/academics";

const ALL_MAJORS_OPTIONS = [
  { value: "", label: "جميع التخصصات" },
  ...MAJOR_OPTIONS,
];

export default function MaterialFilterDrawer({
  isOpen,
  onOpenChange,
  filters,
  setMajor,
  setLevel,
  setSemester,
  setSubject,
  setInstructor,
  resetAll,
  options,
  activeFilterCount,
  savedPreferences = { major: "", level: "", semester: "" },
}) {
  const availableLevels =
    options?.levels?.length > 0 ? options.levels : DEFAULT_LEVELS;
  const availableSemesters =
    options?.semesters?.length > 0 ? options.semesters : DEFAULT_SEMESTERS;

  const hasSavedMajor = Boolean(savedPreferences?.major);
  const hasSavedLevel = Boolean(savedPreferences?.level);
  const hasSavedSemester = Boolean(savedPreferences?.semester);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-3rem)] sm:w-full sm:max-w-xl md:max-w-2xl p-6 sm:p-8 md:p-9 bg-white border-none shadow-none rounded-3xl font-cairo flex flex-col gap-5 sm:gap-6">
        <DialogHeader className="gap-2 text-right">
          <div className="flex items-center gap-2.5">
            <FunnelPlus className="size-4 text-primary" />
            <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
              فلتر الملازم
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:gap-5">
          {/* 1. Subject */}
          <SelectField
            label="المادة الدراسية"
            value={filters.subject}
            onChange={setSubject}
            options={[
              { value: "", label: "جميع المواد الدراسية" },
              ...options.subjects.map((sub) => ({
                value: sub,
                label: sub,
              })),
            ]}
          />

          {/* 2. Instructor */}
          <SelectField
            label="الدكتور / الأستاذ"
            value={filters.instructor}
            onChange={setInstructor}
            options={[
              { value: "", label: "جميع الأساتذة" },
              ...options.instructors.map((ins) => ({
                value: ins,
                label: ins,
              })),
            ]}
          />

          {/* 3. Academic Major (hidden when saved in user preferences) */}
          {!hasSavedMajor && (
            <SelectField
              label="التخصص الأكاديمي"
              value={filters.major}
              onChange={setMajor}
              options={ALL_MAJORS_OPTIONS}
            />
          )}

          {/* 4. Semester (hidden when saved in user preferences) */}
          {!hasSavedSemester && (
            <SelectField
              label="الترم الدراسي"
              value={filters.semester}
              onChange={setSemester}
              options={[
                { value: "", label: "جميع الفصول الدراسية" },
                ...availableSemesters.map((sem) => ({
                  value: String(sem),
                  label: getShortSemesterLabel(sem),
                })),
              ]}
            />
          )}

          {/* 5. Academic Level (hidden when saved in user preferences) */}
          {!hasSavedLevel && (
            <SelectField
              label="المستوى الدراسي"
              value={filters.level}
              onChange={setLevel}
              options={[
                { value: "", label: "جميع المستويات" },
                ...availableLevels.map((lvl) => ({
                  value: String(lvl),
                  label: getShortLevelLabel(lvl),
                })),
              ]}
            />
          )}
        </div>

        <DialogFooter className="flex-row items-center justify-between sm:justify-between pt-5">
          <Button
            type="button"
            variant="default"
            onClick={() => onOpenChange(false)}
            size="sm"
            className="h-9 px-6 font-bold text-xs sm:text-sm"
          >
            تطبيق
          </Button>

          {activeFilterCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={resetAll}
              size="sm"
              className="h-9 px-3 gap-1.5 text-xs text-destructive hover:bg-destructive/10"
            >
              <RotateCcw className="size-3.5" />
              مسح الفلاتر
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
