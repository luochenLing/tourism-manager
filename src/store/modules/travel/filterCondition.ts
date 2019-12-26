const state = {
  curRecommend:{},
  curDateList:{},
  curSpecialList:{}
};

const getters = {
  getCurRecommend:(state: { curRecommend: object }) => state.curRecommend,
  getCurDateList:(state: { curDateList: object }) => state.curDateList,
  getCurSpecialList:(state:{curSpecialList:object})=>state.curSpecialList
};

const actions = {
  
};

const mutations = {
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
