import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  abbreviateSubject,
  cleanFileTitle,
  getDriveUrls,
} from "@/lib/academics";

function getFileFormatMeta(mimeType) {
  const type = mimeType ? String(mimeType).toLowerCase() : "";

  if (type.includes("pdf")) {
    return {
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
      icon: FileSpreadsheet,
      colorClass: "text-emerald-500 bg-emerald-500/10",
    };
  }

  if (type.includes("image")) {
    return {
      icon: FileImage,
      colorClass: "text-purple-500 bg-purple-500/10",
    };
  }

  return {
    icon: File,
    colorClass: "text-muted-foreground bg-muted",
  };
}

export default function MaterialCard({ file }) {
  const format = getFileFormatMeta(file.mimeType);
  const IconComponent = format.icon;
  const displayTitle = cleanFileTitle(file.title);
  const displaySubject = abbreviateSubject(file.subject);
  const pageCount = Number(file.pages ?? file.pageCount);
  const { viewUrl, downloadUrl } = getDriveUrls(file.driveId, file.mimeType);

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl  border border-transparent hover:border-border bg-card p-3 lg:p-5 text-foreground font-cairo cursor-pointer transition-all duration-150">
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
            {(displaySubject || file.sizeMB || pageCount > 0) && (
              <div className="flex max-w-full items-center gap-1.5 whitespace-nowrap">
                {displaySubject && (
                  <span
                    dir="auto"
                    className="truncate"
                    title={file.subject}
                  >
                    {displaySubject}
                  </span>
                )}
                {/* {displaySubject && file.sizeMB && (
                  <span className="shrink-0">•</span>
                )}
                {file.sizeMB && (
                  <span dir="ltr" className="shrink-0">
                    {file.sizeMB} MB
                  </span>
                )} */}
                {pageCount > 0 && (
                  <>
                    {(displaySubject || file.sizeMB) && (
                      <span className="shrink-0">•</span>
                    )}
                    <span dir="ltr" className="shrink-0">
                      {pageCount}p
                    </span>
                  </>
                )}
              </div>
            )}

            {file.instructor && (
              <div className="max-w-full truncate">
                {file.instructor}
              </div>
            )}
          </div>
        </div>

        <h2
          dir="ltr"
          className="mt-4 text-sm font-bold leading-relaxed text-foreground group-hover:text-primary transition-colors line-clamp-2"
          title={file.title}
        >
          {displayTitle}
        </h2>
      </div>

      <div className="relative z-10 mt-4">
        <Button
          render={
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" />
          }
          variant="default"
          size="sm"
          className="h-9 w-full cursor-pointer gap-1.5 bg-primary text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Download className="size-3.5" />
          تحميل
        </Button>
      </div>
    </div>
  );
}
