<template>
  <div>
    <h1>你好开发者 <input v-model="name" /></h1>
    <div class="singers-wrap">
      <h3>歌手列表</h3>
      <div>
        <div
          class="singer-item"
          v-for="singer in singerLists"
          :key="singer.id"
        >
          <router-link
            :to="'singer/'+singer.id"
            target="_blank"
          >
            <img
              :src="singer.picUrl"
              alt=""
            >
            <p>{{singer.name}}</p>
            <p><span>专辑数量: {{singer.albumSize}}</span><br /><span>歌曲数量: {{singer.musicSize}}</span></p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  asyncData ({ store, route }) {
    return store.dispatch("a_fetchSinger")
  },
  metaInfo: {
    title: 'SEO-Meta-Title', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'VUE,SSR,vue-ssr,PromiseX'
    }],
    link: [{                 // set link
      rel: 'asstes',
      href: 'https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap-grid.min.css'
    }]
  },
  computed: {
    singerLists () {
      return this.$store.getters.homeSinger
    }
  },
  data () {
    return {
      name: 'PromiseX'
    }
  }
}
</script>

<style lang="scss" scoped>
.singers-wrap {
  width: 1170px;
  margin: 0 auto;
  > div {
    overflow: hidden;
    margin-left: -17px;
  }
}
.singer-item {
  width: 130px;
  margin-left: 17px;
  float: left;
  margin-bottom: 15px;
  a {
    display: block;
    width: 130px;
    img {
      display: block;
      width: 100%;
      height: 130px;
    }
  }
}
</style>
