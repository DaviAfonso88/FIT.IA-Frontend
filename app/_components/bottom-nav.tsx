import Link from "next/link";
import { House, Calendar, ChartNoAxesColumn, UserRound } from "lucide-react";
import dayjs from "dayjs";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";
import { ChatOpenButton } from "@/app/_components/chat-open-button";

interface BottomNavProps {
  activePage?: "home" | "calendar" | "stats" | "profile";
}

export async function BottomNav({ activePage = "home" }: BottomNavProps) {
  const today = dayjs();
  const homeData = await getHomeData(today.format("YYYY-MM-DD"));

  const calendarHref =
    homeData.status === 200 && homeData.data.activeWorkoutPlanId
      ? `/workout-plans/${homeData.data.activeWorkoutPlanId}`
      : null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50" aria-label="Navegação principal">
      <div className="mx-auto max-w-xl px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-2">
        <div className="flex items-end justify-between gap-2 rounded-3xl border border-border/70 bg-background/80 px-2 py-2 shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Link
            href="/"
            aria-label="Início"
            aria-current={activePage === "home" ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-muted-foreground transition-colors",
              "hover:bg-foreground/5 hover:text-foreground",
              activePage === "home" && "bg-foreground/5 text-foreground",
            )}
          >
            <House className="size-5" />
            <span className="text-[11px] font-medium">Início</span>
          </Link>

          {calendarHref ? (
            <Link
              href={calendarHref}
              aria-label="Treinos"
              aria-current={activePage === "calendar" ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-muted-foreground transition-colors",
                "hover:bg-foreground/5 hover:text-foreground",
                activePage === "calendar" && "bg-foreground/5 text-foreground",
              )}
            >
              <Calendar className="size-5" />
              <span className="text-[11px] font-medium">Treinos</span>
            </Link>
          ) : (
            <button
              type="button"
              aria-label="Treinos"
              aria-disabled="true"
              disabled
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-muted-foreground/60",
              )}
            >
              <Calendar className="size-5" />
              <span className="text-[11px] font-medium">Treinos</span>
            </button>
          )}

          <div className="flex shrink-0 flex-col items-center gap-1 px-1">
            <ChatOpenButton />
            <span className="text-[11px] font-medium text-muted-foreground">
              Coach
            </span>
          </div>

          <Link
            href="/stats"
            aria-label="Estatísticas"
            aria-current={activePage === "stats" ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-muted-foreground transition-colors",
              "hover:bg-foreground/5 hover:text-foreground",
              activePage === "stats" && "bg-foreground/5 text-foreground",
            )}
          >
            <ChartNoAxesColumn className="size-5" />
            <span className="text-[11px] font-medium">Stats</span>
          </Link>

          <Link
            href="/profile"
            aria-label="Perfil"
            aria-current={activePage === "profile" ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-muted-foreground transition-colors",
              "hover:bg-foreground/5 hover:text-foreground",
              activePage === "profile" && "bg-foreground/5 text-foreground",
            )}
          >
            <UserRound className="size-5" />
            <span className="text-[11px] font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
