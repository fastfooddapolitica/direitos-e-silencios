<template>
<div id="main">
  <div class="drag">
    <div class="viewport">
      <draggable v-model="cardsInPlay" class="play-area" :options="{group:'people'}">
        <card-object v-for="element in cardsInPlay" :key="element.name" :cardData="element"></card-object>
      </draggable>
    </div>
  </div>

  <draggable v-model="discardPile" class="discard-area" :options="{group:'people'}">
    <card-object v-for="element in discardPile" :key="element.name" :cardData="element"></card-object>
  </draggable>

  <button @click="checkCards"> Verificar cartas </button>

  <div v-show="rightSequence == false">Está errado!!</div>
  <div v-show="rightSequence == true">Está certo!!</div>
</div>

</template>

<script>
import draggable from 'vuedraggable'
import cards from '@/assets/texts/cards.yml'
import cardObject from '@/components/cardObject.vue'

var cardsInPlay = []
var index = 0

for (var i = 0; i < 7; i++) {
  index = Math.floor(Math.random() * cards.length)

  cardsInPlay.push(cards.pop(index))
}

export default {
  name: 'home',
  data () {
    return {
      cardsInPlay,
      discardPile: [],
      rightSequence: undefined
    }
  },
  components: {
    draggable,
    cardObject
  },
  methods: {
    checkCards () {
      var lastYear = 0
      this.rightSequence = true
      for (var card of this.cardsInPlay) {
        if (card.year < lastYear || card.year === 'X') {
          this.rightSequence = false
          break
        } else {
          lastYear = card.year
        }
      }
    }
  }
}
</script>

<style lang="scss">

  .play-area {
    width: 800px;
    height: 120px;
  }

  .discard-area {
    min-width: 100px;
    height: 120px;
    background-color: grey;
  }

  .viewport {
    overflow-x: scroll;
    width: 600px;
    height: 120px;
  }

  .sortable-ghost{
    opacity: .2;
    background-color: skyblue;
  }
</style>
