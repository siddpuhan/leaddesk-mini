import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  asChild = false,
  href,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-near-black disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const variants = {
    primary: "bg-lime text-near-black hover:bg-lime/90",
    outline: "border border-white/20 text-white hover:bg-white/5",
    ghost: "text-white/40 hover:text-white",
  };

  const sizes = {
    sm: "h-9 px-5 text-xs font-semibold",
    md: "h-11 px-6 text-sm font-semibold",
    lg: "h-14 px-8 text-sm font-semibold",
  };

  const contentClass = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={contentClass}>
        {children}
      </Link>
    );
  }

  if (asChild) {
    return (
      <Slot className={contentClass} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button className={contentClass} {...props}>
      {children}
    </button>
  );
}