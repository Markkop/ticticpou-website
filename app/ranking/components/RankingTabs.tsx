'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader } from '@/components/ui/card';
import { UserCard } from '@/components/ui/user-card';
import { Trophy, Target, TrendingUp, Swords } from 'lucide-react';
import type { RankingEntry } from '@/lib/types/user';

interface RankingTabsProps {
  rankings: {
    global: RankingEntry[];
    classic4: RankingEntry[];
    normal5: RankingEntry[];
    free6Plus: RankingEntry[];
  };
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
    <div className="space-y-1">
      {entries.map((entry) => (
        <UserCard
          key={entry.userId}
          user={{
            publicId: entry.userPublicId,
            displayName: entry.displayName,
            avatarUrl: entry.avatarUrl,
            elo: entry.elo,
            totalMatches: entry.totalMatches,
          }}
          rank={entry.rank}
          showStats
          showElo
          showRank
          compact
          className="mb-2"
        />
      ))}
    </div>
  );
}

export default function RankingTabs({ rankings }: RankingTabsProps) {
  const [activeTab, setActiveTab] = useState('global');

  return (
    <Card>
      <CardHeader className="p-3 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full h-auto">
            <TabsTrigger value="global" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">Global</span>
            </TabsTrigger>
            <TabsTrigger value="classic4" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Target className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">Clássico</span>
            </TabsTrigger>
            <TabsTrigger value="normal5" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <Swords className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">Normal</span>
            </TabsTrigger>
            <TabsTrigger value="free6Plus" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">Livre</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="mt-3 sm:mt-4">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Ranking Global</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Classificação combinada de todos os modos de jogo
              </p>
            </div>
            <RankingList entries={rankings.global} />
          </TabsContent>
          
          <TabsContent value="classic4" className="mt-3 sm:mt-4">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Modo Clássico</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Partidas com 4 jogadores - formato tradicional
              </p>
            </div>
            <RankingList entries={rankings.classic4} />
          </TabsContent>
          
          <TabsContent value="normal5" className="mt-3 sm:mt-4">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Modo Normal</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Partidas com 5 jogadores - inclui classe Assassino
              </p>
            </div>
            <RankingList entries={rankings.normal5} />
          </TabsContent>
          
          <TabsContent value="free6Plus" className="mt-3 sm:mt-4">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Modo Livre</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
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