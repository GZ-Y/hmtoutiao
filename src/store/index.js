import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  mutations: {
    increment (state) {
      state.user = JSON.parse(window.localStorage.getItem('user'))
    },
    eliminate(state){
      state.user = null
    }
  },
  actions: {
  },
  modules: {
  }
})
