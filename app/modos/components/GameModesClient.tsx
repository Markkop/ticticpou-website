'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Users, Target, Zap } from 'lucide-react';
import type { GameMode } from '@/lib/db';

interface GameModeCardProps {
  mode: GameMode;
}

function GameModeCard({ mode }: GameModeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyBadge = (difficulty: string) => {
    const styles: Record<string, string> = {
      iniciante: 'bg-chart-2/20 text-green-700',
      intermediario: 'bg-chart-5/20 text-yellow-700', 
      avancado: 'bg-destructive/20 text-red-700'
    };
    
    const labels: Record<string, string> = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[difficulty] || styles.iniciante}`}>
        {labels[difficulty] || difficulty}
      </span>
    );
  };

  const getCategoryIcon = (category: string | null) => {
    const icons: Record<string, React.ReactElement> = {
      classic: <Target className="w-4 h-4" />,
      variant: <Zap className="w-4 h-4" />,
      team: <Users className="w-4 h-4" />,
      tournament: <Target className="w-4 h-4" />
    };
    return icons[category || 'classic'] || <Target className="w-4 h-4" />;
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              {getCategoryIcon(mode.category)}
            </div>
            <CardTitle className="text-xl text-card-foreground">{mode.name}</CardTitle>
            {getDifficultyBadge(mode.difficulty || 'iniciante')}
          </div>
          <div className="text-xs text-muted-foreground">
            {mode.minPlayers}-{mode.maxPlayers || '∞'} jogadores
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{mode.description}</p>
        
        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm">
              {mode.minPlayers}{mode.maxPlayers ? `-${mode.maxPlayers}` : '+'} jogadores
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {(mode.category || 'classic') === 'classic' && '🎯 Clássico'}
            {(mode.category || 'classic') === 'variant' && '⚡ Variante'}
            {(mode.category || 'classic') === 'team' && '👥 Equipe'}
            {(mode.category || 'classic') === 'tournament' && '🏆 Torneio'}
          </div>
        </div>

        {/* New Classes Preview */}
        {mode.newClasses && mode.newClasses.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-1">Classes Exclusivas</h4>
            <div className="flex gap-2 flex-wrap">
              {mode.newClasses.map((className, index) => (
                <span 
                  key={`${className}-${index}`}
                  className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full"
                >
                  {className}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Details */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Ver Detalhes
              {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Rules */}
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-2">Regras</h4>
              <ul className="space-y-1">
                {(mode.rules as string[] || []).map((rule, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Features */}
            {mode.specialFeatures && mode.specialFeatures.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-2">Características Especiais</h4>
                <ul className="space-y-1">
                  {mode.specialFeatures.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">⭐</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

interface GameModesClientProps {
  gameModes: GameMode[];
}

export default function GameModesClient({ gameModes }: GameModesClientProps) {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  
  // Filter game modes by difficulty
  const filteredModes = gameModes.filter(mode => {
    if (filterDifficulty === 'all') return true;
    return (mode.difficulty || 'iniciante') === filterDifficulty;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={filterDifficulty === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterDifficulty('all')}
          size="sm"
        >
          Todos
        </Button>
        <Button
          variant={filterDifficulty === 'iniciante' ? 'default' : 'outline'}
          onClick={() => setFilterDifficulty('iniciante')}
          size="sm"
        >
          Iniciante
        </Button>
        <Button
          variant={filterDifficulty === 'intermediario' ? 'default' : 'outline'}
          onClick={() => setFilterDifficulty('intermediario')}
          size="sm"
        >
          Intermediário
        </Button>
        <Button
          variant={filterDifficulty === 'avancado' ? 'default' : 'outline'}
          onClick={() => setFilterDifficulty('avancado')}
          size="sm"
        >
          Avançado
        </Button>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredModes.length} modo{filteredModes.length !== 1 ? 's' : ''} encontrado{filteredModes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Game Modes List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredModes.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum modo encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar o filtro de dificuldade
            </p>
          </div>
        ) : (
          filteredModes.map((mode) => (
            <GameModeCard key={mode.id} mode={mode} />
          ))
        )}
      </div>
    </>
  );
}