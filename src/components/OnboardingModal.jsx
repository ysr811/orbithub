"use client";

import React from "react";
import PreferencesModal from "@/components/PreferencesModal";

export default function OnboardingModal() {
  return <PreferencesModal autoCheckOnboarding={true} initialStep={1} />;
}
