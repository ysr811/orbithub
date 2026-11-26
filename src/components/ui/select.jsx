"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  [
    "w-full appearance-none border border-border bg-card font-medium text-foreground font-cairo transition-all duration-150 cursor-pointer outline-none shadow-xs",
    "focus:border-primary focus:ring-2 focus:ring-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40",
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-muted/40",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-9 md:h-8 rounded-lg ps-3 pe-9 py-1.5 text-xs",
        default: "h-11 md:h-9 rounded-xl ps-3.5 pe-10 py-2 text-xs sm:text-sm",
        lg: "h-12 md:h-11 rounded-xl ps-4 pe-10 py-2.5 text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * Native Select primitive styled to match OrbitHub design tokens.
 * Uses the OS-native picker on touch devices and standard dropdown on desktop.
 */
function Select({
  className,
  containerClassName,
  size = "default",
  disabled,
  children,
  ...props
}) {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      <select
        disabled={disabled}
        data-slot="select"
        className={cn(selectVariants({ size }), className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

/**
 * SelectField with automatic ID binding, label, helper text, and error state.
 */
function SelectField({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  helperText,
  error,
  placeholder,
  size = "default",
  className,
  id,
  ...props
}) {
  const generatedId = React.useId();
  const selectId = id || generatedId;

  return (
    <div className={cn("flex flex-col gap-1.5 font-cairo w-full", className)}>
      {(label || (disabled && helperText)) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <label htmlFor={selectId} className="text-xs font-bold text-foreground">
              {label}
            </label>
          )}
          {disabled && helperText && (
            <span className="text-[11px] text-muted-foreground font-normal">
              {helperText}
            </span>
          )}
        </div>
      )}

      <Select
        id={selectId}
        size={size}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        aria-label={label}
        aria-invalid={Boolean(error) || undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </Select>

      {error && (
        <span className="text-[11px] font-medium text-destructive">{error}</span>
      )}
    </div>
  );
}

export { Select, SelectField, selectVariants };
