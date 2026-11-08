import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Base Select Primitive
 * Styled according to OrbitHub design system tokens and Cairo typography.
 */
function Select({ className, disabled, children, ...props }) {
  return (
    <div className="relative w-full">
      <select
        disabled={disabled}
        data-slot="select"
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground font-cairo transition-all duration-150 cursor-pointer outline-none shadow-xs",
          "focus:border-primary focus:ring-1 focus:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-muted/40",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

/**
 * SelectField with Label & Helper text
 * Reusable across forms, filter drawers, and modal cards.
 */
function SelectField({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  helperText,
  placeholder,
  className,
  id,
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 font-cairo w-full", className)}>
      {(label || (disabled && helperText)) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-xs font-bold text-foreground">
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
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        aria-label={label}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

export { Select, SelectField };
