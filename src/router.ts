import Vue from 'vue'
import Router from 'vue-router'
import Travel from './components/travel/index.vue'
import Home from './views/home/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',redirect:'home'}, 
    {path:'/home',component:Home}, 
    {path:'/travel',component:Travel}, 
  ]
})
