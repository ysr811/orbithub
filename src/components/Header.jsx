"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "الجدول", href: "/schedule" },
  { name: "الملازم", href: "/materials" },
  { name: "الهوية", href: "/brand" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header dir="rtl" className="relative z-50 select-none" data-lenis-prevent>
      <div className="relative h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* الشعار */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/text-logo-hub-dark.svg"
            alt="Orbit Logo"
            width={120}
            height={36}
            priority
            className="h-8 w-auto object-contain lg:block hidden"
          />
          <Image
            src="/logo/logo-dark.svg"
            alt="Orbit Logo"
            width={120}
            height={36}
            priority
            className="h-8 w-auto object-contain lg:hidden block"
          />
        </Link>

        {/* روابط التنقل - للشاشات المتوسطة والكبيرة */}
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

        {/* الإجراءات: زر CTA + زر القائمة للجوال */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button render={<Link href="/schedule" />} size="sm">
            فتح الجدول
          </Button>

          {/* زر القائمة للشاشات الصغيرة */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden size-10 flex items-center justify-center rounded-md hover:bg-muted active:bg-muted text-foreground transition-colors cursor-pointer touch-manipulation [&_svg]:pointer-events-none"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {isOpen && (
        <div
          data-lenis-prevent
          className="md:hidden absolute top-full inset-x-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-xl py-3 px-3 flex flex-col gap-1.5"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-md text-base font-medium font-cairo text-foreground hover:text-primary hover:bg-muted active:bg-muted/80 transition-colors touch-manipulation"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
