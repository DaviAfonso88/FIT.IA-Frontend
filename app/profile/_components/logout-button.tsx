"use client";

import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { error } = await authClient.signOut();

    if (error) {
      console.error(error.message);
      setIsLoading(false);
      return;
    }

    router.push("/auth");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoading}
      aria-busy={isLoading}
      className="gap-2 text-destructive hover:text-destructive"
    >
      <span className="font-heading text-base font-semibold">
        Sair da conta
      </span>
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}
    </Button>
  );
}
