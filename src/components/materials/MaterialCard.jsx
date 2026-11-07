import React from "react";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Eye,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function getFileFormatMeta(mimeType) {
  const type = mimeType ? String(mimeType).toLowerCase() : "";

  if (type.includes("pdf")) {
    return {
      label: "PDF",
      icon: FileText,
      colorClass: "text-red-500 bg-red-500/10",
    };
  }

  if (
    type.includes("presentation") ||
    type.includes("powerpoint") ||
    type.includes("pptx")
  ) {
    return {
      label: "PPTX",
      icon: FileSpreadsheet,
      colorClass: "text-amber-500 bg-amber-500/10",
    };
  }

  if (
    type.includes("word") ||
    type.includes("document") ||
    type.includes("docx")
  ) {
    return {
      label: "DOCX",
      icon: FileText,
      colorClass: "text-blue-500 bg-blue-500/10",
    };
  }

  if (
    type.includes("spreadsheet") ||
    type.includes("excel") ||
    type.includes("xlsx")
  ) {
    return {
      label: "XLSX",
      icon: FileSpreadsheet,
      colorClass: "text-emerald-500 bg-emerald-500/10",
    };
  }

  if (type.includes("image")) {
    return {
      label: "IMG",
      icon: FileImage,
      colorClass: "text-purple-500 bg-purple-500/10",
    };
  }

  return {
    label: "FILE",
    icon: File,
    colorClass: "text-muted-foreground bg-muted",
  };
}

function cleanFileTitle(title) {
  if (!title) return "";
  return String(title).replace(/\.(pdf|docx?|pptx?|xlsx?|png|jpe?g)$/i, "");
}

export default function MaterialCard({ file }) {
  const format = getFileFormatMeta(file.mimeType);
  const IconComponent = format.icon;
  const displayTitle = cleanFileTitle(file.title);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-3 lg:p-5 text-foreground font-cairo cursor-pointer">
      {/* ─── Stretched link covering the whole card for preview ────────── */}
      <a
        href={file.viewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`معاينة ${displayTitle}`}
      />

      {/* ─── Card Content (clicks pass through to stretched link) ─────── */}
      <div className="relative z-1 pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${format.colorClass}`}
          >
            <IconComponent className="size-5" />
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
            dir="ltr"
          >
            <span>{format.label}</span>
            <span>•</span>
            <span>{file.sizeMB} MB</span>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold text-primary">
            {file.subject}
          </span>

          <h3
            className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-relaxed text-foreground group-hover:text-primary transition-colors"
            title={file.title}
          >
            {displayTitle}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0">
          <span className="truncate">{file.instructor}</span>
          <span className="text-border shrink-0">•</span>
          <span className="shrink-0">
            <span className="sm:hidden">م</span>
            <span className="hidden sm:inline">مستوى</span> {file.level}
          </span>
          <span className="text-border shrink-0">•</span>
          <span className="shrink-0">
            <span className="sm:hidden">ت</span>
            <span className="hidden sm:inline">ترم</span> {file.semester}
          </span>
        </div>
      </div>

      {/* ─── Action Buttons (elevated z-index to handle download independently) ─ */}
      <div className="relative z-10 flex items-center gap-2 pt-4">
        <Button
          render={
            <a
              href={file.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          variant="default"
          size="sm"
          className="h-9 flex-1 cursor-pointer gap-1.5 rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-none transition-colors hover:bg-primary/90"
        >
          <Download className="size-3.5" />
          تحميل
        </Button>

        <Button
          render={
            <a href={file.viewUrl} target="_blank" rel="noopener noreferrer" />
          }
          variant="outline"
          size="sm"
          title="معاينة"
          className="size-9 shrink-0 cursor-pointer rounded-lg border-border bg-transparent p-0 text-muted-foreground shadow-none transition-colors hover:bg-muted hover:text-foreground hidden lg:flex"
        >
          <Eye className="size-4" />
        </Button>
      </div>
    </div>
  );
}
