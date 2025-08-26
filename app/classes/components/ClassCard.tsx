'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import type { Class } from '@/lib/db';

interface ClassCardProps {
  classData: Class;
  hideTitle?: boolean;
}

export default function ClassCard({ classData, hideTitle }: ClassCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const getSpecialEmoji = () => {
    switch (classData.name) {
      case 'Mago':
        return { emoji: '💥', text: 'Explosão', useBulletSvgs: false };
      case 'Samurai':
        return { emoji: '⚔️', text: 'Contra-ataque', useBulletSvgs: false };
      case 'Padre':
        return { emoji: '✝️', text: 'Vida Extra', useBulletSvgs: false };
      case 'Cangaceiro':
        return { emoji: '', text: 'Duas Balas', useBulletSvgs: true };
      case 'Novico':
        return { emoji: '☕', text: 'Café com leite', useBulletSvgs: false };
      case 'Assassino':
        return { emoji: '🗡️', text: 'Apunhalar', useBulletSvgs: false };
      case 'Ladrao':
        return { emoji: '🎭', text: 'Roubar', useBulletSvgs: false };
      case 'Kabalista':
        return { emoji: '⏱️', text: 'Contagem', useBulletSvgs: false };
      case 'Metamorfo':
        return { emoji: '🧪', text: 'Transformar', useBulletSvgs: false };
      case 'Pacificador':
        return { emoji: '✋', text: 'Cancelar', useBulletSvgs: false };
      case 'Paramedico':
        return { emoji: '⚡', text: 'Reviver', useBulletSvgs: false };
      default:
        return { emoji: '✨', text: 'Especial', useBulletSvgs: false };
    }
  };

  const getClassImage = () => {
    switch (classData.name) {
      case 'Mago':
        return '/classes-img/mago.jpg';
      case 'Samurai':
        return '/classes-img/espada.jpg';
      case 'Padre':
        return '/classes-img/padre.jpg';
      case 'Cangaceiro':
        return '/classes-img/canga.jpg';
      default:
        return null;
    }
  };
  
  const getCardColorClass = () => {
    switch (classData.category) {
      case 'base':
        return 'border-orange-900/30 bg-gradient-to-br from-orange-950/20 to-orange-900/10';
      case 'extra':
        return 'border-purple-900/30 bg-gradient-to-br from-purple-950/20 to-purple-900/10';
      case 'team':
        return 'border-blue-900/30 bg-gradient-to-br from-blue-950/20 to-blue-900/10';
      default:
        return 'border-border bg-card';
    }
  };
  
  const specialInfo = getSpecialEmoji();
  const classImage = getClassImage();
  const shouldHideTitle = hideTitle !== undefined ? hideTitle : !!classImage;
  const maxLives = classData.name === 'Padre' ? 2 : 1;
  const currentLives = 1;
  const maxBullets = classData.maxBullets || 0;
  const currentBullets = 0;


  return (
    <Card className={`hover:shadow-lg transition-all duration-200 shadow-sm overflow-hidden ${getCardColorClass()} py-0`}>
      <div className="relative">
        {/* Class Name Overlay */}
        {!shouldHideTitle && (
          <div className="absolute top-4 left-4 z-10">
            <h3 className="text-2xl font-bold text-black drop-shadow-lg">
              {classData.name}
            </h3>
          </div>
        )}
        
        {/* Image Section - full size */}
        <div className="relative h-48 md:h-64">
          {classImage ? (
            <Image
              src={classImage}
              alt={classData.name}
              fill
              className="object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent">
              <span className="text-6xl">{specialInfo.emoji}</span>
            </div>
          )}
        </div>
        
        {/* Bottom Stats Section - 1/3 of card */}
        <CardContent className="p-0">
          <div className="grid grid-cols-3 border-t border-card-foreground/30">
            {/* Lives Section */}
            <div className="p-3 border-r border-card-foreground/30 flex items-center justify-center gap-2">
              <Image 
                src="/heart.svg" 
                alt="Vidas" 
                width={20} 
                height={20}
                className=""
              />
              <span className="text-sm font-medium text-muted-foreground">
                {currentLives}/{maxLives}
              </span>
            </div>
            
            {/* Bullets Section */}
            <div className="p-3 border-r border-card-foreground/30 flex items-center justify-center gap-2">
              <Image 
                src="/bullet.svg" 
                alt="Balas" 
                width={20} 
                height={20}
                className=""
              />
              <span className="text-sm font-medium text-muted-foreground">
                {currentBullets}/{maxBullets}
              </span>
            </div>
            
            {/* Special Section */}
            <div className="p-3 flex items-center justify-center gap-2">
              {specialInfo.useBulletSvgs ? (
                <div className="flex gap-0">
                  <Image src="/bullet.svg" alt="Bala" width={16} height={16} className="" />
                  <Image src="/bullet.svg" alt="Bala" width={16} height={16} className="" />
                </div>
              ) : (
                <span className="text-lg">{specialInfo.emoji}</span>
              )}
              <span className="text-xs font-medium">{specialInfo.text}</span>
            </div>
          </div>

          {/* Description always visible */}
          <div className=" py-2 border-t border-card-foreground/30">
            <div className="px-4">
              <p className="text-sm text-muted-foreground">{classData.description}</p>
            </div>
          </div>

          {/* Expandable Details */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full border-t border-card-foreground/30 rounded-t-none">
                Ver Detalhes
                {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 space-y-4">
              
              {/* Sounds */}
              {(classData.specialLoadSound || classData.specialUseSound) && (
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
              )}
              
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
      </div>
    </Card>
  );
}