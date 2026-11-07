import React from "react";
import { Sparkles, Users, FolderTree, BookOpen, Layers, ShieldCheck } from "lucide-react";

export default function ArticleBanner({ slug }) {
  if (slug === "how-it-works") {
    return (
      <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-3xl overflow-hidden border border-border/80 bg-gradient-to-br from-[#0E0F28] via-[#16183D] to-[#26273E] p-6 sm:p-8 flex flex-col justify-between text-white shadow-md font-cairo select-none">
        {/* Background Decorative Rings & Ambient Glow */}
        <div className="absolute -top-16 -left-16 size-72 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 size-72 rounded-full bg-[#7A89EA]/20 blur-3xl pointer-events-none" />

        {/* Orbit Rings Graphic */}
        <svg
          className="absolute left-6 top-1/2 -translate-y-1/2 h-full w-auto opacity-20 pointer-events-none hidden sm:block"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="2" />
          <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="155" cy="100" r="6" fill="#7A89EA" />
          <circle cx="45" cy="100" r="4" fill="#2A3EF4" />
        </svg>

        {/* Top Tag Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-xs">
            <Sparkles className="size-3 text-[#7A89EA]" />
            <span>نظام Orbit Hub الأكاديمي</span>
          </span>

          <span className="text-[11px] font-medium text-white/60 hidden sm:inline">
            قسم علوم الحاسوب • جامعة حضرموت
          </span>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 flex flex-col gap-1.5 max-w-xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            كيف تعمل منصة Orbit Hub؟
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
            بوابتك الأكاديمية الذكية للوصول إلى كافة الملازم والجداول والمحتوى التعليمي المنظم في مكان واحد.
          </p>
        </div>
      </div>
    );
  }

  if (slug === "delegates-guide") {
    return (
      <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-3xl overflow-hidden border border-border/80 bg-gradient-to-br from-[#0E0F28] via-[#1E1938] to-[#2B1B47] p-6 sm:p-8 flex flex-col justify-between text-white shadow-md font-cairo select-none">
        {/* Background Ambient Glow */}
        <div className="absolute -top-16 -left-16 size-72 rounded-full bg-purple-500/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 size-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Network Nodes Graphic */}
        <svg
          className="absolute left-6 top-1/2 -translate-y-1/2 h-full w-auto opacity-20 pointer-events-none hidden sm:block"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="60" y1="60" x2="140" y2="80" stroke="white" strokeWidth="1.5" />
          <line x1="140" y1="80" x2="100" y2="150" stroke="white" strokeWidth="1.5" />
          <line x1="100" y1="150" x2="60" y2="60" stroke="white" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="10" fill="#9333EA" />
          <circle cx="140" cy="80" r="12" fill="#2A3EF4" />
          <circle cx="100" cy="150" r="9" fill="#7A89EA" />
        </svg>

        {/* Top Tag Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-xs">
            <Users className="size-3 text-purple-300" />
            <span>إرشادات مندوبي الدفعات</span>
          </span>

          <span className="text-[11px] font-medium text-white/60 hidden sm:inline">
            إدارة المحتوى وتنسيق الملازم
          </span>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 flex flex-col gap-1.5 max-w-xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            دليل مندوبي الدفعات الأكاديمية
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
            معايير جودة الملفات وقواعد التسمية الاحترافية لضمان تجربة دراسية نموذجية لجميع الطلاب.
          </p>
        </div>
      </div>
    );
  }

  // Default / indexing-guide banner
  return (
    <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-3xl overflow-hidden border border-border/80 bg-gradient-to-br from-[#0E0F28] via-[#102336] to-[#153448] p-6 sm:p-8 flex flex-col justify-between text-white shadow-md font-cairo select-none">
      {/* Background Ambient Glow */}
      <div className="absolute -top-16 -left-16 size-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 size-72 rounded-full bg-primary/25 blur-3xl pointer-events-none" />

      {/* Cloud & Hierarchy Graphic */}
      <svg
        className="absolute left-6 top-1/2 -translate-y-1/2 h-full w-auto opacity-20 pointer-events-none hidden sm:block"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="70" y="40" width="60" height="25" rx="5" stroke="white" strokeWidth="2" />
        <rect x="40" y="90" width="50" height="25" rx="5" stroke="white" strokeWidth="2" />
        <rect x="110" y="90" width="50" height="25" rx="5" stroke="white" strokeWidth="2" />
        <rect x="25" y="140" width="40" height="20" rx="4" stroke="#10B981" strokeWidth="2" />
        <rect x="75" y="140" width="40" height="20" rx="4" stroke="#10B981" strokeWidth="2" />
        <line x1="100" y1="65" x2="100" y2="78" stroke="white" strokeWidth="2" />
        <line x1="65" y1="78" x2="135" y2="78" stroke="white" strokeWidth="2" />
        <line x1="65" y1="78" x2="65" y2="90" stroke="white" strokeWidth="2" />
        <line x1="135" y1="78" x2="135" y2="90" stroke="white" strokeWidth="2" />
      </svg>

      {/* Top Tag Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-xs">
          <FolderTree className="size-3 text-emerald-300" />
          <span>هيكلة Google Drive CMS</span>
        </span>

        <span className="text-[11px] font-medium text-white/60 hidden sm:inline">
          فهرسة سحابية تلقائية
        </span>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 flex flex-col gap-1.5 max-w-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
          دليل فهرسة وتنظيم Google Drive
        </h2>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
          الهيكل الشجري الصحيح للمجلدات وأوامر التحديث السريع للكاش وظهور الملازم فورياً.
        </p>
      </div>
    </div>
  );
}
