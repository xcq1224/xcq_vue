<template>
    <div>
        <button v-on:click = "changeTitle">点击我修改上边父组件的值</button>
        <p>{{msgOfP}}</p>
    </div>
</template>
<script>
export default {
  name: 'Three',
  props: ['msgOfP'],
  data () {
    return {
    }
  },
  methods: {
    changeTitle: function () {
      this.$emit('titleChanged', 'Three')
    }
  }
}
</script>
<style scoped>
    .three-module{
        margin: 10px 0;
    }
    h2{
        color: #f0f;
        padding: 20px 0;
        background: #222;
    }
</style>
