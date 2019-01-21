import Vue from 'vue'
import App from '@/App.vue'
import btnX from '@/components/customButton.vue'
import router from '@/router'
import AudioPlugin from '@/audio'
import '@/vars.scss'

Vue.config.productionTip = false

Vue.component(btnX.name, btnX)

Vue.use(AudioPlugin)

// Allows calling function when clicked outside of an element
// Usefull for modal and styled select
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
