"use client";

import { Search, Funnel, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MaterialFilterBar({
  searchQuery,
  setSearchQuery,
  onOpenDrawer,
  isSearching = false,
}) {
  return (
    <div className="w-full sm:max-w-md md:max-w-lg font-cairo">
      <div className="flex items-center gap-2.5 w-full">
        <div className="flex-1 min-w-0">
          <Input
            type="text"
            placeholder="ابحث باسم الملزمة، المادة، أو الأستاذ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startIcon={Search}
            endIcon={
              isSearching ? (
                <Loader2 className="size-4 text-primary animate-spin" />
              ) : null
            }
            onClear={() => setSearchQuery("")}
            clearLabel="مسح نص البحث"
            className="h-11 md:h-11 ps-10 pe-16 rounded-xl border-border bg-card text-foreground text-xs sm:text-sm focus-visible:ring-1 focus-visible:ring-primary transition-colors shadow-none"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={onOpenDrawer}
          className="h-11 md:h-11 px-3.5 sm:px-4 gap-2 shrink-0"
          aria-label="فتح خيارات التصفية"
        >
          <Funnel className="size-4 text-primary" />
          <span className="font-cairo text-xs sm:text-sm">فلتر</span>
        </Button>
      </div>
    </div>
  );
}
