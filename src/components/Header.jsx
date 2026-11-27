"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconSelect } from "@/components/ui/select";
import { Menu, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PreferencesModal from "@/components/PreferencesModal";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "الملازم", href: "/materials" },
  { name: "المقالات", href: "/decs" },
  { name: "من نحن", href: "/decs/about-us" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isBetaBannerVisible, setIsBetaBannerVisible] = useState(true);
  const [scrollState, setScrollState] = useState({
    visible: true,
    scrolled: false,
    path: pathname,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(0, window.scrollY);
        const deltaY = currentScrollY - lastScrollY;

        setScrollState((prev) => {
          const samePath = prev.path === pathname;
          if (currentScrollY <= 20) {
            if (samePath && prev.visible && !prev.scrolled) return prev;
            return { visible: true, scrolled: false, path: pathname };
          }

          let nextVisible = samePath ? prev.visible : true;
          if (deltaY > 6 && currentScrollY > 80) {
            nextVisible = false;
          } else if (deltaY < -6) {
            nextVisible = true;
          }

          if (samePath && prev.visible === nextVisible && prev.scrolled) {
            return prev;
          }
          return { visible: nextVisible, scrolled: true, path: pathname };
        });

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isCurrentPath = scrollState.path === pathname;
  const isScrolled = isCurrentPath ? scrollState.scrolled : false;
  const isVisible =
    isPreferencesOpen || (isCurrentPath ? scrollState.visible : true);

  const activeHref =
    navLinks.find((link) => pathname === link.href)?.href ??
    navLinks.find(
      (link) => link.href !== "/" && pathname?.startsWith(link.href)
    )?.href ??
    "";

  return (
    <>
      {pathname === "/" && isBetaBannerVisible && (
        <div
          dir="rtl"
          className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-12 py-2 bg-primary text-primary-foreground flex items-center justify-center text-center text-xs sm:text-sm font-medium gap-4"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsBetaBannerVisible(false)}
            aria-label="إغلاق الإشعار"
            className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
            <X />
          </Button>
          <span>المنصة قيد التطوير ولم تُطلق رسمياً بعد.</span>
        </div>
      )}
      <header
      dir="rtl"
      className={cn(
        "sticky top-0 z-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out bg-background",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "border-b border-border/50 shadow-2xs"
          : "border-b border-transparent shadow-none"
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
            loading="eager"
            className="h-8 w-auto object-contain lg:block hidden"
          />
          <Image
            src="/logo/logo-hub.svg"
            alt="Orbit Logo"
            width={120}
            height={36}
            loading="eager"
            className="h-8 w-auto object-contain lg:hidden block"
          />
        </Link>

        {/* Navigation Links - Medium & Large Screens */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-cairo">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;
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
            variant="ghost"
            size="icon"
            onClick={() => setIsPreferencesOpen(true)}
            title="تحديد أو تغيير مستواك الدراسي"
            aria-label="تحديد أو تغيير مستواك الدراسي"
          >
            <SlidersHorizontal strokeWidth={2} />
          </Button>

          <Button className="hidden lg:flex" render={<Link href="/materials" />} size="sm">
            تصفح الملازم
          </Button>

          {/* Mobile Native OS Navigation (Leverages OS-native Picker / Action Sheet) */}
          <IconSelect
          variant=""
            className="md:hidden"
            aria-label="قائمة التنقل السريع"
            value={activeHref}
            placeholder="الانتقال إلى..."
            options={navLinks.map((link) => ({
              value: link.href,
              label: link.name,
            }))}
            onValueChange={(targetPath) => {
              if (targetPath && targetPath !== pathname) {
                router.push(targetPath);
              }
            }}
            icon={<Menu strokeWidth={2} />}
          />
        </div>
      </div>

      {/* Quick Level & Semester Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onOpenChange={setIsPreferencesOpen}
        initialStep={2}
      />
      </header>
    </>
  );
}
