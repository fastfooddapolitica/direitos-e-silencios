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
@import '@/vars.scss';
$btn-border-radius: 13px;
.btn {
  text-decoration: none;
  max-width: 200px;
  background-color: $sec-color;
  /* background-image: url('~@/assets/images/noise.png'); */
  background-blend-mode: overlay;
  display: block;
  margin: 10px auto;
  padding: 10px;
  color: $light-color;
  border-radius: $btn-border-radius;
  border: none;
  font-size: 14pt;
  cursor: pointer;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  /* box-shadow: black 1px 1px 2px; */
  /* box-shadow: $shadow-color 4px 4px 0px; */
  transition: all .5s;
  font-family: Insanibu;
  border: solid 2px black;
  position: relative;
  &:hover, &:focus {
    background-color: lighten($sec-color, 10%);
    /* background-color: #cc6565; */
    /* box-shadow: black 1px 1px 4px; */
  }
  &:after {
    display: block;
    background-color: $shadow-color;
    content: ".";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 3px;
    left: 4px;
    color: $shadow-color;
    border-radius: $btn-border-radius;
    z-index: -1;
    border: solid 2px black;
}
}
button::-moz-focus-inner {
    border: 0;
}
</style>
