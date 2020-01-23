import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import SearchPanel from '@/views/search/searchPanel.vue'
import SearchPanelByCategory from '@/views/travel/searchPanelByCategory.vue'
import Travel from '@/views/travel/index.vue'
import TravelList from '@/views/travel/travelList.vue'
import TravelInfo from '@/views/travel/travelInfo.vue'
import ErrorPage from '@/common/components/error.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',redirect:'home'}, 
    {path:'/home',component:Home}, 
    {path:'/login',component:Login}, 
    {path:'/searchPanel',component:SearchPanel}, 
    {path:'/searchPanelByCategory',component:SearchPanelByCategory}, 
    {path:'/travel',component:Travel}, 
    {path:'/travel/travelList',component:TravelList},
    {path:'/travel/travelInfo',component:TravelInfo},
    {path:'/error',component:ErrorPage},
  ],
  // //滚动行为：期望滚动到哪个的位置
  // scrollBehavior(to,from,savedPosition){
  //   console.log(to)
  // }
})
