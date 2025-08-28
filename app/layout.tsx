import type { Metadata } from "next";
import { Suspense } from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ConditionalNavigation } from "@/components/conditional-navigation";
import { Footer } from "@/components/footer";
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
  title: {
    default: "Tic Tic Pou - O Jogo de Roda Brasileiro com Classes",
    template: "%s | Tic Tic Pou"
  },
  description: "Jogo de roda brasileiro com sistema de classes, modos de jogo e ranking.",
  keywords: ["zip zap", "tic tic pou", "jogo de roda", "jogo brasileiro", "brincadeira de rua", "ranking elo", "classes de personagens", "jogo de estratégia", "cultura brasileira", "jogos tradicionais"],
  authors: [{ name: "Mark Kop" }],
  creator: "Mark Kop",
  publisher: "Mark Kop",
  icons: {
    icon: "/bullet.svg",
    shortcut: "/bullet.svg",
    apple: "/bullet.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://ttp.markkop.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tic Tic Pou - O Jogo de Roda com Classes",
    description: "Jogo de roda com sistema de classes, modos de jogo e ranking.",
    url: "https://ttp.markkop.com",
    siteName: "Tic Tic Pou",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tic Pou - O Jogo de Roda com Classes",
    description: "Jogo de roda com sistema de classes, modos de jogo e ranking.",
    creator: "@ticticpou",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/heart.svg" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/bullet.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      ><StackProvider app={stackServerApp}><StackTheme>
        <Suspense fallback={<div className="border-b border-border h-[73px]"></div>}>
          <ConditionalNavigation />
        </Suspense>
        {children}
        <Footer />
        <Toaster richColors position="bottom-right" />
      </StackTheme></StackProvider></body>
    </html>
  );
}
