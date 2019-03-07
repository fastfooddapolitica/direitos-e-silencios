<template>
  <div class="game-area">

    <modal-box modal-id="game" ref="modal">
      <component :is="modalComponent" v-bind="modalProps"
                 @tryAgain="closeModal" @flipCards="clickedFlipCards"
                 @restartGame="restartGame"/>
    </modal-box>

    <div class="btn-menu-anchor">
      <btn-x class="btn-menu" :to="{name: 'intro'}">
        <span/>
        <span/>
        <span/>
      </btn-x>
    </div>

    <p class="margin light-text x-font"><small>ARRASTE AS CARTAS E ORDENE-AS CRONOLOGICAMENTE</small></p>

    <!-- Timeline Scroll Menu -->
    <div class="btn-anchor scroll-menu">
      <div class="half text-right">
        <transition name="fade">
          <div v-show="timelineScroll.left">
            <btn-x @click="scroll('timeline', -1)" :sound="false">&lt;</btn-x>
          </div>
        </transition>
      </div>
      <div class="half text-left">
        <transition name="fade">
          <div v-show="timelineScroll.right">
            <btn-x @click="scroll('timeline', 1)" :sound="false">&gt;</btn-x>
          </div>
        </transition>
      </div>
    </div>

    <div class="viewport" ref="timeline" data-scroll="timeline">
      <draggable v-model="cardsInPlay" class="play-area" :options="{group:'card'}"
                 :style="{'min-width': playMinWidth}"
                 ref="timelineContent"
                 @start="dragStart()" @end="dragEnd()">
        <card-object v-for="card in cardsInPlay" @openModal="openModal"
                     class="card-object"
                     :class="{'out-of-board': cardsOutOfBoard}"
                     ref="cardsInPlayComponents" :key="card.num" :cardData="card"/>
      </draggable>
    </div>

    <!-- Discard Scroll Menu -->
    <div v-show="discardScroll.left || discardScroll.right" class="btn-anchor scroll-menu">
      <div class="half text-right">
        <transition name="fade">
          <div v-show="discardScroll.left">
            <btn-x @click="scroll('discard', -1)" :sound="false">&lt;</btn-x>
          </div>
        </transition>
      </div>
      <div class="half text-left">
        <transition name="fade">
          <div v-show="discardScroll.right">
            <btn-x @click="scroll('discard', 1)" :sound="false">&gt;</btn-x>
          </div>
        </transition>
      </div>
    </div>

    <div class="viewport viewport-discard" ref="discard" data-scroll="discard">
      <p class="discard-text x-font">não existe</p>
      <draggable v-model="discardPile" class="play-area discard-area"
                :options="{group:'card', draggable: '.flip-container'}"
                :style="{'min-width': discardMinWidth}"
                @start="dragStart()" @end="dragEnd()">
        <card-object v-for="card in discardPile" @openModal="openModal"
                    class="card-object"
                    :class="{'out-of-board': cardsOutOfBoard}"
                    ref="discardPileComponents" :key="card.num" :cardData="card"/>
      </draggable>
    </div>

    <div class="btn-anchor">
      <btn-x @click="checkCards">Verificar cartas</btn-x>
      <btn-x @click="restartGame">Novo jogo</btn-x>
    </div>
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
      cardsOutOfBoard: true,
      timelineScroll: {
        left: 0,
        right: 0
      },
      discardScroll: {
        left: 0,
        right: 0
      }
    }
  },
  components: {
    draggable,
    cardObject,
    modalBox
  },
  mounted () {
    this.restartGame()

    let self = this
    this.$refs.timeline.addEventListener('scroll', this.updateScrollData)
    this.$refs.discard.addEventListener('scroll', this.updateScrollData)
    window.addEventListener('resize', this.updateScrollData)
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        self.updateScrollData()
      })
    })
    observer.observe(this.$refs.timelineContent.rootContainer, { attributes: true, attributeFilter: ['style'] })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateScrollData)
  },
  computed: {
    discardMinWidth () {
      return (this.discardPile.length || 1) * 220 + 'px'
    },
    playMinWidth () {
      return (this.cardsInPlay.length || 1) * 220 + 'px'
    }
  },
  methods: {
    updateScrollData (event) {
      let obj, objData
      obj = this.$refs.timeline
      objData = this.timelineScroll
      objData.left = obj.scrollLeft
      objData.right = obj.scrollWidth - (obj.scrollLeft + obj.clientWidth)
      obj = this.$refs.discard
      objData = this.discardScroll
      objData.left = obj.scrollLeft
      objData.right = obj.scrollWidth - (obj.scrollLeft + obj.clientWidth)
    },
    scroll (objName, dir) {
      let target = 200 * dir

      let step = 10 * dir

      let current = 0

      let timer
      timer = setInterval(() => {
        this.$refs[objName].scrollLeft += step
        current += step
        if (Math.abs(current) >= Math.abs(target)) clearInterval(timer)
      }, 20)
    },
    allCardsComponents () {
      if (this.$refs.cardsInPlayComponents) {
        return this.$refs.cardsInPlayComponents.concat(this.$refs.discardPileComponents)
      } else {
        return []
      }
    },
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
      this.$audio.play('suffle')
      await sleep(300)
      for (var i = 0; i < 5; i++) {
        index = Math.floor(Math.random() * cardsTmp.length)
        this.cardsInPlay.push(cardsTmp.splice(index, 1)[0])
        this.$audio.play('distribute')
        await sleep(300)
      }

      this.cardsOutOfBoard = false
      this.$matomo.trackEvent('jogo', 'começou partida')
    },
    openModal (data) {
      this.modalComponent = data.component
      this.modalProps = data.props
      this.$refs.modal.open()
    },
    getCardComponent (card) {
      for (var comp of this.allCardsComponents()) {
        if (comp && comp.cardData === card) return comp
      }
    },
    async animatedFlip (card) {
      let comp = this.getCardComponent(card)
      if (!comp.flipped) {
        comp.flip()
        await sleep(1000)
      }
    },
    async animatedUnflip (card) {
      let comp = this.getCardComponent(card)
      if (comp.flipped) {
        comp.unflip()
        await sleep(1000)
      }
    },
    async checkCards (event) {
      if (event) event.stopPropagation()
      var lastYear = 0
      this.rightSequence = true
      this.minWrongCardsCount = 0
      this.triesCount += 1

      // Check timeline
      for (var card of this.cardsInPlay) {
        if (card.year < lastYear || card.year === 'x') {
          this.rightSequence = false
          this.minWrongCardsCount += 1
          await this.animatedUnflip(card)
        } else {
          lastYear = card.year
          await this.animatedFlip(card)
        }
      }
      // Check discard pile
      for (card of this.discardPile) {
        if (card.year !== 'x') {
          this.rightSequence = false
          this.minWrongCardsCount += 1
          await this.animatedUnflip(card)
        } else {
          await this.animatedFlip(card)
        }
      }
      // Play sound
      if (this.rightSequence) {
        this.$audio.play('correct')
        // this.flipCards()
        this.$matomo.trackEvent('jogo', 'verificou cartas', 'acertou')
      } else {
        this.$audio.play('wrong')
        this.$matomo.trackEvent('jogo', 'verificou cartas', 'errou')
      }
      this.$matomo.trackEvent('jogo', 'verificou cartas', 'min erradas', this.minWrongCardsCount)
      this.$matomo.trackEvent('jogo', 'verificou cartas', 'tentativas', this.triesCount)
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
    clickedFlipCards () {
      this.$matomo.trackEvent('jogo', 'revelou cartas')
      this.flipCards()
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
@import '@/vars.scss';
.game-area {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.viewport {
  overflow-x: auto;
  height: $viewport-size;
  width: 100%;
}
.viewport-discard {
  /* box-shadow: inset 0px 0px 20px black; */
  /* border: solid 2px #333; */
  /* border-top: solid 2px #505050; */
  /* border-bottom: solid 2px #505050; */
  /* background-color: #ccc; */
  box-sizing: border-box;
  padding: 1rem 2rem;
  position: relative;
  height: $viewport-size + 20px;
}
.play-area {
  /* width: 100%; */
  /* width: 1500px; */
  height: 100%;
  position: relative;
  display: inline-flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  justify-content: center;
  /* align-items: center; */
  align-items: flex-start;
}
.discard-area {
  align-items: flex-end;
  border: dashed .3rem $sec-color;
  border-radius: 4rem;
  background-color: $shadow-color;
  transition: width 1s;
}
.discard-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
  margin: 0;
  color: $sec-color;
}
.sortable-ghost {
  opacity: .2;
  background-color: purple;
}
.card-object {
  position: relative;
  left: 0;
  transition: left 2s cubic-bezier(.65,.05,.36,1);
  flex-shrink: 0;
}
.out-of-board {
  left: -2000px;
}
.btn-menu {
  span {
    background-color: white;
    height: 3px;
    display: block;
    margin: 3px 0;
  }
}
.btn-menu-anchor {
  z-index: 5;
  position: absolute;
  top: 0;
  right: 10px;
  width: 40px;
}
.btn-anchor {
  z-index: 1;
}
.scroll-menu {
  display: flex;
  width: 100%;
  height: 3rem;
  .btn {
    width: 3rem;
    display: inline-block;
  }
}
.half {
  width: 50%;
  padding: 0 .5rem;
}
</style>
