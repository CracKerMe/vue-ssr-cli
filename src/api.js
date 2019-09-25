import axios from 'axios'

export function fetchSingerDetail(id) {
  return axios.get('http://47.100.198.36:3000/artist/desc?id=' + id)
}
export function fetchSinger() {
  return axios.get('http://47.100.198.36:3000/top/artists?limit=24&offset=0')
}
