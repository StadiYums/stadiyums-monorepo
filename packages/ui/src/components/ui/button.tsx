import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 cursor-pointer items-center justify-center border-none font-body text-sm font-bold transition-colors duration-150 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
  {
    variants: {
      variant: {
        checkout:
          "rounded-[8px] bg-surface-white px-[22px] py-3 text-[14.5px] text-orange-dim hover:bg-cream active:bg-cream disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
        primary:
          "rounded-[10px] bg-navy px-5 text-cream hover:bg-navy-2 active:bg-navy-soft disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
        secondary:
          "rounded-[10px] border border-line bg-surface-white px-5 text-navy hover:bg-cream active:bg-line/40 disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
        advance:
          "rounded-[10px] bg-orange px-4 text-[13px] text-cream whitespace-nowrap hover:bg-orange-2 active:bg-orange-dim disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
        icon: "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-navy p-0 text-cream hover:bg-navy-2 active:bg-navy-soft disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
        destructive:
          "rounded-[10px] bg-orange-dim px-5 text-cream hover:bg-orange active:bg-orange-dim disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
        outline:
          "rounded-[10px] border border-line bg-transparent px-5 text-navy hover:bg-cream",
        ghost: "rounded-[10px] bg-transparent px-5 text-navy hover:bg-cream",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
