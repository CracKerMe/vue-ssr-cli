import Vue from 'vue';
import Vuex from 'vuex';
import { fetchSingerDetail, fetchSinger } from './api.js'

 Vue.use(Vuex);


 export function createStore() {
  return new Vuex.Store({
    state: {
      singer: {},
      list: []
    },
    actions: {
      fetchSingerDetail({commit}, id) {
        return fetchSingerDetail(id).then(res => {
          commit('setItem', {introduction: res.data.introduction, briefDesc: res.data.briefDesc})
        })
      },
      fetchSinger({commit}){
        return fetchSinger().then(res => {
          commit('setList', res.data.artists)
        })
      }
    },
    mutations: {
      setItem(state, {introduction, briefDesc}) {
        Vue.set(state.singer, 'introduction', introduction)
        Vue.set(state.singer, 'briefDesc', briefDesc)
      },
      setList(state, list) {
        state.list = list
      }
    }
  });
}