'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Plus, X, Trophy, Users, QrCode, Edit2, Trash2, Save } from 'lucide-react';
import { createMatch, updateMatch, deleteMatch } from '@/lib/data/matches';
import { classes } from '@/lib/data/classes';
import { searchUsers } from '@/lib/data/users';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

const QrReader = dynamic(() => import('react-qr-reader').then((mod) => mod.QrReader), { 
  ssr: false 
});

type GameMode = 'classic_4' | 'normal_5' | 'free_6plus';

interface ParticipantSlot {
  userId?: string;
  username?: string;
  avatarUrl?: string;
  className?: string;
  eliminations: number;
  isWinner: boolean;
  placement?: number;
}

interface MatchEditorProps {
  ambassadorId: string;
  ambassadorName: string;
  existingMatch?: {
    id: string;
    gameMode: GameMode;
    location?: string;
    playedAt: Date;
    participants: ParticipantSlot[];
  };
  onSave?: () => void;
  onCancel?: () => void;
}

const gameModeConfig = {
  classic_4: { name: 'Clássico', players: 4, classes: ['mago', 'samurai', 'padre', 'cangaceiro'] },
  normal_5: { name: 'Normal', players: 5, classes: ['mago', 'samurai', 'padre', 'cangaceiro', 'assassino'] },
  free_6plus: { name: 'Livre', players: 6, classes: ['all'] },
};

