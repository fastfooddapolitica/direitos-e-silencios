<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ msg }}</p>
    <btn-x @click="$emit('tryAgain')" v-if="!won">Tentar de novo</btn-x>
    <btn-x @click="$emit('flipCards')" v-if="!won">Revelar cartas</btn-x>
    <btn-x @click="$emit('tryAgain')" v-if="won">Ver cartas</btn-x>
    <btn-x @click="$emit('restartGame')">Novo jogo</btn-x>
    <p>Muito obrigada por jogar! Queremos muito saber o que você achou para seguirmos desenvolvendo jogos sobre temas tão importantes. Por favor, responde essas <a href="https://docs.google.com/forms/d/e/1FAIpQLSeVjVvijesilKEJkVz6wn-3LLrBbD26jFAZZuPJ6-HYrEa3wQ/viewform" target="_blank" rel="noopener noreferrer">perguntinhas aqui</a>? (Leva menos de três minutos).</p>
  </div>
</template>

<script>
export default {
  name: 'endGame',
  props: {
    minWrongCardsCount: Number,
    triesCount: Number
  },
  computed: {
    won () {
      return !this.minWrongCardsCount
    },
    title () {
      return this.won ? 'Parabéns!' : 'Ops..'
    },
    msg () {
      if (this.won) {
        return 'Todas as cartas estão certas! Feche esta janela e clique no "?" em cada carta para saber mais sobre elas.'
      } else {
        if (this.minWrongCardsCount === 1) {
          return 'Pelo menos uma carta está errada...'
        } else {
          return `Pelo menos ${this.minWrongCardsCount} cartas estão erradas...`
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/vars.scss';
a {
  color: $sec-color;
}
</style>
