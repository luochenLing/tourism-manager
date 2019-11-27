import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'
import SearchPanel from './components/search/searchPanel.vue'
import SearchPanelByCategory from './components/search/searchPanelByCategory.vue'
import Travel from './components/travel/index.vue'
import TravelList from './components/travel/travelList.vue'
import TravelInfo from './components/travel/travelInfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',redirect:'home'}, 
    {path:'/home',component:Home}, 
    {path:'/searchPanel',component:SearchPanel}, 
    {path:'/searchPanelByCategory',component:SearchPanelByCategory}, 
    {path:'/travel',component:Travel}, 
    {path:'/travel/travelList',component:TravelList},
    {path:'/travel/travelInfo',component:TravelInfo},
  ]
})
