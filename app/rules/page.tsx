import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Regras - Tic Tic Pou",
  description: "Regras e instruções do jogo Tic Tic Pou com Classes",
};

export default function RulesPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-foreground">Regras do Jogo</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Origem e derivação</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tic Tic Pou com Classes é uma versão alternativa ao <strong className="text-foreground">Tic Tic Pou original</strong>, jogo de roda cuja origem não é conhecida (se você souber de algo, nos avise). O jogo foi apresentado a um grupo de amigos que gostaram do jogo, tanto pela sua simplicidade quanto pela sua dinâmica, que estes foram acrescentando novas ações em complemento as três ações base: <strong className="text-foreground">Defender, Recarregar e Atacar</strong>. Conforme nos desafiamos a botar cada vez mais ações, o jogo começou a ficar muito complexo de acompanhar e então criamos as classes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O processo criativo acontece de forma espontânea e colaborativa entre todos que já jogaram o jogo em algum momento e possuem interessem avaliar e contribuir para o refinamento do jogo e de suas classes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              O jogo é ensinado em etapas, sugerimos ensinar o jogo base primeiro, jogar algumas partidas, adicionar as 4 classes + noviço e apenas então acrescentar demais <Link href="/classes" className="text-primary hover:text-primary underline">classes</Link>/mecânicas como Assassino e Finalizadores.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Tic Tic Pou (jogo base)</h2>
          
          <Card className="mb-6">
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold mb-4 text-primary">Preparação:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• O jogo precisa de 3 ou mais jogadores.</li>
                <li>• Os jogadores se posicionam de forma a fazer um círculo.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold mb-4 text-primary">Rotina:</h3>
              <p className="text-muted-foreground mb-4">
                Durante o jogo todos os jogadores podem usar uma de 3 ações, declarando ela ao mesmo tempo no passo de um ritmo.
                O ritmo é definido com todos os jogadores batendo simultaneamente as mãos nas pernas. A rotina é:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-center text-white">
                [&quot;1..2..3..e..&quot;] - [Bate] - [Bate] - [Ação] - [Bate] - [Bate] - [Ação] - [...]
              </div>
              <p className="text-muted-foreground mt-4">
                Quando sobram apenas 2 jogadores (1×1), eles passam a poder usar uma nova ação especial: Finalizador (mais detalhes abaixo)
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold mb-4 text-primary">Ações:</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-foreground">Defender:</span>
                  <span className="text-muted-foreground"> o jogador se defende de todos os tiros cruzando seus braços de forma a fazer um X em seu peito</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Recarregar:</span>
                  <span className="text-muted-foreground"> o jogador levanta ambas as mãos simbolizando armas e faz o som &quot;Tic Tic&quot;, ganhando 1 bala para atirar.</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Atirar:</span>
                  <span className="text-muted-foreground"> o jogador aponta suas mãos simbolizando armas para um alvo e faz o som &quot;Pou!&quot;, gastando uma bala e matando o alvo que estiver sem defender.</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary mb-3">Observações:</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Todos começam com 1 vida e 0 balas.</li>
                  <li>• Só é possível ter <strong className="text-foreground">uma bala</strong> guardada no máximo.</li>
                  <li>• Não é necessário atirar na rodada seguinte que recarregou, você pode &quot;guardar&quot; a bala.</li>
                  <li>• Todos possuem apenas uma vida; se for atacado enquanto recarrega ou atira, morre.</li>
                  <li>• É necessário anunciar o <strong className="text-foreground">som</strong> correspondente a sua ação (menos na Defesa, na qual não há som)</li>
                  <li>• Se perder o ritmo em qualquer momento, o jogador é eliminado</li>
                  <li>• Se errar alguma ação, o jogador é considerado vulnerável e sua ação não tem efeito.</li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary mb-3">Exemplos:</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• JogadorA atira em JogadorB que defende: jogadorB não morre e jogadorA perde uma bala.</li>
                  <li>• JogadorA atira em JogadorB que recarrega: jogadorB morre e jogadorA perde uma bala.</li>
                  <li>• JogadorA foi atirar no JogadorB, mas falou &quot;Tic Tic&quot; em vez de &quot;Pou!&quot;: jogadorA é eliminado</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Tic Tic Pou – Com Classes</h2>
          <p className="text-muted-foreground mb-6">
            Nesta versão os jogadores podem escolher classes antes de começar o jogo.<br/>
            Cada classe possui até 2 ações especiais extras.<br/>
            Todos possuem as três ações básicas: atirar, recarregar e defender.
          </p>

          <h3 className="text-2xl font-semibold mb-6 text-primary">As 4 classes base são:</h3>
          
          <div className="grid gap-6 mb-8">
            <Card>
              <CardContent className="pt-0">
                <h4 className="text-xl font-semibold text-primary mb-3">Mago (Explosão)</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Carregar ação especial:</strong> o Mago abre um livro figurativo com as mãos e fala <strong className="text-foreground">&quot;Abra&quot;</strong>. Assim como a bala, só pode ter uma Explosão carregada por vez.</p>
                  <p><strong className="text-foreground">Usar ação especial:</strong> o Mago faz como se uma explosão caísse dos céus com suas mãos e fala <strong className="text-foreground">&quot;Kadabra!&quot;</strong>, atacando todos os jogadores que não estiverem defendendo.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-0">
                <h4 className="text-xl font-semibold text-primary mb-3">Espadachim (Contra-ataque)</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Carregar ação especial:</strong> o Espadachim bota as duas mãos do lado esquerdo da cintura como se estivesse pra sacar uma espada e fala <strong className="text-foreground">&quot;Uh!&quot;</strong></p>
                  <p><strong className="text-foreground">Usar ação especial:</strong> o Espadachim puxa a espada da cintura e golpeia o ar ao som de <strong className="text-foreground">&quot;Katchim!&quot;</strong>, refletindo qualquer ataque que receber.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-0">
                <h4 className="text-xl font-semibold text-primary mb-3">Padre (Vida Extra)</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Carregar ação especial:</strong> o Padre junta suas mãos e reza ao som de <strong className="text-foreground">&quot;Ohh!&quot;</strong>.</p>
                  <p>Se o padre rezar duas vezes, sem precisar ser seguidas, ele ganha uma vida extra. (no máximo 1 vida extra)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-0">
                <h4 className="text-xl font-semibold text-primary mb-3">Cangaceiro (Tiro Duplo)</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>O Cangaceiro pode ter até <strong className="text-foreground">duas balas</strong>, tendo que as carregar normalmente pela ação de recarregar (&quot;Tic Tic&quot;)</p>
                  <p>Ele pode atirar duas vezes com o <strong className="text-foreground">&quot;Pou!&quot;</strong> ou atirar em duas pessoas ao mesmo tempo, mirando com uma mão em cada, gastando as suas duas balas.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold mb-4 text-primary">Preparação:</h3>
              <p className="text-muted-foreground mb-4">
                Antes de começar a partida todos os jogadores devem declarar as suas classes, exibindo com suas mãos as ações de recarregar especial:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong className="text-foreground">Mago:</strong> mantém as mãos como se segurasse um livro aberto</li>
                <li>• <strong className="text-foreground">Espadachim:</strong> mantém as mãos no lado esquerdo da cintura como se segurasse uma espada em sua bainha</li>
                <li>• <strong className="text-foreground">Padre:</strong> mantém as mãos como se estivesse rezando</li>
                <li>• <strong className="text-foreground">Cangaceiro:</strong> mantém as mãos apontadas pra cima como se estivesse recarregando</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                É necessário que se tenha no mínimo um de cada classe
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold mb-4 text-primary">Resoluções e exemplos:</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Se o Mago morrer para um <strong className="text-foreground">Tiro ou Katchin</strong> enquanto usa sua explosão, a ação dele é anulada e ninguém é atingido.</li>
                <li>• Se o Espadachim refletir a explosão do Mago e o Mago morrer, sua explosão é anulada.</li>
                <li>• Se dois Magos usarem explosão juntos, ambos morrem e ninguém mais é atacado.</li>
                <li>• A partir do momento que o Padre reza pela segunda vez (sem ser morto), ele possui uma vida extra.</li>
                <li>• Se o Padre for atacado enquanto vulnerável e tiver uma vida extra, ele continua normalmente no jogo, mas perdendo a sua vida extra e podendo rezar novamente (duas vezes) para recuperá-la.</li>
                <li>• Os jogadores ficam vulneráveis durante todas as ações de recarregamento (Abra, Uh, Ohh, Tic Tic)</li>
                <li>• Se o Caganceiro atirar em A e B e A for o Espadachim refletindo; o Cangaceiro morre, mas B ainda recebe o tiro.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-0">
              <h3 className="text-xl font-semibold mb-4 text-primary">Noviço (Café com leite) [opcional]</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Para os jogadores que nunca jogaram Tic Tic Pou – Com Classes antes, estes poderão ser Noviços.</p>
                <p>Só é possível jogar de Noviço apenas uma vez.</p>
                <p>O Noviço possui apenas as 3 ações básicas: defender, recarregar e atirar.</p>
                <p><strong className="text-foreground">Mas quando ele atira, ele automaticamente se defende junto</strong>, demonstrando visualmente com uma mão mirando em alguém e o outro braço cruzado como se segurasse um escudo.</p>
                <p>A declaração de sua classe antes de começar a partida é a pose acima: um braço atirando e o outro cruzado como se segurasse um escudo.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Complementos</h2>
          <p className="text-muted-foreground mb-6">
            Uma vez que os jogadores estiverem habituados com as 4 classes básicas, é possível introduzir novas classes e mecânicas.<br/>
            Em especial, recomendamos adicionar o Assassino e o Finalizador.
          </p>
          
          <div className="flex justify-center mb-8">
            <Link href="/classes" className="bg-orange-600 hover:bg-orange-700 text-foreground font-semibold py-3 px-6 rounded-lg transition-colors">
              Ver todas as classes
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-primary">Finalizadores</h2>
          <Card>
            <CardContent className="pt-0">
              <div className="space-y-3 text-muted-foreground">
                <p>Quando sobram apenas 2 jogadores (1x1), ambos podem utilizar uma nova ação: o <strong className="text-foreground">Finalizador</strong>.</p>
                <p>Quem utilizar o Finalizador <strong className="text-foreground">TRÊS</strong> vezes, ganha o jogo.</p>
                <ul className="space-y-2 mt-4">
                  <li>• Não pode usar em rodadas consecutivas.</li>
                  <li>• O jogador está vulneravel enquanto usa um finalizador.</li>
                  <li>• A ação do Finalizador é <strong className="text-foreground">estalar os dedos</strong> de ambas as mãos duas vezes, como na Família Adams.</li>
                  <li>• Caso ambos os jogadores façam o terceiro finalizador ao mesmo tempo, ambos perdem.</li>
                  <li>• Após realizar o Finalizador pela terceira vez, sem morrer, o jogador é declarado vencedor.</li>
                </ul>
                <p className="text-sm italic mt-4">
                  (Obs: o Assassino passa a ter TicTic e Pou enquanto em um 1x1)
                </p>
              </div>
            </CardContent>
          </Card>
          
          <p className="text-muted-foreground mt-6 mb-4">
            Também há outros modos de jogo para se jogar TicTicPou.
          </p>
          
          <div className="flex justify-center">
            <Link href="/game-modes" className="bg-orange-600 hover:bg-orange-700 text-foreground font-semibold py-3 px-6 rounded-lg transition-colors">
              Ver modos de jogo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}