'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, LandPlot } from 'lucide-react';
import type { GameMode } from '@/lib/db';

interface GameModeCardProps {
  mode: GameMode;
}

function GameModeCard({ mode }: GameModeCardProps) {

  const getPlayersText = (min: number, max: number | null) => {
    if (max === null) {
      return `${min}+ jogadores`;
    }
    if (min === max) {
      return `${min} jogadores`;
    }
    return `${min} - ${max} jogadores`;
  };

  const getRankingLink = (rankingType: string | null) => {
    if (!rankingType) return null;
    
    // Map ranking types to tabs
    const tabMap: Record<string, string> = {
      'classic_4p': '4p',
      'normal_5p': '5p', 
      'free_6plus': '6p',
      'equipe': 'equipe'
    };
    
    const tab = tabMap[rankingType];
    return tab ? `/ranking#${tab}` : null;
  };

  const rankingLink = getRankingLink(mode.rankingType);

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <LandPlot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">{mode.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
            <Users className="w-3 h-3" />
            <span className="text-xs font-medium">
              {getPlayersText(mode.minPlayers, mode.maxPlayers)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
        
        {rankingLink && (
          <Link href={rankingLink}>
            <Button variant="outline" size="sm" className="w-full">
              Ver Ranking
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

interface GameModesClientProps {
  gameModes: GameMode[];
}

export default function GameModesClient({ gameModes }: GameModesClientProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Group modes by category
  const casualModes = gameModes.filter(mode => mode.category === 'casual');
  const competitiveModes = gameModes.filter(mode => mode.category === 'competitivo');
  
  // Filter modes based on selected category
  const filteredModes = gameModes.filter(mode => {
    if (filterCategory === 'all') return true;
    return mode.category === filterCategory;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={filterCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterCategory('all')}
          size="sm"
        >
          Todos
        </Button>
        <Button
          variant={filterCategory === 'casual' ? 'default' : 'outline'}
          onClick={() => setFilterCategory('casual')}
          size="sm"
        >
          Casual
        </Button>
        <Button
          variant={filterCategory === 'competitivo' ? 'default' : 'outline'}
          onClick={() => setFilterCategory('competitivo')}
          size="sm"
        >
          Competitivo
        </Button>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredModes.length} modo{filteredModes.length !== 1 ? 's' : ''} encontrado{filteredModes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Show sections when "all" is selected */}
      {filterCategory === 'all' ? (
        <div className="space-y-8">
          {/* Casual Section */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">🎲 Casual</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {casualModes.map((mode) => (
                <GameModeCard key={mode.id} mode={mode} />
              ))}
            </div>
          </div>

          {/* Competitive Section */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">🏆 Competitivo</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitiveModes.map((mode) => (
                <GameModeCard key={mode.id} mode={mode} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Filtered view */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <LandPlot className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum modo encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar o filtro de categoria
              </p>
            </div>
          ) : (
            filteredModes.map((mode) => (
              <GameModeCard key={mode.id} mode={mode} />
            ))
          )}
        </div>
      )}
    </>
  );
}