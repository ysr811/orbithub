import {
  X,
  RotateCcw,
  Search,
  Layers,
  Calendar,
  BookText,
  GraduationCap,
  School,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  abbreviateSubject,
  getMajorLabel,
  getShortLevelLabel,
  getShortSemesterLabel,
} from "@/lib/academics";

export default function MaterialActiveChips({
  filters,
  searchQuery,
  onClearFilter,
  onResetAll,
  savedPreferences = { major: "", level: "", semester: "" },
}) {
  const chips = [];

  if (filters?.major && !savedPreferences?.major) {
    chips.push({
      id: "major",
      key: "major",
      icon: School,
      label: getMajorLabel(filters.major),
      ariaLabel: "إزالة فلتر التخصص",
    });
  }

  if (filters?.level && !savedPreferences?.level) {
    chips.push({
      id: "level",
      key: "level",
      icon: Layers,
      label: getShortLevelLabel(filters.level),
      ariaLabel: `إزالة فلتر المستوى ${filters.level}`,
    });
  }

  if (filters?.semester && !savedPreferences?.semester) {
    chips.push({
      id: "semester",
      key: "semester",
      icon: Calendar,
      label: getShortSemesterLabel(filters.semester),
      ariaLabel: `إزالة فلتر الترم ${filters.semester}`,
    });
  }

  if (filters?.subject) {
    chips.push({
      id: "subject",
      key: "subject",
      icon: BookText,
      label: abbreviateSubject(filters.subject),
      title: filters.subject,
      ariaLabel: `إزالة فلتر المادة ${filters.subject}`,
    });
  }

  if (filters?.instructor) {
    chips.push({
      id: "instructor",
      key: "instructor",
      icon: GraduationCap,
      label: filters.instructor,
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
          <Badge
            key={chip.id}
            variant="secondary"
            size="lg"
          >
            <Icon className="size-3 text-primary shrink-0" />
            <span className="max-w-45 sm:max-w-xs truncate" title={chip.title}>
              {chip.label}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onClearFilter(chip.key)}
              aria-label={chip.ariaLabel}
              className="relative size-4 md:size-4 -mr-0.5 ml-0.5 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-muted after:absolute after:-inset-2 after:content-['']"
            >
              <X className="size-3" />
            </Button>
          </Badge>
        );
      })}

      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={onResetAll}
        className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10 font-bold gap-1 h-7 md:h-7 px-2.5 rounded-full"
      >
        <RotateCcw className="size-3" />
        مسح الكل
      </Button>
    </div>
  );
}
