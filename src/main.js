import Vue from 'vue'
import VueMatomo from 'vue-matomo'
import App from '@/App.vue'
import btnX from '@/components/customButton.vue'
import router from '@/router'
import AudioPlugin from '@/audio'
import '@/vars.scss'

Vue.config.productionTip = false

Vue.component(btnX.name, btnX)

Vue.use(AudioPlugin)

// Matomo
Vue.use(VueMatomo, {
  host: 'https://matomo.ikotema.digital',
  siteId: 4,
  // Enables automatically registering pageviews on the router
  router: router,
  // Enables link tracking on regular links. Note that this won't
  // work for routing links (ie. internal Vue router links)
  // Default: true
  enableLinkTracking: true,
  // Require consent before sending tracking information to matomo
  // Default: false
  requireConsent: false,
  // Whether to track the initial page view
  // Default: true
  trackInitialView: true,
  // Whether or not to log debug information
  // Default: false
  debug: false
})

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
