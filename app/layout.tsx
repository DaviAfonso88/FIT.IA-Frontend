import type { Metadata } from "next";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Chat } from "@/app/_components/chat";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIT.AI",
  description: "O app que vai transformar a forma como você treina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className="min-h-svh font-sans"
      >
        <NuqsAdapter>
          {children}
          <Suspense>
            <Chat />
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}
