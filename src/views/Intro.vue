<template>
  <div>
    <p class="subtitle light-text">Aprenda sobre os direitos e legislações da mulher brasileira!</p>
    <h1 class="logo">
      <span class="light-text">Direitos e</span>
      <br>
      <span class="sec-text">Silêncios</span>
    </h1>
    <ul>
      <li><btn-x :to="{ name: 'game'}">Jogar</btn-x></li>
      <li><btn-x :to="{ name: 'tutorial'}">Instruções</btn-x></li>
      <li><btn-x :to="{ name: 'about'}">Sobre</btn-x></li>
      <li><btn-x @click="toggleFullscreen">Tela Cheia</btn-x></li>
      <li><btn-x @click="toggleAudio">Emudecer Sons</btn-x></li>
    </ul>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  methods: {
    toggleFullscreen () {
      if (screenfull.enabled) {
        screenfull.toggle()
      } else {
        alert('A funcionalidade de tela cheia parece não suportada por esse navegador. Por favor, tente em outro.')
      }
    },
    toggleAudio () {
      if (this.$audioConf._muted) {
        this.$audioConf.mute(false)
      } else {
        this.$audioConf.mute(true)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/vars.scss';
.logo {
  font-size: 50pt;
  line-height: 40pt;
  margin: 0 0 50px 0;
  .sec-text {
    text-shadow: $shadow-color 1px -1px 0;
  }
}
.subtitle {
  text-transform: uppercase;
  font-size: 10pt;
}
</style>
