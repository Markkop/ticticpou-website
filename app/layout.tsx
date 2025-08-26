import type { Metadata } from "next";
import { Suspense } from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ConditionalNavigation } from "@/components/conditional-navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic Tic Pou",
  description: "O jogo de roda com classes - Site oficial do Tic Tic Pou com sistema de ranking e partidas oficiais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      ><StackProvider app={stackServerApp}><StackTheme>
        <Suspense fallback={<div className="border-b border-border h-[73px]"></div>}>
          <ConditionalNavigation />
        </Suspense>
        {children}
        <Toaster richColors position="bottom-right" />
      </StackTheme></StackProvider></body>
    </html>
  );
}
