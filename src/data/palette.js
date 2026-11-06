export const brandColors = {
  primary: "#2A3EF4",     // اللون الأزرق الأساسي للموقع
  secondary: "#7A89EA",   // اللون الثانوي / الأزرق السماوي
  dark: "#0E0F28",        // لون الخلفية الداكنة
  surface: "#26273E",     // لون الحاويات والبطاقات
  muted: "#3E3F53",       // لون الحدود والعناصر الهادئة
  light: "#E4E5F2",       // لون النصوص والعناصر الفاتحة
};

export const palette = [
  {
    hex: "#2A3EF4",
    rgb: "RGB 42, 62, 244",
    cmyk: "CMYK 83%, 75%, 0%, 4%",
    name: "Primary Electric Blue",
    role: "اللون الأساسي (Primary)",
    bgClass: "bg-brand-primary",
    textClass: "text-white",
  },
  {
    hex: "#7A89EA",
    rgb: "RGB 122, 137, 234",
    cmyk: "CMYK 48%, 41%, 0%, 8%",
    name: "Periwinkle Accent",
    role: "اللون الثانوي (Secondary)",
    bgClass: "bg-brand-secondary",
    textClass: "text-brand-dark",
  },
  {
    hex: "#0E0F28",
    rgb: "RGB 14, 15, 40",
    cmyk: "CMYK 65%, 63%, 0%, 84%",
    name: "Dark Night",
    role: "الخلفية الأساسية (Background)",
    bgClass: "bg-brand-dark",
    textClass: "text-brand-light",
  },
  {
    hex: "#26273E",
    rgb: "RGB 38, 39, 62",
    cmyk: "CMYK 39%, 37%, 0%, 76%",
    name: "Deep Navy",
    role: "أسطح البطاقات (Surface)",
    bgClass: "bg-brand-surface",
    textClass: "text-white",
  },
  {
    hex: "#3E3F53",
    rgb: "RGB 62, 63, 83",
    cmyk: "CMYK 25%, 24%, 0%, 67%",
    name: "Muted Slate",
    role: "الحدود والنصوص المساعدة (Muted)",
    bgClass: "bg-brand-muted",
    textClass: "text-white",
  },
  {
    hex: "#E4E5F2",
    rgb: "RGB 228, 229, 242",
    cmyk: "CMYK 6%, 5%, 0%, 5%",
    name: "Soft Ice",
    role: "النصوص والعناصر الفاتحة (Foreground)",
    bgClass: "bg-brand-light",
    textClass: "text-brand-dark",
  },
];
