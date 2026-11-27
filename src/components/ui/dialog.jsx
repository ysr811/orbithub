"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Dialog({ ...props }) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 ease-out data-open:opacity-100 data-closed:opacity-0 data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex flex-col h-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-3rem)] sm:w-full sm:max-w-xl md:max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-5 sm:gap-6 overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 md:p-9 font-cairo text-foreground shadow-none border-none duration-150 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="إغلاق النافذة"
                className="absolute top-4 end-4 z-20 border-none bg-white/90 text-muted-foreground hover:bg-muted hover:text-foreground"
              />
            }
          >
            <XIcon />
            <span className="sr-only">إغلاق</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-right font-cairo", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-row items-center justify-between gap-2 pt-5 border-t border-border/50 font-cairo",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          render={
            <Button variant="outline" size="sm" className="px-5 rounded-xl" />
          }
        >
          إغلاق
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-cairo text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "font-cairo text-sm sm:text-base text-muted-foreground leading-relaxed pt-1",
        className
      )}
      {...props}
    />
  );
}

function DialogImage({
  src,
  alt = "",
  className,
  aspectClassName = "aspect-900/353",
  sizes = "(max-width: 768px) 100vw, 672px",
  loading = "eager",
  ...props
}) {
  return (
    <div
      data-slot="dialog-image"
      className={cn(
        "relative shrink-0 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 md:-mx-9 md:-mt-9 bg-muted rounded-t-3xl overflow-hidden border-b border-border/50",
        aspectClassName,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading={loading}
        sizes={sizes}
        className="object-cover"
        {...props}
      />
    </div>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogImage,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
