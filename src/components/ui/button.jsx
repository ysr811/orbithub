import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-cairo border border-transparent bg-clip-padding font-semibold whitespace-nowrap shadow-none transition-all duration-150 outline-none select-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 md:h-9 gap-2 px-4 text-sm has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-4.5 md:[&_svg:not([class*='size-'])]:size-4",
        xs: "h-8 md:h-7 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-10 md:h-9 gap-1.5 px-4 text-xs has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 md:h-11 gap-2 px-6 text-sm md:text-base has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4 [&_svg:not([class*='size-'])]:size-5",
        xl: "h-13 md:h-12 gap-2.5 px-8 text-base font-bold has-data-[icon=inline-end]:pe-5 has-data-[icon=inline-start]:ps-5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-12 md:size-9 p-0 [&_svg:not([class*='size-'])]:size-6 md:[&_svg:not([class*='size-'])]:size-4",
        "icon-xs":
          "size-9 md:size-7 p-0 [&_svg:not([class*='size-'])]:size-4 md:[&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm":
          "size-11 md:size-9 p-0 [&_svg:not([class*='size-'])]:size-5 md:[&_svg:not([class*='size-'])]:size-4",
        "icon-lg":
          "size-12 md:size-11 p-0 [&_svg:not([class*='size-'])]:size-6 md:[&_svg:not([class*='size-'])]:size-5",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

const ICON_SIZE_MAP = {
  xs: "icon-xs",
  sm: "icon-sm",
  default: "icon",
  lg: "icon-lg",
  xl: "icon-lg",
  "icon-xs": "icon-xs",
  "icon-sm": "icon-sm",
  icon: "icon",
  "icon-lg": "icon-lg",
};

function hasRenderableContent(children) {
  let hasContent = false;
  React.Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") {
      return;
    }
    if (typeof child === "string") {
      if (child.trim().length > 0) hasContent = true;
      return;
    }
    hasContent = true;
  });
  return hasContent;
}

function isSingleIconElement(children) {
  const validChildren = React.Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim().length === 0)
  );
  if (validChildren.length !== 1) return false;
  const single = validChildren[0];
  if (!React.isValidElement(single)) return false;
  if (single.type === "svg") return true;
  // Detect icon component references (e.g. lucide-react forwardRef icons) with no inner text children
  return Boolean(
    typeof single.type === "object" &&
      single.type?.$$typeof &&
      single.type?.render &&
      !single.props?.children
  );
}

function renderIconNode(icon, dataIcon) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return dataIcon
      ? React.cloneElement(icon, {
          "data-icon": icon.props?.["data-icon"] ?? dataIcon,
          "aria-hidden": icon.props?.["aria-hidden"] ?? true,
        })
      : icon;
  }
  if (typeof icon === "function" || (typeof icon === "object" && icon.$$typeof)) {
    return React.createElement(icon, {
      "data-icon": dataIcon,
      "aria-hidden": true,
    });
  }
  return null;
}

/**
 * Flexible, responsive Button primitive.
 * Automatically scales between touch targets (< md) and compact mouse dimensions (md+),
 * and seamlessly adapts to text, icon + text, or icon-only usage.
 */
function Button({
  className,
  variant = "default",
  size,
  fullWidth = false,
  icon,
  iconPosition = "start",
  iconOnly = false,
  loading = false,
  disabled,
  children,
  nativeButton,
  ...props
}) {
  const isDisabled = Boolean(disabled || loading);
  const isAnchorRender =
    React.isValidElement(props.render) && props.render.props?.href !== undefined;
  const effectiveChildren =
    !hasRenderableContent(children) && isAnchorRender
      ? props.render.props.children
      : children;
  const isNative =
    nativeButton ??
    (React.isValidElement(props.render) ? props.render.type === "button" : true);

  const hasChildren = hasRenderableContent(effectiveChildren);
  const detectedIconOnly =
    iconOnly ||
    (!hasChildren && (Boolean(icon) || loading)) ||
    isSingleIconElement(effectiveChildren);

  const requestedSize = size ?? "default";
  const resolvedSize = detectedIconOnly
    ? ICON_SIZE_MAP[requestedSize] ?? "icon"
    : requestedSize;

  const isInlineIcon = hasChildren;
  const startIcon =
    loading && iconPosition === "start" ? (
      <Loader2
        className="animate-spin"
        data-icon={isInlineIcon ? "inline-start" : undefined}
        aria-hidden="true"
      />
    ) : icon && iconPosition === "start" ? (
      renderIconNode(icon, isInlineIcon ? "inline-start" : undefined)
    ) : null;

  const endIcon =
    loading && iconPosition === "end" ? (
      <Loader2
        className="animate-spin"
        data-icon={isInlineIcon ? "inline-end" : undefined}
        aria-hidden="true"
      />
    ) : icon && iconPosition === "end" ? (
      renderIconNode(icon, isInlineIcon ? "inline-end" : undefined)
    ) : null;

  const resolvedClassName = cn(
    buttonVariants({ variant, size: resolvedSize, fullWidth, className })
  );

  // Preserve native anchor link semantics instead of injecting role="button" onto links
  if (isAnchorRender) {
    const { render, onClick, tabIndex, ...anchorProps } = props;
    const renderChildren =
      hasChildren || startIcon || endIcon
        ? [startIcon, effectiveChildren, endIcon].filter(
            (part) => part !== null && part !== undefined
          )
        : undefined;

    return React.cloneElement(
      render,
      {
        "data-slot": "button",
        ...anchorProps,
        "aria-disabled": isDisabled || anchorProps["aria-disabled"] || undefined,
        "aria-busy": loading || undefined,
        tabIndex: isDisabled ? -1 : tabIndex ?? render.props.tabIndex,
        onClick: isDisabled
          ? (e) => e.preventDefault()
          : onClick ?? render.props.onClick,
        className: cn(
          resolvedClassName,
          isDisabled && "pointer-events-none opacity-50",
          render.props.className
        ),
      },
      ...(renderChildren ?? [])
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={isNative}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={resolvedClassName}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
