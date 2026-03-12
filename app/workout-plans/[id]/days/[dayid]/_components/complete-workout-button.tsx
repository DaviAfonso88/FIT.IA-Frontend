"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { completeWorkoutAction } from "../_actions";
import { Loader2 } from "lucide-react";

interface CompleteWorkoutButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export function CompleteWorkoutButton({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: CompleteWorkoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      await completeWorkoutAction(workoutPlanId, workoutDayId, sessionId);
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleComplete}
      disabled={isPending}
      className="w-full rounded-full py-3 font-heading text-sm font-semibold"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Salvando...
        </>
      ) : (
        "Marcar como concluído"
      )}
    </Button>
  );
}
