'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Target, TrendingUp, Swords, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { RankingEntry } from '@/lib/types/user';

interface RankingTabsProps {
  rankings: {
    global: RankingEntry[];
    classic4: RankingEntry[];
    normal5: RankingEntry[];
    free6Plus: RankingEntry[];
  };
}

function getRankMedal(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '';
  }
}

function getEloColor(elo: number): string {
  if (elo >= 1800) return 'text-purple-600';
  if (elo >= 1600) return 'text-blue-600';
  if (elo >= 1400) return 'text-green-600';
  if (elo >= 1200) return 'text-yellow-600';
  return 'text-gray-500';
}

function RankingList({ entries }: { entries: RankingEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum jogador ranqueado ainda neste modo
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <Link key={entry.userId} href={`/profile/${entry.userPublicId}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-muted-foreground w-12 text-center">
                    {getRankMedal(entry.rank) || `#${entry.rank}`}
                  </div>
                  <Avatar>
                    <AvatarImage src={entry.avatarUrl || undefined} />
                    <AvatarFallback>{entry.displayName[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{entry.displayName}</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.wins}V / {entry.losses}D • {entry.winRate.toFixed(1)}% WR
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getEloColor(entry.elo)}`}>
                      {entry.elo}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {entry.avgEliminations.toFixed(1)} elim/partida
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function RankingTabs({ rankings }: RankingTabsProps) {
  const [activeTab, setActiveTab] = useState('global');

  return (
    <Card>
      <CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Global</span>
            </TabsTrigger>
            <TabsTrigger value="classic" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Clássico</span>
            </TabsTrigger>
            <TabsTrigger value="normal" className="flex items-center gap-2">
              <Swords className="w-4 h-4" />
              <span className="hidden sm:inline">Normal</span>
            </TabsTrigger>
            <TabsTrigger value="free" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Livre</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Ranking Global</h3>
              <p className="text-sm text-muted-foreground">
                Classificação combinada de todos os modos de jogo
              </p>
            </div>
            <RankingList entries={rankings.global} />
          </TabsContent>
          
          <TabsContent value="classic" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Modo Clássico</h3>
              <p className="text-sm text-muted-foreground">
                Partidas com 4 jogadores - formato tradicional
              </p>
            </div>
            <RankingList entries={rankings.classic4} />
          </TabsContent>
          
          <TabsContent value="normal" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Modo Normal</h3>
              <p className="text-sm text-muted-foreground">
                Partidas com 5 jogadores - inclui classe Assassino
              </p>
            </div>
            <RankingList entries={rankings.normal5} />
          </TabsContent>
          
          <TabsContent value="free" className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Modo Livre</h3>
              <p className="text-sm text-muted-foreground">
                Partidas com 6+ jogadores - formato expandido
              </p>
            </div>
            <RankingList entries={rankings.free6Plus} />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}