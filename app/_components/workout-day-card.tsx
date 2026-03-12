import Image from "next/image";
import { Calendar, Timer, Dumbbell } from "lucide-react";
import type { GetHomeData200TodayWorkoutDayWeekDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

interface WorkoutDayCardProps {
  name: string;
  weekDay: GetHomeData200TodayWorkoutDayWeekDay;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string;
  className?: string;
}

export function WorkoutDayCard({
  name,
  weekDay,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  className,
}: WorkoutDayCardProps) {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  return (
    <div
      className={cn(
        "relative flex h-[200px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-5",
        "transition-transform duration-200 will-change-transform",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/10",
        className,
      )}
    >
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt={name}
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      )}
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative">
        <div className="flex items-center gap-1 rounded-full bg-background/16 px-2.5 py-1.5 backdrop-blur-sm">
          <Calendar className="size-3.5 text-background" />
          <span className="font-heading text-xs font-semibold uppercase text-background">
            {WEEKDAY_LABELS[weekDay]}
          </span>
        </div>
      </div>
      <div className="relative flex flex-col gap-2">
        <h3 className="font-heading text-2xl font-semibold leading-[1.05] text-background">
          {name}
        </h3>
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1">
            <Timer className="size-3.5 text-background/70" />
            <span className="font-heading text-xs text-background/70">
              {durationInMinutes}min
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="size-3.5 text-background/70" />
            <span className="font-heading text-xs text-background/70">
              {exercisesCount} exercícios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
