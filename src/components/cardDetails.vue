<template>
  <div class="card-details">
    <h2><span v-if="exists">{{cardData.year}} - </span>{{cardData.name}}</h2>
    <h3>{{ cardData.subtitle }}</h3>
    <p v-if="!exists"><strong>- Não existe -</strong></p>
    <p v-for="(line, i) in description" :key="i">{{ line }}</p>
    <ul>
      <li v-for="link in cardData.links" :key="link.url">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// If it's a string, return an Array containing the string.
function strOrArrayToArray (items) {
  return typeof items === 'string' ? [items] : items
}

export default {
  name: 'cardDetails',
  props: {
    cardData: Object
  },
  computed: {
    description () {
      return strOrArrayToArray(this.cardData.description)
    },
    exists () {
      return this.cardData.year !== 'x'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
