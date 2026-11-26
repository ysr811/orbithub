"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-3 data-horizontal:flex-col font-cairo",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit max-w-full overflow-x-auto items-center justify-start sm:justify-center rounded-xl p-1 text-muted-foreground font-cairo border border-border/50 bg-muted/60 group-data-horizontal/tabs:h-11 md:group-data-horizontal/tabs:h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted/60",
        line: "gap-1 bg-transparent border-0 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({ className, variant = "default", ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-full flex-1 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs md:text-sm font-semibold font-cairo whitespace-nowrap text-muted-foreground transition-all duration-150 cursor-pointer outline-none select-none",
        "hover:text-foreground hover:bg-card/50",
        "focus-visible:ring-2 focus-visible:ring-primary/40",
        "disabled:pointer-events-none disabled:opacity-40",
        "data-[active]:bg-card data-[active]:text-foreground data-[active]:shadow-sm data-[active]:border data-[active]:border-border/60",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none font-cairo text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
