import Vue from 'vue'
import Vuex from 'vuex'
import travelFilterCondition from '@/store/modules/travel/filterCondition'
import userManager from '@/store/modules/login/userManager'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules:{
    travelFilterCondition,
    userManager
  },
  strict:debug
})
