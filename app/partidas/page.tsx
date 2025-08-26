import Link from 'next/link';
import { ArrowLeft, Users, MapPin, Trophy } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { matchesService } from '@/lib/db/services';
import MatchesClient from './components/MatchesClient';

interface Match {
  id: string;
  ambassadorId: string;
  gameMode: string;
  location: string | null;
  playedAt: Date;
  createdAt: Date;
  ambassador: {
    username: string;
  } | null;
}

interface MatchesPageProps {
  matches: Match[];
}

function MatchesPageComponent({ matches }: MatchesPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">🎯 Partidas Oficiais</h1>
          <p className="text-lg text-muted-foreground">
            Histórico completo de partidas registradas por embaixadores. Aqui você pode ver detalhes,
            participantes e mudanças de ELO de cada partida oficial.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{matches.length}</div>
            <div className="text-sm text-muted-foreground">Partidas Registradas</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {new Set(matches.map(m => m.ambassadorId)).size}
            </div>
            <div className="text-sm text-muted-foreground">Embaixadores Ativos</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {new Set(matches.map(m => m.location).filter(Boolean)).size}
            </div>
            <div className="text-sm text-muted-foreground">Locais Diferentes</div>
          </div>
        </div>

        <MatchesClient matches={matches} />

        {/* Instructions */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">📋 Como funcionam as Partidas Oficiais</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-primary">Registro de Partidas</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Apenas embaixadores podem registrar partidas</li>
                <li>• Todas as colocações e ELO são validados</li>
                <li>• Partidas são permanentemente registradas</li>
                <li>• Localização e modo de jogo são obrigatórios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Sistema ELO</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Ganhadores aumentam ELO, perdedores diminuem</li>
                <li>• Variação baseada na diferença de níveis</li>
                <li>• Empates são permitidos em alguns modos</li>
                <li>• Histórico completo de mudanças</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    title: 'Partidas Oficiais - Tic Tic Pou',
    description: 'Histórico completo de partidas registradas por embaixadores'
  };
}

export default async function MatchesServerPage() {
  const matches = await matchesService.getAll();
  
  return <MatchesPageComponent matches={matches} />;
}