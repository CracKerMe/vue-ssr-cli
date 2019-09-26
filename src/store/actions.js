import { fetchSingerDetail, fetchSinger } from '../api'
const actions = {
  a_fetchSinger({ commit }) {
    return fetchSinger().then(res => {
      commit('setHomeSinger', res.data.artists)
    })
  },
  a_fetchSingerDetail({ commit }, id) {
    return fetchSingerDetail(id).then(res => {
      commit('setSingerDetail', {
        introduction: res.data.introduction,
        briefDesc: res.data.briefDesc
      })
    })
  }
}
export default actions
