<template>
  <div>
    <h1>你好开发者 <input v-model="name" /></h1>
    <div class="singers-wrap">
      <h3>歌手列表</h3>
      <div>
        <div class="singer-item" v-for="singer in singerLists" :key="singer.id">
          <router-link :to="'singer/'+singer.id" target="_blank">
            <img :src="singer.picUrl" alt="">
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
  asyncData({ store, route }) {
    return store.dispatch("fetchSinger")
  },
  computed: {
    singerLists () {
      return this.$store.state.list
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
/* 我太懒了 不想放在reset.css里面 */
* {margin: 0;padding: 0;}
a {text-decoration: none;color: #666666;}
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
  padding-left: 17px;
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
