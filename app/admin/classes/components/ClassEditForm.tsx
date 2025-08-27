'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EmojiInput } from '@/components/ui/emoji-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Save } from 'lucide-react';
import Image from 'next/image';
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
    heartNumber: initialData?.heartNumber || 1,
    classIcon: initialData?.classIcon || '',
    specialIcon: initialData?.specialIcon || '',
    specialText: initialData?.specialText || '',
    orderPriority: initialData?.orderPriority || 0,
    imageUrl: initialData?.imageUrl || '',
  });

  const [newInteraction, setNewInteraction] = useState('');
  
  // Helper function to determine special icon type
  const getSpecialIconType = (specialIcon: string) => {
    if (specialIcon === '__HEART_SVG__') return 'heart';
    if (specialIcon === '__BULLET_SVG__') return 'bullet';
    if (!specialIcon) return 'two-bullets'; // Empty for two bullets
    return 'custom';
  };
  
  const [specialIconType, setSpecialIconType] = useState<'heart' | 'bullet' | 'two-bullets' | 'custom'>(
    getSpecialIconType(formData.specialIcon || '')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof ClassFormData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialIconTypeChange = (type: 'heart' | 'bullet' | 'two-bullets' | 'custom') => {
    setSpecialIconType(type);
    
    // Update specialIcon based on selected type
    let newSpecialIcon = '';
    switch (type) {
      case 'heart':
        newSpecialIcon = '__HEART_SVG__'; // Special marker for heart SVG
        break;
      case 'bullet':
        newSpecialIcon = '__BULLET_SVG__'; // Special marker for bullet SVG
        break;
      case 'two-bullets':
        newSpecialIcon = ''; // Empty for two bullets
        break;
      case 'custom':
        // Keep existing custom emoji or use default
        newSpecialIcon = formData.specialIcon && !formData.specialIcon?.startsWith('__') ? formData.specialIcon : '✨';
        break;
    }
    
    handleInputChange('specialIcon', newSpecialIcon);
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
                <Label htmlFor="orderPriority">Ordem de Exibição</Label>
                <Input
                  id="orderPriority"
                  type="number"
                  min="0"
                  value={formData.orderPriority}
                  onChange={(e) => handleInputChange('orderPriority', parseInt(e.target.value) || 0)}
                  placeholder="0 = primeiro"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
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

              <div>
                <Label htmlFor="heartNumber">Número de Vidas</Label>
                <Input
                  id="heartNumber"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.heartNumber}
                  onChange={(e) => handleInputChange('heartNumber', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <Label>Ícone da Classe (não exibido)</Label>
                <EmojiInput
                  value={formData.classIcon || ''}
                  onChange={(value) => handleInputChange('classIcon', value)}
                  placeholder="Digite um emoji para o ícone da classe"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Este ícone não é exibido atualmente, mas pode ser usado no futuro
                </p>
              </div>
              
              <div>
                <Label>Ícone Especial (exibido no card)</Label>
                <RadioGroup
                  value={specialIconType}
                  onValueChange={(value) => handleSpecialIconTypeChange(value as 'heart' | 'bullet' | 'two-bullets' | 'custom')}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="heart" id="heart-form" />
                    <Label htmlFor="heart-form" className="text-sm flex items-center gap-1">
                      <Image src="/heart.svg" alt="Heart" width={16} height={16} />
                      Coração
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bullet" id="bullet-form" />
                    <Label htmlFor="bullet-form" className="text-sm flex items-center gap-1">
                      <Image src="/bullet.svg" alt="Bullet" width={16} height={16} />
                      Bala
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="two-bullets" id="two-bullets-form" />
                    <Label htmlFor="two-bullets-form" className="text-sm flex items-center gap-1">
                      <Image src="/bullet.svg" alt="Bullet" width={16} height={16} />
                      <Image src="/bullet.svg" alt="Bullet" width={16} height={16} />
                      Duas Balas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom-form" />
                    <Label htmlFor="custom-form" className="text-sm">
                      Emoji Personalizado
                    </Label>
                  </div>
                </RadioGroup>
                
                {specialIconType === 'custom' && (
                  <div className="mt-3">
                    <EmojiInput
                      value={formData.specialIcon || ''}
                      onChange={(value) => handleInputChange('specialIcon', value)}
                      placeholder="Digite um emoji para o ícone especial"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">URL da Imagem (opcional)</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Se preenchido, substituirá a imagem padrão da classe
              </p>
            </div>

            <div>
              <Label htmlFor="specialText">Texto Especial (exibido no card)</Label>
              <Input
                id="specialText"
                value={formData.specialText}
                onChange={(e) => handleInputChange('specialText', e.target.value)}
                placeholder="Ex: Especial"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Texto que aparece na seção especial do card
              </p>
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