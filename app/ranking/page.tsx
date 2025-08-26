import { Card, CardContent } from '@/components/ui/card';
import { Crown, Trophy, TrendingUp, Users, Target, Swords, Globe } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { getRankingsByGameMode } from '@/lib/data/rankings';
import type { RankingEntry } from '@/lib/types/user';
import RankingTabs from './components/RankingTabs';

interface RankingPageData {
  global: RankingEntry[];
  classic4: RankingEntry[];
  normal5: RankingEntry[];
  free6Plus: RankingEntry[];
  stats: {
    totalPlayers: number;
    totalMatches: number;
    averageElo: number;
    topClass: string;
  };
}

async function fetchRankingData(): Promise<RankingPageData> {
  const [global, classic4, normal5, free6Plus] = await Promise.all([
    getRankingsByGameMode('global', 100),
    getRankingsByGameMode('classic_4', 100),
    getRankingsByGameMode('normal_5', 100),
    getRankingsByGameMode('free_6plus', 100),
  ]);

  const totalPlayers = new Set([...global, ...classic4, ...normal5, ...free6Plus].map(r => r.userPublicId)).size;
  const totalMatches = global.reduce((sum, r) => sum + r.totalMatches, 0) / 2;
  const averageElo = global.length > 0 
    ? Math.round(global.reduce((sum, r) => sum + r.elo, 0) / global.length)
    : 1000;

  return {
    global,
    classic4,
    normal5,
    free6Plus,
    stats: {
      totalPlayers,
      totalMatches: Math.round(totalMatches),
      averageElo,
      topClass: 'Assassino',
    },
  };
}

export default async function RankingPage() {
  const data = await fetchRankingData();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">🏆 Ranking ELO</h1>
          <p className="text-lg text-muted-foreground">
            Rankings oficiais baseados em partidas registradas por embaixadores
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{data.stats.totalPlayers}</div>
              <div className="text-sm text-muted-foreground">Jogadores</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{data.stats.totalMatches}</div>
              <div className="text-sm text-muted-foreground">Partidas</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{data.stats.averageElo}</div>
              <div className="text-sm text-muted-foreground">ELO Médio</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Crown className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{data.stats.topClass}</div>
              <div className="text-sm text-muted-foreground">Classe Top</div>
            </CardContent>
          </Card>
        </div>

        <RankingTabs rankings={data} />

        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">📊 Como funciona o ELO</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-primary">Sistema de Pontuação</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Todos começam com 1000 pontos</li>
                <li>• Ganha pontos ao vencer partidas oficiais</li>
                <li>• Perde pontos ao ser derrotado</li>
                <li>• Bônus de +3 pontos por eliminação</li>
                <li>• Variação baseada na diferença de ELO dos oponentes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Modos de Jogo</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span><strong>Clássico</strong> - 4 jogadores</span>
                </li>
                <li className="flex items-center gap-2">
                  <Swords className="w-4 h-4" />
                  <span><strong>Normal</strong> - 5 jogadores (com Assassino)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span><strong>Livre</strong> - 6+ jogadores</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Faixas de ELO</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <span><strong>1800+</strong> - Lendário</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span><strong>1600+</strong> - Mestre</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span><strong>1400+</strong> - Avançado</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                  <span><strong>1200+</strong> - Intermediário</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span><strong>&lt;1200</strong> - Iniciante</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Ranking Global</h4>
              <p className="text-sm text-muted-foreground">
                O ranking global considera o desempenho em todos os modos de jogo, 
                calculando uma média ponderada baseada no número de partidas em cada modo.
                Eliminar oponentes concede bônus de ELO adicionais.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'Ranking ELO - Tic Tic Pou',
    description: 'Rankings oficiais baseados em partidas registradas por embaixadores'
  };
}