<template>
  <div>
    <p class="subtitle light-text">Aprenda sobre os direitos e legislações da mulher brasileira!</p>
    <img class="logo" src="@/assets/images/logo_trans.png">
    <!-- <h1 class="logo"> -->
    <!--   <span class="light-text">Direitos e</span> -->
    <!--   <br> -->
    <!--   <span class="sec-text">Silêncios</span> -->
    <!-- </h1> -->
    <btn-x class="play-btn" :to="{ name: 'game'}">Jogar</btn-x>
    <div class="double-btn">
      <btn-x class="help-btn" :to="{ name: 'tutorial'}">Instruções</btn-x>
      <btn-x class="about-btn" :to="{ name: 'about'}">Sobre</btn-x>
    </div>
    <!-- <btn-x @click="toggleFullscreen"> -->
    <!--     <img svg-inline class="icon" src="@/assets/images/fullscreen.svg" alt="tela cheia" /> -->
    <!-- </btn-x> -->
    <!-- <btn-x @click="toggleAudio"> -->
    <!--     <img v-if="mute" svg-inline class="icon" src="@/assets/images/mute.svg" alt="desligar sons" /> -->
    <!--     <img v-else svg-inline class="icon" src="@/assets/images/unmute.svg" alt="ligar sons" /> -->
    <!-- </btn-x> -->
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  data () {
    return {
      mute: this.$audioConf._muted
    }
  },
  methods: {
    toggleFullscreen () {
      if (screenfull.enabled) {
        screenfull.toggle()
      } else {
        alert('A funcionalidade de tela cheia parece não suportada por esse navegador. Por favor, tente em outro.')
      }
    },
    toggleAudio () {
      if (this.mute) {
        this.$audioConf.mute(false)
        this.mute = false
      } else {
        this.$audioConf.mute(true)
        this.mute = true
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/vars.scss';
// .logo {
  //   font-size: 50pt;
  //   line-height: 40pt;
  //   margin: 0 0 50px 0;
  //   .sec-text {
    //     text-shadow: $shadow-color 2px -3px 0;
    //   }
  // }
.logo {
  max-width: 90%;
  max-height: 8rem;
}
.subtitle {
  text-transform: uppercase;
  font-size: 10pt;
}
.play-btn {
  max-width: 300px;
  height: 100px;
  font-size: 50pt;
  /* box-shadow: $shadow-color 7px 7px 0px; */
}
.help-btn, .about-btn {
  max-width: 45%;
}
.double-btn {
  display: flex;
  max-width: 300px;
  margin: auto;
  justify-content: space-between;
}
</style>
