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
  background-color: #c52525;
  background-image: url('~@/assets/images/noise.png');
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
  box-shadow: black 1px 1px 2px;
  transition: all .5s;
  font-family: Insanibu;
  &:hover, &:focus {
    background-color: #cc6565;
        box-shadow: black 1px 1px 4px;
    }
}
button::-moz-focus-inner {
    border: 0;
}
</style>
