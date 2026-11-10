import React from "react";
import { X, RotateCcw, Search, Layers, Calendar, BookText, GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaterialActiveChips({
  filters,
  searchQuery,
  onClearFilter,
  onResetAll,
  savedPreferences = { major: "", level: "", semester: "" },
}) {
  const chips = [];

  const hasSavedMajor = Boolean(savedPreferences?.major);
  const hasSavedLevel = Boolean(savedPreferences?.level);
  const hasSavedSemester = Boolean(savedPreferences?.semester);

  // Only display major chip if it is not already saved as a default background preference
  if (filters?.major && !hasSavedMajor) {
    chips.push({
      id: "major",
      key: "major",
      icon: School,
      label: filters.major === "it" ? "تقنية المعلومات (IT)" : "علوم الحاسوب (CS)",
      ariaLabel: `إزالة فلتر التخصص`,
    });
  }

  // Only display level chip if it is not already saved as a default background preference
  if (filters?.level && !hasSavedLevel) {
    chips.push({
      id: "level",
      key: "level",
      icon: Layers,
      label: `المستوى ${filters.level}`,
      ariaLabel: `إزالة فلتر المستوى ${filters.level}`,
    });
  }

  // Only display semester chip if it is not already saved as a default background preference
  if (filters?.semester && !hasSavedSemester) {
    chips.push({
      id: "semester",
      key: "semester",
      icon: Calendar,
      label: `الترم ${filters.semester}`,
      ariaLabel: `إزالة فلتر الترم ${filters.semester}`,
    });
  }

  if (filters?.subject) {
    chips.push({
      id: "subject",
      key: "subject",
      icon: BookText,
      label: `المادة: ${filters.subject}`,
      ariaLabel: `إزالة فلتر المادة ${filters.subject}`,
    });
  }

  if (filters?.instructor) {
    chips.push({
      id: "instructor",
      key: "instructor",
      icon: GraduationCap,
      label: `${filters.instructor}`,
      ariaLabel: `إزالة فلتر الأستاذ ${filters.instructor}`,
    });
  }

  if (searchQuery?.trim()) {
    chips.push({
      id: "search",
      key: "search",
      icon: Search,
      label: `بحث: "${searchQuery.trim()}"`,
      ariaLabel: `إزالة كلمة البحث ${searchQuery.trim()}`,
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="الفلاتر المطبقة حالياً"
      className="flex flex-wrap items-center gap-2 pt-0.5 font-cairo"
    >
      {chips.map((chip) => {
        const Icon = chip.icon;
        return (
          <div
            key={chip.id}
            className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-border bg-card text-foreground shadow-2xs transition-colors"
          >
            <Icon className="size-3 text-primary shrink-0" />
            <span className="max-w-[180px] sm:max-w-xs truncate">{chip.label}</span>
            <button
              type="button"
              onClick={() => onClearFilter(chip.key)}
              aria-label={chip.ariaLabel}
              className="size-4 -mr-0.5 ml-0.5 rounded-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <X className="size-3" />
            </button>
          </div>
        );
      })}

      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={onResetAll}
        className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10 font-bold gap-1 cursor-pointer h-7 px-2.5 rounded-full"
      >
        <RotateCcw className="size-3" />
        مسح الكل
      </Button>
    </div>
  );
}
