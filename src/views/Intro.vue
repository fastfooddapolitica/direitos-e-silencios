<template>
  <div>
    <h1>Direitos e Silêncios</h1>
    <p>Um jogo blah blah blah</p>
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
