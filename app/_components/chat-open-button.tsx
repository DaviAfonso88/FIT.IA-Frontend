"use client";

import { Sparkles } from "lucide-react";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";
import { cn } from "@/lib/utils";

interface ChatOpenButtonProps {
  className?: string;
}

export function ChatOpenButton({ className }: ChatOpenButtonProps) {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  });

  return (
    <button
      onClick={() => setChatParams({ chat_open: true })}
      type="button"
      aria-label="Abrir chat com o Coach AI"
      className={cn(
        "group relative grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all",
        "hover:translate-y-[-1px] hover:shadow-xl hover:shadow-primary/30 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
    >
      <Sparkles className="size-6" />
    </button>
  );
}
