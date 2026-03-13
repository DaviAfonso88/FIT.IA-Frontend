import Image from "next/image";
import { Flame } from "lucide-react";

interface StreakBannerProps {
  workoutStreak: number;
}

export function StreakBanner({ workoutStreak }: StreakBannerProps) {
  const isZero = workoutStreak === 0;

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl px-5 py-10 shadow-xs">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          sizes="100vw"
          className={`object-cover ${isZero ? "grayscale" : ""}`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      </div>
      <div className="relative flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
          <Flame className="size-8 text-background" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="font-heading text-5xl font-semibold leading-[0.95] text-background">
            {workoutStreak} dias
          </p>
          <p className="font-heading text-base leading-[1.15] text-background/60">
            {isZero ? "Vamos começar hoje?" : "Sequência atual"}
          </p>
        </div>
      </div>
    </div>
  );
}
