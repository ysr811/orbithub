/**
 * OrbitHub Visual Identity & Color Palette Tokens
 */

// Core brand color tokens consistent with Tailwind CSS and globals.css
export const brandColors = {
  primary: "#2A3EF4",
  secondary: "#7A89EA",
  dark: "#0E0F28",
  surface: "#26273E",
  muted: "#3E3F53",
  light: "#E4E5F2",
};

// Brand page showcase color palette items
export const palette = [
  {
    hex: brandColors.primary,
    name: "Electric Blue (Primary)",
    role: "Primary color for CTA buttons, active links, and brand highlights",
    bgClass: "bg-brand-primary",
    textClass: "text-white",
  },
  {
    hex: brandColors.secondary,
    name: "Periwinkle (Secondary)",
    role: "Secondary accents, secondary badges, and icons",
    bgClass: "bg-brand-secondary",
    textClass: "text-brand-dark",
  },
  {
    hex: brandColors.dark,
    name: "Dark Night",
    role: "Main dark background color across the application",
    bgClass: "bg-brand-dark",
    textClass: "text-brand-light",
  },
  {
    hex: brandColors.surface,
    name: "Deep Navy (Surface)",
    role: "Card surfaces, elevated panels, and navigation menus",
    bgClass: "bg-brand-surface",
    textClass: "text-white",
  },
  {
    hex: brandColors.muted,
    name: "Muted Slate",
    role: "Subtle borders, dividers, and inactive state elements",
    bgClass: "bg-brand-muted",
    textClass: "text-white",
  },
  {
    hex: brandColors.light,
    name: "Soft Ice",
    role: "High-contrast headings and body text on dark surfaces",
    bgClass: "bg-brand-light",
    textClass: "text-brand-dark",
  },
];

// Semantic color indicators and labels for study material file types
export const fileTypeBadges = {
  pdf: {
    label: "PDF",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  presentation: {
    label: "PPTX",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  document: {
    label: "DOCX",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  spreadsheet: {
    label: "XLSX",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  image: {
    label: "صورة",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  default: {
    label: "ملف",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
};
