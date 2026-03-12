import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { getHomeData, getUserTrainData } from "./_lib/api/fetch-generated";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { BottomNav } from "./_components/bottom-nav";
import { ConsistencyTracker } from "./_components/consistency-tracker";
import { WorkoutDayCard } from "./_components/workout-day-card";
import { Wordmark } from "@/app/_components/wordmark";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs();
  const [homeData, trainData] = await Promise.all([
    getHomeData(today.format("YYYY-MM-DD")),
    getUserTrainData(),
  ]);

  if (homeData.status !== 200) {
    throw new Error("Failed to fetch home data");
  }

  const needsOnboarding =
    !homeData.data.activeWorkoutPlanId ||
    (trainData.status === 200 && !trainData.data);
  if (needsOnboarding) redirect("/onboarding");

  const { todayWorkoutDay, workoutStreak, consistencyByDay } = homeData.data;
  const userName = session.data.user.name?.split(" ")[0] ?? "";

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-xl flex-col bg-background pb-[calc(env(safe-area-inset-bottom)+6rem)]">
      <div className="relative flex h-[296px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/home-banner.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(243deg, rgba(0,0,0,0) 34%, rgb(0,0,0) 100%)",
            }}
          />
        </div>

        <Wordmark className="relative text-background" />

        <div className="relative flex w-full items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-2xl font-semibold leading-[1.05] text-background">
              Olá, {userName}
            </h1>
            <p className="font-heading text-sm leading-[1.15] text-background/70">
              Bora treinar hoje?
            </p>
          </div>
          <div className="rounded-full bg-primary px-4 py-2">
            <span className="font-heading text-sm font-semibold text-primary-foreground">
              Bora!
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 pt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Consistência
          </h2>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-mr-2 h-8 px-2 text-xs"
          >
            <Link href="/stats">Ver histórico</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl border border-border p-5">
            <ConsistencyTracker
              consistencyByDay={consistencyByDay}
              today={today}
            />
          </div>
          <div className="flex items-center gap-2 self-stretch rounded-xl bg-streak px-5 py-2">
            <Flame className="size-5 text-streak-foreground" />
            <span className="font-heading text-base font-semibold text-foreground">
              {workoutStreak}
            </span>
          </div>
        </div>
      </div>

      {todayWorkoutDay && (
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Treino de Hoje
            </h2>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="-mr-2 h-8 px-2 text-xs"
            >
              <Link href={`/workout-plans/${homeData.data.activeWorkoutPlanId}`}>
                Ver treinos
              </Link>
            </Button>
          </div>

          <Link
            href={`/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`}
            className="rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <WorkoutDayCard
              name={todayWorkoutDay.name}
              weekDay={todayWorkoutDay.weekDay}
              estimatedDurationInSeconds={
                todayWorkoutDay.estimatedDurationInSeconds
              }
              exercisesCount={todayWorkoutDay.exercisesCount}
              coverImageUrl={todayWorkoutDay.coverImageUrl}
            />
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
