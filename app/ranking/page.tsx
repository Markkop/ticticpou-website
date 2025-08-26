import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Crown, Trophy, TrendingUp, Users } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { usersService, statsService } from '@/lib/db/services';
import type { User } from '@/lib/db';
import RankingClient from './components/RankingClient';

interface RankingUser extends User {
  rank: number;
  wins: number;
  losses: number;
  winRate: number;
  change: string;
}

interface RankingPageProps {
  users: RankingUser[];
  stats: {
    totalPlayers: number;
    totalMatches: number;
    averageElo: number;
    topClass: string;
  };
}

function RankingPageComponent({ users, stats }: RankingPageProps) {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">🏆 Ranking ELO</h1>
          <p className="text-lg text-muted-foreground">
            Rankings oficiais baseados em partidas registradas por embaixadores
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.totalPlayers}</div>
              <div className="text-sm text-muted-foreground">Jogadores</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.totalMatches}</div>
              <div className="text-sm text-muted-foreground">Partidas</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.averageElo}</div>
              <div className="text-sm text-muted-foreground">ELO Médio</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Crown className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.topClass}</div>
              <div className="text-sm text-muted-foreground">Classe Top</div>
            </CardContent>
          </Card>
        </div>

        <RankingClient users={users} />

        {/* ELO Explanation */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">📊 Como funciona o ELO</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-primary">Sistema de Pontuação</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Todos começam com 1000 pontos</li>
                <li>• Ganha pontos ao vencer partidas oficiais</li>
                <li>• Perde pontos ao ser derrotado</li>
                <li>• Variação baseada na diferença de ELO dos oponentes</li>
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
    title: 'Ranking ELO - Tic Tic Pou',
    description: 'Rankings oficiais baseados em partidas registradas por embaixadores'
  };
}

export default async function RankingServerPage() {
  const [rankingUsers, globalStats] = await Promise.all([
    usersService.getRanking(100),
    statsService.getGlobalStats()
  ]);

  // Get user stats for each user
  const usersWithStats = await Promise.all(
    rankingUsers.map(async (user, index) => {
      const userStats = await statsService.getUserStats(user.id);
      return {
        ...user,
        rank: index + 1,
        wins: userStats.wins,
        losses: userStats.losses,
        winRate: userStats.winRate,
        change: '+0' // TODO: Calculate actual ELO change
      };
    })
  );

  return <RankingPageComponent users={usersWithStats} stats={globalStats} />;
}