import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    activeIndex: "article",
    uname:"登录",
    isLogin:false,
    uid:"",
    token: "",
    user_photo:"",
}

const getters = {
    // getActiveIndex(state) {
    //     return state.activeIndex;
    // }
}

const mutations = {
    changeActiveIndex(state,active){
       return state.activeIndex=active;
    },
    transUname(state,active){
      state.uname=active.uname;
      state.isLogin=active.isLogin;
      state.user_photo=active.user_photo;
      state.uid=active.uid;
      state.token=active.token;
     return state;
    }
}
  const actions= {
        getActionsValue(context, playload) {
            setTimeout(function () {
                context.commit("transUname", playload);
            }, 2000)
        },

    }

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
