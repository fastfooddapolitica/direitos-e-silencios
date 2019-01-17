<template>
  <div class="game-area">

    <modal-box modal-id="game" ref="modal">
      <component :is="modalComponent" v-bind="modalProps"
                 @tryAgain="closeModal" @flipCards="flipCards"
                 @restartGame="restartGame"/>
    </modal-box>

    <btn-x class="btn-menu" :to="{name: 'intro'}">
      <span/>
      <span/>
      <span/>
    </btn-x>

    <div class="viewport">
      <draggable v-model="cardsInPlay" class="play-area" :options="{group:'card'}"
                 :style="{'min-width': playMinWidth}"
                 @start="dragStart()" @end="dragEnd()">
        <card-object v-for="card in cardsInPlay" @openModal="openModal"
                     class="card-object"
                     :class="{'out-of-board': cardsOutOfBoard}"
                     ref="cardsInPlayComponents" :key="card.num" :cardData="card"/>
      </draggable>
    </div>

    <div class="viewport viewport-discard">
      <draggable v-model="discardPile" class="play-area"
                :options="{group:'card', draggable: '.flip-container'}"
                :style="{'min-width': discardMinWidth}"
                @start="dragStart()" @end="dragEnd()">
        <card-object v-for="card in discardPile" @openModal="openModal"
                    class="card-object"
                    :class="{'out-of-board': cardsOutOfBoard}"
                    ref="discardPileComponents" :key="card.num" :cardData="card"/>
        <p slot="footer" class="discard-text">Descarte</p>
      </draggable>
    </div>

    <btn-x @click="checkCards">Verificar cartas</btn-x>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import cards from '@/assets/texts/cards.yml'
import cardObject from '@/components/cardObject.vue'
import modalBox from '@/components/modalBox.vue'
import endGame from '@/components/endGame.vue'

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

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
      triesCount: 0,
      cardsOutOfBoard: true
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
  computed: {
    discardMinWidth () {
      return this.discardPile.length * 170 + 'px'
    },
    playMinWidth () {
      return this.cardsInPlay.length * 170 + 'px'
    }
  },
  methods: {
    async restartGame () {
      this.closeModal()
      if (!this.cardsOutOfBoard) {
        this.cardsOutOfBoard = true
        await sleep(2000)
      }
      this.unflipCards()
      this.discardPile = []
      this.cardsInPlay = []
      this.rightSequence = undefined
      this.triesCount = 0
      var index = 0
      var cardsTmp = cards.slice()
      for (var i = 0; i < 7; i++) {
        index = Math.floor(Math.random() * cardsTmp.length)
        this.cardsInPlay.push(cardsTmp.splice(index, 1)[0])
      }
      await sleep(500)
      this.cardsOutOfBoard = false
      this.$audio.play('distribute')
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
      this.triesCount += 1
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
      this.openModal(
        {
          component: endGame,
          props: {
            minWrongCardsCount: this.minWrongCardsCount,
            triesCount: this.triesCount
          }
        }
      )
    },
    allCardsComponents () {
      if (this.$refs.cardsInPlayComponents) {
        return this.$refs.cardsInPlayComponents.concat(this.$refs.discardPileComponents)
      } else {
        return []
      }
    },
    flipCards () {
      this.closeModal()
      for (var card of this.allCardsComponents()) {
        if (card) card.flip()
      }
    },
    unflipCards () {
      for (var card of this.allCardsComponents()) {
        if (card) card.unflip()
      }
    },
    dragStart () {
      this.$audio.play('grab')
    },
    dragEnd () {
      this.$audio.play('release')
    },
    closeModal () {
      this.$refs.modal.close()
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
.viewport {
    overflow-x: auto;
    height: 200px;
}
.viewport-discard {
    box-shadow: inset 0px 0px 20px black;
    border-top: solid 2px #505050;
    border-bottom: solid 2px #505050;
    background-color: #ccc;
    background-image: url('~@/assets/images/noise.png');
    box-sizing: border-box;
}
.play-area {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
}
.discard-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    margin: 0;
}
.sortable-ghost {
    opacity: .2;
    background-color: skyblue;
}
.card-object {
    position: relative;
    left: 0;
    transition: left 2s cubic-bezier(.65,.05,.36,1);
    flex-shrink: 0;
}
.out-of-board {
    left: -2000px
}
.btn-menu {
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 5;
    width: 40px;
    span {
        background-color: white;
        width: 20px;
        height: 3px;
        display: block;
        margin: 3px 0;
    }
}
</style>
