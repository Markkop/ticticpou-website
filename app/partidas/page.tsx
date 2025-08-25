'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Search, Calendar, Users, MapPin, ChevronDown, ChevronUp, Crown, Trophy } from 'lucide-react';
import { Navigation } from '@/components/navigation';

// Mock data for demonstration
const mockMatches = [
  {
    id: '1',
    date: new Date('2024-08-20'),
    location: 'São Paulo - SP',
    gameMode: 'Clássico',
    ambassador: 'Mestre João',
    participants: [
      { username: 'magestre_supreme', displayName: 'Mago Supremo', className: 'Mago', placement: 1, eloChange: +15 },
      { username: 'samurai_honor', displayName: 'Honrado Samurai', className: 'Samurai', placement: 2, eloChange: +8 },
      { username: 'padre_bless', displayName: 'Padre Abençoado', className: 'Padre', placement: 3, eloChange: +3 },
      { username: 'bang_bang', displayName: 'Cangaceiro Veloz', className: 'Cangaceiro', placement: 4, eloChange: -5 },
      { username: 'shadow_stab', displayName: 'Assassino Sombrio', className: 'Assassino', placement: 5, eloChange: -8 }
    ]
  },
  {
    id: '2',
    date: new Date('2024-08-19'),
    location: 'Rio de Janeiro - RJ',
    gameMode: 'Campanha',
    ambassador: 'Embaixadora Maria',
    participants: [
      { username: 'quick_draw', displayName: 'Sacador Rápido', className: 'Cangaceiro', placement: 1, eloChange: +18 },
      { username: 'holy_shield', displayName: 'Escudo Sagrado', className: 'Padre', placement: 1, eloChange: +18 }, // Empate
      { username: 'spell_master', displayName: 'Mestre dos Feitiços', className: 'Mago', placement: 3, eloChange: -3 },
      { username: 'blade_dancer', displayName: 'Dançarino da Lâmina', className: 'Samurai', placement: 4, eloChange: -7 },
      { username: 'night_crawler', displayName: 'Rastejante Noturno', className: 'Assassino', placement: 5, eloChange: -12 }
    ]
  },
  {
    id: '3',
    date: new Date('2024-08-18'),
    location: 'Belo Horizonte - MG',
    gameMode: 'Em Equipe',
    ambassador: 'Professor Carlos',
    participants: [
      { username: 'team_red_1', displayName: 'Vermelho Alpha', className: 'Mago', placement: 1, eloChange: +12 },
      { username: 'team_red_2', displayName: 'Vermelho Beta', className: 'Paramédico', placement: 1, eloChange: +12 },
      { username: 'team_blue_1', displayName: 'Azul Alpha', className: 'Samurai', placement: 2, eloChange: -8 },
      { username: 'team_blue_2', displayName: 'Azul Beta', className: 'Padre', placement: 2, eloChange: -8 }
    ]
  }
];

function MatchRow({ match }: { match: typeof mockMatches[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPlacementIcon = (placement: number) => {
    if (placement === 1) return <Crown className="w-4 h-4 text-yellow-500" />;
    if (placement === 2) return <Trophy className="w-4 h-4 text-gray-400" />;
    if (placement === 3) return <Trophy className="w-4 h-4 text-yellow-600" />;
    return null;
  };

  const getEloChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const winners = match.participants.filter(p => p.placement === 1);
  const winnerNames = winners.length > 1 
    ? `${winners[0].displayName} e ${winners[1].displayName}`
    : winners[0]?.displayName;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="w-full cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground min-w-[80px]">
                    {formatDate(match.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{match.gameMode}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Vencedor: </span>
                    <span className="font-medium text-foreground">{winnerNames}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border">
            <CardContent className="p-4 space-y-4">
              {/* Match Details */}
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Embaixador: </span>
                  <span className="font-medium">{match.ambassador}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Participantes: </span>
                  <span className="font-medium">{match.participants.length} jogadores</span>
                </div>
              </div>

              {/* Participants Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-2 text-sm font-medium text-foreground">Posição</th>
                      <th className="text-left py-2 text-sm font-medium text-foreground">Jogador</th>
                      <th className="text-left py-2 text-sm font-medium text-foreground">Classe</th>
                      <th className="text-right py-2 text-sm font-medium text-foreground">Mudança ELO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.participants.map((participant, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            {getPlacementIcon(participant.placement)}
                            <span className="text-sm">#{participant.placement}</span>
                          </div>
                        </td>
                        <td className="py-2">
                          <div>
                            <div className="font-medium text-sm">{participant.displayName}</div>
                            <div className="text-xs text-muted-foreground">@{participant.username}</div>
                          </div>
                        </td>
                        <td className="py-2">
                          <span className="text-sm text-primary font-medium">{participant.className}</span>
                        </td>
                        <td className="py-2 text-right">
                          <span className={`text-sm font-medium ${getEloChangeColor(participant.eloChange)}`}>
                            {participant.eloChange > 0 ? '+' : ''}{participant.eloChange}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = mockMatches.filter(match =>
    match.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.gameMode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.ambassador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.participants.some(p => 
      p.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.className.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">📊 Partidas Oficiais</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Histórico completo de partidas registradas por embaixadores oficiais. 
            Clique em cada partida para ver detalhes completos e mudanças de ELO.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por local, jogador, classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{mockMatches.length}</div>
              <div className="text-sm text-muted-foreground">Partidas</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(mockMatches.flatMap(m => m.participants.map(p => p.username))).size}
              </div>
              <div className="text-sm text-muted-foreground">Jogadores</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(mockMatches.map(m => m.location)).size}
              </div>
              <div className="text-sm text-muted-foreground">Cidades</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Embaixadores</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredMatches.length === 0 
              ? 'Nenhuma partida encontrada'
              : `${filteredMatches.length} partida${filteredMatches.length > 1 ? 's' : ''} encontrada${filteredMatches.length > 1 ? 's' : ''}`
            }
            {searchTerm && (
              <span> para &quot;<span className="text-primary font-medium">{searchTerm}</span>&quot;</span>
            )}
          </div>
        )}

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              {searchTerm ? 'Nenhuma partida encontrada para sua busca.' : 'Nenhuma partida registrada ainda.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Partidas Recentes
              <span className="text-sm text-muted-foreground ml-2">
                (mais recente primeiro)
              </span>
            </h2>
            {filteredMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        )}

        {/* Ambassador Info */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">👑 Sobre os Embaixadores</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-primary">O que fazem?</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Organizam e registram partidas oficiais</li>
                <li>• Garantem que as regras sejam seguidas</li>
                <li>• Calculam mudanças de ELO dos participantes</li>
                <li>• Mantêm a integridade do ranking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Como se tornar um?</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Ter experiência comprovada com o jogo</li>
                <li>• Conhecer profundamente todas as regras</li>
                <li>• Ser ativo na comunidade local</li>
                <li>• Aplicar através do formulário oficial</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" disabled>
              Candidatar-se a Embaixador (Em breve)
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}