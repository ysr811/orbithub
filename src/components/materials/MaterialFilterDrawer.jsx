"use client";

import React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X, FunnelPlus, RotateCcw, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function DrawerSelect({
  label,
  value,
  onChange,
  options,
  disabled,
  helperText,
}) {
  return (
    <div className="flex flex-col gap-1.5 font-cairo">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground">{label}</label>
        {disabled && helperText && (
          <span className="text-[11px] text-muted-foreground">
            {helperText}
          </span>
        )}
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label={label}
          className="h-11 w-full appearance-none rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground transition-colors cursor-pointer focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-muted/40 shadow-xs"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

export default function MaterialFilterDrawer({
  isOpen,
  onOpenChange,
  filters,
  setLevel,
  setSemester,
  setSubject,
  setInstructor,
  resetAll,
  options,
  filteredCount,
  activeFilterCount,
}) {
  const availableLevels =
    options?.levels?.length > 0 ? options.levels : [1, 2, 3, 4];

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 ease-out data-open:opacity-100 data-closed:opacity-0 data-starting-style:opacity-0 data-ending-style:opacity-0"
        />
        <DialogPrimitive.Popup
          dir="rtl"
          className="fixed bottom-0 inset-x-0 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-xl sm:inset-x-auto z-50 flex max-h-[85vh] w-full flex-col rounded-t-3xl border-t sm:border-x border-border bg-card shadow-2xl outline-none font-cairo transition-all duration-200 ease-out data-open:translate-y-0 data-open:opacity-100 data-closed:translate-y-full data-closed:opacity-0 data-starting-style:translate-y-full data-starting-style:opacity-0 data-ending-style:translate-y-full data-ending-style:opacity-0"
        >
          {/* Drag Handle Indicator */}
          <div className="pt-3 pb-1 flex justify-center">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <FunnelPlus className="size-4 text-primary" />
              <DialogPrimitive.Title className="text-sm sm:text-base font-bold text-foreground">
                فلتر الملازم
              </DialogPrimitive.Title>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <DialogPrimitive.Close
              render={
                <button
                  type="button"
                  aria-label="إغلاق الفلاتر"
                  className="size-8 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              }
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* 1. Academic Level */}
            <DrawerSelect
              label="المستوى الدراسي"
              value={filters.level}
              onChange={setLevel}
              options={[
                { value: "", label: "جميع المستويات" },
                ...availableLevels.map((lvl) => ({
                  value: String(lvl),
                  label: `المستوى ${lvl}`,
                })),
              ]}
            />

            {/* 2. Semester */}
            <DrawerSelect
              label="الترم الدراسي"
              value={filters.semester}
              onChange={setSemester}
              disabled={!filters.level}
              helperText="اختر المستوى أولاً"
              options={[
                { value: "", label: "جميع الفصول الدراسية" },
                ...options.semesters.map((sem) => ({
                  value: String(sem),
                  label: `الترم ${sem}`,
                })),
              ]}
            />

            {/* 3. Subject */}
            <DrawerSelect
              label="المادة الدراسية"
              value={filters.subject}
              onChange={setSubject}
              disabled={!filters.semester}
              helperText="اختر الترم أولاً"
              options={[
                { value: "", label: "جميع المواد الدراسية" },
                ...options.subjects.map((sub) => ({
                  value: sub,
                  label: sub,
                })),
              ]}
            />

            {/* 4. Instructor */}
            <DrawerSelect
              label="الدكتور / الأستاذ"
              value={filters.instructor}
              onChange={setInstructor}
              disabled={!filters.subject}
              helperText="اختر المادة أولاً"
              options={[
                { value: "", label: "جميع الأساتذة" },
                ...options.instructors.map((ins) => ({
                  value: ins,
                  label: ins,
                })),
              ]}
            />
          </div>

          {/* Drawer Sticky Footer with CTA */}
          <div className="border-t border-border/60 bg-card p-4 flex items-center gap-2.5">
            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={resetAll}
                className="h-11 px-4 gap-1.5 font-bold text-destructive hover:bg-destructive/10 border-destructive/20 shrink-0 cursor-pointer"
              >
                <RotateCcw className="size-4" />
                مسح
              </Button>
            )}

            <Button
              type="button"
              variant="default"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 text-xs sm:text-sm font-bold shadow-xs cursor-pointer"
            >
              <Check className="size-4 ml-1.5" />
              تطبيق الفلاتر ({filteredCount})
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
