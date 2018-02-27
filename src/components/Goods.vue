<template>
  <div class="hello">
    <p @click="$router.back(-1)">返回</p>
    <h1>{{ msg }}</h1>
    <h1>{{ footer }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: ['footer', 'isFooter'],
  data () {
    return {
      msg: 'Welcome to Goods'
    }
  },
  beforeMount: function () {
    this.GLOBAL.isFooter = false
    this.$emit('title', this.GLOBAL.isFooter)
  }
}
</script>

<style scoped>

</style>
