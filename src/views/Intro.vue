<template>
  <div>
    <h1>Direitos e Silêncios</h1>
    <p>Um jogo blah blah blah</p>
    <ul>
      <li><router-link class="btn" :to="{ name: 'game'}">Jogar</router-link></li>
      <li><router-link class="btn" :to="{ name: 'tutorial'}">Instruções</router-link></li>
      <li><router-link class="btn" :to="{ name: 'about'}">Sobre</router-link></li>
    </ul>
  </div>
</template>
