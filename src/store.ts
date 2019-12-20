import Vue from 'vue'
import Vuex from 'vuex'
import travelFilterCondition from '@/store/modules/travel/filterCondition'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules:{
    travelFilterCondition,
  },
  strict:debug
})
