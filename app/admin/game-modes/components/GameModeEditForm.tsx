'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { GameMode } from '@/lib/db';
import type { GameModeFormData } from '@/lib/actions/admin-game-modes';

interface GameModeEditFormProps {
  gameMode?: GameMode;
  onSave: (data: GameModeFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const RANKING_OPTIONS = [
  { value: 'none', label: 'Nenhum ranking' },
  { value: 'classic_4p', label: 'Clássico 4p' },
  { value: 'normal_5p', label: 'Normal 5p' },
  { value: 'free_6plus', label: 'Livre 6p+' },
  { value: 'equipe', label: 'Equipe' },
];

export default function GameModeEditForm({ gameMode, onSave, onCancel, isLoading }: GameModeEditFormProps) {
  const [formData, setFormData] = useState<GameModeFormData>({
    name: gameMode?.name || '',
    description: gameMode?.description || '',
    minPlayers: gameMode?.minPlayers || 3,
    maxPlayers: gameMode?.maxPlayers || undefined,
    category: gameMode?.category || 'casual',
    rankingType: gameMode?.rankingType || undefined,
  });

  const [rankingValue, setRankingValue] = useState(gameMode?.rankingType || 'none');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      rankingType: rankingValue === 'none' ? undefined : rankingValue,
    };
    await onSave(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select
            value={formData.category}
            onValueChange={(value: 'casual' | 'competitivo') => setFormData({ ...formData, category: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="competitivo">Competitivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minPlayers">Mín. Jogadores *</Label>
          <Input
            id="minPlayers"
            type="number"
            min="2"
            max="20"
            value={formData.minPlayers}
            onChange={(e) => setFormData({ ...formData, minPlayers: parseInt(e.target.value) || 3 })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPlayers">Máx. Jogadores</Label>
          <Input
            id="maxPlayers"
            type="number"
            min={formData.minPlayers}
            max="50"
            value={formData.maxPlayers || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              maxPlayers: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            disabled={isLoading}
            placeholder="Ilimitado"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rankingType">Tipo de Ranking</Label>
          <Select
            value={rankingValue}
            onValueChange={(value) => setRankingValue(value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {RANKING_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
}