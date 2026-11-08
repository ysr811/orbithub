"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, SlidersHorizontal } from "lucide-react";
import PreferencesModal from "@/components/PreferencesModal";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "الجدول", href: "/schedule" },
  { name: "الملازم", href: "/materials" },
  { name: "المقالات", href: "/decs" },
  { name: "الهوية", href: "/brand" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  return (
    <header dir="rtl" className="relative z-50">
      <div className="relative h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/text-logo-hub.svg"
            alt="Orbit Logo"
            width={120}
            height={36}
            priority
            className="h-8 w-auto object-contain lg:block hidden"
          />
          <Image
            src="/logo/logo-hub.svg"
            alt="Orbit Logo"
            width={120}
            height={36}
            priority
            className="h-8 w-auto object-contain lg:hidden block"
          />
        </Link>

        {/* Navigation Links - Medium & Large Screens */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-cairo text-foreground/80">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsPreferencesOpen(true)}
            title="تحديد أو تغيير مستواك الدراسي"
            aria-label="تحديد أو تغيير مستواك الدراسي"
            className="text-muted-foreground hover:text-foreground rounded-xl"
          >
            <SlidersHorizontal className="size-4" />
          </Button>

          <Button className="hidden lg:flex" render={<Link href="/schedule" />} size="sm">
            فتح الجدول
          </Button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-md border-b border-border shadow-md py-3 px-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 rounded-md text-base font-medium font-cairo text-foreground/90 hover:text-primary hover:bg-muted/70 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* Quick Level & Semester Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onOpenChange={setIsPreferencesOpen}
        initialStep={2}
      />
    </header>
  );
}
