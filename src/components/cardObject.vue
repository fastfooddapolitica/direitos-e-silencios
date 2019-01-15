<template>
  <div class="card">
    <button class="btn show-details" @click="showDetails">?</button>
    {{cardData.year}} - {{cardData.name}}
  </div>
</template>

<script>
import cardDetails from '@/components/cardDetails.vue'

export default {
  name: 'cardObject',
  props: {
    cardData: Object
  },
  methods: {
    showDetails () {
      this.$emit(
        'openModal',
        {
          component: cardDetails,
          props: { cardData: this.cardData }
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.card {
    width: 150px;
    height: 150px;
    background-image: url('~@/assets/images/frente.png');
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
    box-shadow: 2px 2px 4px 0px #777;
}
.show-details {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
}
</style>
