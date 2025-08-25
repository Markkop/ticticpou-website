export interface GameModeData {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers?: number;
  rules: string[];
  specialFeatures?: string[];
  newClasses?: string[];
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  category: 'classic' | 'variant' | 'team' | 'tournament';
}

export const gameModes: GameModeData[] = [
  {
    id: 'classico',
    name: 'Clássico',
    description: 'O modo tradicional do Tic Tic Pou com Classes, usando as 4 classes base mais Noviço.',
    minPlayers: 3,
    maxPlayers: 8,
    difficulty: 'iniciante',
    category: 'classic',
    rules: [
      'Mínimo de um jogador de cada classe base',
      'Sobram 2 jogadores: ambos são vencedores (ou usar Finalizador)',
      'Ritmo sincronizado com batidas nas pernas',
      'Todos começam com 1 vida e 0 balas'
    ],
    specialFeatures: [
      'Classes base: Mago, Samurai, Padre, Cangaceiro',
      'Noviço opcional para iniciantes',
      'Finalizador para duelos 1x1'
    ]
  },
  {
    id: 'campanha',
    name: 'Modo Campanha',
    description: 'Modo avançado onde jogadores começam sem classe e escolhem uma ao tirar a primeira vida.',
    minPlayers: 4,
    maxPlayers: 10,
    difficulty: 'avancado',
    category: 'variant',
    rules: [
      'Todos começam com 2 vidas e sem classe',
      'Escolha de classe ao tirar uma vida de outro jogador',
      'Player pode esperar para escolher a classe',
      'Tirar vida extra do Padre também libera escolha'
    ],
    specialFeatures: [
      'Incentiva agressividade no início',
      'Sensação de evolução como RPG',
      'Demonstrar classe inicial com posição de defesa',
      'Cangaceiro é escolhido carregando segunda vez'
    ]
  },
  {
    id: 'em-equipe',
    name: 'Em Equipe',
    description: 'Partidas de 2x2, 3x3, 4x4 com fogo amigo desabilitado e classes de suporte.',
    minPlayers: 4,
    maxPlayers: 16,
    difficulty: 'intermediario',
    category: 'team',
    rules: [
      'Times jogam em formato oval para interação',
      'Fogo amigo desabilitado (Kadabra não afeta aliados)',
      'Mínimo recomendado: 3x3',
      'Classes de suporte disponíveis'
    ],
    newClasses: ['Paramédico'],
    specialFeatures: [
      'Permite ações colaborativas',
      'Estratégias de equipe',
      'Classes exclusivas de suporte',
      'Reviver aliados mortos'
    ]
  },
  {
    id: 'jokenpo',
    name: 'Modo JoKenPo',
    description: 'Versão silenciosa do jogo para ambientes com ruído ou necessidade de silêncio.',
    minPlayers: 2,
    maxPlayers: 5,
    difficulty: 'avancado',
    category: 'variant',
    rules: [
      'Substitui sons por gestos de mão únicos',
      'Ritmo: bater punho na palma 2x + ação',
      'Requer muita concentração e prática',
      'Recomendado para poucos jogadores'
    ],
    specialFeatures: [
      'Defender: punho fechado',
      'Carregar: dois dedos apontados para cima',
      'Atirar: mão apontada para alvo',
      'Todas as ações especiais adaptadas para gestos'
    ]
  },
  {
    id: 'torneio',
    name: 'Torneio',
    description: 'Formato competitivo com sistema de pontuação e configuração específica de classes.',
    minPlayers: 8,
    maxPlayers: 10,
    difficulty: 'avancado',
    category: 'tournament',
    rules: [
      'Configuração: 8-10 jogadores com distribuição específica',
      'Sistema de pontuação: matar (1pt), vencer (5pt), duelo (3pt)',
      'Máximo de 1-2 Padres por limitação',
      'Pode incluir Pacificador no lugar do segundo Padre'
    ],
    specialFeatures: [
      '2 jogadores de cada classe base',
      '1-2 Assassinos dependendo do total',
      'Ranking por pontos acumulados',
      'Balanceamento testado competitivamente'
    ]
  }
];

export const mechanics = [
  {
    id: 'finalizadores',
    name: 'Finalizadores',
    description: 'Mecânica especial para duelos 1x1 que resolve partidas longas.',
    rules: [
      'Ativado quando sobram apenas 2 jogadores',
      'Ação: estalar dedos de ambas as mãos (Família Adams)',
      'Quem usar 3 vezes ganha o jogo',
      'Não pode usar em rodadas consecutivas',
      'Vulnerável enquanto usa o finalizador',
      'Se ambos fazem o terceiro finalizador juntos, ambos perdem'
    ],
    balancing: [
      'Assassino recupera arma em duelos 1x1',
      'Alternativa: apenas uma bala em jogo que é "roubada" ao recarregar'
    ]
  },
  {
    id: 'interacoes',
    name: 'Interações entre Classes',
    description: 'Regras específicas de como as classes interagem entre si.',
    rules: [
      'Mago vs Samurai: Katchim mata Mago e anula Kadabra',
      'Assassino vs Samurai: ambos gastam carregamento, ninguém morre',
      'Cangaceiro vs Samurai: tiro duplo mata Samurai, mas segundo alvo ainda é atingido',
      'Dois Magos: se usam Kadabra juntos, ambos morrem e ninguém mais',
      'Padre vulnerável: perde vida extra se atacado durante reza',
      'Pacificador: se salvar alguém cancelando, ganha vida extra'
    ]
  },
  {
    id: 'vulnerabilidade',
    name: 'Estados de Vulnerabilidade',
    description: 'Momentos em que jogadores ficam expostos a ataques.',
    rules: [
      'Durante qualquer ação de carregamento (Abra, Uh, Ohh, Tic Tic, Fshh)',
      'Durante uso de ações especiais (Kadabra, Krek)',
      'Durante Finalizadores',
      'Erro de ação ou som: jogador fica vulnerável',
      'Perder ritmo: eliminação imediata'
    ]
  }
];