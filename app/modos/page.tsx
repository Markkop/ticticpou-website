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
              {gameModes.filter(m => m.category === 'casual').length}
            </div>
            <div className="text-sm text-muted-foreground">Modos Casuais</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">
              {gameModes.filter(m => m.category === 'competitivo').length}
            </div>
            <div className="text-sm text-muted-foreground">Modos Competitivos</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">
              {gameModes.filter(m => m.rankingType).length}
            </div>
            <div className="text-sm text-muted-foreground">Com Ranking</div>
          </div>
        </div>

        <GameModesClient gameModes={gameModes} />
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