import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
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

function getDriveUrls(driveId, mimeType) {
  const viewUrl = `https://drive.google.com/file/d/${driveId}/view`;
  const type = mimeType ? String(mimeType).toLowerCase() : "";

  let downloadUrl = `https://drive.google.com/uc?id=${driveId}&export=download`;
  if (type === "application/vnd.google-apps.document") {
    downloadUrl = `https://docs.google.com/document/d/${driveId}/export?format=pdf`;
  } else if (type === "application/vnd.google-apps.presentation") {
    downloadUrl = `https://docs.google.com/presentation/d/${driveId}/export/pdf`;
  } else if (type === "application/vnd.google-apps.spreadsheet") {
    downloadUrl = `https://docs.google.com/spreadsheets/d/${driveId}/export?format=xlsx`;
  }

  return { viewUrl, downloadUrl };
}

function cleanFileTitle(title) {
  if (!title) return "";
  return String(title).replace(/\.(pdf|docx?|pptx?|xlsx?|png|jpe?g)$/i, "");
}

function abbreviateSubject(subject) {
  if (!subject) return "";
  const text = String(subject).trim();

  if (text.length <= 18 || /[\u0600-\u06FF]/.test(text)) {
    return text;
  }

  const stopWords = new Set([
    "to",
    "of",
    "in",
    "and",
    "the",
    "for",
    "with",
    "on",
    "a",
    "an",
    "&",
    "-",
  ]);

  const words = text.split(/\s+/);
  let acronym = "";
  let suffix = "";

  words.forEach((word, index) => {
    if (stopWords.has(word.toLowerCase())) return;

    if (index === words.length - 1 && /^(i|ii|iii|iv|v|vi|\d+)$/i.test(word)) {
      suffix = ` ${word.toUpperCase()}`;
      return;
    }

    acronym += word[0].toUpperCase();
  });

  return acronym ? `${acronym}${suffix}` : text;
}

export default function MaterialCard({ file }) {
  const format = getFileFormatMeta(file.mimeType);
  const IconComponent = format.icon;
  const displayTitle = cleanFileTitle(file.title);
  const displaySubject = abbreviateSubject(file.subject);
  const pageCount = Number(file.pages ?? file.pageCount);
  const { viewUrl, downloadUrl } = getDriveUrls(file.driveId, file.mimeType);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-3 lg:p-5 text-foreground font-cairo cursor-pointer hover:border-primary/40 hover:shadow-xs transition-all duration-150">
      <a
        href={viewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`معاينة ${displayTitle}`}
      />

      <div className="relative z-1 pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${format.colorClass}`}
          >
            <IconComponent className="size-5" />
          </div>

          <div className="flex min-w-0 flex-col items-end gap-1 text-[11px] font-medium leading-4 text-muted-foreground">
            <div
              className="flex max-w-full items-center gap-1.5 whitespace-nowrap"
              dir="ltr"
            >
              <span className="shrink-0">{format.label}</span>
              {file.sizeMB && (
                <>
                  <span className="shrink-0">•</span>
                  <span className="shrink-0">{file.sizeMB} MB</span>
                </>
              )}
              {pageCount > 0 && (
                <>
                  <span className="shrink-0">•</span>
                  <span className="shrink-0">{pageCount}p</span>
                </>
              )}
            </div>

            {(displaySubject || file.instructor) && (
              <div className="flex max-w-full items-center gap-1.5 whitespace-nowrap">
                {displaySubject && (
                  <span
                    dir="auto"
                    className={`truncate ${file.instructor ? "max-w-[50%]" : ""}`}
                    title={file.subject}
                  >
                    {displaySubject}
                  </span>
                )}
                {displaySubject && file.instructor && (
                  <span className="shrink-0">•</span>
                )}
                {file.instructor && (
                  <span className="truncate">{file.instructor}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <h2
          className="mt-4 line-clamp-2 min-h-10 text-sm font-bold leading-relaxed text-foreground group-hover:text-primary transition-colors"
          title={file.title}
        >
          {displayTitle}
        </h2>
      </div>

      <div className="relative z-10">
        <Button
          render={
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" />
          }
          variant="default"
          size="sm"
          className="h-9 w-full cursor-pointer gap-1.5 rounded-lg bg-primary text-xs font-semibold text-primary-foreground shadow-none transition-colors hover:bg-primary/90"
        >
          <Download className="size-3.5" />
          تحميل
        </Button>
      </div>
    </div>
  );
}
