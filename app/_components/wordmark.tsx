import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-display text-[22px] uppercase leading-none tracking-[-0.02em]",
        className,
      )}
    >
      Fit.ai
    </span>
  );
}

