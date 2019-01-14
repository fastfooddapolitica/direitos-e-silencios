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
    width: 150px;
    height: 150px;
    background-image: url('~@/assets/images/direitos_silencios_frente.png');
    margin: 10px;
    display: inline-block;
    overflow: hidden;
    z-index: 2;
    cursor: grab;
    position: relative;
    background-size: 100%;
    border-radius: 10px;
    color: white;
    padding: 10px;
    padding-top: 70px;
    background-repeat: no-repeat;
    box-sizing: border-box;
}
</style>
