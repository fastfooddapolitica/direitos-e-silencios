<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">
@import '@/vars.scss';
@font-face {
  font-family: Insanibu;
  src: url('~@/assets/fonts/Insanibu.woff');
}
@font-face {
  font-family: DIN;
  src: url('~@/assets/fonts/FF_DIN_Regular.woff');
}

html {
  min-height: 100%;
  background-color: $pri-color;
  /* background-image: url('~@/assets/images/noise.png'); */
  font-size: 14pt;
  font-family: DIN, sans-serif;
}
body {
  margin: 0;
  min-height: 100%;
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
  min-height: 100%;
}

.light-text {
  color: $light-color;
}
.sec-text {
  color: $sec-color;
}

</style>
