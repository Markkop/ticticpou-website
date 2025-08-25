'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Shield, Sword, Zap } from 'lucide-react';
import { actions, ActionData } from '@/lib/data/actions';
import { Navigation } from '@/components/navigation';

function ActionCard({ action }: { action: ActionData }) {
  const getCategoryIcon = (category: ActionData['category']) => {
    const icons = {
      basic: <Shield className="w-5 h-5" />,
      special: <Zap className="w-5 h-5" />,
      finisher: <Sword className="w-5 h-5" />
    };
    return icons[category];
  };

  const getCategoryBadge = (category: ActionData['category']) => {
    const styles = {
      basic: 'bg-chart-2/20 text-green-700',
      special: 'bg-primary/20 text-primary',
      finisher: 'bg-destructive/20 text-red-700'
    };
    
    const labels = {
      basic: 'Básica',
      special: 'Especial',
      finisher: 'Finalizador'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category]}`}>
        {labels[category]}
      </span>
    );
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              {getCategoryIcon(action.category)}
            </div>
            <CardTitle className="text-lg text-card-foreground">{action.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getCategoryBadge(action.category)}
            {action.vulnerable && (
              <span className="px-2 py-1 bg-destructive/10 text-red-600 text-xs rounded-full">
                Vulnerável
              </span>
            )}
          </div>
        </div>
        {action.className && (
          <div className="text-sm text-muted-foreground">
            Classe: <span className="text-primary font-medium">{action.className}</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{action.description}</p>
        
        {/* Sound and Gesture */}
        <div className="grid grid-cols-1 gap-3">
          {action.sound && (
            <div>
              <h4 className="text-xs font-medium text-card-foreground mb-1">Som</h4>
              <p className="text-sm text-primary font-mono bg-primary/5 px-2 py-1 rounded">
                &quot;{action.sound}&quot;
              </p>
            </div>
          )}
          <div>
            <h4 className="text-xs font-medium text-card-foreground mb-1">Gesto</h4>
            <p className="text-sm text-muted-foreground">{action.gesture}</p>
          </div>
        </div>

        {/* Requirements */}
        {action.requirements && action.requirements.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-card-foreground mb-1">Requisitos</h4>
            <ul className="space-y-1">
              {action.requirements.map((req, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">⚠️</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Effects */}
        <div>
          <h4 className="text-xs font-medium text-card-foreground mb-1">Efeitos</h4>
          <ul className="space-y-1">
            {action.effects.map((effect, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactions */}
        {action.interactions && action.interactions.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-card-foreground mb-1">Interações</h4>
            <ul className="space-y-1">
              {action.interactions.map((interaction, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">⚡</span>
                  <span>{interaction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ActionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActions = useMemo(() => {
    if (!searchTerm) return actions;
    
    const searchLower = searchTerm.toLowerCase();
    return actions.filter(action =>
      action.name.toLowerCase().includes(searchLower) ||
      action.description.toLowerCase().includes(searchLower) ||
      action.className?.toLowerCase().includes(searchLower) ||
      action.sound?.toLowerCase().includes(searchLower) ||
      action.gesture.toLowerCase().includes(searchLower) ||
      action.effects.some(effect => effect.toLowerCase().includes(searchLower)) ||
      action.interactions?.some(interaction => interaction.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  const basicActions = filteredActions.filter(a => a.category === 'basic');
  const specialActions = filteredActions.filter(a => a.category === 'special');
  const finisherActions = filteredActions.filter(a => a.category === 'finisher');

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
          <h1 className="text-4xl font-bold text-foreground mb-4">Ações do Jogo</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            Todas as ações possíveis no Tic Tic Pou com Classes. Use a barra de busca para encontrar 
            rapidamente informações sobre gestos, sons, efeitos e interações específicas.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar ações, sons, efeitos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Search Results Summary */}
        {searchTerm && (
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredActions.length === 0 
              ? 'Nenhuma ação encontrada'
              : `${filteredActions.length} ação${filteredActions.length > 1 ? 'ões' : ''} encontrada${filteredActions.length > 1 ? 's' : ''}`
            }
            {searchTerm && (
              <span> para &quot;<span className="text-primary font-medium">{searchTerm}</span>&quot;</span>
            )}
          </div>
        )}

        {filteredActions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma ação encontrada para sua busca.</p>
              <p className="text-sm mt-2">
                Tente termos como: &quot;defender&quot;, &quot;kadabra&quot;, &quot;mago&quot;, &quot;vulnerable&quot;
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Basic Actions */}
            {basicActions.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-chart-2" />
                  Ações Básicas
                  <span className="bg-chart-2/20 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    {basicActions.length}
                  </span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  As três ações fundamentais que todos os jogadores podem usar.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  Habilidades únicas de cada classe que definem seu estilo de jogo.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <Sword className="w-6 h-6 text-red-600" />
                  Finalizadores
                  <span className="bg-destructive/20 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                    {finisherActions.length}
                  </span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ação especial para resolver duelos 1x1 de forma dinâmica.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {finisherActions.map((action) => (
                    <ActionCard key={action.id} action={action} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Game Tips */}
        {!searchTerm && (
          <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">💡 Dicas Importantes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-red-600">⚠️ Estados Vulneráveis</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Durante carregamento de qualquer ação especial</li>
                  <li>• Ao usar ações especiais (exceto Katchim)</li>
                  <li>• Errar som ou gesto deixa vulnerável</li>
                  <li>• Perder ritmo = eliminação imediata</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-primary">✨ Interações Chave</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Samurai countera Mago com timing certo</li>
                  <li>• Assassino só mata quem está defendendo</li>
                  <li>• Ladrão é forte vs Mago/Samurai</li>
                  <li>• Noviço se defende automaticamente ao atirar</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}