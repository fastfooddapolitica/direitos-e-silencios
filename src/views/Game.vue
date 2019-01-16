<template>
  <div class="game-area">

    <modal-box modal-id="game" ref="modal">
      <component :is="modalComponent" v-bind="modalProps"/>
    </modal-box>

    <btn-x :to="{ name: 'intro'}">Menu</btn-x>
    <div class="viewport">
      <draggable v-model="cardsInPlay" class="play-area" :options="{group:'card'}"
                 @start="dragStart()" @end="dragEnd()">
        <card-object v-for="card in cardsInPlay" @openModal="openModal"
                     ref="cardsInPlayComponents" :key="card.num" :cardData="card"/>
      </draggable>
    </div>

    <draggable v-model="discardPile" class="discard-area" :options="{group:'card', draggable: '.flip-container'}"
               @start="dragStart()" @end="dragEnd()">
      <p slot="header" class="discard-text">Descarte</p>
      <card-object v-for="card in discardPile" @openModal="openModal"
                   ref="discardPileComponents" :key="card.num" :cardData="card"/>
    </draggable>

    <btn-x @click="checkCards">Verificar cartas</btn-x>
    <btn-x @click="restartGame">Reiniciar</btn-x>
    <btn-x @click="flipCards">Virar cartas</btn-x>
    <btn-x @click="unflipCards">Desvirar cartas</btn-x>

    <div v-show="rightSequence == false">Não... Pelo menos {{ minWrongCardsCount }} cartas estão no lugar errado.</div>
    <div v-show="rightSequence == true">Está certo!!</div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import cards from '@/assets/texts/cards.yml'
import cardObject from '@/components/cardObject.vue'
import modalBox from '@/components/modalBox.vue'

export default {
  name: 'home',
  data () {
    return {
      cardsInPlay: [],
      discardPile: [],
      rightSequence: undefined,
      modalComponent: null,
      modalProps: null,
      minWrongCardsCount: 0,
      triesCount: 0
    }
  },
  components: {
    draggable,
    cardObject,
    modalBox
  },
  mounted () {
    this.restartGame()
  },
  methods: {
    restartGame () {
      this.discardPile = []
      this.cardsInPlay = []
      this.rightSequence = undefined
      var index = 0
      var cardsTmp = cards.slice()
      for (var i = 0; i < 7; i++) {
        index = Math.floor(Math.random() * cardsTmp.length)
        this.cardsInPlay.push(cardsTmp.splice(index, 1)[0])
      }
    },
    openModal (data) {
      this.modalComponent = data.component
      this.modalProps = data.props
      this.$refs.modal.open()
    },
    checkCards () {
      var lastYear = 0
      this.rightSequence = true
      this.minWrongCardsCount = 0
      // Check timeline
      for (var card of this.cardsInPlay) {
        if (card.year < lastYear || card.year === 'x') {
          this.rightSequence = false
          this.minWrongCardsCount += 1
        } else {
          lastYear = card.year
        }
      }
      // Check discard pile
      for (card of this.discardPile) {
        if (card.year !== 'x') {
          this.rightSequence = false
          this.minWrongCardsCount += 1
        }
      }
      // Play sound
      if (this.rightSequence) {
        this.$audio.play('correct')
      } else {
        this.$audio.play('wrong')
      }
    },
    flipCards () {
      var allCards = this.$refs.cardsInPlayComponents.concat(this.$refs.discardPileComponents)
      for (var card of allCards) {
        if (card) card.flip()
      }
    },
    unflipCards () {
      var allCards = this.$refs.cardsInPlayComponents.concat(this.$refs.discardPileComponents)
      for (var card of allCards) {
        if (card) card.unflip()
      }
    },
    dragStart () {
      this.$audio.play('grab')
    },
    dragEnd () {
      this.$audio.play('release')
    }
  }
}
</script>

<style lang="scss">
.game-area {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.play-area {
    width: 1200px;
    height: 180px;
    margin: auto;
}

.viewport {
    overflow-x: auto;
    height: 200px;
    padding-top: 10px;
}

.discard-area {
    min-width: 600px;
    height: 170px;
    background-color: #ccc;
    position: relative;
    background-image: url('~@/assets/images/noise.png');
}
.discard-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    margin: 0;
}
.sortable-ghost{
    opacity: .2;
    background-color: skyblue;
}
</style>
