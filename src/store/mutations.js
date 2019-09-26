import Vue from 'vue'
const mutations = {
  setHomeSinger(state, homeSinger) {
    state.homeSinger = homeSinger
  },
  setSingerDetail(state, { introduction, briefDesc }) {
    Vue.set(state.singerDetail, 'introduction', introduction)
    Vue.set(state.singerDetail, 'briefDesc', briefDesc)
  }
}
export default mutations
