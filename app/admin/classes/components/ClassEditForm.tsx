'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Save } from 'lucide-react';
import type { Class } from '@/lib/db';
import type { ClassFormData } from '@/lib/actions/admin-classes';

interface ClassEditFormProps {
  initialData?: Class;
  onSave: (data: ClassFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ClassEditForm({ initialData, onSave, onCancel, isLoading }: ClassEditFormProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    specialLoadSound: initialData?.specialLoadSound || '',
    specialUseSound: initialData?.specialUseSound || '',
    specialLoadGesture: initialData?.specialLoadGesture || '',
    specialUseGesture: initialData?.specialUseGesture || '',
    interactions: initialData?.interactions || [],
    isBaseClass: initialData?.isBaseClass || false,
    category: (initialData?.category as 'base' | 'extra' | 'team') || 'base',
    maxBullets: initialData?.maxBullets || 1,
  });

  const [newInteraction, setNewInteraction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof ClassFormData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addInteraction = () => {
    if (newInteraction.trim()) {
      handleInputChange('interactions', [...(formData.interactions || []), newInteraction.trim()]);
      setNewInteraction('');
    }
  };

  const removeInteraction = (index: number) => {
    const updatedInteractions = [...(formData.interactions || [])];
    updatedInteractions.splice(index, 1);
    handleInputChange('interactions', updatedInteractions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Classe *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Ex: Mago, Samurai..."
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                placeholder="Descreva as características principais da classe..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="extra">Extra</SelectItem>
                    <SelectItem value="team">Equipe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="maxBullets">Máximo de Balas</Label>
                <Input
                  id="maxBullets"
                  type="number"
                  min="0"
                  max="10"
                  value={formData.maxBullets}
                  onChange={(e) => handleInputChange('maxBullets', parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isBaseClass"
                checked={formData.isBaseClass}
                onCheckedChange={(checked) => handleInputChange('isBaseClass', checked)}
              />
              <Label htmlFor="isBaseClass">É uma classe base</Label>
            </div>
          </CardContent>
        </Card>

        {/* Sounds and Gestures */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sons e Gestos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="specialLoadSound">Som para Carregar</Label>
              <Input
                id="specialLoadSound"
                value={formData.specialLoadSound}
                onChange={(e) => handleInputChange('specialLoadSound', e.target.value)}
                placeholder='Ex: "Boom", "Plin"...'
              />
            </div>

            <div>
              <Label htmlFor="specialUseSound">Som para Usar</Label>
              <Input
                id="specialUseSound"
                value={formData.specialUseSound}
                onChange={(e) => handleInputChange('specialUseSound', e.target.value)}
                placeholder='Ex: "Explosion", "Slash"...'
              />
            </div>

            <div>
              <Label htmlFor="specialLoadGesture">Gesto para Carregar</Label>
              <Textarea
                id="specialLoadGesture"
                value={formData.specialLoadGesture}
                onChange={(e) => handleInputChange('specialLoadGesture', e.target.value)}
                placeholder="Descreva o gesto para carregar o especial..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="specialUseGesture">Gesto para Usar</Label>
              <Textarea
                id="specialUseGesture"
                value={formData.specialUseGesture}
                onChange={(e) => handleInputChange('specialUseGesture', e.target.value)}
                placeholder="Descreva o gesto para usar o especial..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interações Especiais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newInteraction}
                onChange={(e) => setNewInteraction(e.target.value)}
                placeholder="Digite uma nova interação..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInteraction())}
              />
              <Button type="button" onClick={addInteraction} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.interactions && formData.interactions.length > 0 && (
              <div className="space-y-2">
                <Label>Interações Cadastradas:</Label>
                <div className="space-y-2">
                  {formData.interactions.map((interaction, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm">{interaction}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInteraction(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading || !formData.name || !formData.description}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Salvando...' : 'Salvar Classe'}
        </Button>
      </div>
    </form>
  );
}