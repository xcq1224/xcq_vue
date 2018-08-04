<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>{{count}} </h1>
      <button @click="inc">+</button>
      <button @click="dec">-</button>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    Group,
    Cell
  },
  computed: {
      ...mapState(['count']),
  },
  data () {
    return {
      msg: 'Hello World!',
    }
  },
  methods: {
    ...mapActions(['inc', 'dec'])
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
