"use client";

import React from "react";
import {
  Search,
Funnel,
  X,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MaterialFilterBar({
  searchQuery,
  setSearchQuery,
  onOpenDrawer,
  activeFilterCount = 0,
  isSearching = false,
  className = "",
}) {
  return (
    <div className={`w-full sm:max-w-md md:max-w-lg font-cairo ${className}`}>
      {/* ─── Minimalist Search Bar & Filter Action ─────────────────────── */}
      <div className="flex items-center gap-2.5 w-full">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="ابحث باسم الملزمة، المادة، أو الأستاذ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 pr-10 pl-12 sm:pl-16 rounded-xl border-border bg-card text-foreground text-xs sm:text-sm focus-visible:ring-1 focus-visible:ring-primary transition-colors"
          />

          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isSearching && (
              <Loader2 className="size-4 text-primary animate-spin" />
            )}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="مسح نص البحث"
                className="size-7 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Trigger Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onOpenDrawer}
          className="h-11 px-3.5 sm:px-4 gap-2 font-semibold rounded-xl border-border bg-card hover:bg-muted text-foreground cursor-pointer shrink-0 transition-colors"
          aria-label="فتح خيارات التصفية"
        >
          <Funnel className="size-4 text-primary"/>
          {/* <SlidersHorizontal  /> */}
          <span className="font-cairo text-xs sm:text-sm hidden lg:block">فلتر</span>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-primary text-white text-[11px] font-bold size-5 mr-0.5">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
