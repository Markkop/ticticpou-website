'use client';

import Link from "next/link";
import { UserButton, useUser } from "@stackframe/stack";

export function Navigation() {
  const user = useUser();

  return (
    <header className="border-b border-border">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Tic Tic Pou
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/classes" className="text-foreground hover:text-primary transition-colors">
              Classes
            </Link>
            <Link href="/modos" className="text-foreground hover:text-primary transition-colors">
              Modos de Jogo
            </Link>
            <Link href="/acoes" className="text-foreground hover:text-primary transition-colors">
              Ações
            </Link>
            <Link href="/ranking" className="text-foreground hover:text-primary transition-colors">
              Ranking
            </Link>
            <Link href="/partidas" className="text-foreground hover:text-primary transition-colors">
              Partidas
            </Link>
            {user ? (
              <UserButton />
            ) : (
              <Link href="/auth/signin" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}