<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">
html {
    min-height: 100%;
    background-color: #b9b6d1;
    background-image: url('~@/assets/images/noise.png');
}
body {
    margin: 0;
    min-height: 100%;
}
ul {
    list-style-type: none;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100%;
}

</style>
