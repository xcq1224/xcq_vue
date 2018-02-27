<template>
    <div class="second-module module-cont">
    <p class="info-p" >{{ msgOfP }}</p>
    <Three v-bind:msgOfP = "msgOfP" v-on:titleChanged = "zidingyi($event)"></Three>
    <!--<router-link to="/Three" v-bind:msgOfP = "msgOfP" v-on:titleChanged = "zidingyi($event)">Three</router-link>-->
    </div>
</template>
<script>
import Three from '@/components/Three'
export default {
  name: 'Second',
  components: {
    'Three': Three
  },
  props: {
  }, // 获取父组件数据的第二种方式：prop验证.注意写法。定义接受值的类型，并且用对象的形式设置。
  data () {
    return {
      msgOfP: 'Second'
    }
  },
  methods: {
    zidingyi (msg) {
      this.msgOfP = msg
    }
  }
}
</script>
<style scoped>
</style>
