"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { User } from "@stackframe/stack";
import { useUserProfile } from "@/lib/hooks";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/rules", label: "Regras" },
  { href: "/classes", label: "Classes" },
  { href: "/modos", label: "Modos de Jogo" },
  { href: "/ranking", label: "Ranking" },
  { href: "/partidas", label: "Partidas" },
];

export function Navigation() {
  const pathname = usePathname();
  const { profile, stackUser: user } = useUserProfile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Left: Brand */}
        <div className="mr-4 flex items-center gap-2">
          <Link href="/" className="flex items-center font-bold text-xl">
            <span className="text-primary">Tic Tic Pou</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-between md:flex">
          <DesktopNav pathname={pathname} />
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/profile" className="flex items-center justify-center">
                {profile?.avatarUrl ? (
                  <Image 
                    src={profile.avatarUrl} 
                    alt={profile.displayName || 'User avatar'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium hover:bg-primary/90 transition-colors">
                    {profile?.displayName?.charAt(0).toUpperCase() || user.displayName?.charAt(0).toUpperCase() || user.primaryEmail?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </Link>
            ) : (
              <Link href="/auth/signin" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="ml-auto flex items-center md:hidden">
          <MobileNav pathname={pathname} user={user} profile={profile} />
        </div>
      </div>
    </header>
  );
}

function DesktopNav({ pathname }: { pathname: string | null }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((l) => {
          const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
          return (
            <NavigationMenuItem key={l.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={l.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "px-3",
                    active && "bg-accent text-accent-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({ pathname, user, profile }: { pathname: string | null; user: User | null; profile: { displayName: string; avatarUrl: string | null; publicId: string } | null }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[85%] sm:w-[380px] p-0">
        <SheetHeader className="px-4 pb-2 pt-4 text-left">
          <SheetTitle className="text-base text-primary font-bold">Tic Tic Pou</SheetTitle>
        </SheetHeader>
        <Separator />
        <nav className="flex flex-col gap-1 p-2">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  active && "bg-accent text-accent-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
          <Separator className="my-2" />
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              {profile?.avatarUrl ? (
                <Image 
                  src={profile.avatarUrl} 
                  alt={profile.displayName || 'User avatar'}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {profile?.displayName?.charAt(0).toUpperCase() || user.displayName?.charAt(0).toUpperCase() || user.primaryEmail?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              Perfil
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-primary text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium text-center"
            >
              Entrar
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}