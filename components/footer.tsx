import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

// Links grouped by sections
const recursosLinks = [
  { href: "/rules", label: "Regras", external: false },
  { href: "/classes", label: "Classes", external: false },
  { href: "/modos", label: "Modos de Jogo", external: false },
  { href: "/ranking", label: "Ranking", external: false },
  { href: "/partidas", label: "Partidas", external: false },
];

const relacionadoLinks = [
  { href: "https://github.com/Markkop/TicTicPou", label: "Projeto", external: true },
  { href: "https://github.com/Markkop/ticticpou-website", label: "Website", external: true },
  { href: "https://github.com/Markkop/JogosLudicos", label: "Jogos Lúdicos", external: true },
  { href: "https://mark17.itch.io/ticticpou-3d", label: "Itch.io", external: true },
];

const informacoesLinks = [
  { href: "mailto:me@markkop.dev", label: "Entrar em contato", external: true },
  { href: "#", label: "Política de Privacidade", external: false },
  { href: "/admin", label: "Admin", external: false },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-xs">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary">Tic Tic Pou</h3>
            <p className="text-muted-foreground">O jogo de roda com classes.</p>
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              <Image
                alt="Licença Creative Commons"
                src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
                width={88}
                height={31}
                className="h-[31px] w-[88px]"
              />
            </a>
            <p className="pt-2 text-muted-foreground">Made with ❤️ by <a href="https://linktree.markkop.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">Mark Kop</a></p>
          </div>

          {/* Recursos */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Recursos</h4>
            <nav className="flex flex-col gap-1">
              {recursosLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Relacionado */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Relacionado</h4>
            <nav className="flex flex-col gap-1">
              {relacionadoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Informações */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Informações</h4>
            <nav className="flex flex-col gap-1">
              {informacoesLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}