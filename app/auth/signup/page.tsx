import Link from 'next/link';
import { SignUp } from '@stackframe/stack';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie sua conta no Tic Tic Pou e participe do ranking oficial, registre partidas e acompanhe suas estatísticas.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/auth/signup',
  },
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Link>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Criar Conta</h1>
          <p className="text-muted-foreground mt-2">
            Junte-se à comunidade oficial do Tic Tic Pou
          </p>
        </div>

        <SignUp />

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Ao criar uma conta, você concorda com os{' '}
            <Link href="/termos" className="text-primary hover:text-primary/80">
              Termos de Uso
            </Link>
            {' '}e{' '}
            <Link href="/privacidade" className="text-primary hover:text-primary/80">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}