/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    user: {},
    token: ''
  },
  mutations: {
    setuser (state, info) {
      state.user = info
    },
    settoken (state, token) {
      state.token = token
    }
  },
  getters: {
    getuser: state => {
      return state.user;
    },
    gettoken: state => {
      return state.token;
    }
  }
})

export default store

// export const state = () => ({
//   user: {},
//   token: ''
// })

// export const mutations = {
//   setuser (state, info) {
//     state.user = info
//   },
//   settoken (state, token) {
//     state.token = token
//   }
// }

// export const getters = {
//   getuser: state => {
//     return state.user;
//   },
//   gettoken: state => {
//     return state.token;
//   }
// }