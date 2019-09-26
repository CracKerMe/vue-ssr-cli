<template>
  <div>
    <h1>我是歌手详情页</h1>
    <p v-if="singer.briefDesc">{{singer.briefDesc}}</p>
    <div v-if="singer.introduction.length>0">
      <h2>歌手介绍</h2>
      <div>
        <div
          class="intro-item"
          v-for="(intro, index) in singer.introduction"
          :key="index"
        >
          <h4>{{intro.ti}}</h4>
          <p>{{intro.txt}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Singer',
  asyncData ({ store, route }) {
    return store.dispatch("a_fetchSingerDetail", route.params.id)
  },
  computed: {
    singer () {
      return this.$store.getters.singerDetail
    }
  },
}
</script>
