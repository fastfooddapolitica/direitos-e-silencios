<template>
  <div>
    <h1>Direitos e Silêncios</h1>
    <p>Um jogo blah blah blah</p>
    <ul>
      <li><router-link class="btn" :to="{ name: 'game'}">Jogar</router-link></li>
      <li><router-link class="btn" :to="{ name: 'tutorial'}">Instruções</router-link></li>
      <li><router-link class="btn" :to="{ name: 'about'}">Sobre</router-link></li>
      <li><button class="btn" @click="toggleFullscreen">Tela Cheia</button></li>
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
    }
  }
}
</script>
