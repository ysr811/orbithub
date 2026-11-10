"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import PreferencesModal from "@/components/PreferencesModal";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "الجدول", href: "/schedule" },
  { name: "الملازم", href: "/materials" },
  { name: "المقالات", href: "/decs" },
  { name: "الهوية", href: "/brand" },
];

export default function Header() {
  const pathname = usePathname();
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
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-cairo">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors font-medium hover:text-primary",
                  isActive ? "text-primary font-bold" : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsPreferencesOpen(true)}
            title="تحديد أو تغيير مستواك الدراسي"
            aria-label="تحديد أو تغيير مستواك الدراسي"
            className="size-12 md:size-9 rounded-2xl md:rounded-xl border-border/80 text-foreground/90 hover:text-foreground bg-white hover:bg-muted shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <SlidersHorizontal className="size-6 md:size-4" strokeWidth={2} />
          </Button>

          <Button className="hidden lg:flex" render={<Link href="/schedule" />} size="sm">
            فتح الجدول
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden size-12 sm:size-11 rounded-2xl sm:rounded-xl border-border/80 text-foreground/90 hover:text-foreground bg-white hover:bg-muted shadow-xs cursor-pointer active:scale-95 transition-all"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? (
              <X className="size-6.5 sm:size-6" strokeWidth={2.2} />
            ) : (
              <Menu className="size-6.5 sm:size-6" strokeWidth={2.2} />
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full inset-x-0 mt-2 p-2 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-md shadow-lg shadow-black/5 flex flex-col gap-1 z-50">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-between",
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted/70"
                )}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
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
