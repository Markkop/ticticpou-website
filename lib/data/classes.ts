export interface ClassData {
  id: string;
  name: string;
  category: 'base' | 'extra' | 'team';
  description: string;
  specialLoadSound?: string;
  specialUseSound?: string;
  specialLoadGesture?: string;
  specialUseGesture?: string;
  maxBullets: number;
  interactions: string[];
  details: string[];
  examples?: string[];
}

export const classes: ClassData[] = [
  {
    id: 'mago',
    name: 'Mago',
    category: 'base',
    description: 'Pode carregar e usar uma explosão mágica que ataca todos os jogadores ao mesmo tempo.',
    specialLoadSound: 'Abra',
    specialUseSound: 'Kadabra!',
    specialLoadGesture: 'Abre um livro figurativo com as mãos',
    specialUseGesture: 'Faz como se uma explosão caísse dos céus',
    maxBullets: 1,
    interactions: [
      'Se o Mago morrer durante o Kadabra, a explosão é anulada',
      'Se dois Magos usarem explosão juntos, ambos morrem e ninguém mais é atacado',
      'Kadabra ataca todos que não estiverem defendendo'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Pode ter apenas uma explosão carregada por vez',
      'A explosão ataca todos os demais jogadores simultaneamente',
      'Vulnerável enquanto carrega e usa a ação especial'
    ]
  },
  {
    id: 'samurai',
    name: 'Samurai',
    category: 'base',
    description: 'Classe defensiva que pode contra-atacar, refletindo qualquer ataque recebido.',
    specialLoadSound: 'Uh!',
    specialUseSound: 'Katchim!',
    specialLoadGesture: 'Coloca as duas mãos do lado esquerdo da cintura como se segurasse uma espada',
    specialUseGesture: 'Puxa a espada da cintura e golpeia o ar',
    maxBullets: 1,
    interactions: [
      'Reflete qualquer ataque recebido de volta ao atacante',
      'Se não for atacado, o carregamento é perdido',
      'Contra apunhalada do Assassino, ambos continuam vivos mas gastam carregamentos',
      'Pode refletir explosões do Mago, matando-o e anulando a explosão'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Contra-ataque não é direcional - reflete qualquer ataque',
      'Vulnerável enquanto carrega a ação especial',
      'Quase counter do Mago devido ao contra-ataque'
    ]
  },
  {
    id: 'padre',
    name: 'Padre',
    category: 'base',
    description: 'Classe "late-game" que pode ganhar uma vida extra ao rezar duas vezes com sucesso.',
    specialLoadSound: 'Ohh!',
    specialUseSound: undefined,
    specialLoadGesture: 'Junta as mãos como se estivesse rezando',
    specialUseGesture: undefined,
    maxBullets: 1,
    interactions: [
      'Precisa rezar duas vezes (não precisam ser seguidas) para ganhar vida extra',
      'Pode ter no máximo 1 vida extra',
      'Se perder a vida extra, pode rezar novamente para recuperá-la',
      'Deve completar a segunda reza para ganhar a vida extra'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Vulnerável enquanto reza',
      'Deve anunciar quando tem vida extra para evitar confusões',
      'As rezas não precisam ser consecutivas'
    ]
  },
  {
    id: 'cangaceiro',
    name: 'Cangaceiro',
    category: 'base',
    description: 'Única classe que pode ter duas balas, podendo atirar duas vezes ou em dois alvos simultaneamente.',
    specialLoadSound: undefined,
    specialUseSound: 'Pou! ou PouPou',
    specialLoadGesture: 'Recarregar normalmente duas vezes',
    specialUseGesture: 'Pode mirar em dois alvos com cada mão',
    maxBullets: 2,
    interactions: [
      'Pode atirar em duas pessoas ao mesmo tempo ou em duas rodadas diferentes',
      'Para tiro duplo, mira com uma mão em cada alvo',
      'Se um dos alvos for Samurai refletindo, o Cangaceiro morre mas o outro alvo ainda recebe o tiro'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Deve carregar duas balas separadamente com "Tic Tic"',
      'Tiro duplo gasta as duas balas de uma vez',
      'Demonstra classe mantendo as mãos como se recarregasse'
    ]
  },
  {
    id: 'novico',
    name: 'Noviço',
    category: 'extra',
    description: 'Classe "café com leite" para iniciantes, que se defende automaticamente ao atirar.',
    specialLoadSound: undefined,
    specialUseSound: 'Pou!',
    specialLoadGesture: undefined,
    specialUseGesture: 'Atira com uma mão e cruza a outra como escudo',
    maxBullets: 1,
    interactions: [
      'Ao atirar, automaticamente se defende',
      'Só pode ser usado uma ou duas vezes no máximo',
      'Vulnerável apenas enquanto recarrega'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Classe opcional para jogadores iniciantes',
      'O sonho de todo jogador é poder voltar a ser noviço',
      'Demonstra classe com um braço atirando e outro cruzado como escudo'
    ]
  },
  {
    id: 'assassino',
    name: 'Assassino',
    category: 'extra',
    description: 'Única classe sem arma, possui apenas defesa e uma adaga para apunhalar jogadores ao lado.',
    specialLoadSound: 'Fshh',
    specialUseSound: 'Krek!',
    specialLoadGesture: 'Afia a adaga',
    specialUseGesture: 'Encosta a mão fechada no peito do alvo ao lado',
    maxBullets: 0,
    interactions: [
      'Não pode usar Tic Tic ou Pou!',
      'Apunhalada só mata quem estiver defendendo',
      'Pode atacar apenas jogadores ao seu lado',
      'Quando um jogador ao lado morre, o próximo vivo vira alvo',
      'Em 1x1, recupera a arma (Tic Tic e Pou)'
    ],
    details: [
      'Não possui arma, apenas defesa e adaga',
      'Vulnerável enquanto afia e apunhala',
      'Classe mais fraca em duelo 1x1',
      'Deve ser introduzida após as classes básicas'
    ]
  },
  {
    id: 'ladrao',
    name: 'Ladrão',
    category: 'extra',
    description: 'Pode roubar carregamentos e balas de outros jogadores usando "Perdeu".',
    specialLoadSound: undefined,
    specialUseSound: 'Perdeu',
    specialLoadGesture: undefined,
    specialUseGesture: 'Faz como se estivesse pegando algo no ar',
    maxBullets: 1,
    interactions: [
      'Rouba carregamentos de ações especiais de outros jogadores',
      'Pode roubar balas durante Tic Tic',
      'Contra Padre, apenas cancela a reza sem roubar',
      'Não pode acumular ações especiais',
      'Não pode usar "Perdeu" até usar a ação roubada'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Não precisa carregar o "Perdeu"',
      'Forte contra Magos e Samurais, menos efetivo contra Padres e Cangaceiros',
      'Classe em testes, pode ter balanceamento alterado'
    ]
  },
  {
    id: 'kabalista',
    name: 'Kabalista',
    category: 'extra',
    description: 'Precisa fazer uma contagem regressiva de 5 turnos para ganhar o jogo.',
    specialLoadSound: undefined,
    specialUseSound: 'CINCO, QUATRO, TRÊS, DOIS, UM',
    specialLoadGesture: undefined,
    specialUseGesture: 'Mostra dedos correspondentes ao número falado',
    maxBullets: 0,
    interactions: [
      'Não possui Tic Tic nem Pou',
      'Deve contar de 5 até 1 para ganhar',
      'Vulnerável durante toda a contagem',
      'Se completar a contagem sem morrer, ganha automaticamente'
    ],
    details: [
      'Classe de vitória alternativa',
      'Estratégia completamente diferente das outras classes',
      'Requer proteção dos outros jogadores ou timing perfeito'
    ]
  },
  {
    id: 'metamorfo',
    name: 'Metamorfo',
    category: 'extra',
    description: 'Conceito de classe que pode mudar para outras classes durante a partida usando "gosma".',
    specialLoadSound: undefined,
    specialUseSound: 'Gosma',
    specialLoadGesture: undefined,
    specialUseGesture: 'Ação direcional de gosma',
    maxBullets: 0,
    interactions: [
      'Não possui arma, apenas defesa e gosma',
      'Se o alvo da gosma usar ação especial, Metamorfo vira daquela classe',
      'Problemas com interação com Cangaceiro ainda sendo resolvidos'
    ],
    details: [
      'Classe conceitual ainda em desenvolvimento',
      'Ideia baseada no Amnesiac de Town of Salem',
      'Pode tornar o jogo confuso se mal implementada'
    ]
  },
  {
    id: 'pacificador',
    name: 'Pacificador',
    category: 'extra',
    description: 'Pode cancelar todas as ações da rodada e ganhar vida extra se salvar alguém.',
    specialLoadSound: 'Prepara',
    specialUseSound: 'Cancela!',
    specialLoadGesture: 'Cruza os braços para o alto formando um X',
    specialUseGesture: 'Descruza os braços como um juiz encerrando partida',
    maxBullets: 1,
    interactions: [
      'Cancela todas as ações da rodada',
      'Se salvar alguém da morte, ganha uma vida extra',
      'Se for atacado durante o cancelamento, sua ação não ativa',
      'Não pode cancelar duas vezes seguidas'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Classe ainda em testes',
      'Requer carregamento assim como outras classes',
      'Máximo de uma vida extra'
    ]
  },
  {
    id: 'paramedico',
    name: 'Paramédico',
    category: 'team',
    description: 'Exclusivo para modo Em Equipe - pode reviver aliados mortos usando desfibrilador.',
    specialLoadSound: 'Zzz',
    specialUseSound: 'Contato!',
    specialLoadGesture: 'Arrasta as mãos de punhos fechados preparando desfibrilador',
    specialUseGesture: 'Encosta as mãos de punhos fechados em aliado morto',
    maxBullets: 1,
    interactions: [
      'Só pode carregar se um aliado estiver morto',
      'Um jogador só pode reviver uma vez',
      'Exclusivo para modo Em Equipe'
    ],
    details: [
      'Possui as 3 ações básicas: defender, recarregar e atirar',
      'Classe de suporte para trabalho em equipe',
      'Número de ressurreições ainda em testes'
    ]
  }
];