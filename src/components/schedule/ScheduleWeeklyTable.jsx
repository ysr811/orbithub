"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = [
  { id: "sunday", name: "الأحد", dayNumber: 0 },
  { id: "monday", name: "الإثنين", dayNumber: 1 },
  { id: "tuesday", name: "الثلاثاء", dayNumber: 2 },
  { id: "wednesday", name: "الأربعاء", dayNumber: 3 },
  { id: "thursday", name: "الخميس", dayNumber: 4 },
];

const PERIODS = [
  { id: "8-10", label: "08:00 - 10:00" },
  { id: "10-12", label: "10:00 - 12:00" },
  { id: "12-2", label: "12:00 - 02:00" },
];

function getUpdateTagStyle(type) {
  const clean = String(type || "").toLowerCase();
  if (clean.includes("good") || clean.includes("جيد") || clean.includes("تمديد")) {
    return {
      wrap: "text-emerald-800 dark:text-emerald-300 bg-emerald-500/10",
      dot: "bg-emerald-500",
    };
  }
  if (clean.includes("info") || clean.includes("معلومة") || clean.includes("حضور")) {
    return {
      wrap: "text-sky-800 dark:text-sky-300 bg-sky-500/10",
      dot: "bg-sky-500",
    };
  }
  if (clean.includes("warning") || clean.includes("تحذير") || clean.includes("تسليم")) {
    return {
      wrap: "text-amber-800 dark:text-amber-300 bg-amber-500/10",
      dot: "bg-amber-500",
    };
  }
  return {
    wrap: "text-rose-800 dark:text-rose-300 bg-rose-500/10",
    dot: "bg-rose-500",
  };
}