export default function MatchEditor({ ambassadorId, ambassadorName, existingMatch, onSave, onCancel }: MatchEditorProps) {
  const [gameMode, setGameMode] = useState<GameMode>(existingMatch?.gameMode || 'classic_4');
  const [location, setLocation] = useState(existingMatch?.location || '');
  const [playedAt, setPlayedAt] = useState(() => {
    if (existingMatch?.playedAt) {
      const date = new Date(existingMatch.playedAt);
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });
  const [participants, setParticipants] = useState<ParticipantSlot[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningSlot, setScanningSlot] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{id: string; username: string; avatarUrl?: string}[]>([]);
  const [searchingSlot, setSearchingSlot] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const playerCount = gameMode === 'free_6plus' ? 6 : gameModeConfig[gameMode].players;
    const newParticipants: ParticipantSlot[] = [];
    
    for (let i = 0; i < playerCount; i++) {
      if (existingMatch && existingMatch.participants[i]) {
        newParticipants.push(existingMatch.participants[i]);
      } else {
        newParticipants.push({
          eliminations: 0,
          isWinner: false,
        });
      }
    }
    
    setParticipants(newParticipants);
  }, [gameMode, existingMatch]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchUsers(query);
      // Filter out users who are already selected in any slot
      const selectedUserIds = new Set(
        participants
          .filter(p => p.userId)
          .map(p => p.userId)
      );
      
      const filteredResults = results.filter(user => !selectedUserIds.has(user.id));
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Erro ao buscar usuários');
    } finally {
      // Search completed
    }
  }, [participants]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, handleSearch]);

  // Re-run search when participants change to update filtered results
  useEffect(() => {
    if (searchQuery && searchQuery.length >= 2) {
      handleSearch(searchQuery);
    }
  }, [participants, searchQuery, handleSearch]);

  const handleSelectUser = (slotIndex: number, user: {id: string; username: string; avatarUrl?: string}) => {
    const newParticipants = [...participants];
    newParticipants[slotIndex] = {
      ...newParticipants[slotIndex],
      userId: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
    };
    setParticipants(newParticipants);
    setSearchingSlot(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleQrScan = (result: {text: string} | null) => {
    if (result && scanningSlot !== null) {
      try {
        const userData = JSON.parse(result.text);
        if (userData.userId && userData.username) {
          handleSelectUser(scanningSlot, {
            id: userData.userId,
            username: userData.username,
            avatarUrl: userData.avatarUrl,
          });
          
          const nextEmptySlot = participants.findIndex((p, i) => i > scanningSlot && !p.userId);
          if (nextEmptySlot !== -1) {
            setScanningSlot(nextEmptySlot);
          } else {
            setIsScanning(false);
            setScanningSlot(null);
          }
          
          toast.success(`${userData.username} adicionado!`);
        }
      } catch (error) {
        console.error('Invalid QR code:', error);
      }
    }
  };

  const handleClassSelect = (slotIndex: number, className: string) => {
    const newParticipants = [...participants];
    newParticipants[slotIndex].className = className;
    setParticipants(newParticipants);
  };

  const handleEliminationsChange = (slotIndex: number, eliminations: number) => {
    const newParticipants = [...participants];
    newParticipants[slotIndex].eliminations = Math.max(0, eliminations);
    setParticipants(newParticipants);
  };

  const handleWinnerToggle = (slotIndex: number) => {
    const newParticipants = [...participants];
    newParticipants[slotIndex].isWinner = !newParticipants[slotIndex].isWinner;
    setParticipants(newParticipants);
  };

  const calculatePlacements = () => {
    const sorted = [...participants]
      .map((p, i) => ({ ...p, index: i }))
      .sort((a, b) => {
        if (a.isWinner && !b.isWinner) return -1;
        if (!a.isWinner && b.isWinner) return 1;
        return b.eliminations - a.eliminations;
      });

    let placement = 1;
    sorted.forEach((participant, index) => {
      if (index > 0 && (participant.isWinner !== sorted[index - 1].isWinner || participant.eliminations !== sorted[index - 1].eliminations)) {
        placement = index + 1;
      }
      participant.placement = placement;
    });

    const placementMap = new Map(sorted.map(p => [p.index, p.placement]));
    return participants.map((p, i) => ({
      ...p,
      placement: placementMap.get(i) || 1,
    }));
  };

  const handleSave = async () => {
    const filledParticipants = participants.filter(p => p.userId && p.className);
    
    if (filledParticipants.length < 3) {
      toast.error('Mínimo de 3 jogadores necessário');
      return;
    }

    if (!filledParticipants.some(p => p.isWinner)) {
      toast.error('Pelo menos um jogador deve ser vencedor');
      return;
    }

    setIsSaving(true);
    
    try {
      const participantsWithPlacements = calculatePlacements()
        .filter(p => p.userId && p.className)
        .map(p => ({
          userId: p.userId!,
          className: p.className!,
          placement: p.placement!,
          eliminations: p.eliminations,
        }));

      const matchData = {
        ambassadorId,
        gameMode,
        location: location || undefined,
        playedAt: new Date(playedAt),
        participants: participantsWithPlacements,
      };

      if (existingMatch) {
        await updateMatch(existingMatch.id, matchData);
        toast.success('Partida atualizada com sucesso!');
      } else {
        await createMatch(matchData);
        toast.success('Partida criada com sucesso!');
      }

      onSave?.();
    } catch (error) {
      console.error('Error saving match:', error);
      toast.error('Erro ao salvar partida');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingMatch) return;
    
    if (!confirm('Tem certeza que deseja deletar esta partida? O ELO dos jogadores será revertido.')) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteMatch(existingMatch.id);
      toast.success('Partida deletada com sucesso!');
      onSave?.();
    } catch (error) {
      console.error('Error deleting match:', error);
      toast.error('Erro ao deletar partida');
    } finally {
      setIsSaving(false);
    }
  };

  const availableClasses = gameMode === 'free_6plus' 
    ? classes.filter(c => c.category !== 'team')
    : classes.filter(c => gameModeConfig[gameMode].classes.includes(c.id));

  return (
    <Card className="border-primary bg-card/50 backdrop-blur shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            {existingMatch ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {existingMatch ? 'Editar Partida' : 'Nova Partida'}
          </h3>
          <div className="flex gap-2">
            {existingMatch && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isSaving}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Deletar
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-1" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Modo de Jogo</label>
            <div className="flex gap-1">
              {Object.entries(gameModeConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant={gameMode === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGameMode(key as GameMode)}
                  className="flex-1"
                >
                  {config.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Data</label>
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={playedAt}
                onChange={(e) => setPlayedAt(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Local (opcional)</label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Ex: Praça Central"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Jogadores
            </h4>
            {participants.some(p => !p.userId) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const firstEmptySlot = participants.findIndex(p => !p.userId);
                  if (firstEmptySlot !== -1) {
                    setIsScanning(true);
                    setScanningSlot(firstEmptySlot);
                  }
                }}
              >
                <QrCode className="w-4 h-4 mr-1" />
                Escanear QR
              </Button>
            )}
          </div>

          {isScanning && (
            <div className="mb-4 p-4 border rounded-lg bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Escaneando para posição {(scanningSlot || 0) + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsScanning(false);
                    setScanningSlot(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="aspect-square max-w-xs mx-auto">
                <QrReader
                  onResult={handleQrScan}
                  constraints={{ facingMode: 'environment' }}
                />
              </div>
            </div>
          )}

          <div className="grid gap-3">
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-background/50">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                  
                  {participant.userId ? (
                    <>
                      <Avatar className="w-10 h-10 border-2 border-primary">
                        <AvatarImage src={participant.avatarUrl} />
                        <AvatarFallback>{participant.username?.[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{participant.username}</div>
                        <select
                          className="text-sm bg-transparent border rounded px-2 py-1 mt-1"
                          value={participant.className || ''}
                          onChange={(e) => handleClassSelect(index, e.target.value)}
                        >
                          <option value="">Selecionar classe</option>
                          {availableClasses.map(cls => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : searchingSlot === index ? (
                    <div className="flex-1">
                      <Input
                        placeholder="Buscar jogador..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        onBlur={() => {
                          setTimeout(() => {
                            setSearchingSlot(null);
                            setSearchQuery('');
                            setSearchResults([]);
                          }, 200);
                        }}
                      />
                      {(searchResults.length > 0 || (searchQuery && searchQuery.length >= 2)) && (
                        <div className="absolute z-10 mt-1 bg-background border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {searchResults.length > 0 ? (
                            searchResults.map(user => (
                              <button
                                key={user.id}
                                className="flex items-center gap-2 w-full p-2 hover:bg-muted text-left"
                                onMouseDown={() => handleSelectUser(index, user)}
                              >
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={user.avatarUrl} />
                                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{user.username}</span>
                              </button>
                            ))
                          ) : (
                            <div className="p-3 text-sm text-muted-foreground text-center">
                              {searchQuery.length >= 2 ? (
                                <span>Nenhum usuário disponível encontrado</span>
                              ) : (
                                <span>Digite pelo menos 2 caracteres</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className="flex-1 flex items-center justify-center gap-2 p-2 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary transition-colors"
                      onClick={() => setSearchingSlot(index)}
                    >
                      <Plus className="w-5 h-5" />
                      <span className="text-sm text-muted-foreground">Adicionar jogador</span>
                    </button>
                  )}
                </div>

                {participant.userId && (
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <label className="text-xs text-muted-foreground">Elim.</label>
                      <Input
                        type="number"
                        className="w-12 h-8 text-center"
                        value={participant.eliminations}
                        onChange={(e) => handleEliminationsChange(index, parseInt(e.target.value) || 0)}
                        min={0}
                        max={participants.length - 1}
                      />
                    </div>
                    
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        participant.isWinner 
                          ? 'bg-yellow-500/20 text-yellow-500' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      onClick={() => handleWinnerToggle(index)}
                      title={participant.isWinner ? 'Vencedor' : 'Marcar como vencedor'}
                    >
                      <Trophy className="w-4 h-4" />
                    </button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newParticipants = [...participants];
                        newParticipants[index] = {
                          eliminations: 0,
                          isWinner: false,
                        };
                        setParticipants(newParticipants);
                        // Clear search results so the removed user becomes available again
                        if (searchQuery && searchQuery.length >= 2) {
                          handleSearch(searchQuery);
                        }
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {gameMode === 'free_6plus' && (
              <Button
                variant="outline"
                onClick={() => {
                  setParticipants([
                    ...participants,
                    { eliminations: 0, isWinner: false }
                  ]);
                }}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar jogador
              </Button>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-4">
          <p>• Embaixador: {ambassadorName}</p>
          <p>• ELO será calculado automaticamente baseado nas colocações</p>
          <p>• Múltiplos vencedores são permitidos (empate)</p>
        </div>
      </CardContent>
    </Card>
  );
}