<template>
  <div>
    <h1>你好开发者 <input v-model="name" /></h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      name: 'PromiseX'
    }
  }
}
</script>

<style scoped></style>
