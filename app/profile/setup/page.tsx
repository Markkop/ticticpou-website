'use client';

import { useState } from 'react';
import { useUser } from '@stackframe/stack';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfileSetupPage() {
  const user = useUser({ or: "redirect" });
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [avatar, setAvatar] = useState('');
  const [favoriteClass, setFavoriteClass] = useState('');
  const [favoriteMode, setFavoriteMode] = useState('');
  const [otherInterests, setOtherInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await user.update({
        displayName: displayName,
      });

      // TODO: Save additional profile data to your database
      // This would include username, favoriteClass, favoriteMode, etc.
      
      router.push('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement file upload
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Configure seu Perfil</CardTitle>
            <p className="text-muted-foreground">
              Complete suas informações para participar do ranking oficial
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl text-muted-foreground">👤</span>
                    )}
                  </div>
                  <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90">
                    <Upload className="w-3 h-3" />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Clique para adicionar uma foto de perfil
                </p>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={user.primaryEmail || ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Nome de usuário *
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="exemplo: joao_123"
                  required
                  maxLength={20}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Apenas letras minúsculas, números e underscore. Único e permanente.
                </p>
              </div>

              {/* Display Name */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-foreground mb-2">
                  Nome de exibição *
                </label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Como você quer ser chamado"
                  required
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Este nome aparecerá no ranking e partidas.
                </p>
              </div>

              {/* Favorite Class */}
              <div>
                <label htmlFor="favoriteClass" className="block text-sm font-medium text-foreground mb-2">
                  Classe favorita
                </label>
                <Select value={favoriteClass} onValueChange={setFavoriteClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha sua classe favorita" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhuma preferência</SelectItem>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <SelectItem value="Atirador">Atirador</SelectItem>
                    <SelectItem value="Tanque">Tanque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Favorite Game Mode */}
              <div>
                <label htmlFor="favoriteMode" className="block text-sm font-medium text-foreground mb-2">
                  Modo de jogo favorito
                </label>
                <Select value={favoriteMode} onValueChange={setFavoriteMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha seu modo favorito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhuma preferência</SelectItem>
                    <SelectItem value="Clássico">Clássico</SelectItem>
                    <SelectItem value="Equipes">Equipes</SelectItem>
                    <SelectItem value="Eliminação">Eliminação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Other Interests */}
              <div>
                <label htmlFor="otherInterests" className="block text-sm font-medium text-foreground mb-2">
                  Outros interesses
                </label>
                <Textarea
                  id="otherInterests"
                  value={otherInterests}
                  onChange={(e) => setOtherInterests(e.target.value)}
                  placeholder="Conte um pouco sobre você, outros jogos que gosta, etc."
                  maxLength={500}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Opcional. Será usado para criar estatísticas da comunidade.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !username || !displayName}
              >
                {isLoading ? 'Criando perfil...' : 'Finalizar Cadastro'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* What happens next */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">🚀 Próximos Passos</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="text-primary">1.</span>
              <span>Seu perfil será criado com ELO inicial de 1000 pontos</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">2.</span>
              <span>Procure por embaixadores em sua região para partidas oficiais</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">3.</span>
              <span>Participe do ranking e acompanhe seu progresso</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">4.</span>
              <span>Conecte-se com a comunidade e aprenda novas estratégias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}