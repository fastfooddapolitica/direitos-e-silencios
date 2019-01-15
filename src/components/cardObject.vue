<template>
  <div class="flip-container" :class="{flip: flipped}">
    <div class="flipper">
      <div class="front">
        <div class="card">
          {{cardData.name}}
        </div>
      </div>
      <div class="back">
        <div class="card card-back">
          <button class="btn show-details" @click="showDetails">?</button>
          {{cardData.year}}<br>{{cardData.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardDetails from '@/components/cardDetails.vue'

export default {
  name: 'cardObject',
  props: {
    cardData: Object
  },
  data () {
    return {
      flipped: false
    }
  },
  methods: {
    flip () {
      this.flipped = true
    },
    unflip () {
      this.flipped = false
    },
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

$card-size: 150px;

.show-details {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    width: auto;
}
.card {
    width: $card-size;
    height: $card-size;
    background-color: #b61f38;
    background-image: url('~@/assets/images/card-front.png');
    overflow: hidden;
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
.card-back {
    background-color: #7670b3;
    background-image: url('~@/assets/images/card-back.png');
}

/* Based on: https://davidwalsh.name/css-flip */
/* Look there for IE support */
/* entire container, keeps perspective */
.flip-container {
    perspective: 1000px;
    display: inline-block;
}
/* flip the pane when hovered */
/* .flip-container:hover .flipper, .flip-container.hover .flipper,  */
.flip-container.flip .flipper {
    transform: rotateY(180deg);
}

.flip-container {
    margin: 10px;
}
.flip-container, .front, .back {
    width: $card-size;
    height: $card-size;
    z-index: 2;
}

/* flip speed goes here */
.flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
}

/* hide back of pane during swap */
.front, .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
}

/* front pane, placed above back */
.front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}
</style>
