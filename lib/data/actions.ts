export interface ActionData {
  id: string;
  name: string;
  category: 'basic' | 'special' | 'finisher';
  description: string;
  sound?: string;
  gesture: string;
  className?: string; // If action is class-specific
  requirements?: string[];
  effects: string[];
  interactions?: string[];
  vulnerable: boolean; // Whether the player is vulnerable while performing
}

export const actions: ActionData[] = [
  // Basic Actions
  {
    id: 'defender',
    name: 'Defender',
    category: 'basic',
    description: 'Ação defensiva básica que protege contra todos os ataques.',
    gesture: 'Cruze os braços em X no peito',
    effects: [
      'Protege contra tiros (Pou)',
      'Protege contra explosões (Kadabra)',
      'Único estado em que Assassino pode matar com Krek'
    ],
    vulnerable: false
  },
  {
    id: 'recarregar',
    name: 'Recarregar',
    category: 'basic',
    description: 'Carrega uma bala para poder atirar.',
    sound: 'Tic Tic',
    gesture: 'Levante ambas as mãos como armas',
    effects: [
      'Ganha 1 bala (máximo 1 para maioria das classes)',
      'Cangaceiro pode ter até 2 balas',
      'Não precisa atirar na próxima rodada'
    ],
    interactions: [
      'Ladrão pode roubar bala com "Perdeu"',
      'Assassino não pode usar esta ação'
    ],
    vulnerable: true
  },
  {
    id: 'atirar',
    name: 'Atirar',
    category: 'basic',
    description: 'Ataca um jogador específico gastando uma bala.',
    sound: 'Pou!',
    gesture: 'Aponte com as mãos para o alvo',
    requirements: ['Ter pelo menos 1 bala'],
    effects: [
      'Mata o alvo se ele não estiver defendendo',
      'Gasta 1 bala',
      'Noviço automaticamente se defende ao atirar'
    ],
    interactions: [
      'Samurai pode refletir com Katchim',
      'Não afeta quem está defendendo'
    ],
    vulnerable: true
  },

  // Class-Specific Special Actions
  {
    id: 'abra',
    name: 'Abra',
    category: 'special',
    className: 'Mago',
    description: 'Carrega a explosão mágica do Mago.',
    sound: 'Abra',
    gesture: 'Abre um livro figurativo com as mãos',
    effects: ['Carrega uma explosão (máximo 1)'],
    interactions: ['Ladrão pode roubar com "Perdeu"'],
    vulnerable: true
  },
  {
    id: 'kadabra',
    name: 'Kadabra',
    category: 'special',
    className: 'Mago',
    description: 'Explosão que ataca todos os jogadores simultaneamente.',
    sound: 'Kadabra!',
    gesture: 'Faz como se uma explosão caísse dos céus',
    requirements: ['Ter explosão carregada'],
    effects: [
      'Ataca todos os outros jogadores',
      'Quem não estiver defendendo morre',
      'Gasta o carregamento da explosão'
    ],
    interactions: [
      'Se Mago morrer durante Kadabra, explosão é anulada',
      'Dois Magos usando juntos: ambos morrem, ninguém mais',
      'Samurai pode refletir e matar o Mago'
    ],
    vulnerable: true
  },
  {
    id: 'uh',
    name: 'Uh',
    category: 'special',
    className: 'Samurai/Espadachim',
    description: 'Carrega o contra-ataque do Samurai.',
    sound: 'Uh!',
    gesture: 'Coloca mãos do lado da cintura como se segurasse espada',
    effects: ['Carrega um contra-ataque (máximo 1)'],
    interactions: ['Ladrão pode roubar com "Perdeu"'],
    vulnerable: true
  },
  {
    id: 'katchim',
    name: 'Katchim',
    category: 'special',
    className: 'Samurai/Espadachim',
    description: 'Contra-ataque que reflete qualquer ataque recebido.',
    sound: 'Katchim!',
    gesture: 'Saca espada para o alto',
    requirements: ['Ter contra-ataque carregado'],
    effects: [
      'Reflete qualquer ataque recebido de volta',
      'Funciona contra tiros, explosões e finalizadores',
      'Se não for atacado, perde o carregamento'
    ],
    interactions: [
      'Contra Assassino: ambos continuam vivos mas gastam carregamentos',
      'Pode matar Mago durante Kadabra, anulando explosão'
    ],
    vulnerable: false
  },
  {
    id: 'ohh',
    name: 'Ohh (Rezar)',
    category: 'special',
    className: 'Padre',
    description: 'Reza para ganhar vida extra após duas rezas bem-sucedidas.',
    sound: 'Ohh!',
    gesture: 'Junta as mãos como se estivesse rezando',
    effects: [
      'Após 2 rezas bem-sucedidas, ganha 1 vida extra',
      'As rezas não precisam ser consecutivas',
      'Máximo de 1 vida extra'
    ],
    interactions: [
      'Ladrão cancela reza com "Perdeu" mas não rouba',
      'Se morrer durante segunda reza, não ganha vida extra'
    ],
    vulnerable: true
  },
  {
    id: 'tiro-duplo',
    name: 'Tiro Duplo',
    category: 'special',
    className: 'Cangaceiro',
    description: 'Atira em dois alvos simultaneamente no mesmo turno ou em duas rodadas diferentes.',
    sound: 'Pou! ou PouPou',
    gesture: 'Mira com uma mão em cada alvo',
    requirements: ['Ter 2 balas carregadas'],
    effects: [
      'Pode atirar em dois alvos diferentes no mesmo turno',
      'Ou atirar duas vezes em rodadas diferentes', 
      'Tiro duplo gasta as 2 balas de uma vez'
    ],
    interactions: [
      'Se um alvo for Samurai refletindo: Cangaceiro morre, mas segundo alvo ainda recebe tiro'
    ],
    vulnerable: true
  },
  {
    id: 'fshh',
    name: 'Fshh (Afiar)',
    category: 'special',
    className: 'Assassino',
    description: 'Afia a adaga para poder apunhalar.',
    sound: 'Fshh',
    gesture: 'Movimentos de afiar a adaga',
    effects: ['Carrega uma apunhalada (máximo 1)'],
    vulnerable: true
  },
  {
    id: 'krek',
    name: 'Krek (Apunhalar)',
    category: 'special',
    className: 'Assassino',
    description: 'Apunhala um jogador ao lado - só mata se estiver defendendo.',
    sound: 'Krek!',
    gesture: 'Encosta mão fechada no peito do alvo ao lado',
    requirements: ['Ter apunhalada carregada', 'Alvo deve estar ao lado'],
    effects: [
      'Mata APENAS se alvo estiver defendendo',
      'Se alvo estiver fazendo outra ação, não morre',
      'Quando alvo ao lado morre, próximo vivo vira novo alvo'
    ],
    interactions: [
      'Contra Samurai refletindo: ambos continuam vivos',
      'Não funciona contra quem está carregando ou atacando'
    ],
    vulnerable: true
  },
  {
    id: 'perdeu',
    name: 'Perdeu',
    category: 'special',
    className: 'Ladrão',
    description: 'Rouba carregamentos e balas de outros jogadores.',
    sound: 'Perdeu',
    gesture: 'Faz como se pegasse algo no ar',
    effects: [
      'Rouba carregamentos de ações especiais',
      'Pode roubar balas durante Tic Tic',
      'Contra Padre: apenas cancela sem roubar'
    ],
    interactions: [
      'Não pode usar até gastar ação roubada',
      'Não pode acumular ações especiais',
      'Forte contra Mago e Samurai'
    ],
    vulnerable: false
  },
  {
    id: 'contagem',
    name: 'Contagem Regressiva',
    category: 'special',
    className: 'Kabalista',
    description: 'Conta de 5 até 1 para ganhar automaticamente.',
    sound: 'CINCO, QUATRO, TRÊS, DOIS, UM',
    gesture: 'Mostra dedos correspondentes ao número',
    effects: [
      'Deve contar 5 turnos consecutivos',
      'Se completar sem morrer, ganha o jogo',
      'Não pode fazer outras ações durante contagem'
    ],
    vulnerable: true
  },
  {
    id: 'prepara',
    name: 'Prepara',
    category: 'special',
    className: 'Pacificador',
    description: 'Carrega o cancelamento de ações.',
    sound: 'Prepara',
    gesture: 'Cruza braços para o alto formando X',
    effects: ['Carrega um cancelamento (máximo 1)'],
    vulnerable: true
  },
  {
    id: 'cancela',
    name: 'Cancela',
    category: 'special',
    className: 'Pacificador',
    description: 'Cancela todas as ações da rodada.',
    sound: 'Cancela!',
    gesture: 'Descruza braços como juiz encerrando partida',
    requirements: ['Ter cancelamento carregado'],
    effects: [
      'Cancela todas as ações da rodada',
      'Se salvar alguém da morte, ganha vida extra',
      'Máximo de 1 vida extra'
    ],
    interactions: [
      'Se Pacificador for atacado durante cancelamento, ação não ativa'
    ],
    vulnerable: true
  },
  {
    id: 'zzz',
    name: 'Zzz (Preparar Desfibrilador)',
    category: 'special',
    className: 'Paramédico',
    description: 'Prepara desfibrilador para reviver aliado.',
    sound: 'Zzz',
    gesture: 'Arrasta mãos de punhos fechados preparando desfibrilador',
    requirements: ['Modo Em Equipe', 'Ter aliado morto'],
    effects: ['Carrega revivimento (só pode carregar se aliado estiver morto)'],
    vulnerable: true
  },
  {
    id: 'contato',
    name: 'Contato',
    category: 'special',
    className: 'Paramédico',
    description: 'Revive um aliado morto.',
    sound: 'Contato!',
    gesture: 'Encosta mãos de punhos fechados em aliado morto',
    requirements: ['Ter desfibrilador carregado', 'Modo Em Equipe'],
    effects: [
      'Revive aliado morto',
      'Cada jogador só pode reviver uma vez',
      'Número de ressurreições do Paramédico em teste'
    ],
    vulnerable: true
  },

  // Finisher
  {
    id: 'finalizador',
    name: 'Finalizador',
    category: 'finisher',
    description: 'Ação especial para duelos 1x1 - quem usar 3 vezes ganha.',
    sound: 'Não tem som',
    gesture: 'Estalar dedos de ambas as mãos (como Família Adams)',
    requirements: ['Apenas em duelos 1x1'],
    effects: [
      'Quem usar 3 vezes vence o jogo',
      'Não pode usar em rodadas consecutivas',
      'Se ambos fazem terceiro finalizador juntos, ambos perdem'
    ],
    interactions: [
      'Assassino recupera arma (Tic Tic e Pou) em duelos 1x1',
      'Samurai pode refletir finalizadores',
      'Caso ambos façam terceiro finalizador juntos, ambos perdem'
    ],
    vulnerable: true
  }
];