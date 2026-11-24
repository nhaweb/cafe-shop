import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Café design system (CLAUDE.md): square (2px), h-10, semibold, hover = colour change only.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-btn border border-transparent text-sm font-semibold whitespace-nowrap transition-colors duration-300 outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** btnDark: on light backgrounds */
        default: "bg-espresso text-cream hover:bg-coffee",
        /** btnLight: on dark backgrounds and photos */
        light: "bg-cream text-espresso hover:bg-white",
        /** btnOutline: secondary action on light backgrounds */
        outline: "border-espresso/30 bg-transparent text-espresso hover:border-espresso",
        /** Secondary action on dark backgrounds */
        "outline-light": "border-cream/40 bg-transparent text-cream hover:border-cream",
        ghost: "hover:bg-espresso/5",
        destructive: "bg-destructive text-cream hover:bg-destructive/85",
        link: "h-auto px-0 text-espresso underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso",
      },
      size: {
        default: "h-10 px-3.5",
        sm: "h-8 px-2.5",
        lg: "h-11 px-4",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
