import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-cairo text-foreground transition-all duration-150 outline-none",
        "placeholder:text-muted-foreground/60 placeholder:font-cairo",
        "focus:border-primary focus:ring-2 focus:ring-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Input }
