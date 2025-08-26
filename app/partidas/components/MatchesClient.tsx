'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, MapPin, ChevronDown, ChevronUp, Trophy, Plus, Edit2 } from 'lucide-react';
import MatchEditor from './MatchEditor';

interface MatchParticipant {
  userId: string;
  userPublicId: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  className: string;
  placement: number;
  isWinner: boolean;
  eliminations: number;
  eloChange: number;
  eloAfter: number;
}

interface Match {
  id: string;
  ambassadorId: string;
  gameMode: string;
  location: string | null;
  playedAt: Date;
  createdAt: Date;
  ambassador: {
    id: string;
    publicId: string;
    displayName: string;
  } | null;
  participants?: MatchParticipant[];
}

interface UserData {
  id: string;
  displayName: string;
  isAmbassador: boolean;
  role: 'user' | 'ambassador' | 'super-admin';
}

interface MatchesClientProps {
  matches: Match[];
  currentUserData?: UserData | null;
}

function MatchRow({ match, canEdit, onEdit }: { match: Match; canEdit: boolean; onEdit: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getGameModeName = (mode: string) => {
    const names: Record<string, string> = {
      'classic_4': 'Clássico',
      'normal_5': 'Normal',
      'free_6plus': 'Livre',
    };
    return names[mode] || mode;
  };

  return (
    <Card className="border-border bg-card hover:shadow-md transition-all duration-200 shadow-sm mb-4">
      <CardContent className="p-0">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-6 hover:bg-muted/30 cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[80px]">
                  <div className="text-xs text-muted-foreground mb-1">DATA</div>
                  <div className="font-medium text-foreground flex flex-col">
                    <span>{new Date(match.playedAt).toLocaleDateString('pt-BR')}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(match.playedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                
                <div className="text-center min-w-[120px]">
                  <div className="text-xs text-muted-foreground mb-1">MODO DE JOGO</div>
                  <div className="font-medium text-primary">{getGameModeName(match.gameMode)}</div>
                </div>
                
                <div className="text-center min-w-[120px]">
                  <div className="text-xs text-muted-foreground mb-1">LOCAL</div>
                  <div className="font-medium text-foreground flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {match.location || 'Não informado'}
                  </div>
                </div>
                
                <div className="text-center min-w-[120px]">
                  <div className="text-xs text-muted-foreground mb-1">EMBAIXADOR</div>
                  <div className="font-medium text-foreground">
                    {match.ambassador?.displayName || 'N/A'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    @{match.ambassador?.displayName || 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">PARTICIPANTES</div>
                  <div className="flex items-center gap-1 text-primary">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{match.participants?.length || 0}</span>
                  </div>
                </div>
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    title="Editar partida"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
                {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="border-t border-border bg-muted/20 p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Participantes e Resultados
              </h4>
              
              {match.participants && match.participants.length > 0 ? (
                <div className="grid gap-2">
                  {match.participants
                    .sort((a, b) => a.placement - b.placement)
                    .map((participant) => (
                      <div
                        key={participant.userId}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          participant.isWinner ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-background/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-muted-foreground w-8">
                            {participant.placement}º
                          </span>
                          <Avatar className="w-10 h-10 border-2 border-primary">
                            <AvatarImage src={participant.avatarUrl || undefined} />
                            <AvatarFallback>{participant.displayName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {participant.displayName || 'Usuário desconhecido'}
                              {participant.isWinner && <Trophy className="w-4 h-4 text-yellow-500" />}
                            </div>
                            <div className="text-sm text-muted-foreground">{participant.className}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Eliminações</div>
                            <div className="font-medium">{participant.eliminations}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">ELO</div>
                            <div className={`font-medium ${participant.eloChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {participant.eloChange > 0 ? '+' : ''}{participant.eloChange}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Total</div>
                            <div className="font-bold">{participant.eloAfter}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Dados dos participantes não disponíveis</p>
                  <p className="text-sm">Esta funcionalidade será implementada em breve</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export default function MatchesClient({ matches, currentUserData }: MatchesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<string>('all');
  const [isAddingMatch, setIsAddingMatch] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [localMatches, setLocalMatches] = useState(matches);

  useEffect(() => {
    setLocalMatches(matches);
  }, [matches]);

  const canCreateMatches = currentUserData && (currentUserData.role === 'super-admin' || currentUserData.isAmbassador);
  const canEditMatch = (match: Match) => {
    if (!currentUserData) return false;
    if (currentUserData.role === 'super-admin') return true;
    return currentUserData.isAmbassador && match.ambassadorId === currentUserData.id;
  };

  const gameModes = Array.from(new Set(localMatches.map(match => match.gameMode))).sort();
  
  const filteredMatches = localMatches.filter(match => {
    const matchesSearch = searchTerm === '' || 
      match.gameMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.ambassador?.displayName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesMode = filterMode === 'all' || match.gameMode === filterMode;
    
    return matchesSearch && matchesMode;
  });

  const handleMatchSaved = () => {
    setIsAddingMatch(false);
    setEditingMatch(null);
    window.location.reload();
  };

  return (
    <>
      {canCreateMatches && !isAddingMatch && !editingMatch && (
        <div className="mb-6">
          <Button
            onClick={() => setIsAddingMatch(true)}
            className="w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Nova Partida
          </Button>
        </div>
      )}

      {(isAddingMatch || editingMatch) && currentUserData && (
        <div className="mb-6">
          <MatchEditor
            ambassadorId={currentUserData.id}
            ambassadorName={currentUserData.displayName}
            existingMatch={editingMatch ? {
              id: editingMatch.id,
              gameMode: editingMatch.gameMode as 'classic_4' | 'normal_5' | 'free_6plus',
              location: editingMatch.location || undefined,
              playedAt: editingMatch.playedAt,
              participants: editingMatch.participants?.map(p => ({
                userId: p.userId,
                displayName: p.displayName || undefined,
                avatarUrl: p.avatarUrl || undefined,
                className: p.className,
                eliminations: p.eliminations,
                isWinner: p.isWinner,
                placement: p.placement,
              })) || [],
            } : undefined}
            onSave={handleMatchSaved}
            onCancel={() => {
              setIsAddingMatch(false);
              setEditingMatch(null);
            }}
          />
        </div>
      )}

      {!isAddingMatch && !editingMatch && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por local, embaixador ou modo de jogo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterMode === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterMode('all')}
                size="sm"
              >
                Todos
              </Button>
              {gameModes.map(mode => (
                <Button
                  key={mode}
                  variant={filterMode === mode ? 'default' : 'outline'}
                  onClick={() => setFilterMode(mode)}
                  size="sm"
                >
                  {mode === 'classic_4' ? 'Clássico' : mode === 'normal_5' ? 'Normal' : mode === 'free_6plus' ? 'Livre' : mode}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredMatches.length} partida{filteredMatches.length !== 1 ? 's' : ''} encontrada{filteredMatches.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-0">
            {filteredMatches.length === 0 ? (
              <Card className="border-border bg-card shadow-sm">
                <CardContent className="p-12 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma partida encontrada</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterMode !== 'all' 
                      ? 'Tente ajustar seus filtros de busca'
                      : 'Ainda não há partidas registradas no sistema'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMatches.map((match) => (
                <MatchRow 
                  key={match.id} 
                  match={match}
                  canEdit={canEditMatch(match)}
                  onEdit={() => setEditingMatch(match)}
                />
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}