'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Shield, Sword, Zap } from 'lucide-react';
import type { Action } from '@/lib/db';

interface ActionCardProps {
  action: Action;
}

function ActionCard({ action }: ActionCardProps) {
  const getCategoryIcon = (category: Action['category']) => {
    const icons: Record<string, React.ReactElement> = {
      basic: <Shield className="w-5 h-5" />,
      special: <Zap className="w-5 h-5" />,
      finisher: <Sword className="w-5 h-5" />
    };
    return icons[category] || <Shield className="w-5 h-5" />;
  };

  const getCategoryBadge = (category: Action['category']) => {
    const styles: Record<string, string> = {
      basic: 'bg-chart-2/20 text-green-700',
      special: 'bg-primary/20 text-primary',
      finisher: 'bg-destructive/20 text-red-700'
    };
    
    const labels: Record<string, string> = {
      basic: 'Básica',
      special: 'Especial',
      finisher: 'Finalizador'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category] || styles.basic}`}>
        {labels[category] || category}
      </span>
    );
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getCategoryIcon(action.category)}
            <CardTitle className="text-xl text-card-foreground">{action.name}</CardTitle>
            {getCategoryBadge(action.category)}
          </div>
          {action.className && (
            <div className="text-xs text-muted-foreground">
              Classe: {action.className}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{action.description}</p>
        
        {/* Sound and Gesture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {action.sound && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">Som</h4>
              <p className="text-sm text-primary font-mono">&quot;{action.sound}&quot;</p>
            </div>
          )}
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-1">Gesto</h4>
            <p className="text-sm text-muted-foreground">{action.gesture || 'Não especificado'}</p>
          </div>
        </div>

        {/* Requirements */}
        {action.requirements && action.requirements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Requisitos</h4>
            <ul className="space-y-1">
              {action.requirements.map((requirement, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-amber-600 mt-1">⚠️</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Effects */}
        {action.effects && action.effects.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Efeitos</h4>
            <ul className="space-y-1">
              {action.effects.map((effect, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactions */}
        {action.interactions && action.interactions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Interações Especiais</h4>
            <ul className="space-y-1">
              {action.interactions.map((interaction, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-blue-600 mt-1">⚡</span>
                  <span>{interaction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Vulnerability indicator */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${action.vulnerable ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-xs text-muted-foreground">
              {action.vulnerable ? 'Vulnerável durante execução' : 'Não vulnerável'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActionsClientProps {
  actions: Action[];
}

export default function ActionsClient({ actions }: ActionsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredActions = useMemo(() => {
    if (!searchTerm) return actions;
    
    const term = searchTerm.toLowerCase();
    return actions.filter(action => 
      action.name.toLowerCase().includes(term) ||
      action.description.toLowerCase().includes(term) ||
      action.sound?.toLowerCase().includes(term) ||
      action.gesture?.toLowerCase().includes(term) ||
      action.className?.toLowerCase().includes(term) ||
      action.category.toLowerCase().includes(term) ||
      action.effects?.some(effect => effect.toLowerCase().includes(term)) ||
      action.interactions?.some(interaction => interaction.toLowerCase().includes(term))
    );
  }, [actions, searchTerm]);

  const basicActions = filteredActions.filter(action => action.category === 'basic');
  const specialActions = filteredActions.filter(action => action.category === 'special');
  const finisherActions = filteredActions.filter(action => action.category === 'finisher');

  return (
    <>
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar ações por nome, som, gesto ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-2">
            {filteredActions.length} ação{filteredActions.length !== 1 ? 'ões' : ''} encontrada{filteredActions.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Basic Actions */}
      {basicActions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-600" />
            Ações Básicas
            <span className="bg-chart-2/20 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
              {basicActions.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Ações disponíveis para todas as classes. Formam a base do gameplay.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {basicActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </section>
      )}

      {/* Special Actions */}
      {specialActions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            Ações Especiais
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {specialActions.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Ações específicas de cada classe. Requerem carregamento prévio e têm efeitos únicos.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {specialActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </section>
      )}

      {/* Finisher Actions */}
      {finisherActions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Sword className="w-6 h-6 text-red-700" />
            Finalizadores
            <span className="bg-destructive/20 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
              {finisherActions.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Ações especiais para duelos 1x1. Usadas para finalizar partidas equilibradas.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {finisherActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredActions.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma ação encontrada</h3>
          <p className="text-muted-foreground">
            Tente buscar por nome da ação, som, gesto ou classe específica
          </p>
        </div>
      )}
    </>
  );
}