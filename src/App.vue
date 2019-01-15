<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">
html {
    height: 100%;
    background-color: #b9b6d1;
}
body {
    margin: 0;
    height: 100%;
}
ul {
    list-style-type: none;
    padding: 0;
}
.btn {
    text-decoration: none;
    max-width: 200px;
    background-color: #c52525;
    display: block;
    margin: 10px auto;
    padding: 10px;
    color: white;
    border-radius: 10px;
    border: none;
    font-size: 14pt;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

</style>
