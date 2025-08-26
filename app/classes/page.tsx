import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Class } from '@/lib/db';
import { Navigation } from '@/components/navigation';
import { classesService } from '@/lib/db/services';
import ClassCard from './components/ClassCard';

interface ClassesPageProps {
  classes: Class[];
}

function ClassesPageComponent({ classes }: ClassesPageProps) {
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

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    title: 'Classes do Tic Tic Pou',
    description: 'Conheça todas as classes disponíveis no jogo Tic Tic Pou'
  };
}

export default async function ClassesServerPage() {
  const classes = await classesService.getAll();
  
  return <ClassesPageComponent classes={classes} />;
}