import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { actionsService } from '@/lib/db/services';
import type { Action } from '@/lib/db';
import ActionsClient from './components/ActionsClient';

interface ActionsPageProps {
  actions: Action[];
}

function ActionsPageComponent({ actions }: ActionsPageProps) {
  const basicActions = actions.filter(action => action.category === 'basic');
  const specialActions = actions.filter(action => action.category === 'special');
  const finisherActions = actions.filter(action => action.category === 'finisher');

  return (
    <div className="min-h-screen bg-background">

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
          <h1 className="text-4xl font-bold text-foreground mb-4">⚔️ Ações do Jogo</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Referência completa de todas as ações disponíveis no Tic Tic Pou. Use a busca para encontrar
            rapidamente ações específicas, sons ou gestos durante suas partidas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">{basicActions.length}</div>
            <div className="text-sm text-muted-foreground">Ações Básicas</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">{specialActions.length}</div>
            <div className="text-sm text-muted-foreground">Ações Especiais</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">{finisherActions.length}</div>
            <div className="text-sm text-muted-foreground">Finalizadores</div>
          </div>
        </div>

        <ActionsClient actions={actions} />

        {/* Legend */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">🎯 Como usar esta referência</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-primary">Durante o Jogo</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use a busca para encontrar ações rapidamente</li>
                <li>• Sons e gestos são obrigatórios para validar ações</li>
                <li>• Ações especiais requerem carregamento prévio</li>
                <li>• Finalizadores só funcionam em duelos 1x1</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Categorias</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                  <span><strong>Básicas</strong> - Disponíveis para todos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span><strong>Especiais</strong> - Específicas por classe</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span><strong>Finalizadores</strong> - Apenas duelos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    title: 'Ações do Jogo - Tic Tic Pou',
    description: 'Referência completa de todas as ações disponíveis no Tic Tic Pou'
  };
}

export default async function ActionsServerPage() {
  const actions = await actionsService.getAll();
  
  return <ActionsPageComponent actions={actions} />;
}