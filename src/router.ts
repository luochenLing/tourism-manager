import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'
import SearchPanel from '@/views/search/searchPanel.vue'
import SearchPanelByCategory from '@/views/travel/searchPanelByCategory.vue'
import Travel from '@/views/travel/index.vue'
import TravelList from '@/views/travel/travelList.vue'
import TravelInfo from '@/views/travel/travelInfo.vue'

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
