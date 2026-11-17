"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, SlidersHorizontal } from "lucide-react";
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
  const router = useRouter();
  const pathname = usePathname();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          const deltaY = currentScrollY - lastScrollY;

          // Always visible and transparent at the very top of the page
          if (currentScrollY <= 20) {
            setIsVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);

            // Hide when scrolling downwards with intent
            if (deltaY > 6 && currentScrollY > 80) {
              setIsVisible(false);
            }
            // Show immediately when scrolling upwards with intent / acceleration
            else if (deltaY < -6) {
              setIsVisible(true);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset header visibility on route change
  useEffect(() => {
    setIsVisible(true);
    setIsScrolled(false);
  }, [pathname]);

  // Keep header visible while preferences modal is active
  useEffect(() => {
    if (isPreferencesOpen) {
      setIsVisible(true);
    }
  }, [isPreferencesOpen]);

  return (
    <header
      dir="rtl"
      className={cn(
        "sticky top-0 z-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/50 shadow-2xs"
          : "bg-transparent border-b border-transparent shadow-none"
      )}
    >
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

          {/* Mobile Native OS Navigation (Leverages OS-native Picker / Action Sheet) */}
          <div className="relative md:hidden size-12 sm:size-11">
            <div
              className="size-12 sm:size-11 rounded-2xl sm:rounded-xl border border-border/80 text-foreground/90 bg-white hover:bg-muted shadow-xs flex items-center justify-center cursor-pointer active:scale-95 transition-all pointer-events-none"
              aria-hidden="true"
            >
              <Menu className="size-6.5 sm:size-6" strokeWidth={2.2} />
            </div>

            <select
              aria-label="قائمة التنقل السريع"
              value={navLinks.some((l) => l.href === pathname) ? pathname : ""}
              onChange={(e) => {
                const targetPath = e.target.value;
                if (targetPath && targetPath !== pathname) {
                  router.push(targetPath);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-10 text-base"
            >
              <option value="" disabled hidden>
                الانتقال إلى...
              </option>
              {navLinks.map((link) => (
                <option key={link.href} value={link.href}>
                  {link.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Level & Semester Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onOpenChange={setIsPreferencesOpen}
        initialStep={2}
      />
    </header>
  );
}
