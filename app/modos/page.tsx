import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { gameModesService } from '@/lib/db/services';
import type { GameMode } from '@/lib/db';
import GameModesClient from './components/GameModesClient';

interface GameModesPageProps {
  gameModes: GameMode[];
}

function GameModesPageComponent({ gameModes }: GameModesPageProps) {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">🎮 Modos de Jogo</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Descubra todas as formas de jogar Tic Tic Pou com Classes. Desde o modo clássico até variantes 
            competitivas e de equipe. Cada modo oferece uma experiência única e desafios diferentes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">{gameModes.length}</div>
            <div className="text-sm text-muted-foreground">Modos Disponíveis</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">
              {Math.min(...gameModes.map(m => m.minPlayers))}
            </div>
            <div className="text-sm text-muted-foreground">Min. Jogadores</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">
              {Math.max(...gameModes.map(m => m.maxPlayers).filter((max): max is number => max !== null))}
            </div>
            <div className="text-sm text-muted-foreground">Max. Jogadores</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">
              {gameModes.filter(m => (m.difficulty || 'iniciante') === 'iniciante').length}
            </div>
            <div className="text-sm text-muted-foreground">Para Iniciantes</div>
          </div>
        </div>

        <GameModesClient gameModes={gameModes} />

        {/* Learning Path */}
        <section className="mt-12 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">📚 Caminho de Aprendizagem</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">1</div>
              <h4 className="font-medium mb-2">Jogo Base</h4>
              <p className="text-sm text-muted-foreground">
                Aprenda as 3 ações básicas: defender, recarregar e atirar
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">2</div>
              <h4 className="font-medium mb-2">Classes Base</h4>
              <p className="text-sm text-muted-foreground">
                Adicione as 4 classes base + Noviço no modo Clássico
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">3</div>
              <h4 className="font-medium mb-2">Expansão</h4>
              <p className="text-sm text-muted-foreground">
                Explore classes extras, modos variantes e mecânicas avançadas
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    title: 'Modos de Jogo - Tic Tic Pou',
    description: 'Descubra todas as formas de jogar Tic Tic Pou com Classes'
  };
}

export default async function GameModesServerPage() {
  const gameModes = await gameModesService.getAll();
  
  return <GameModesPageComponent gameModes={gameModes} />;
}