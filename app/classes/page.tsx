'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { classes, ClassData } from '@/lib/data/classes';
import { Navigation } from '@/components/navigation';

function ClassCard({ classData }: { classData: ClassData }) {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryBadge = (category: ClassData['category']) => {
    const styles = {
      base: 'bg-primary/20 text-primary',
      extra: 'bg-accent/20 text-accent-foreground',
      team: 'bg-secondary/20 text-secondary-foreground'
    };
    
    const labels = {
      base: 'Base',
      extra: 'Extra',
      team: 'Equipe'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category]}`}>
        {labels[category]}
      </span>
    );
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl text-card-foreground">{classData.name}</CardTitle>
            {getCategoryBadge(classData.category)}
          </div>
          {classData.maxBullets > 0 && (
            <div className="text-xs text-muted-foreground">
              Max. {classData.maxBullets} bala{classData.maxBullets > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{classData.description}</p>
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {classData.specialLoadSound && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">Som para Carregar</h4>
              <p className="text-sm text-primary font-mono">&quot;{classData.specialLoadSound}&quot;</p>
            </div>
          )}
          {classData.specialUseSound && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">Som para Usar</h4>
              <p className="text-sm text-primary font-mono">&quot;{classData.specialUseSound}&quot;</p>
            </div>
          )}
        </div>

        {/* Gestures */}
        {(classData.specialLoadGesture || classData.specialUseGesture) && (
          <div className="space-y-2">
            {classData.specialLoadGesture && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-1">Gesto para Carregar</h4>
                <p className="text-sm text-muted-foreground">{classData.specialLoadGesture}</p>
              </div>
            )}
            {classData.specialUseGesture && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-1">Gesto para Usar</h4>
                <p className="text-sm text-muted-foreground">{classData.specialUseGesture}</p>
              </div>
            )}
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
            {/* Details */}
            {classData.details.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-2">Detalhes</h4>
                <ul className="space-y-1">
                  {classData.details.map((detail, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactions */}
            {classData.interactions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-2">Interações Especiais</h4>
                <ul className="space-y-1">
                  {classData.interactions.map((interaction, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">⚡</span>
                      <span>{interaction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples */}
            {classData.examples && classData.examples.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-2">Exemplos</h4>
                <ul className="space-y-1">
                  {classData.examples.map((example, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-secondary mt-1">📝</span>
                      <span>{example}</span>
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

export default function ClassesPage() {
  const baseClasses = classes.filter(c => c.category === 'base');
  const extraClasses = classes.filter(c => c.category === 'extra');
  const teamClasses = classes.filter(c => c.category === 'team');

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
          <h1 className="text-4xl font-bold text-foreground mb-4">Classes do Tic Tic Pou</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Conheça todas as classes disponíveis no jogo. Cada classe possui habilidades especiais únicas 
            que transformam a experiência do jogo tradicional. Clique em &quot;Ver Detalhes&quot; para conhecer 
            as interações específicas de cada classe.
          </p>
        </div>

        {/* Base Classes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            Classes Base
            <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-medium">
              {baseClasses.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            As quatro classes fundamentais do jogo. É necessário ter no mínimo um jogador de cada classe base em uma partida.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {baseClasses.map((classData) => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
          </div>
        </section>

        {/* Extra Classes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            Classes Extra
            <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full text-sm font-medium">
              {extraClasses.length}
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Classes complementares que devem ser adicionadas após os jogadores dominarem as classes base. 
            Recomenda-se começar pelo Assassino e Finalizador.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {extraClasses.map((classData) => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
          </div>
        </section>

        {/* Team Classes */}
        {teamClasses.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              Classes de Equipe
              <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-sm font-medium">
                {teamClasses.length}
              </span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Classes específicas para o modo Em Equipe, focadas em suporte e colaboração entre aliados.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {teamClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">💡 Dicas para Iniciantes</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Comece aprendendo apenas as 4 classes base antes de adicionar outras</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>O Noviço é recomendado para jogadores completamente iniciantes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Adicione o Assassino e Finalizador após dominar as classes base</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Classes de Equipe são exclusivas para partidas 3x3 ou maiores</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}