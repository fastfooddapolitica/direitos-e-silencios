<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ msg }}</p>
    <btn-x @click="$emit('tryAgain')" v-if="!won">Tentar de novo</btn-x>
    <btn-x @click="$emit('flipCards')">Revelar cartas</btn-x>
    <btn-x @click="$emit('restartGame')">Novo jogo</btn-x>
    <p>Por favor! Responda ao nosso <a href="https://docs.google.com/forms/d/e/1FAIpQLSeVjVvijesilKEJkVz6wn-3LLrBbD26jFAZZuPJ6-HYrEa3wQ/viewform" target="_blank" rel="noopener noreferrer">questionário</a>!</p>
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
        return 'Todas as cartas estão certas!'
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
