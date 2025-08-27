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
              Jogo de roda brasileiro com diversas classes, modos de jogo, ranking e experimentações.
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

        {/* 3D Game Prototype Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2lg mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Tic Tic Pou 3D</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
  Protótipo de 2018 com uma ideia do que seria uma versão online do jogo. Código disponível no <a href="https://github.com/Markkop/TicTicPouTry3" className="text-primary">GitHub</a>.           </p>
            <div className="md:scale-50 origin-top flex justify-center">
              <iframe
                frameBorder="0"
                src="https://itch.io/embed-upload/1200940?color=333333"
                allowFullScreen
                width="980"
                height="688"
                className="rounded-lg shadow-lg "
              >
                <a href="https://mark17.itch.io/ticticpou-3d">Play TicTicPou 3D on itch.io</a>
              </iframe>
            </div>
              <p className="text-xs text-muted-foreground md:hidden">On mobile, expand and adjust your phone orientation</p>
          </div>
        </section>
      </main>
    </div>
  );
}
