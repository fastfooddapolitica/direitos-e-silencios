<template>
  <transition name="fade">
    <div v-if="isOpen">
      <div class="modal-backdrop"/>
      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        style="display:block;">
        <div
          id="modal-dialog"
          v-click-outside="close"
          class="modal-dialog"
          role="document">
          <div class="modal-content">
            <btn-x
              class="close-btn"
              @click="close"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </btn-x>
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal-box',
  props: {
    modalId: String
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    close () {
      this.isOpen = false
    },
    open () {
      this.isOpen = true
    }
  }
}
</script>

<style lang="scss">
.btn.close-btn {
    width: auto;
    margin: 0 0 0 auto;
    font-weight: bold;
    padding: 4px 10px 6px 10px;
    z-index: 3000;
}

.modal {
  z-index: 2200;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.modal-backdrop {
  opacity: 0.5;
  z-index: 2100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
}

.modal-dialog {
  max-width: 600px;
  margin: 30px auto;
}

.modal-content {
  position: relative;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px #0008;
}
</style>
