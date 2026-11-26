"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select";
import {
  MAJOR_OPTIONS,
  LEVEL_OPTIONS,
  SEMESTER_OPTIONS,
} from "@/lib/academics";
import {
  isOnboardingCompleted,
  setOnboardingCompleted,
  getUserPreferences,
  setUserPreferences,
} from "@/lib/userPreferences";

const DISMISSED_SESSION_KEY = "onboarding_dismissed";
const subscribeNoop = () => () => {};

function isDismissedInSession() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(DISMISSED_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markDismissedInSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(DISMISSED_SESSION_KEY, "true");
  } catch {
    // Ignore storage errors in strict privacy browsers
  }
}

function PreferencesModalBody({ initialStep, onClose, onDismiss }) {
  const initialPrefs = getUserPreferences();
  const [step, setStep] = useState(initialStep);
  const [major, setMajor] = useState(initialPrefs.major);
  const [level, setLevel] = useState(initialPrefs.level);
  const [semester, setSemester] = useState(initialPrefs.semester);

  const isStep2Valid = Boolean(major && level && semester);

  const handleSave = () => {
    if (!isStep2Valid) return;
    setUserPreferences({ major, level, semester });
    setOnboardingCompleted(true);
    onClose();
  };

  if (step === 1) {
    return (
      <div className="flex flex-col">
        <div className="relative w-full aspect-[900/353] bg-muted rounded-t-3xl overflow-hidden border-b border-border/50">
          <Image
            src="/onboarding.png"
            alt="أهلاً بك في Orbit Hub"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8 md:p-9 gap-5 sm:gap-6">
          <DialogHeader className="gap-2 text-right">
            <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
              أهلاً بك في Orbit Hub
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
              جمعنا لك كل ما تحتاجه لمسيرتك الدراسية في كلية الحاسبات وتقنية المعلومات — من مقررات وملازم صُممت لتنير طريقك وتختصر جهدك. كل خطوة تخطوها هنا تقربك خطوة نحو طموحك في عالم التقنية والبرمجة. ابدأ رحلتك بثقة وشغف، فالتميز حليفك!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-row items-center justify-between sm:justify-between pt-5">
            <Button
              type="button"
              onClick={() => setStep(2)}
              size="sm"
              className="h-9 px-6 font-bold text-xs sm:text-sm"
            >
              التالي
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              تخطي
            </Button>
          </DialogFooter>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
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

        <DialogFooter className="flex-row items-center justify-between sm:justify-between pt-5">
          {initialStep === 1 ? (
            <>
              <Button
                type="button"
                onClick={() => isStep2Valid && setStep(3)}
                disabled={!isStep2Valid}
                size="sm"
                className="h-9 px-6 font-bold text-xs sm:text-sm disabled:cursor-not-allowed"
              >
                التالي
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground"
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
                className="h-9 px-6 font-bold text-xs sm:text-sm disabled:cursor-not-allowed"
              >
                تأكيد
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground"
              >
                إلغاء
              </Button>
            </>
          )}
        </DialogFooter>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 sm:p-8 md:p-9 gap-5 sm:gap-6">
      <DialogHeader className="gap-2 text-right">
        <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
          نتمنى لك التوفيق والنجاح
        </DialogTitle>
        <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
          تم ضبط المنصة وفق تخصصك ومستواك الدراسي، ونتمنى لك مسيرة أكاديمية حافلة بالتميز والتفوق.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex-row items-center justify-between sm:justify-between pt-5">
        <Button
          type="button"
          onClick={handleSave}
          size="sm"
          className="h-9 px-6 font-bold text-xs sm:text-sm"
        >
          ابدأ التصفح
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setStep(2)}
          className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground"
        >
          السابق
        </Button>
      </DialogFooter>
    </div>
  );
}

export default function PreferencesModal({
  isOpen: controlledIsOpen,
  onOpenChange: setControlledIsOpen,
  initialStep = 1,
  autoCheckOnboarding = false,
}) {
  const isControlled = controlledIsOpen !== undefined;
  const shouldAutoOpen = useSyncExternalStore(
    subscribeNoop,
    () =>
      autoCheckOnboarding &&
      !isOnboardingCompleted() &&
      !isDismissedInSession(),
    () => false
  );
  const [dismissedLocally, setDismissedLocally] = useState(false);

  const isOpen = isControlled
    ? controlledIsOpen
    : Boolean(shouldAutoOpen && !dismissedLocally);

  const handleClose = () => {
    if (isControlled) {
      setControlledIsOpen(false);
    } else {
      setDismissedLocally(true);
    }
  };

  const handleOpenChange = (open) => {
    if (!open && autoCheckOnboarding) {
      markDismissedInSession();
    }
    if (isControlled) {
      setControlledIsOpen(open);
    } else {
      setDismissedLocally(!open);
    }
  };

  const handleDismiss = () => {
    if (autoCheckOnboarding) {
      markDismissedInSession();
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-3rem)] sm:w-full sm:max-w-xl md:max-w-2xl p-0 bg-white border-none shadow-none rounded-3xl font-cairo">
        {isOpen && (
          <PreferencesModalBody
            initialStep={initialStep}
            onClose={handleClose}
            onDismiss={handleDismiss}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
