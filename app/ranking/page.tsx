'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown, Trophy, TrendingUp, Users } from 'lucide-react';
import { Navigation } from '@/components/navigation';

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    rank: 1,
    username: 'magestre_supreme',
    displayName: 'Mago Supremo',
    elo: 1847,
    wins: 34,
    losses: 8,
    favoriteClass: 'Mago',
    winRate: 80.9,
    change: '+15'
  },
  {
    id: '2',
    rank: 2,
    username: 'samurai_honor',
    displayName: 'Honrado Samurai',
    elo: 1792,
    wins: 41,
    losses: 12,
    favoriteClass: 'Samurai',
    winRate: 77.4,
    change: '+8'
  },
  {
    id: '3',
    rank: 3,
    username: 'padre_bless',
    displayName: 'Padre Abençoado',
    elo: 1756,
    wins: 28,
    losses: 9,
    favoriteClass: 'Padre',
    winRate: 75.7,
    change: '-3'
  },
  {
    id: '4',
    rank: 4,
    username: 'bang_bang',
    displayName: 'Cangaceiro Veloz',
    elo: 1689,
    wins: 22,
    losses: 11,
    favoriteClass: 'Cangaceiro',
    winRate: 66.7,
    change: '+12'
  },
  {
    id: '5',
    rank: 5,
    username: 'shadow_stab',
    displayName: 'Assassino Sombrio',
    elo: 1634,
    wins: 19,
    losses: 15,
    favoriteClass: 'Assassino',
    winRate: 55.9,
    change: '+5'
  },
];

const mockStats = {
  totalPlayers: 156,
  totalMatches: 423,
  averageElo: 1247,
  topClass: 'Mago'
};

export default function RankingPage() {
  const [filter, setFilter] = useState<'all' | 'friends' | 'region'>('all');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-yellow-600" />;
    return <span className="text-muted-foreground font-medium">#{rank}</span>;
  };

  const getEloColor = (elo: number) => {
    if (elo >= 1800) return 'text-purple-600 font-bold';
    if (elo >= 1600) return 'text-blue-600 font-semibold';
    if (elo >= 1400) return 'text-green-600';
    if (elo >= 1200) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-muted-foreground';
  };

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
              <div className="text-2xl font-bold text-foreground">{mockStats.totalPlayers}</div>
              <div className="text-sm text-muted-foreground">Jogadores</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{mockStats.totalMatches}</div>
              <div className="text-sm text-muted-foreground">Partidas</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{mockStats.averageElo}</div>
              <div className="text-sm text-muted-foreground">ELO Médio</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Crown className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{mockStats.topClass}</div>
              <div className="text-sm text-muted-foreground">Classe Top</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button 
            variant={filter === 'friends' ? 'default' : 'outline'}
            onClick={() => setFilter('friends')}
            disabled
          >
            Amigos (Em breve)
          </Button>
          <Button 
            variant={filter === 'region' ? 'default' : 'outline'}
            onClick={() => setFilter('region')}
            disabled
          >
            Região (Em breve)
          </Button>
        </div>

        {/* Ranking Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Ranking Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Posição</th>
                    <th className="text-left p-4 font-medium text-foreground">Jogador</th>
                    <th className="text-center p-4 font-medium text-foreground">ELO</th>
                    <th className="text-center p-4 font-medium text-foreground">V/D</th>
                    <th className="text-center p-4 font-medium text-foreground">Taxa Vitória</th>
                    <th className="text-center p-4 font-medium text-foreground">Classe Fav.</th>
                    <th className="text-center p-4 font-medium text-foreground">Mudança</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(user.rank)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.displayName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{user.displayName}</div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-lg font-bold ${getEloColor(user.elo)}`}>
                          {user.elo}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-green-600 font-medium">{user.wins}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-red-600 font-medium">{user.losses}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-medium">{user.winRate}%</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-primary font-medium">{user.favoriteClass}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-medium ${getChangeColor(user.change)}`}>
                          {user.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

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