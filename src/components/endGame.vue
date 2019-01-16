<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ msg }}</p>
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
    title () {
      return this.minWrongCardsCount ? 'Ops..' : 'Parabéns!'
    },
    msg () {
      if (!this.minWrongCardsCount) {
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
