<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ footer }}</h1>
    <h2>Essential Links</h2>
    <div>
      <router-link to="/Goods" v-bind:isFooter="isFooter" v-bind:footer="footer" v-on:title="is_show_footer($event)">Second</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShouYe',
  props: ['footer', 'isFooter'],
  data () {
    return {
      msg: 'Welcome to ShouYe'
    }
  },
  beforeMount: function () {
    this.GLOBAL.isFooter = true
    this.$emit('title', this.GLOBAL.isFooter)
  }
}
</script>

<style scoped>
</style>
