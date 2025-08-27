'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, X, Users, Trophy } from 'lucide-react';
import type { GameMode } from '@/lib/db';
import { updateGameMode, createGameMode, deleteGameMode, type GameModeFormData } from '@/lib/actions/admin-game-modes';
import { toast } from 'sonner';
import GameModeEditForm from './GameModeEditForm';

interface AdminGameModesClientProps {
  gameModes: GameMode[];
}

export default function AdminGameModesClient({ gameModes }: AdminGameModesClientProps) {
  const [editingGameModeIds, setEditingGameModeIds] = useState<Set<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (gameMode: GameMode) => {
    setEditingGameModeIds(prev => new Set(prev).add(gameMode.id));
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingGameModeIds(new Set());
  };

  const handleSave = async (gameModeId: string | undefined, formData: GameModeFormData) => {
    startTransition(async () => {
      try {
        if (isCreating) {
          await createGameMode(formData);
          toast.success("Modo de jogo criado com sucesso!");
        } else if (gameModeId) {
          await updateGameMode(gameModeId, formData);
          toast.success("Modo de jogo atualizado com sucesso!");
        }
        
        if (gameModeId) {
          setEditingGameModeIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(gameModeId);
            return newSet;
          });
        }
        setIsCreating(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro desconhecido");
      }
    });
  };

  const handleDelete = async (gameMode: GameMode) => {
    if (!confirm(`Tem certeza que deseja excluir o modo "${gameMode.name}"?`)) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteGameMode(gameMode.id);
        toast.success("Modo de jogo excluído com sucesso!");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro desconhecido");
      }
    });
  };

  const handleCancel = (gameModeId?: string) => {
    if (gameModeId) {
      setEditingGameModeIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(gameModeId);
        return newSet;
      });
    }
    setIsCreating(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'casual': return 'bg-blue-100 text-blue-800';
      case 'competitivo': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'casual': return 'Casual';
      case 'competitivo': return 'Competitivo';
      default: return 'Não definido';
    }
  };

  const getRankingLabel = (rankingType: string | null) => {
    const labels: Record<string, string> = {
      'classic_4p': 'Clássico 4p',
      'normal_5p': 'Normal 5p',
      'free_6plus': 'Livre 6p+',
      'equipe': 'Equipe'
    };
    return rankingType ? labels[rankingType] || rankingType : null;
  };

  const getPlayersText = (min: number, max: number | null) => {
    if (max === null) {
      return `${min}+ jogadores`;
    }
    if (min === max) {
      return `${min} jogadores`;
    }
    return `${min} - ${max} jogadores`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Modos de Jogo Cadastrados</h2>
          <p className="text-sm text-gray-600">
            {gameModes.length} modos no total
          </p>
        </div>
        <Button onClick={handleCreate} disabled={isPending}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Modo de Jogo
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Criar Novo Modo de Jogo
              <Button variant="outline" size="sm" onClick={() => handleCancel()}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GameModeEditForm
              onSave={(formData) => handleSave(undefined, formData)}
              onCancel={() => handleCancel()}
              isLoading={isPending}
            />
          </CardContent>
        </Card>
      )}

      {/* Game Modes List */}
      <div className="grid gap-4">
        {gameModes.map((gameMode) => (
          <Card key={gameMode.id} className="relative">
            {editingGameModeIds.has(gameMode.id) ? (
              // Inline Edit Mode
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Editando: {gameMode.name}</h3>
                </div>
                <GameModeEditForm
                  gameMode={gameMode}
                  onSave={(formData) => handleSave(gameMode.id, formData)}
                  onCancel={() => handleCancel(gameMode.id)}
                  isLoading={isPending}
                />
              </CardContent>
            ) : (
              // Display Mode
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{gameMode.name}</h3>
                      <Badge className={getCategoryColor(gameMode.category)}>
                        {getCategoryLabel(gameMode.category)}
                      </Badge>
                      {gameMode.rankingType && (
                        <Badge variant="outline" className="text-orange-600">
                          <Trophy className="w-3 h-3 mr-1" />
                          {getRankingLabel(gameMode.rankingType)}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        <Users className="w-3 h-3 mr-1" />
                        {getPlayersText(gameMode.minPlayers, gameMode.maxPlayers)}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{gameMode.description}</p>
                    
                    <div className="text-sm text-gray-500">
                      Criado em: {new Date(gameMode.createdAt).toLocaleDateString('pt-BR')}
                      {gameMode.updatedAt && (
                        <span className="ml-4">
                          Atualizado em: {new Date(gameMode.updatedAt).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(gameMode)}
                      disabled={isPending}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(gameMode)}
                      disabled={isPending}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {gameModes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Nenhum modo de jogo cadastrado.</p>
            <Button className="mt-4" onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Modo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}