"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogImage,
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
      <>
        <DialogImage src="/onboarding.png" alt="أهلاً بك في Orbit Hub" />

        <DialogHeader>
          <DialogTitle>أهلاً بك في Orbit Hub</DialogTitle>
          <DialogDescription>
            جمعنا لك كل ما تحتاجه لمسيرتك الدراسية في كلية الحاسبات وتقنية المعلومات — من مقررات وملازم صُممت لتنير طريقك وتختصر جهدك. كل خطوة تخطوها هنا تقربك خطوة نحو طموحك في عالم التقنية والبرمجة. ابدأ رحلتك بثقة وشغف، فالتميز حليفك!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => setStep(2)}
          >
            التالي
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onDismiss}
          >
            تخطي
          </Button>
        </DialogFooter>
      </>
    );
  }

  if (step === 2) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>حدد تخصصك ومستواك</DialogTitle>
          <DialogDescription>
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

        <DialogFooter>
          {initialStep === 1 ? (
            <>
              <Button
                type="button"
                onClick={() => isStep2Valid && setStep(3)}
                disabled={!isStep2Valid}
              >
                التالي
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
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
              >
                تأكيد
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
              >
                إلغاء
              </Button>
            </>
          )}
        </DialogFooter>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>نتمنى لك التوفيق والنجاح</DialogTitle>
        <DialogDescription>
          تم ضبط المنصة وفق تخصصك ومستواك الدراسي، ونتمنى لك مسيرة أكاديمية حافلة بالتميز والتفوق.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          type="button"
          onClick={handleSave}
        >
          ابدأ التصفح
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep(2)}
        >
          السابق
        </Button>
      </DialogFooter>
    </>
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
      <DialogContent>
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
