"use client";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const SignInWithGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      console.error(error.message);
      setErrorMessage("Não foi possível iniciar o login. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        aria-busy={isLoading}
        className={cn(
          "h-11 w-full rounded-full bg-white px-6 text-black shadow-sm transition-shadow hover:bg-white/95 hover:shadow",
          "focus-visible:ring-white/40",
        )}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={16}
            height={16}
            className="shrink-0"
          />
        )}
        <span className="font-heading text-sm font-semibold">
          Continuar com Google
        </span>
      </Button>

      {errorMessage ? (
        <p
          role="alert"
          className="rounded-2xl bg-black/20 px-4 py-3 text-center font-heading text-xs leading-relaxed text-primary-foreground/85"
        >
          {errorMessage}
        </p>
      ) : null}

      <p className="text-center font-heading text-[11px] leading-relaxed text-primary-foreground/70">
        Ao continuar, você concorda com nossos termos e política de privacidade.
      </p>
    </div>
  );
};
