'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save } from 'lucide-react';
import type { Class } from '@/lib/db';
import type { ClassFormData } from '@/lib/actions/admin-classes';

interface InlineClassEditProps {
  classData: Class;
  onSave: (data: ClassFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function InlineClassEdit({ classData, onSave, onCancel, isLoading }: InlineClassEditProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    name: classData.name,
    description: classData.description,
    specialLoadSound: classData.specialLoadSound || '',
    specialUseSound: classData.specialUseSound || '',
    specialLoadGesture: classData.specialLoadGesture || '',
    specialUseGesture: classData.specialUseGesture || '',
    interactions: classData.interactions || [],
    isBaseClass: classData.isBaseClass || false,
    category: (classData.category as 'base' | 'extra' | 'team') || 'base',
    maxBullets: classData.maxBullets || 1,
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

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'base': return 'bg-orange-100 text-orange-800';
      case 'extra': return 'bg-purple-100 text-purple-800';
      case 'team': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string | null) => {
    switch (category) {
      case 'base': return 'Base';
      case 'extra': return 'Extra';
      case 'team': return 'Equipe';
      default: return 'Não definida';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header with inline editing */}
          <div className="flex items-center gap-3 mb-2">
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-lg font-semibold border-dashed border-orange-300 bg-orange-50/30 focus:bg-white h-8 w-auto min-w-[120px]"
              required
            />
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange('category', value)}
            >
              <SelectTrigger className={`w-auto h-6 text-xs border-dashed ${getCategoryColor(formData.category)}`}>
                <SelectValue>{getCategoryLabel(formData.category)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="extra">Extra</SelectItem>
                <SelectItem value="team">Equipe</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isBaseClass}
                onCheckedChange={(checked) => handleInputChange('isBaseClass', checked)}
                className="scale-75"
              />
              <span className="text-xs">Base</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="10"
                value={formData.maxBullets}
                onChange={(e) => handleInputChange('maxBullets', parseInt(e.target.value) || 1)}
                className="w-12 h-6 text-xs text-center border-dashed border-gray-300"
              />
              <span className="text-xs">bala{formData.maxBullets !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          {/* Description */}
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="text-gray-600 mb-3 border-dashed border-gray-300 bg-gray-50/30 focus:bg-white resize-none"
            rows={2}
            required
          />
          
          {/* Sounds and Gestures - inline style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">Som p/ Carregar:</span>
              <Input
                value={formData.specialLoadSound}
                onChange={(e) => handleInputChange('specialLoadSound', e.target.value)}
                className="h-6 text-blue-600 border-dashed border-blue-300 bg-blue-50/30 focus:bg-white flex-1"
                placeholder="Ex: Abra, Uh..."
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">Som p/ Usar:</span>
              <Input
                value={formData.specialUseSound}
                onChange={(e) => handleInputChange('specialUseSound', e.target.value)}
                className="h-6 text-blue-600 border-dashed border-blue-300 bg-blue-50/30 focus:bg-white flex-1"
                placeholder="Ex: Kadabra, Katchim..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="font-medium mt-1">Gesto p/ Carregar:</span>
              <Textarea
                value={formData.specialLoadGesture}
                onChange={(e) => handleInputChange('specialLoadGesture', e.target.value)}
                className="text-gray-700 border-dashed border-gray-300 bg-gray-50/30 focus:bg-white flex-1 resize-none"
                rows={1}
                placeholder="Descreva o gesto..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="font-medium mt-1">Gesto p/ Usar:</span>
              <Textarea
                value={formData.specialUseGesture}
                onChange={(e) => handleInputChange('specialUseGesture', e.target.value)}
                className="text-gray-700 border-dashed border-gray-300 bg-gray-50/30 focus:bg-white flex-1 resize-none"
                rows={1}
                placeholder="Descreva o gesto..."
              />
            </div>
          </div>

          {/* Interactions */}
          <div className="mt-3">
            <span className="font-medium text-sm">Interações:</span>
            
            {/* Add new interaction */}
            <div className="flex gap-2 mt-2 mb-2">
              <Input
                value={newInteraction}
                onChange={(e) => setNewInteraction(e.target.value)}
                placeholder="Digite uma nova interação..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInteraction())}
                className="text-sm border-dashed border-gray-300 bg-gray-50/30 focus:bg-white"
              />
              <Button type="button" onClick={addInteraction} size="sm" variant="outline">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Existing interactions */}
            <ul className="mt-1 space-y-1">
              {formData.interactions?.map((interaction, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2 group">
                  <span className="text-orange-500 mt-1">⚡</span>
                  <Input
                    value={interaction}
                    onChange={(e) => {
                      const updatedInteractions = [...(formData.interactions || [])];
                      updatedInteractions[index] = e.target.value;
                      handleInputChange('interactions', updatedInteractions);
                    }}
                    className="flex-1 text-sm border-dashed border-gray-300 bg-gray-50/30 focus:bg-white h-7"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeInteraction(index)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 h-7 w-7 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </li>
              )) || []}
            </ul>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 ml-4">
          <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isLoading}>
            <X className="w-4 h-4" />
          </Button>
          <Button type="submit" size="sm" disabled={isLoading || !formData.name || !formData.description}>
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}