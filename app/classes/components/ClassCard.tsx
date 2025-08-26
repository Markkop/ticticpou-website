'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Class } from '@/lib/db';

interface ClassCardProps {
  classData: Class;
}

export default function ClassCard({ classData }: ClassCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryBadge = (category: string | null) => {
    const styles: Record<string, string> = {
      base: 'bg-primary/20 text-primary',
      extra: 'bg-accent/20 text-accent-foreground',
      team: 'bg-secondary/20 text-secondary-foreground'
    };
    
    const labels: Record<string, string> = {
      base: 'Base',
      extra: 'Extra',
      team: 'Equipe'
    };

    if (!category) return null;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category]}`}>
        {labels[category]}
      </span>
    );
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl text-card-foreground">{classData.name}</CardTitle>
            {getCategoryBadge(classData.category)}
          </div>
          {classData.maxBullets !== null && classData.maxBullets > 0 && (
            <div className="text-xs text-muted-foreground">
              Max. {classData.maxBullets} bala{classData.maxBullets > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{classData.description}</p>
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {classData.specialLoadSound && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">Som para Carregar</h4>
              <p className="text-sm text-primary font-mono">&quot;{classData.specialLoadSound}&quot;</p>
            </div>
          )}
          {classData.specialUseSound && (
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">Som para Usar</h4>
              <p className="text-sm text-primary font-mono">&quot;{classData.specialUseSound}&quot;</p>
            </div>
          )}
        </div>

        {/* Gestures */}
        {(classData.specialLoadGesture || classData.specialUseGesture) && (
          <div className="space-y-2">
            {classData.specialLoadGesture && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-1">Gesto para Carregar</h4>
                <p className="text-sm text-muted-foreground">{classData.specialLoadGesture}</p>
              </div>
            )}
            {classData.specialUseGesture && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-1">Gesto para Usar</h4>
                <p className="text-sm text-muted-foreground">{classData.specialUseGesture}</p>
              </div>
            )}
          </div>
        )}

        {/* Expandable Details */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Ver Detalhes
              {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Basic Info */}
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-2">Informações Básicas</h4>
              <ul className="space-y-1">
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Máximo de {classData.maxBullets || 0} bala{(classData.maxBullets || 0) !== 1 ? 's' : ''}</span>
                </li>
                <li className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Categoria: {classData.category === 'base' ? 'Base' : classData.category === 'extra' ? 'Extra' : 'Equipe'}</span>
                </li>
                {classData.isBaseClass && (
                  <li className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Classe fundamental obrigatória</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Interactions */}
            {classData.interactions && classData.interactions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-card-foreground mb-2">Interações Especiais</h4>
                <ul className="space-y-1">
                  {classData.interactions.map((interaction, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">⚡</span>
                      <span>{interaction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}