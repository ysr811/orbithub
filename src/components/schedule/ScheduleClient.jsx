"use client";

import React, { useState, useEffect, useMemo } from "react";
import ScheduleWeeklyTable from "@/components/schedule/ScheduleWeeklyTable";
import ScheduleUpdatesSidebar from "@/components/schedule/ScheduleUpdatesSidebar";
import { getUserPreferences } from "@/lib/userPreferences";
import { cn } from "@/lib/utils";

export default function ScheduleClient({ initialData, allLevelsData = {} }) {
  const [selectedLevel, setSelectedLevel] = useState(initialData?.level || 2);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Synchronize level with user's saved preferences from localStorage
  useEffect(() => {
    const syncPrefs = () => {
      const prefs = getUserPreferences();
      if (prefs.level && Number(prefs.level) >= 1 && Number(prefs.level) <= 4) {
        setSelectedLevel(Number(prefs.level));
      }
    };

    syncPrefs();
    window.addEventListener("preferences_updated", syncPrefs);
    return () => window.removeEventListener("preferences_updated", syncPrefs);
  }, []);

  // Resolve current active level schedule data
  const currentSchedule = useMemo(() => {
    if (selectedLevel === initialData?.level) {
      return initialData.schedule || {};
    }
    return (
      allLevelsData?.[String(selectedLevel)]?.schedule ||
      initialData?.schedule ||
      {}
    );
  }, [selectedLevel, initialData, allLevelsData]);

  const updates = initialData?.updates || [];

  return (
    <div className="flex-1 w-full mt-2 sm:mt-4 font-cairo relative">
      {/* ─── Full-Width Schedule Container (Pushed left when sidebar opens) ─── */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          isSidebarOpen && "lg:pr-84 sm:lg:pr-92"
        )}
      >
        <ScheduleWeeklyTable
          schedule={currentSchedule}
          updates={updates}
        />
      </div>

      {/* ─── Sliding Side Pull-Tab & Drawer ─────────────────────────── */}
      <ScheduleUpdatesSidebar
        updates={updates}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
