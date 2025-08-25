'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ArrowLeft, Users, Target, Zap } from 'lucide-react';
import { gameModes, mechanics, GameModeData } from '@/lib/data/game-modes';
import { Navigation } from '@/components/navigation';

function GameModeCard({ mode }: { mode: GameModeData }) {
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyBadge = (difficulty: GameModeData['difficulty']) => {
    const styles = {
      iniciante: 'bg-chart-2/20 text-green-700',
      intermediario: 'bg-chart-5/20 text-yellow-700', 
      avancado: 'bg-destructive/20 text-red-700'
    };
    
    const labels = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[difficulty]}`}>
        {labels[difficulty]}
      </span>
    );
  };

  const getCategoryIcon = (category: GameModeData['category']) => {
    const icons = {
      classic: <Target className="w-4 h-4" />,
      variant: <Zap className="w-4 h-4" />,
      team: <Users className="w-4 h-4" />,
      tournament: <Target className="w-4 h-4" />
    };
    return icons[category];
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
            {getDifficultyBadge(mode.difficulty)}
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
            {mode.category === 'classic' && '🎯 Clássico'}
            {mode.category === 'variant' && '⚡ Variante'}
            {mode.category === 'team' && '👥 Equipe'}
            {mode.category === 'tournament' && '🏆 Torneio'}
          </div>
        </div>

        {/* New Classes Preview */}
        {mode.newClasses && mode.newClasses.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-1">Classes Exclusivas</h4>
            <div className="flex gap-2">
              {mode.newClasses.map((className) => (
                <span 
                  key={className}
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
                {mode.rules.map((rule, index) => (
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

function MechanicCard({ mechanic }: { mechanic: { id: string; name: string; description: string; rules: string[]; balancing?: string[] } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-card-foreground">{mechanic.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{mechanic.description}</p>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full">
              Ver Regras
              {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-2">Regras</h4>
              <ul className="space-y-1">
                {mechanic.rules.map((rule: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {mechanic.balancing && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-2">Balanceamento</h4>
                <ul className="space-y-1">
                  {mechanic.balancing.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">⚖️</span>
                      <span>{item}</span>
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

export default function GameModesPage() {
  const classicModes = gameModes.filter(m => m.category === 'classic');
  const variantModes = gameModes.filter(m => m.category === 'variant');
  const teamModes = gameModes.filter(m => m.category === 'team');
  const tournamentModes = gameModes.filter(m => m.category === 'tournament');

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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Modos de Jogo</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Descubra todas as formas de jogar Tic Tic Pou com Classes. Desde o modo clássico até variantes 
            competitivas e de equipe. Cada modo oferece uma experiência única e desafios diferentes.
          </p>
        </div>

        {/* Classic Modes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            🎯 Modos Clássicos
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {classicModes.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            O modo tradicional que todo jogador deve aprender primeiro.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {classicModes.map((mode) => (
              <GameModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </section>

        {/* Variant Modes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            ⚡ Variantes
            <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full text-sm font-medium">
              {variantModes.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Modos alternativos que modificam as regras básicas para experiências únicas.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {variantModes.map((mode) => (
              <GameModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </section>

        {/* Team Modes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            👥 Modos de Equipe
            <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium">
              {teamModes.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Jogar em equipes abre possibilidades para estratégias colaborativas e classes de suporte.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {teamModes.map((mode) => (
              <GameModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </section>

        {/* Tournament Modes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            🏆 Torneios
            <span className="bg-chart-4/20 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
              {tournamentModes.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Formatos competitivos com sistema de pontuação e regras específicas para competições.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {tournamentModes.map((mode) => (
              <GameModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </section>

        {/* Game Mechanics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">🔧 Mecânicas Especiais</h2>
          <p className="text-muted-foreground mb-8">
            Regras e mecânicas avançadas que complementam os modos de jogo.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mechanics.map((mechanic) => (
              <MechanicCard key={mechanic.id} mechanic={mechanic} />
            ))}
          </div>
        </section>

        {/* Learning Path */}
        <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">📚 Caminho de Aprendizagem</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">1</div>
              <h4 className="font-medium mb-2">Jogo Base</h4>
              <p className="text-sm text-muted-foreground">
                Aprenda as 3 ações básicas: defender, recarregar e atirar
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">2</div>
              <h4 className="font-medium mb-2">Classes Base</h4>
              <p className="text-sm text-muted-foreground">
                Adicione as 4 classes base + Noviço no modo Clássico
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">3</div>
              <h4 className="font-medium mb-2">Expansão</h4>
              <p className="text-sm text-muted-foreground">
                Explore classes extras, modos variantes e mecânicas avançadas
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}