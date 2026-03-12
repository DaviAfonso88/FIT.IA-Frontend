import Image from "next/image";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { SignInWithGoogle } from "./_components/sign-in-with-google";

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col">
        <div className="flex justify-center pt-12">
          <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={85} height={38} />
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center gap-12 rounded-t-3xl bg-primary px-5 pb-[calc(env(safe-area-inset-bottom)+2.5rem)] pt-12 shadow-[0_-30px_70px_-45px_rgba(0,0,0,0.7)]">
          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="w-full text-center font-heading text-[32px] font-semibold leading-[1.05] text-primary-foreground">
              O app que vai transformar a forma como você treina.
            </h1>

            <SignInWithGoogle />
          </div>

          <p className="text-center font-heading text-xs leading-[1.4] text-primary-foreground/70">
            ©2026 FIT.AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
