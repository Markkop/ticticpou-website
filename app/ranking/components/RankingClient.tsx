'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Trophy } from 'lucide-react';
import type { User } from '@/lib/db';

interface RankingUser extends User {
  rank: number;
  wins: number;
  losses: number;
  winRate: number;
  change: string;
}

interface RankingClientProps {
  users: RankingUser[];
}

export default function RankingClient({ users }: RankingClientProps) {
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
    <>
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
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="p-4">
                      <Link 
                        href={`/profile/${user.stackId}`}
                        className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{user.username}</div>
                        </div>
                      </Link>
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
                      <span className="text-primary font-medium">{user.favoriteClass || 'N/A'}</span>
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
    </>
  );
}