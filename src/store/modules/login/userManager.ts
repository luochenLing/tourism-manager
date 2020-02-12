import configEmuns from "@/globalConfig/configEmuns";

const state = {
  userInfo: ""
};

const getters = {
  getCurUserInfo: (state: { userInfo: string }) => state.userInfo
};

const mutations = {
  setCurUserInfo(state: any, userInfo: any) {
    localStorage.setItem(configEmuns.uKey, JSON.stringify(userInfo));
    state.userInfo = userInfo;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
