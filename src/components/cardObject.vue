<template>
  <div class="card">
    {{cardData.year}} - {{cardData.name}}
  </div>
</template>

<script>
export default {
  name: 'cardObject',
  props: {
    cardData: Object
  }
}
</script>

<style scoped lang="scss">
.card {
    width: 100px;
    height: 100px;
    background-color: rgb(172, 211, 226);
    margin: 10px;
    display: inline-block;
    overflow: hidden;
    z-index: 2;
    cursor: grab;
    position: relative;
}
</style>
