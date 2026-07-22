import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-yellow-glow hover:bg-[#ffcc22]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[#303030]",
        outline: "border border-border bg-background text-foreground hover:border-primary hover:bg-primary/10",
        ghost: "text-foreground hover:bg-muted",
        link: "h-auto min-h-0 px-0 text-foreground underline-offset-4 hover:underline",
        dark: "bg-brand-black text-white hover:bg-brand-charcoal",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "min-h-10 px-3 py-2 text-xs",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "h-11 min-h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
