<template>
<div class="game-area">
  <div class="viewport">
    <draggable v-model="cardsInPlay" class="play-area" :options="{group:'people'}">
      <card-object v-for="element in cardsInPlay" :key="element.name" :cardData="element"></card-object>
    </draggable>
  </div>

  <draggable v-model="discardPile" class="discard-area" :options="{group:'people'}">
    <p class="discard-text">Descarte</p>
    <card-object v-for="element in discardPile" :key="element.name" :cardData="element"></card-object>
  </draggable>

  <button class="check-button" @click="checkCards">Verificar cartas</button>

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
      // Check timeline
      for (var card of this.cardsInPlay) {
        if (card.year < lastYear || card.year === 'x') {
          this.rightSequence = false
          break
        } else {
          lastYear = card.year
        }
      }
      if (this.rightSequence) {
        // Check discard pile
        for (card of this.discardPile) {
          if (card.year !== 'x') {
            this.rightSequence = false
            break
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.game-area {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.play-area {
    width: 900px;
    margin: auto;
}

.viewport {
    overflow-x: auto;
    height: 140px;
}

.discard-area {
    min-width: 100px;
    height: 120px;
    background-color: grey;
    position: relative;
}
.discard-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    margin: 0;
}
.check-button {
    max-width: 300px;
    margin: 20px auto;
}
.sortable-ghost{
    opacity: .2;
    background-color: skyblue;
}
</style>
