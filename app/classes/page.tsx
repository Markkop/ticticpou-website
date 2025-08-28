import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Class } from '@/lib/db';
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
      <main className="container mx-auto max-w-[1000px] px-4 py-8">
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
            O jogo base é composto por 4 classes: Mago, Espadachim, Padre e Cangaceiro. Novos jogadores podem começar excepcionalmente com o Noviço e conforme o 
            jogo é explicado, novas classes são introduzidas como o Assassino, Kabalista, Ladrão e Pacificador.
          </p>
        </div>

        {/* Base Classes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            Classes Base
          </h2>
          <p className="text-muted-foreground mb-8">
            Idealmente, toda partida precisa ter pelo menos um jogador de cada classe base.
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
          </h2>
          <p className="text-muted-foreground mb-8">
            Classes complementares que devem ser adicionadas após os jogadores dominarem as classes base. 
            O Assassino ajuda em partidas com muitas defesas e o Kabalista tem uma dinâmica diferente.
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


      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    title: 'Classes',
    description: 'Explore as classes do Tic Tic Pou: Mago, Espadachim, Padre, Cangaceiro e mais. Cada classe possui habilidades únicas e estratégias especiais.',
    keywords: 'classes tic tic pou, personagens tic tic pou, mago, espadachim, padre, cangaceiro, assassino, kabalista',
    openGraph: {
      title: 'Classes do Tic Tic Pou',
      description: 'Conheça todas as classes com habilidades únicas: Mago, Espadachim, Padre, Cangaceiro e mais.',
      type: 'website',
      url: '/classes',
    },
    alternates: {
      canonical: '/classes',
    },
  };
}

export default async function ClassesServerPage() {
  const classes = await classesService.getAll();
  
  return <ClassesPageComponent classes={classes} />;
}