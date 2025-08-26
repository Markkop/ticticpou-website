'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Users, MapPin, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

interface Match {
  id: string;
  ambassadorId: string;
  gameMode: string;
  location: string | null;
  playedAt: Date;
  createdAt: Date;
  ambassador: {
    username: string;
  } | null;
}

interface MatchesClientProps {
  matches: Match[];
}

function MatchRow({ match }: { match: Match }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
                  <div className="font-medium text-primary">{match.gameMode}</div>
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
                    {match.ambassador?.username || 'N/A'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    @{match.ambassador?.username || 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">PARTICIPANTES</div>
                  <div className="flex items-center gap-1 text-primary">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">0</span> {/* TODO: Get actual participant count */}
                  </div>
                </div>
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
              
              {/* TODO: This will be populated when we have participants data */}
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Dados dos participantes não disponíveis</p>
                <p className="text-sm">Esta funcionalidade será implementada em breve</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export default function MatchesClient({ matches }: MatchesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<string>('all');
  
  // Get unique game modes for filter
  const gameModes = Array.from(new Set(matches.map(match => match.gameMode))).sort();
  
  // Filter matches based on search and filter
  const filteredMatches = matches.filter(match => {
    const matchesSearch = searchTerm === '' || 
      match.gameMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.ambassador?.username.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesMode = filterMode === 'all' || match.gameMode === filterMode;
    
    return matchesSearch && matchesMode;
  });

  return (
    <>
      {/* Search and Filters */}
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
              {mode}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredMatches.length} partida{filteredMatches.length !== 1 ? 's' : ''} encontrada{filteredMatches.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Matches List */}
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
            <MatchRow key={match.id} match={match} />
          ))
        )}
      </div>
    </>
  );
}