"use client";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const SignInWithGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      aria-busy={isLoading}
      className="h-[42px] w-full max-w-sm rounded-full bg-white px-6 text-black hover:bg-white/90"
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
      Fazer login com Google
    </Button>
  );
};
