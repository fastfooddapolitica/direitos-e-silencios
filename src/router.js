import Vue from 'vue'
import Router from 'vue-router'
import Game from './views/Game.vue'
import Intro from './views/Intro.vue'
import About from './views/About.vue'
import Tutorial from './views/Tutorial.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: Tutorial
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
