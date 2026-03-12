import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppBarProps {
  left?: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export function AppBar({ left, title, right, className }: AppBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">{left}</div>
        {title ? (
          <div className="mx-3 min-w-0 shrink-0 text-center">{title}</div>
        ) : null}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          {right}
        </div>
      </div>
    </header>
  );
}

