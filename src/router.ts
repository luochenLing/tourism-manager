import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "home" },
    { path: "/home", component:()=>import('@/views/home/index.vue')},
    {
      path: "/personalCenter",
      component: ()=>import('@/views/home/personalCenter.vue'),
      meta: { requireAuth: true }
    },
    { path: "/login", component: ()=>import('@/views/login/index.vue') },
    { path: "/searchPanel", component: ()=>import('@/views/search/searchPanel.vue') },
    { path: "/searchPanelByCategory", component: ()=>import('@/views/travel/searchPanelByCategory.vue') },
    { path: "/travel", component: ()=>import('@/views/travel/index.vue') },
    { path: "/travel/travelList", component: ()=>import('@/views/travel/travelList.vue') },
    //requireAuth，需要登陆验证的界面标志
    {
      path: "/travel/travelInfo",
      component: ()=>import('@/views/travel/travelInfo.vue'),
      meta: { requireAuth: true }
    },
    { path: "/error", component: ()=>import('@/common/components/error.vue') },
    { path: "/chatBox", component: ()=>import('@/views/common/chatBox.vue') }
  ]
  // //滚动行为：期望滚动到哪个的位置
  // scrollBehavior(to,from,savedPosition){
  //   console.log(to)
  // }
});
