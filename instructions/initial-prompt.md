Create this website:

The following is more context about the game, extracted from another repository.
Context:
└── markkop-ticticpou/
    ├── README.md
    ├── Finalizadores.md
    ├── Resumo.md
    ├── Classes/
    │   ├── Assassino.md
    │   ├── Cangaceiro.md
    │   ├── Kabalista.md
    │   ├── Ladrao.md
    │   ├── Mago.md
    │   ├── Metamorfo.md
    │   ├── Noviço.md
    │   ├── Pacificador.md
    │   ├── Padre.md
    │   ├── Paramedico (Em Equipe).md
    │   └── Samurai.md
    ├── Materiais/
    │   └── Materiais.md
    └── ModosDeJogo/
        ├── Campanha.md
        ├── EmEquipe.md
        ├── ModoJoKenPo.md
        └── Torneio.md


Files Content:

================================================
FILE: README.md
================================================
# Origem e derivação 

Tic Tic Pou com Classes é uma versão alternativa ao **Tic Tic Pou original**, jogo de roda cuja origem não é conhecida (se você souber de algo, nos avise). O jogo foi apresentado a um grupo de amigos que gostaram do jogo, tanto pela sua simplicidade quanto pela sua dinâmica, que estes foram acrescentando novas ações em complemento as três ações base: **Defender, Recarregar e Atacar**. Conforme nos desafiamos a botar cada vez mais ações, o jogo começou a ficar muito complexo de acompanhar e então criamos as classes.  
O processo criativo acontece de forma espontânea e colaborativa entre todos que já jogaram o jogo em algum momento e possuem interessem avaliar e contribuir para o refinamento do jogo e de suas classes.  
O jogo é ensinado em etapas, sugerimos ensinar o jogo base primeiro, jogar algumas partidas, adicionar as 4 classes + noviço e apenas então acrescentar demais [classes](https://github.com/Markkop/TicTicPou/tree/master/Classes)/mecânicas como Assassino e Finalizadores.  

# Tic Tic Pou (jogo base)

## Preparação:
O jogo precisa de 3 ou mais jogadores.
Os jogadores se posicionam de forma a fazer um círculo. 

## Rotina:
Durante o jogo todos os jogadores podem usar uma de 3 ações, declarando ela ao mesmo tempo no passo de um ritmo.  
O ritmo é definido com todos os jogadores batendo simultaneamente as mãos nas pernas. A rotina é: 
 
["1..2..3..e.."] - [Bate] - [Bate] - [Ação] - [Bate] - [Bate] - [Ação] - [...] 
 
Quando sobram apenas 2 jogadores (1×1), ambos são declarados vencedores.  
O conceito de <a href="https://github.com/Markkop/TicTicPou#finalizadores">Finalizador</a> foi elaborado para tornar esses duelos  interessantes.  


## Ações:
**Defender:** o jogador se defende de todos os tiros cruzando seus braços de forma a fazer um X em seu peito  
**Recarregar:** o jogador levanta ambas as mãos simbolizando armas e faz o som “Tic Tic”, ganhando 1 bala para atirar.  
**Atirar:** o jogador aponta suas mãos simbolizando armas para um alvo e faz o som “Pou!”, gastando uma bala e matando o alvo que estiver sem defender.  
 
_Observações:_  
Todos começam com 1 vida e 0 balas.  
Só é possível ter **uma bala** guardada no máximo.  
Não é necessário atirar na rodada seguinte que recarregou, você pode “guardar” a bala.  
Todos possuem apenas uma vida; se for atacado enquanto recarrega ou atira, morre.  
É necessário anunciar o **som** correspondente a sua ação (menos na Defesa, na qual não há som)  
Se perder o ritmo em qualquer momento, o jogador é eliminado  
Se errar alguma ação, o jogador é considerado vulnerável e sua ação não tem efeito.  
 
_Exemplos:_  
JogadorA atira em JogadorB que defende: jogadorB não morre e jogadorA perde uma bala.  
JogadorA atira em JogadorB que recarrega: jogadorB morre e jogadorA perde uma bala.  
JogadorA foi atirar no JogadorB, mas falou “Tic Tic” em vez de “Pou!”: jogadorA é eliminado  

# Tic Tic Pou – Com Classes.
Nesta versão os jogadores podem escolher classes antes de começar o jogo.  
Cada classe possui até 2 ações especiais extras.  
Todos possuem as três ações básicas: atirar, recarregar e defender.  
 
## As 4 classes base são: 
 
### Mago (Explosão) 
**Carregar ação especial:** o Mago abre um livro figurativo com as mãos e fala **“Abra”**. Assim como a bala, só pode ter uma Explosão carregada por vez.  
**Usar ação especial:** o Mago faz como se uma explosão caísse dos céus com suas mãos e fala **“Kadabra!”**, atacando todos os jogadores que não estiverem defendendo.  
 
### Samurai/Espadachim: (Contra-ataque) 
**Carregar ação especial:** o Samurai bota as duas mãos do lado esquerdo da cintura como se estivesse pra sacar uma espada e fala **“Uh!”**  
**Usar ação especial:** o Samurai puxa a espada da cintura e golpeia o ar ao som de **“Katchim!”**, refletindo qualquer ataque que receber.  
 
### Padre: (Vida Extra)
**Carregar ação especial:** o Padre junta suas mãos e reza ao som de **“Ohh!”.**  
Se o padre rezar duas vezes, sem precisar ser seguidas, ele ganha uma vida extra. (no máximo 1 vida extra)  
 
### Cangaceiro: (Tiro Duplo)
O Cangaceiro pode ter até **duas balas**, tendo que as carregar normalmente pela ação de recarregar (“Tic Tic”)  
Ele pode atirar duas vezes com o **“Pou!”** ou atirar em duas pessoas ao mesmo tempo, mirando com uma mão em cada, gastando as suas duas balas.  
 
## Preparação: 
Antes de começar a partida todos os jogadores devem declarar as suas classes, exibindo com suas mãos as ações de recarregar especial:  
* Mago: mantém as mãos como se segurasse um livro aberto  
* Samurai: mantém as mãos no lado esquerdo da cintura como se segurasse uma espada em sua bainha  
* Padre: mantém as mãos como se estivesse rezando  
* Cangaceiro: mantém as mãos apontadas pra cima como se estivesse recarregando  
É necessário que se tenha no mínimo um de cada classe  

_Resoluções e exemplos:_  
Se o Mago morrer para um **Tiro ou Katchin** enquanto usa sua explosão, a ação dele é anulada e ninguém é atingido.  
Se o Samurai refletir a explosão do Mago e o Mago morrer, sua explosão é anulada.  
Se dois Magos usarem explosão juntos, ambos morrem e ninguém mais é atacado.
A partir do momento que o Padre reza pela segunda vez (sem ser morto), ele possui uma vida extra.  
Se o Padre for atacado enquanto vulnerável e tiver uma vida extra, ele continua normalmente no jogo, mas perdendo a sua vida extra e podendo rezar novamente (duas vezes) para recuperá-la.  
Os jogadores ficam vulneráveis durante todas as ações de recarregamento (Abra, Uh, Ohh, Tic Tic)  
Se o Caganceiro atirar em A e B e A for o Samurai refletindo; o Cangaceiro morre, mas B ainda recebe o tiro.  
 
### Noviço (Café com leite) [opcional]
Para os jogadores que nunca jogaram Tic Tic Pou – Com Classes antes, estes poderão ser Noviços.  
Só é possível jogar de Noviço apenas uma vez.  
O Noviço possui apenas as 3 ações básicas: defender, recarregar e atirar.  
**Mas quando ele atira, ele automaticamente se defende junto**, demonstrando visualmente com uma mão mirando em alguém e o outro braço cruzado como se segurasse um escudo.  
A declaração de sua classe antes de começar a partida é a pose acima: um braço atirando e o outro cruzado como se segurasse um escudo.  
 
## Complementos 
Uma vez que os jogadores estiverem habituados com as 4 classes básicas, é possível introduzir novas classes e mecânicas.  
Em especial, recomendamos adicionar o Assassino e o Finalizador.  
Há diversas [classes extras](https://github.com/Markkop/TicTicPou/tree/master/Classes) que podem ser inseridas no jogo.
 
### Assassino: (Apunhalada)
O Assassino é a única classe que não possui arma, mas sim uma adaga.  
O Assassino não pode recarregar (Tic Tic) e atirar (Pou!), mas pode se defender normalmente.  
**Recarregar ação especial:** o Assassino afia a sua adaga ao som de **“Fshh”**  
**Usar ação especial:** o Assassino apunhala um dos jogadores ao seu lado ao som de **“Krek!”**, matando apenas quem estiver defendendo.  
 
Se o Assassino apunhalar alguém que esteja recarregando, atirando ou usando ação especial, a pessoa não morre.  
Se o Assassino apunhalar um Samurai que esteja refletindo, nada acontece (ambos gastam o carregamento, mas continuam vivos)  
O Assassino está vulnerável enquanto ataca com o Krek.
Se um jogador ao lado do Assassino morrer, o próximo jogador vivo ao seu lado vira um novo possível alvo.  
Obs: o Assassino recupera a sua arma (TicTic e Pou) em combates de 1x1.  
   
## Finalizadores

Quando sobram apenas 2 jogadores (1x1), ambos podem utilizar uma nova ação: o **Finalizador**.  
Quem utilizar o Finalizador **TRÊS** vezes, ganha o jogo.  
Não pode usar em rodadas consecutivas.  
O jogador está vulneravel enquanto usa um finalizador.  
A ação do Finalizador é **estalar os dedos** de ambas as mãos duas vezes, como na Família Adams.  
Caso ambos os jogadores façam o terceiro finalizador ao mesmo tempo, ambos perdem.  
Após realizar o Finalizador pela terceira vez, sem morrer, o jogador é declarado vencedor.  
*(Obs: o Assassino passa a ter TicTic e Pou enquanto em um 1x1)*  

Também há outros [modos de jogo](https://github.com/Markkop/TicTicPou/tree/master/ModosDeJogo) para se jogar TicTicPou.
  
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Licença Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />Este trabalho está licenciado com uma Licença <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons - Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional</a>.




================================================
FILE: Finalizadores.md
================================================
# Finalizadores

## Mecânica

Ao sobrar apenas dois jogadores na partida, ambos passam a ter uma nova ação possível: usar um Finalizador.  
Quem conseguir usar o Finalizador três vezes, sem morrer, ganha o jogo.  
Os Finalizadores não podem ser seguidos um do outro.
O jogador está vulnerável enquanto faz o Finalizador e precisa sobreviver na terceira vez para ganhar.  
A ação é uma estalagem de dedos com ambas as mãos.  

## Comentários
  
Percebemos que as partidas se extendiam por conta da postura defensiva dos dois últimos jogadores sobreviventes, especialmente por parte de novos jogadores ainda não habituados com as mecânicas do jogo. Por esse motivo, nós definimos que **o jogo acaba quando sobram apenas dois jogadores* e ambos são vencedores.**  

Entretanto, duelos entre jogadores acabam sendo bem interessantes e pensamos em formas de tornar um duelo não tão longo.  
E então criou-se o conceito de Finalizador como apresentado acima.  
Inicialmente, pensou-se em personalizar a ação e a execução após os 3 carregamentos para cada classe, mas tememos que isso possa complicar o jogo.  

## Outras opções

Uma ideia foi de que, durante um duelo entre dois jogadores, houvesse apenas uma bala em jogo. Ao recarregar a sua arma, o jogador roubaria a bala do adversário.  
Se ambos recarregassem, nada aconteceria.  
Na prática, o jogo mental se demonstrou tão interessante quanto o Finalizador, porém um pouco mais confuso e possivelmente desequilibrado quando inserido com Classes.  

## Balanceamento: Assassino

O Assassino além de receber o Finalizador, passa a receber uma arma, podendo usar Tic Tic e Pou.  




================================================
FILE: Resumo.md
================================================
Em uma roda, os jogadores mantém um ritmo e anunciam uma ação ao mesmo tempo.  
Esta ação pode ser **defender**, **carregar** uma bala ou **atirar** em alguém.  
Para **defender** o jogador cruza seus braços em frente de seu peito.  
Para **carregar**, o jogador levanta os braços como se fossem armas e fala **"Tic, Tic"**  
Para **atirar**, o jogador aponta seus braços como se fossem armas para alguém e fala **"Pou!"**  

Todos começam com 1 vida.  
Só é possível ter **uma bala no máximo.**  
O tiro não precisa ser logo seguinte do carregamento  
Caso o jogador erre a ação ou não faça o som da ação, ela é anulada.
Mas caso o jogador perca o ritmo, por qualquer motivo, ele morre.
Só é possível perder 1 no máximo vida por rodada.  

## Com Classes
No Tic Tic Pou com classes básicas, os jogadores devem escoher uma classe antes de começar o jogo.  
Todas as classes continuam tendo as três ações básicas: defender, carregar e atirar.  
É necessário ter no mínimo um de cada classe (básica) numa mesma partida.

**Mago**: pode carregar uma ação especial ao som de **"Abra"** e abrindo um livro com suas mãos  
Pode descarregar usando **"Kadabra"** e gestos como se uma **explosão** caísse dos ceús.  
**Kadabra ataca todos os demais jogadores** ao mesmo tempo, quem não estiver se defendendo morre.  
Caso o Mago leve um tiro durante o Kadabra (ou seja contra atacado por Katchim), o Mago morre e o Kadabra cancelado.   
(Obs: caso 2 Magos usem Kadabra ao mesmo tempo, os Kadabras acontecem normalmente; todos são atingidos)  

**Samurai**: pode carregar uma ação especial ao som de **"Uh!"**, colocando suas duas mãos em um lado da cintura como se segurasse a bainha de uma espada.  
Pode descarregar usando **"Katchim"** e erguendo sua espada como se estivesse **contra-atacando**.  
**Katchim reflete qualquer ataque** que teria sido recebido pelo Samurai.  
Caso um Samurai receba um Kadabra enquanto usa Katchim, o Mago é contra-atacado, morre e sua ação é anulada (ninguém mais é atacado pelo mago)  

**Padre**: pode **rezar** juntando suas mãos falando de **"Ohh"**.  
Caso o Padre consiga **rezar duas vezes** sem morrer, ele ganha **uma vida extra**.  
O Padre só pode ter **no máximo uma vida extra**.  
O Padre precisa concluir sua segunda reza para ganhar a vida.  
As duas rezas não precisam ser seguidas.  

**Cangaceiro**: pode carregar até **duas balas** em vez de apenas uma.   
Para carregar elas, ele precisa fazer **"Tic, Tic" duas vezes**, não sendo necessário serem seguidas.  
Com duas balas ele pode atirar em duas pessoas pessoas em dois turnos **ou atirar em dois alvos no mesmo turno**, gastando as duas balas.  
Para atirar em dois alvos, basta mirar em um com cada mão, falando "Pou" ou "PouPou".  

## Complementos
Uma vez que os jogadores se acostumaram com a dinâmica do jogo, é possível acrescentar novas classes, mecânicas e até modos de jogo.  
Recomenda-se acrescentar os complementos no jogo assim que possível já que eles ajudam a balancear o jogo e tornar ele mais divertido.  

**Assassino**: o assassino não possui arma, apenas defesa e uma adaga.  
Para carregar sua ação especial, o Assassino afia a sua faca ao som de **"Fshh"**.  
Para descarregar, o jogador **apunhala** um dos dois jogadores ao seu lado, falando **"Krek"** e encostando a mão fechada em seu peito.  
A apunhalada **APENAS mata na defesa**. 
Quando o jogador ao lado do Assassino morre, a próxima pessoa ao seu lado vira um novo possível alvo do assassino.
Obs: caso o Assasino apunhale um Samurai refletindo com Katchim, nada acontece; ambos continuam vivos, mas gastando seus carregamentos.  

**Finalizador**: quando sobram apenas dois jogadores numa partida, ambos passam a poder usar uma nova ação especial, o Finalizador.  
Quem conseguir usar o Finalizador **TRÊS vezes, ganha o jogo**.  
Não pode utilizar o Finalizador de forma consecutiva.  
A ação do finalizador é **estalar os dedos** de ambas as mãos, como em Família Adams.  
Caso ambos os jogadores façam o terceiro finalizador ao mesmo tempo, ambos perdem.  

Conheça mais sobre o jogo em: https://github.com/Markkop/TicTicPou  
Retirado de https://github.com/Markkop/JogosLudicos  



================================================
FILE: Classes/Assassino.md
================================================
# Assassino
  
O Assassino é a primeira classe extra/especial do Tic Tic Pou com Classes.  
Ele deve apenar ser acrescentado após a apresentação das 4 classes base.  
  
Das 3 ações básicas, o Assassino é o único que não possui a arma (TicTic e Pou), mas possuindo a defesa.  
  
No lugar da arma, o Assassino possui uma adaga.  
Para carregar a sua ação especial, o Assassino afia a sua adaga ao som de "Fshh".  
Já para utilizar a sua apunhalada, o Assassino encosta sua mão de punho fechado no peito de um dos jogadores ao seu lado ao som de "Krek!". 
Mas atenção, o jogador apunhalado apenas morre caso esteja defendendo.  
  
Se o jogador apunhalado estiver carregando qualquer ação ou atirando, ele não morre e o Assassino precisa carregar novamente para tentar outra apunhalada.  
  
Caso o jogador ao lado do Assassino morra, seja por uma apunhalada ou não, o próximo jogador ao lado passa a virar um alvo em potencial para o Assassino.  
Em testes:  
O Assassino é a classe mais fraca em um 1x1, pois basta seu rival nunca defender para ganhar o jogo. Pensando nisso, estamos cogitando restaurar a arma para o Assassino a partir do momento que virar um duelo de 1x1.  



================================================
FILE: Classes/Cangaceiro.md
================================================
# Cangaceiro

A classe Cangaceiro é a única classe que pode ter 2 balas no máximo, ao invés de apenas uma.  
  
Ele precisa recarregar elas normalmente através de "TicTic", mas pode escolher como usá-las:  
  
Ele pode atirar normalmente em duas rodadas diferentes pelo "Pou!"  
Ou ele pode atirar em dois jogadores ao mesmo tempo, mirando neles com cada mão, também ao som de "Pou!". Ao usar o tiro duplo, o Cangaceiro utiliza as duas balas.  





================================================
FILE: Classes/Kabalista.md
================================================
Kabalista

O Kabalista ou Horologista precisa fazer uma contagem regressiva em 5 turnos para ganhar o jogo. Ele não tem o Tic Tic e nem Pou.
O Kabalista está vulnerável enquanto conta.
O jogador começa a contagem falando CINCO e mostrando 5 dedos na mão. Depois fala QUATRO mostrando 4 e assim por diante.
Se o jogador terminar de contar o 1 e não morrer, ele ganha o jogo.


================================================
FILE: Classes/Ladrao.md
================================================
# Ladrao/Trombadinha

O Ladrão possui as três ações básicas do jogo.
Além disso, ele pode usar a sua ação especial em alguém, fazendo com a mão como se estivesse pegando algo no ar e falando "Perdeu"  
Caso ele use "Perdeu" em alguém que esteja carregando uma ação especial, ele rouba aquele carregamento.  
Caso ele use "Perdeu" em alguém que esteja fazendo TicTic, ele ganha uma bala (com no máximo 1 bala)  

Exemplos:  
Usou "Perdeu" no "Uh!" de um Samurai: o Ladrão pode usar "Katchin" quando quiser e o Samurai perdeu o seu carregamento.  
O mesmo para o Mago e seu "Abra".  
  
No caso do Padre, o "Perdeu" não rouba a reza, apenas cancela ela.  
No caso do Cangaceiro, o "Perdeu" não faz com quem o Ladrão tenha 2 balas, apenas rouba/cancela a bala.  

Observações:  
O Ladrão não pode usar "Perdeu" novamente até usar a ação especial que roubou anteriormente. (com exceção do roubo de um TicTic)  
Ou seja, o Ladrão não pode acumular ações especiais.  
E também o Ladrão não pode ter mais que uma bala.  

## Em testes:

Essa classe está em testes e no momento o maior problema é a força que ele tem contra Magos e Samurais, enquanto que Padres e Cangaceiros são poucos afetados.  
Também é necessário verificar como que fica a sua interação com um Assassino no jogo.  
Nota-se que, dentro do conceito atual, o Ladrão não precisa carregar o "Perdeu".  





================================================
FILE: Classes/Mago.md
================================================
# Mago
  
Mago é uma classe cuja origem se deu pela implementação da Granada no jogo base original. Granada era uma arma que podia ser armada e utilizada apenas uma vez por partida, mas todos os jogadores podiam utilizá-la. A Granada, assim como a explosão do Mago, ataca todos os jogadores ao mesmo tempo e caso o jogador receba um tiro durante o lançamento da Granada, a ação é anulada.

No Tic Tic Pou com Classes, Magos carregam a sua ação especial abrindo um livro em sua frente e anunciando "Abra". Uma vez carregada, o jogador pode executar sua ação especial em qualquer rodada simbolizando uma explosão que cai dos céus ao som de "Kadabra!". A Explosão ataca todos os jogadores da roda e quem não estiver se defendendo, morre.

Caso o Mago seja atacado durante o Kadabra, seja por um tiro, por outra explosão ou por um contra-ataque, o Mago morre e sua ação é anulada.

Nota-se aqui que o Samurai é uma classe quase counter de Mago, pois ele pode tentar coordenar seu contra-ataque para o momento que o Mago for usar sua explosão, matando o Mago e salvando demais jogadores que fossem morrer para a ação.

Resoluções:
- Caso 2 magos executem a Explosão ao mesmo tempo, ambos os magos morrem, mas ninguém mais é atacado.
- Caso o Mago seja atacado por um Assassino, o Mago não morre (pois não estaria defendendo) e o Assassino morre (pois estava vulnerável).


================================================
FILE: Classes/Metamorfo.md
================================================
## Metamorfo (conceito inicial)  

A ideia do Metamorfo parte do conceito de **mudança/adaptação de classe durante a partida**. Inicialmente esse conceito foi descartado por ser tornar muito complexo e difícil de se acompanhar durante uma partida, porém se elaborado corretamente pode-se encaixar como uma classe para jogadores experientes.  

### Ideia atual

A princípio o Metamorfo (nome possivelmente temporário) não possui arma, mas possui defesa.  
Ele também possui uma habilidade especial, aqui exemplificado como "gosma". (referência ao Ditto de Pokemon)  
A gosma é uma ação direcional e caso o alvo da gosma utilize uma habilidade especial (como um **Uh* ou um **Kadabra**), o Metamorfo se torna um jogador daquela classe.  

### Problemas:
**Como seria a interação entre o Metamorfo e o Canganceiro?**  
Poderia considerar o TicTic do Cangaceiro, porém isso tornaria a partida confusa uma vez que todos possuem TicTic. Restringir ao tiro duplo também é tornar a Gosma desproporcional às outras classes.  
  
**O Metamorfo poderia retornar a forma inicial?**  
A princípio não é uma boa ideia ele poder mudar de classe com frequencia para que não gere confusão entre os demais jogadores.  

### Outras ideias
Pensou-se também em tornar a ação de gosma global e caso o Metamorfo fosse alvo de uma classe, ele se tornaria aquela classe, porém a ação dele seria um tipo de defesa e continuaríamos com o problema do Cangaceiro.  

_Parte da ideia dessa classe tem como base a classe Amnesiac de Town of Salem._  




================================================
FILE: Classes/Noviço.md
================================================
# Noviço
  
Noviço é uma classe café-com-leite para jogadores que estão jogando Tic Tic Pou com classes pela primeira vez. Ela é opcional, mas só pode ser utilizada uma ou duas vezes no máximo.  
  
O Noviço possui as 3 ações básicas, mas a ação de atirar também protege o Noviço, fazendo com que ele apenas esteja vulnerável enquanto recarrega.  
  
Para simbolizar esse efeito, em vez do "Pou!" ser feito com ambos os braços esticados, um dos braços cruza com o outro como se estivesse segurando um escudo.  
  
É o sonho de todo jogador de TicTicPou com Classes poder voltar a ser noviço.  


================================================
FILE: Classes/Pacificador.md
================================================
# Pacificador (em testes)
  
Pacificador é uma classe que ainda está sendo desenvolvida em conjunto com todos os jogadores que compreendem as demais classes do jogo e contribuem com novas ideais.  
  
Em um primeiro momento, o Pacificador tinha, além das 3 ações básicas, uma ação especial que cancelava todas as ações de carregamentos. Esta ação não necessitava de carregamento.  
A ação era interessante pois modificava o ritmo do jogo, mas não era suficiente para deixá-lo competitivo.  
  
Houve duas ideias de mecânicas adicionais para a classe para deixar seu "gameplay" mais dinâmico:  
- Caso o Pacificador cancelasse o carregamento de metade ou mais jogadores, ele ganha uma vida extra.  
Dessa forma ele tentaria anular o carregamento de mais pessoas enquanto os demais jogadores tentam não ser anulados para não conceder uma vida ao Pacificador.  
O problema aqui foi que contar o número de jogadores afetados durante uma partida se demonstrou inviável.  
  
- O Pacificador não pode mais cancelar duas vezes seguidas, mas os jogadores afetados não podem repetir o mesmo carregamento no próximo turno.
Dessa forma as ações seriam mais estratégicas, mas também não muda muito a dinâmica da classe.  
  
## Estado atual  
  
Atualmente, a ação de cancelar do Pacificador cancela todas as ações daquela rodada, mas é necessário carregá-la assim como as demais classes.
Caso o Pacificador salve alguém da morte por ter cancelado, ele ganha uma vida extra (com no máximo uma).   
  
Recarregar ação especial: o Pacificador cruza seus braços para o alto, formando um X e anunciando "Prepara".  
Usar ação especial: o Pacificador descruza os braços num movimento como se fosse um juiz de futebol encerrando uma partida e anunciando "Cancela!"  
  
Esta mecânica parece ser a mais interessante até o momento, mas ainda carece de testes para avaliar a viabilidade.  
  
Resoluções:  
Caso o Pacificador seja atacado enquanto Cancela, seu cancelamento não é ativado de forma similar ao Mago. (E se tiver uma vida extra? A definir)  
  
A prioridade é sempre verificar se o Pacificador é morto durante a rodada. Caso seja, seu cancelamento não é ativado, mesmo que sua vida teria sido salva.  


================================================
FILE: Classes/Padre.md
================================================
# Padre
  
Da mesma forma que o Mago foi criado pela arma Granada, Padre foi criado por uma arma semelhante que concedia uma vida extra.  
  
Padre é uma classe "late-game" na qual só possui uma ação especial além das ações básicas. O Padre reza com as mãos juntas ao som de "Ohh" e caso consiga rezar com sucesso por duas vezes, sem precisarem ser seguidas, o Padre adquiri uma vida extra (com no máximo 1 vida extra).

Caso o Padre perca a sua vida extra, ele poderá voltar a rezar para recuperá-la.

O Padre, assim como as demais classes base, continua tendo sua arma com TicTic e Pou, além da defesa é claro.

O Padre precisa conseguir dar a sua segunda reza com sucesso para adquirir a vida extra. Caso ele seja atacado durante sua segunda reza, ele morre.

Em partidas onde há novos jogadores, é recomendado que o Padre anuncie que tinha uma vida extra ao ser atacado para evitar confusões.

(É bastante comum um Padre ser atacado e o atacante estranhar que o Padre continua no jogo).


================================================
FILE: Classes/Paramedico (Em Equipe).md
================================================
# Paramédico (apenas para o Modo de Jogo "Em Equipe")

O Paramédico possui as 3 ações básicas: Defesa, TicTic e Pou  
Além disso, ele pode carregar a sua ação especial arrastando as suas mãos umas nas outras de punhos fechados como se estivesse preparando para usar um **Desfibrilador**. Ao fazer isso ele emite o som de "**Zzz**".  
Para usar, ele encosta (ou aponta) as duas mãos de punhos fechados em um aliado morto ao som de **"Contato!"**, **revivendo o aliado**.  

O Paramédico **só pode carregar** sua ação especial **caso um aliado esteja morto**.  
Um jogador só pode reviver uma vez.  
  
Em testes:  
- número de carregamentos para reviver alguém (atualmente: 1)  
- número de vezes que o paramédio pode reviver (atualmente: não há)  
- número de vezes que um jogador pode reviver (atualmente: 1)  

Obs:  
O Paramédico só está disponível para o Modo de Jogo: TicTicPou em Equipe, uma vez que classes de suporte/colaborativas não se encaixam na versão normal do jogo.  


================================================
FILE: Classes/Samurai.md
================================================
# Samurai

Samurai é uma classe defensiva cuja ação especial é um contra-ataque.
O Samurai carrega a sua ação especial colocando ambas as suas mãos em um lado da cintura, como se segurasse uma espada em sua bainha, e anuncia "Uh".
Para executar, o Samurai saca sua espada para o alto ao som de "Katchim!".

O contra-ataque não é direcional, refletindo QUALQUER ataque que o Samurai estiver recebendo naquela rodada, como tiros e explosões.

Caso o Samurai não seja atacado, seu carregamento foi utilizado e será necessário armar novamente para contra-ataquer em outro momento.

Resoluções:
- Caso o Samurai seja atacado por um Assassino, nada acontece. (pois o Samurai não estava defendendo e portanto o ataque do Assasino não foi refletido, permanecendo ambos vivos, mas seus carregamentos utilizados).
- Caso o Samurai reflita o ataque duplo de um Cangaceiro, o Cangaceiro morre, mas seu outro alvo é atingido (o ataque duplo não é anulado, pois o tiro base do jogo possui prioridade)


================================================
FILE: Materiais/Materiais.md
================================================
## Materiais
  
Estamos aceitando o apoio de quem quiser colaborar com a confecção de materiais para uma melhor apresentação do jogo como por exemplo guias, cartilhas e vídeos.  


================================================
FILE: ModosDeJogo/Campanha.md
================================================
# Modo Campanha  

O Modo Campanha é um modo de jogo um pouco mais avançado que o Modo Clássico que requer um acompanhamento de vidas e classes mais dinâmico. Este modo incentiva a agressividade no começo da partida e passa a sensação de evolução, tal como em um RPG.  
  
No Modo Campanha, todos os jogadores começam a partida com **duas vidas e sem classe**, tendo apenas a Defesa, o Tic Tic e Pou!.  
O jogador pode **escolher uma classe** para assumir durante o resto da partida **ao tirar uma vida** de outro jogador.  
Este jogador escolhe a sua classe fazendo a respectiva ação de carregamento.  
  
Obs:  
O jogador pode esperar para escolher a classe.  
Tirar a **vida extra** de um Padre libera a escolha de classe.  
Para escolher o Caganceiro, o jogador carrega uma segunda vez.  
Se o jogador fizer Tic Tic antes de escolher a classe ele já não pode mais ser o Assassino ou Kabalista, uma vez que estes não possuem Tic Tic.  
Antes de iniciar o jogo, todos os jogadores declaram que irão jogar o Modo Campanha mantendo a posição de defesa em vez de uma classe.  
  
## Ideia descartada: Evolução

(A seguinte ideia não se tornou prática por adicionar muitos novos elementos na partida, mas fica o registro para possíveis novas inspirações)  
Após escolher sua classe, caso o jogador tire mais 2 vidas, a sua classe evolui:

**Mago > Sábio:** o Abra agora pode carregar uma segunda magia: Alakazham. Ao usar Alakazham, o jogador reflete qualquer ataque que receber de volta a todos os outros jogadores. 

**Padre > Monge:** o Monge não tem mais Tic Tic e Pou, mas tem o Soco que não precisa de carregamento e ataca apenas os jogadores ao lado. 

**Samurai > :** Katchin vira Katchau e além de refletir, ataca um jogador direcionado. 

**Cangaceiro > Lampião:** carrega Tic Tic cruzando os braços e armando duas duas balas ao mesmo tempo. O jogador também pode atacar lançando  um facão com Peixera, sem precisar carregar. 

**Assassino > Ninja:** Afiar adaga agora também permite lancar uma Kunai com Tec, que é um Krek a distância. O Assssino não morre mais ao atacar (ataca segurando um braço se protegendo). 

**Ladrão > :** O ladrão passa a roubar magias de forma permanente. Também pode roubar rezas e ter até duas balas.



================================================
FILE: ModosDeJogo/EmEquipe.md
================================================
# Em Equipe  
  
É possível jogar TicTicPou em Equipes de 2x2, 3x3, 4x4 e assim por diante.  
Nota-se que algumas classes novas podem não ficar balanceadas em 2x2, recomendamos no mínimo 3x3.  
O TicTicPou em Equipe funciona igual ao normal, mas os times jogam um de frente para o outro em um formato oval (para que jogadores do mesmo time possam se ver e interagir).  
Fogo amigo é desativado, ou seja, um Kadabra não afeta jogadores do mesmo time.

Esse modo de jogo permite a elaboração de classes de suporte, algo que não era compatível com o TicTicPou normal uma vez que neste não cabe ações colaborativas.

## Nova Classe: Paramédico

O Paramédico possui as 3 ações básicas: Defesa, TicTic e Pou  
Além disso, ele pode carregar a sua ação especial arrastando as suas mãos umas nas outras de punhos fechados como se estivesse preparando para usar um **Desfibrilador**. Ao fazer isso ele emite o som de "**Zzz**".  
Para usar, ele encosta (ou aponta) as duas mãos de punhos fechados em um aliado morto ao som de **"Contato!"**, **revivendo o aliado**.  

O Paramédico **só pode carregar** sua ação especial **caso um aliado esteja morto**.  
Um jogador só pode reviver uma vez.  
  
Em testes:  
- número de carregamentos para reviver alguém (atualmente: 1)  
- número de vezes que o paramédio pode reviver (atualmente: não há)  
- número de vezes que um jogador pode reviver (atualmente: 1)  

# Em Desenvolvimento

Os seguintes conceitos estão em desenvolvimento e não são definitivos (inclusive os nomes).
Qualquer colaboração é apreciada.

## Conceito: Guardacostas
  
O Guardacostas também possui as três ações básicas.  
Além disso, ele pode carregar sua ação especial para usar e proteger algum aliado.  
Movimentos, sons e balanceamento ainda indefinidos.  

## Conceito: Apaixonado

O Apaixonado é um conceito que requer que ele e outro jogador do próprio time façam uma ação única juntos (consideremos apontar um para o outro por enquanto).
Caso ambos os jogadores se apontem, uma ação forte acontece.
Porém, caso um deles seja atacado no mesmo momento, a ação não acontece.
A ideia por trás é fazer com quem dois jogadores do mesmo time tentem se "sacarem" sem que o outro time perceba e contra-ataque.
Possíveis ações fortes:
- Todos do mesmo time recebem uma carga de sua ação especial
- O jogador que interagiu com o Apaixonado recebe uma vida extra
- Todos os inimigos perdem todos os carregamentos
- Todos os aliados ficam imunes naquela rodada, menos os jogadores que se apontaram

## Conceito: Carregador

O Carregador pode armar o TicTic e/ou a ação especial de um ou mais aliados.


================================================
FILE: ModosDeJogo/ModoJoKenPo.md
================================================
Modo JoKenPo

O modo JoKenPo permite jogar Tic Tic Pou em ambientes silenciosos ou com som muito alto, tirando todos os sons do jogo.
Em vez de bater nas pernas, os jogadores batem uma mão com punho fechado na outra mão de punho aberto nos estilo Jo Ken Po duas vezes e na terceira anuncia a ação com apenas uma mão.

Ações:
Defender - Punho fechado
Careregar - Mão de arminha com dois dedos junhos apontados para cima
Atirar - Mão de arminha apontada para o alvo.

Carregar Abra - move a mão aberta virada pra cima
Descarregar Kadabra - move a mão aberta para baixo

Carregar Uh! - aponta para si mesmo
Descarregar Katchin! - faz um movimento de arco para cima com o dedo indicador

Rezar Ohh! - igual ao original, mas apenas com uma mão

Tiro duplo - aponta com dois dedos para dois jogadores diferentes da forma mais clara possível

Carregar Fsh.. - igual ao original, mas sem segurar a segura 
Apunhalar Krek! - move a mão em direção ao alvo mirando com a base do punho

Usar Perdeu! - igual ao original

Carregar Bzz e Usar Contato! iguais ao original, mas com uma mão

Finalizador - igual ao original

Jogar Tic Tic Pou sem som torna o jogo bem mais dificil e requer bastante prática e concentração, então é recomendado joggar em poucos jogadores (2 - 5)



================================================
FILE: ModosDeJogo/Torneio.md
================================================
## Torneios

Estamos elaborando em como organizar torneios de TicTicPou com Classes.  
Avalia-se três possibilidades:  

* Oito jogadores: 2 de cada classe base.  
* Nove jogadores: 2 de cada classe base e um assassino.  
* Dez jogadores: 2 de cada classe base e dois assassinos.  

Há de se verificar se Padre não está muito forte e se não há necessidade de se limitar em um Padre no máximo.  
Outra possibilidade é adicionar um Pacificador no lugar do segundo Padre, por compartilharem da mesma mecânica de vida extra (testar Pacificador antes)  

**Pontuações:**  
* Matar um jogador: 1 ponto  
* Vencer uma partida: 5 pontos  
* Chegar no duelo 1x1 de uma partida, mas não ganhar: 3 pontos  
  
_(Todas essas definições foram elaboradas em um primeiro momento apenas e devem ser revisadas)_  


---

A minha ideia para esse site é que ele seja um site relativamente simples inicialmente, de ponto de vista, mas no fim vai acabar tendo várias funcionalidades, então ele precisa crescer de uma forma escalável, mais no sentido de codebase, mesmo de linhas de código em cada arquivo e domínio.

A ideia é que esse site tenha uma landing page, ele tem alguns tons em laranja, eu penso que combina mais com esse projeto, e talvez algo até laranja e preto, algo mais dark mode, sem white mode.

Ele vai ter a landing page e, aí, a gente não sabe ainda como vai organizar, mas a ideia é que tenha página para todas as classes e mostre todas as classes, não precisamos ter classes individuais, página para cá, individual, por enquanto.

Nessa página que mostra todas as classes, ele precisa mostrar, por exemplo, são quadrados, dois por linha, bem grande, isso mostrando quase todas as informações de cada classe de uma forma fácil de ler, como já tá até feito nas documentações, alguns detalhes mais pontuais, tipo bolete list, e eventualmente, a gente vai ter que mostrar também como resolver cada situação entre cada classe, como, por exemplo, o fato de alguém atirar em um mago durante um cadabra, cancelar a ação do Mago.

Então, a gente precisa ter, por exemplo, um botão de ver mais que simplesmente vai expandir o card com mais informações específicas sobre aquela classe.

A gente também quer ter uma página dizendo os modos do jogo que existem e também mecânicas do jogo.

Também podemos ter uma página de ações e, nessa página de ações, a gente vai ter, já em cargos menores, dessa vez, todas as possíveis ações do jogo, com uma barra de busca para gente poder pesquisar rapidamente uma ação específica.

Lá, a gente vai ter o defender, o atirar, o carregar, o abro cadabra, e assim por diante, todas as ações, inclusive o finalizador, com uma imagem e uma breve descrição do que aquilo faz e também mostrando algumas interações específicas.

O que acontece nesses pequenos cards de ações é uma outra parte importante do website.

Vai ser eu, vou ser uma que vai requer autoindicação e consequentemente, banco de dados para gente armazenar usuários, mais especificamente, armazenar um ranking.

A idéia é que isso seja um sistema de embaixador do jogo que vamos poder registrar partidas oficiais e as partidas oficiais vão conter membros usuários do site que vão ter feito cadastro e vão estar aptos a participar dessas partidas oficiais, onde ela será inserida manualmente pelo por um por um Admin e esse Admin, ele nesse caso é o embaixador, o embaixador pode registrar partidas oficiais marcando os jogadores e as classes que eles usaram e se foi vitória ou empate a vitória de quem empate entre quem e a ideia é ter uma lista, uma página com uma lista de todas as partidas oficiais da mais recente para mais antiga.

O embaixador também vai poder anotar o dia mesmo que não foi naquele dia a partida e, talvez, o local.

A ideia é que seja uma página com uma lista de apenas linhas e talvez até linhas que sejam clicáveis e expandíveis, com linhas de algo não precisa ser esse valor, mas é só para você ter ideia da dimensão, algo com 800 pixels de comprimento e uns 40 pixels de altura inicialmente.
Aí, quando clica, ele expande para visualizar as informações melhores e outras até possíveis informações. É daquela partida e aí de cima para baixo é ordenado por mais recente e também pesquisável, com uma barra de busca para pesquisar sobre qualquer informação client-side que esteja disponível nessa partida, quase como uma busca textual. Isso estraga diretamente conectado com o ranking que vai ser o ranking usando o método de elo. Cada jogador terá um valor de elo e ficará mais no topo do ranking aquele com maior elo. Esse elo será definido pelas partidas oficiais de forma que faça sentido.
Outra coisa, usuários quando eles se cadastram, eles precisam ter uma página de perfil. Nessa página de perfil, eles vão precisar botar:
- Um avatar
- Um nome
- Um display name (nome de exibição)
- Opcionalmente, botar outras informações, como por exemplo:
- Classe favorita
- Modo de jogo favorito
- Outros interesses do usuário
Essas informações vão ser usadas para criar uma página que mostra a soma de todas as opiniões em relação a essas coisas.

Project in nextjs, tailwind, shadcn components (don't create them, import them using shadcn commands), @neondatabase/serverless Neon DB, @stackframe/stack Stack Auth 