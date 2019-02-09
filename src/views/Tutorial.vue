<template>
  <div>
    <h1>Instruções:</h1>
    <p>A Constituição Federal de 1988 institui o princípio da igualdade, que abrange a igualdade entre os sexos perante a lei. Entretanto, as mulheres nem sempre tiveram - e ainda não têm - os mesmos direitos que os homens.</p>
    <p>Quais direitos das mulheres já foram formalizados aqui no Brasil?</p>
    <h2>Como jogar?</h2>
    <p>A cada rodada, você receberá 5 cartas aleatórias, cada uma representando um direito das mulheres brasileiras.</p>
    <p>A sua missão é montar uma linha do tempo com essas cartas, arrastando para a parte de “Não existe” (não há um número mínimo ou máximo de cartas que não existem a cada rodada) as que você achar que ainda não foram formalizadas legalmente, ou seja, quando não há decisões judiciais, leis ou decretos que garantam esse direito para as mulheres, a nível federal. Isso quer dizer que podem existir leis e decretos estaduais ou municipais, garantindo mais direitos para as mulheres, mas, para este jogo, consideramos apenas aqueles que tiverem abrangência nacional.</p>
    <p>Para organizar a ordem das cartas, clique e arraste-as, até ficarem na ordem que você acha correta.</p>
    <h3>No celular:</h3>
    <ul>
      <li>Encoste na carta escolhida e arraste-a para os lados, assim você muda a ordem da linha do tempo da conquista dos direitos;</li>
      <li>Para melhor visualização, jogue na posição horizontal e, para ver todas as cartas, encoste na parte da tela abaixo das cartas e arraste para os lados.</li>
    </ul>
    <p>Já decidiu a ordem das cartas? Então, clique em “Verificar cartas” para saber se acertou!</p>
    <p>Se alguma carta estiver errada, você pode clicar em “Tentar de novo” para rever as mesmas cartas.</p>
    <p>Mas se você já quiser saber o resultado, clique em “Revelar cartas” para saber as datas e acessar mais informações (no verso, há um ponto de interrogação no canto superior direito, clicando nele, você saberá a referência bibliográfica da carta e mais dados).</p>
    <p>Bom jogo!</p>

    <ul>
      <li><btn-x :to="{ name: 'intro'}">Voltar</btn-x></li>
    </ul>
  </div>
</template>
