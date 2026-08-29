import { type ButtonHTMLAttributes } from "react";
import { Button as UiButton } from "./ui/button";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "advance" | "icon" | "destructive";
};

/** Stadium-themed button — re-exports shadcn/ui primitive with legacy variant names. */
export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <UiButton variant={variant} {...props} />;
}
