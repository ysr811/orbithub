"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select";
import {
  isOnboardingCompleted,
  setOnboardingCompleted,
  getUserPreferences,
  setUserPreferences,
  resetUserPreferences,
} from "@/lib/userPreferences";

const MAJOR_OPTIONS = [
  { value: "cs", label: "علوم الحاسوب (CS)" },
  { value: "it", label: "تقنية المعلومات (IT)" },
];

const LEVEL_OPTIONS = [
  { value: "1", label: "المستوى الأول" },
  { value: "2", label: "المستوى الثاني" },
  { value: "3", label: "المستوى الثالث" },
  { value: "4", label: "المستوى الرابع" },
];

const SEMESTER_OPTIONS = [
  { value: "1", label: "الترم الأول" },
  { value: "2", label: "الترم الثاني" },
];

export default function PreferencesModal({
  isOpen: controlledIsOpen,
  onOpenChange: setControlledIsOpen,
  initialStep = 1,
  autoCheckOnboarding = false,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [step, setStep] = useState(initialStep);
  const [major, setMajor] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? setControlledIsOpen : setInternalIsOpen;

  useEffect(() => {
    // Expose reset helper in browser console: window.resetOnboarding()
    if (typeof window !== "undefined") {
      window.resetOnboarding = () => {
        resetUserPreferences();
        sessionStorage.removeItem("onboarding_dismissed");
        window.location.reload();
      };
    }

    if (autoCheckOnboarding) {
      const isDismissedThisSession =
        typeof window !== "undefined" &&
        sessionStorage.getItem("onboarding_dismissed") === "true";

      if (!isOnboardingCompleted() && !isDismissedThisSession) {
        const saved = getUserPreferences();
        if (saved.major) setMajor(saved.major);
        if (saved.level) setLevel(saved.level);
        if (saved.semester) setSemester(saved.semester);
        setStep(1);
        setIsOpen(true);
      }
    }
  }, [autoCheckOnboarding, setIsOpen]);

  // When opened via external trigger (e.g. settings button in Header), load current preferences & set step
  useEffect(() => {
    if (isOpen) {
      const saved = getUserPreferences();
      setMajor(saved.major || "");
      setLevel(saved.level || "");
      setSemester(saved.semester || "");
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  const handleDismiss = () => {
    if (autoCheckOnboarding && typeof window !== "undefined") {
      sessionStorage.setItem("onboarding_dismissed", "true");
    }
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    if (!open && autoCheckOnboarding && typeof window !== "undefined") {
      sessionStorage.setItem("onboarding_dismissed", "true");
    }
    setIsOpen(open);
  };

  const handleSave = () => {
    if (!major || !level || !semester) return;
    setUserPreferences({ major, level, semester });
    setOnboardingCompleted(true);
    setIsOpen(false);
  };

  const isStep2Valid = Boolean(major && level && semester);

  const handleNextFromStep2 = () => {
    if (!isStep2Valid) return;
    setStep(3);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-3rem)] sm:w-full sm:max-w-xl md:max-w-2xl p-0 overflow-hidden bg-white border-none shadow-none rounded-3xl font-cairo">
        {step === 1 && (
          /* ─── Step 1: Welcome & Overview (First-time onboarding only) ──── */
          <div className="flex flex-col">
            {/* Full-Bleed Top Banner Graphic (zero padding/margin) */}
            <div className="relative w-full aspect-[900/353] bg-muted overflow-hidden border-b border-border/50">
              <Image
                src="/onboarding.png"
                alt="أهلاً بك في Orbit Hub"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>

            {/* Padded Content Body */}
            <div className="flex flex-col p-6 sm:p-8 md:p-9 gap-5 sm:gap-6">
              <DialogHeader className="gap-2 text-right">
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                  أهلاً بك في Orbit Hub
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                  جمعنا لك كل ما تحتاجه لمسيرتك الدراسية في كلية الحاسبات وتقنية المعلومات — من مقررات، ملازم، وجداول صُممت لتنير طريقك وتختصر جهدك. كل خطوة تخطوها هنا تقربك خطوة نحو طموحك في عالم التقنية والبرمجة. ابدأ رحلتك بثقة وشغف، فالتميز حليفك!
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-between pt-5 border-t border-border/50">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  size="sm"
                  className="h-9 px-6 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  التالي
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  تخطي
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          /* ─── Step 2: Choose Major, Level & Semester ─────────────────── */
          <div className="flex flex-col p-6 sm:p-8 md:p-9 gap-5 sm:gap-6">
            <DialogHeader className="gap-2 text-right">
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                حدد تخصصك ومستواك
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                اختر تخصصك الأكاديمي ومستواك الدراسي والترم لتخصيص المنصة وتجهيز مقرراتك تلقائياً.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 sm:gap-5 py-1">
              <SelectField
                label="التخصص الأكاديمي"
                value={major}
                onChange={setMajor}
                placeholder="اختر التخصص الأكاديمي"
                options={MAJOR_OPTIONS}
              />

              <SelectField
                label="المستوى الدراسي"
                value={level}
                onChange={setLevel}
                placeholder="اختر المستوى الدراسي"
                options={LEVEL_OPTIONS}
              />

              <SelectField
                label="الترم الدراسي"
                value={semester}
                onChange={setSemester}
                placeholder="اختر الترم الدراسي"
                options={SEMESTER_OPTIONS}
              />
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-border/50">
              {initialStep === 1 ? (
                <>
                  <Button
                    type="button"
                    onClick={handleNextFromStep2}
                    disabled={!isStep2Valid}
                    size="sm"
                    className="h-9 px-6 font-bold text-xs sm:text-sm cursor-pointer disabled:cursor-not-allowed"
                  >
                    التالي
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    السابق
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={!isStep2Valid}
                    size="sm"
                    className="h-9 px-6 font-bold text-xs sm:text-sm cursor-pointer disabled:cursor-not-allowed"
                  >
                    تأكيد
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    إلغاء
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          /* ─── Step 3: Encouragement & Ambition (Wishes of Success) ──── */
          <div className="flex flex-col p-6 sm:p-8 md:p-9 gap-5 sm:gap-6">
            <DialogHeader className="gap-2 text-right">
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                نتمنى لك التوفيق والنجاح
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                تم ضبط المنصة وفق تخصصك ومستواك الدراسي، ونتمنى لك مسيرة أكاديمية حافلة بالتميز والتفوق.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-between pt-5 border-t border-border/50">
              <Button
                type="button"
                onClick={handleSave}
                size="sm"
                className="h-9 px-6 font-bold text-xs sm:text-sm cursor-pointer"
              >
                ابدأ التصفح
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep(2)}
                className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                السابق
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
