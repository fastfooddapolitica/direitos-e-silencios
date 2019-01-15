import { Howl } from 'howler'

export default {
  install (Vue, options) {
    var obj = require('@/assets/audios/sprites.json')
    var filepath = require('@/assets/audios/sprites.webm')
    // Replace path to sound file with webpack dynamically generated one
    obj.src = [filepath]
    Vue.prototype.$audio = new Howl(obj)
  }
}
