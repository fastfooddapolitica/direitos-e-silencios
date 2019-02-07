<template>
  <div id="app" :class="{'dark-background': $route.path === '/game'}">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view class="pad-footer"/>
      </keep-alive>
    </transition>
    <div class="footer">
      <a href="http://fastfooddapolitica.com.br" target="_blank">
        <img class="mini-logo" src="@/assets/images/logo_org.png">
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/vars.scss';

@font-face {
  font-family: Insanibu;
  src: url('~@/assets/fonts/Insanibc.woff');
}
@font-face {
  font-family: DIN;
  src: url('~@/assets/fonts/FF_DIN_Regular.woff');
}

html {
  background-color: $pri-color;
  font-size: 14pt;
  font-family: DIN, sans-serif;
  position:relative;
}
body {
  margin: 0;
}
html, body, #app {
  min-height: 100vh;
}
ul {
  list-style-type: none;
  padding: 0;
}
h1, h2, h3 {
  font-family: Insanibu;
  font-weight: normal;
}
h2 {
  font-size: 18pt;
}
h3 {
  font-size: 16pt;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.light-text {
  color: $light-color;
}
.x-font {
  font-family: Insanibu;
}
.sec-text {
  color: $sec-color;
}
.mini-logo {
  max-width: 90%;
  max-height: 4rem;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  text-align: right;
}
.dark-background {
  background-color: $game-background-color;
}
.pad-footer {
  padding-bottom: 6rem;
  padding-top: 0.1rem;
}

*::-webkit-scrollbar {
  width: 1em;
}
*::-webkit-scrollbar-track {
  background-color: $sec-color;
}
*::-webkit-scrollbar-thumb {
  background-color: white;
}
* {
  scrollbar-color: white $sec-color;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-100%);
}
</style>
