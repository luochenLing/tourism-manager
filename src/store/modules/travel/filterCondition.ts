const state = {
  curFilter:{
    curTitle:'',
    curCode:''
  },
  curRecommend:{},
  curDateList:{},
  curSpecialList:{},
  showConditionPopup:false
};

const getters = {
  getCurFilter: (state: { curFilter: object }) => state.curFilter,
  getShowConditionPopup:(state: { showConditionPopup:boolean }) => state.showConditionPopup,
  getCurRecommend:(state: { curRecommend: object }) => state.curRecommend,
  getCurDateList:(state: { curDateList: object }) => state.curDateList,
  getCurSpecialList:(state:{curSpecialList:object})=>state.curSpecialList
};

const actions = {
  
};

const mutations = {
  setCurFilter(state: any, curObj: any) {
    state.curFilter.curTitle = curObj.text;
    state.curFilter.curCode = curObj.code;
  },
  setShowConditionPopup(state: any, showConditionPopup: boolean) {
    state.showConditionPopup = showConditionPopup;
  },
  setCurRecommend(state: any, curRecommend: object) {
    state.curRecommend = curRecommend;
  },
  setCurDateList(state: any, curDateList: object) {
    state.curDateList = curDateList;
  },
  setCurSpecialList(state: any, curSpecialList: object) {
    state.curSpecialList = curSpecialList;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
