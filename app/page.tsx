import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Tic Tic Pou
              <span className="text-primary block text-3xl md:text-4xl mt-2">com Classes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              O jogo de roda brasileiro que conquistou uma nova dimensão com classes únicas, 
              sistema de ranking ELO e partidas oficiais registradas por embaixadores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/classes" 
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Ver Classes
              </Link>
              <Link 
                href="/auth/signup" 
                className="border border-border px-8 py-3 rounded-md text-lg font-medium hover:bg-secondary transition-colors"
              >
                Cadastrar-se
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-lg mb-4 inline-block">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xl">
                  🎯
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Classes Únicas</h3>
              <p className="text-muted-foreground">
                Mais de 10 classes diferentes, cada uma com habilidades especiais que transformam a experiência do jogo tradicional.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-lg mb-4 inline-block">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xl">
                  🏆
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ranking ELO</h3>
              <p className="text-muted-foreground">
                Sistema de pontuação profissional que acompanha seu desempenho ao longo do tempo nas partidas oficiais.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-lg mb-4 inline-block">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xl">
                  📊
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Partidas Oficiais</h3>
              <p className="text-muted-foreground">
                Registre suas partidas com embaixadores oficiais e acompanhe o histórico completo de jogos da comunidade.
              </p>
            </div>
          </div>
        </section>

        {/* Game Rules Preview */}
        <section className="bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">Como Jogar</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Defender</h3>
                  <p className="text-sm text-muted-foreground">
                    Cruze os braços em X no peito para se proteger de ataques
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Recarregar</h3>
                  <p className="text-sm text-muted-foreground">
                    Levante as mãos como armas e fale &quot;Tic Tic&quot; para ganhar uma bala
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Atirar</h3>
                  <p className="text-sm text-muted-foreground">
                    Aponte para um alvo e fale &quot;Pou!&quot; para atacar gastando uma bala
                  </p>
                </div>
              </div>
              <Link 
                href="/classes" 
                className="text-primary hover:text-primary/80 font-medium"
              >
                Conheça todas as classes e suas habilidades especiais →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Tic Tic Pou com Classes - Jogo criado colaborativamente pela comunidade brasileira
          </p>
          <p className="text-sm text-muted-foreground">
            Este trabalho está licenciado com uma{" "}
            <a 
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/" 
              className="text-primary hover:text-primary/80"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Licença Creative Commons - Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