export default function ScheduleWeeklyTable({ schedule = {}, updates = [] }) {
  // Determine current day (0=Sunday ... 4=Thursday; 5/6 weekend defaults to Sunday)
  const todayDayId = useMemo(() => {
    const day = new Date().getDay();
    const match = DAYS.find((d) => d.dayNumber === day);
    return match ? match.id : "sunday";
  }, []);

  const [mobileSelectedDay, setMobileSelectedDay] = useState(todayDayId);

  return (
    <div className="w-full flex flex-col gap-4 font-cairo">
      {/* ─── 1. Desktop & Tablet shadcn Table View (md+) ─────────────── */}
      <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xs">
        <Table className="text-right">
          <TableHeader className="bg-muted/40">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-28 text-center text-foreground font-bold border-l border-border/80">
                اليوم
              </TableHead>
              {PERIODS.map((p) => (
                <TableHead
                  key={p.id}
                  className="text-center text-foreground font-bold border-l border-border/80 last:border-l-0"
                >
                  <span className="font-bold text-xs sm:text-sm text-foreground" dir="ltr">
                    {p.label}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <tbody className="divide-y divide-border/60">
            {DAYS.map((day) => {
              const daySchedule = schedule[day.id] || {};
              const isToday = todayDayId === day.id;

              return (
                <TableRow
                  key={day.id}
                  className={cn(
                    "hover:bg-muted/15 transition-colors border-b border-border/60 last:border-b-0",
                    isToday && "bg-primary/[0.02]"
                  )}
                >
                  {/* Day Column */}
                  <TableCell className="py-4 px-3 text-center font-bold text-foreground border-l border-border/80 bg-muted/10 align-middle">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className={cn(isToday && "text-primary font-black")}>
                        {day.name}
                      </span>
                      {isToday && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          اليوم
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Period Columns */}
                  {PERIODS.map((period) => {
                    const sessions = daySchedule[period.id] || [];

                    return (
                      <TableCell
                        key={period.id}
                        className="p-3 border-l border-border/60 last:border-l-0 align-top min-w-[200px]"
                      >
                        {sessions.length === 0 ? (
                          <div className="h-full min-h-[56px] flex items-center justify-center text-xs text-muted-foreground/30 font-medium select-none">
                            —
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {sessions.map((session, idx) => {
                              const matchingUpdates = updates.filter((u) => {
                                const dayMatch = !u.day || u.day.toLowerCase() === day.id;
                                const periodMatch = !u.period || u.period === period.id;
                                const subjectMatch =
                                  !u.subject ||
                                  session.subject.toLowerCase().includes(u.subject.toLowerCase()) ||
                                  u.subject.toLowerCase().includes(session.subject.toLowerCase());
                                return dayMatch && periodMatch && subjectMatch;
                              });

                              return (
                                <div
                                  key={idx}
                                  className={cn(
                                    "flex flex-col gap-1 text-xs",
                                    sessions.length > 1 && idx > 0 && "pt-2 border-t border-border/50"
                                  )}
                                >
                                  {/* Subject Title & Group */}
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="font-bold text-foreground leading-snug">
                                      {session.subject}
                                    </span>
                                    {session.group && session.group !== "ALL" && (
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] px-1.5 py-0 h-4.5 border-primary/20 text-primary bg-primary/5 font-bold"
                                      >
                                        فئة {session.group}
                                      </Badge>
                                    )}
                                  </div>

                                  {/* Hall & Instructor: Stacked Vertically */}
                                  <div className="flex flex-col text-[11px] leading-tight">
                                    <span className="font-semibold text-foreground/85">
                                      {session.hall || "غير محدد"}
                                    </span>
                                    <span className="text-muted-foreground mt-0.5 truncate">
                                      {session.instructor}
                                    </span>
                                  </div>

                                  {/* Inline Semantic Update Tag */}
                                  {matchingUpdates.length > 0 && (() => {
                                    const tagStyle = getUpdateTagStyle(matchingUpdates[0].type);
                                    return (
                                      <div
                                        className={cn(
                                          "flex items-center gap-1.5 text-[10px] font-bold rounded px-1.5 py-0.5 mt-0.5 w-fit",
                                          tagStyle.wrap
                                        )}
                                      >
                                        <span
                                          className={cn("size-1.5 rounded-full shrink-0", tagStyle.dot)}
                                        />
                                        <span className="truncate">
                                          {matchingUpdates[0].title || "تنبيه"}
                                        </span>
                                      </div>
                                    );
                                  })()}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* ─── 2. Mobile Native Experience (< md) ───────────────────────── */}
      <div className="md:hidden flex flex-col gap-3.5 w-full">
        {/* Day Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {DAYS.map((day) => {
            const isSelected = mobileSelectedDay === day.id;
            const isToday = todayDayId === day.id;

            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setMobileSelectedDay(day.id)}
                className={cn(
                  "h-10 px-4 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs font-black"
                    : "bg-muted/30 text-muted-foreground hover:text-foreground border border-border/60"
                )}
              >
                <span>{day.name}</span>
                {isToday && (
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      isSelected ? "bg-white" : "bg-primary"
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Classes (Stacked Cards) */}
        {(() => {
          const daySchedule = schedule[mobileSelectedDay] || {};
          const daySessions = [];
          PERIODS.forEach((period) => {
            const sessions = daySchedule[period.id] || [];
            sessions.forEach((s) => {
              daySessions.push({
                periodTime: period.label,
                periodId: period.id,
                ...s,
              });
            });
          });

          if (daySessions.length === 0) {
            return (
              <div className="py-12 rounded-2xl border border-dashed border-border/60 text-center flex flex-col items-center justify-center text-muted-foreground/60 text-xs gap-2">
                <Calendar className="size-6 text-muted-foreground/40" />
                <span>لا توجد محاضرات مجدولة لهذا اليوم.</span>
              </div>
            );
          }

          return (
            <div className="flex flex-col gap-2.5">
              {daySessions.map((session, idx) => {
                const matchingUpdates = updates.filter((u) => {
                  const dayMatch =
                    !u.day || u.day.toLowerCase() === mobileSelectedDay;
                  const periodMatch =
                    !u.period || u.period === session.periodId;
                  const subjectMatch =
                    !u.subject ||
                    session.subject
                      .toLowerCase()
                      .includes(u.subject.toLowerCase()) ||
                    u.subject
                      .toLowerCase()
                      .includes(session.subject.toLowerCase());
                  return dayMatch && periodMatch && subjectMatch;
                });

                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-2 shadow-2xs"
                  >
                    {/* Time & Group */}
                    <div className="flex items-center justify-between text-xs">
                      <div
                        className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-muted text-foreground"
                        dir="ltr"
                      >
                        {session.periodTime}
                      </div>

                      {session.group && session.group !== "ALL" && (
                        <Badge
                          variant="outline"
                          className="text-xs font-bold px-2 py-0.5 border-primary/20 text-primary"
                        >
                          فئة {session.group}
                        </Badge>
                      )}
                    </div>

                    {/* Subject */}
                    <h4 className="font-bold text-sm text-foreground leading-snug">
                      {session.subject}
                    </h4>

                    {/* Hall & Instructor: Stacked Vertically */}
                    <div className="flex flex-col text-xs pt-1 leading-tight gap-0.5">
                      <span className="font-semibold text-foreground/85">
                        القاعة: {session.hall || "غير محدد"}
                      </span>
                      <span className="text-muted-foreground">
                        المحاضر: {session.instructor}
                      </span>
                    </div>

                    {/* Quiz / Semantic Alert */}
                    {matchingUpdates.length > 0 && (() => {
                      const tagStyle = getUpdateTagStyle(matchingUpdates[0].type);
                      return (
                        <div
                          className={cn(
                            "mt-1.5 pt-2 border-t border-border/40 flex items-center gap-1.5 text-xs font-bold rounded p-1.5",
                            tagStyle.wrap
                          )}
                        >
                          <span className={cn("size-2 rounded-full shrink-0", tagStyle.dot)} />
                          <span>{matchingUpdates[0].title || "تنبيه"}</span>
                          {matchingUpdates[0].description && (
                            <span className="font-normal text-muted-foreground truncate">
                              - {matchingUpdates[0].description}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
