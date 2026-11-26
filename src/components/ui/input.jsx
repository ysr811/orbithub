"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const inputVariants = cva(
  [
    "w-full min-w-0 border border-border bg-card font-cairo text-foreground transition-all duration-150 outline-none shadow-xs",
    "placeholder:text-muted-foreground/60 placeholder:font-cairo",
    "focus:border-primary focus:ring-2 focus:ring-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-9 md:h-8 rounded-lg px-3 py-1.5 text-xs",
        default: "h-11 md:h-9 rounded-xl px-3.5 py-2 text-xs sm:text-sm",
        lg: "h-12 md:h-11 rounded-xl px-4 py-2.5 text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function renderAdornment(node) {
  if (!node) return null;
  if (React.isValidElement(node)) return node;
  if (typeof node === "function" || (typeof node === "object" && node.$$typeof)) {
    return React.createElement(node, { className: "size-4", "aria-hidden": true });
  }
  return node;
}

/**
 * Responsive Input primitive with optional leading/trailing adornments and clear action.
 */
function Input({
  className,
  containerClassName,
  type,
  size = "default",
  startIcon,
  endIcon,
  onClear,
  clearLabel = "مسح الحقل",
  ...props
}) {
  const hasStart = Boolean(startIcon);
  const hasEnd = Boolean(endIcon) || Boolean(onClear);
  const hasClearableValue =
    Boolean(onClear) &&
    props.value !== undefined &&
    props.value !== null &&
    String(props.value).length > 0;

  const inputElement = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ size }),
        hasStart && "ps-10",
        hasEnd && "pe-10",
        className
      )}
      {...props}
    />
  );

  if (!hasStart && !hasEnd) {
    return inputElement;
  }

  return (
    <div className={cn("relative w-full", containerClassName)}>
      {hasStart && (
        <div className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
          {renderAdornment(startIcon)}
        </div>
      )}

      {inputElement}

      {hasEnd && (
        <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground [&_svg]:size-4">
          {renderAdornment(endIcon)}
          {hasClearableValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={onClear}
              aria-label={clearLabel}
              className="size-8 md:size-7 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { Input, inputVariants };
