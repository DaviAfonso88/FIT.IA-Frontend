import Image from "next/image";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { SignInWithGoogle } from "./_components/sign-in-with-google";
import { Sparkles, ShieldCheck, Dumbbell } from "lucide-react";

export default async function AuthPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session.data?.user) redirect("/");

  return (
    <div className="relative flex min-h-svh flex-col bg-black">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/login-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col">
        <div className="flex justify-center pt-10">
          <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={85} height={38} />
        </div>

        <div className="flex-1 px-5 pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-2xl bg-white/10">
                <Sparkles className="size-5 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-heading text-xs text-white/70">
                  Seu treinador pessoal no bolso
                </p>
                <h1 className="font-heading text-xl font-semibold leading-tight text-white">
                  Treinos sob medida, acompanhamento e consistência.
                </h1>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="flex items-center gap-2 text-white/80">
                <Dumbbell className="size-4 text-white/70" />
                <span className="font-heading text-sm">
                  Planos de treino personalizados
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="size-4 text-white/70" />
                <span className="font-heading text-sm">
                  Login rápido e seguro com Google
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="flex flex-col items-center gap-6 rounded-t-3xl bg-primary px-5 pb-[calc(env(safe-area-inset-bottom)+2.5rem)] pt-10 shadow-[0_-30px_70px_-45px_rgba(0,0,0,0.7)]">
          <div className="flex w-full flex-col items-center gap-3">
            <h2 className="w-full text-center font-heading text-2xl font-semibold leading-tight text-primary-foreground">
              Entrar no FIT.AI
            </h2>
            <p className="max-w-sm text-center font-heading text-sm leading-relaxed text-primary-foreground/75">
              Continue para acessar seus treinos, estatísticas e o Coach AI.
            </p>

            <SignInWithGoogle />
          </div>

          <p className="text-center font-heading text-xs leading-[1.4] text-primary-foreground/70">
            ©2026 FIT.AI. Todos os direitos reservados.
          </p>
        </section>
      </main>
    </div>
  );
}
