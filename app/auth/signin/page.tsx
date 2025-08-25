import Link from 'next/link';
import { SignIn } from '@stackframe/stack';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
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
          <h1 className="text-2xl font-bold text-foreground">Entrar</h1>
          <p className="text-muted-foreground mt-2">
            Acesse sua conta para participar do ranking oficial
          </p>
        </div>

        <SignIn />

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Ao entrar, você concorda com os{' '}
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