import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isValidElement } from "react";

export default function EmptyStatePage({
  title = "قريباً",
  description = "هذه الصفحة قيد التطوير والتجهيز حالياً.",
  icon: Icon,
  buttonText = "العودة للرئيسية",
  buttonHref = "/",
  className = "",
}) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <Header />
      <main
        className={`flex-1 flex flex-col items-center justify-center text-center px-4 py-16 gap-6 ${className}`}
      >
        {Icon && (
          <div className="flex items-center justify-center">
            {isValidElement(Icon) ? (
              Icon
            ) : (
              <Icon
                className="size-20 sm:size-24 text-primary/15"
                strokeWidth={1.5}
              />
            )}
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-black font-cairo text-foreground">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-cairo max-w-md leading-relaxed">
          {description}
        </p>

        {buttonText && buttonHref && (
          <div className="pt-2">
            <Button render={<Link href={buttonHref} />} size="lg">
              {buttonText}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
