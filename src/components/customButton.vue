<template>
  <button type="button" class="btn" @click="clicked">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'btn-x',
  props: {
    to: Object
  },
  methods: {
    clicked (e) {
      this.$audio.play('click')
      this.$emit('click', e)
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang="scss">
.btn {
  text-decoration: none;
  max-width: 200px;
  background-color: #7c6eb0;
  /* background-image: url('~@/assets/images/noise.png'); */
  background-blend-mode: overlay;
  display: block;
  margin: 10px auto;
  padding: 10px;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 14pt;
  cursor: pointer;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  /* box-shadow: black 1px 1px 2px; */
  box-shadow: #78217d 4px 4px 0px;
  transition: all .5s;
  font-family: Insanibu;
  border: solid 1px black;
  &:hover, &:focus {
    background-color: #9c6eb0;
    /* background-color: #cc6565; */
    /* box-shadow: black 1px 1px 4px; */
  }
}
button::-moz-focus-inner {
    border: 0;
}
</style>
