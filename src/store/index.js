// import { get } from 'core-js/fn/dict'
import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem, removeItem} from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user')
  },
  mutations: {
    increment (state,data) {
      state.user = data;
      setItem('user',state.user)
    },
    eliminate(state,data){
      state.user = data;
      removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
