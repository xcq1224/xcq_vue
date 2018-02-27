<template>
    <div id="app">
        <router-view v-bind:isFooter="isFooter" v-bind:footer="footer" v-on:title="is_show_footer($event)" />
        <div id="footer" v-if="isFooter">
            <div>
                <router-link to="/" :xcq="footer" @click.native="footer = 'shouye'" :data="footer" v-bind:class="footer == 'shouye' ? 'active' : ''">首页</router-link>
            </div>
            <div>
                <router-link to="/FenLei" @click.native="footer = 'fenlei'" v-bind:class="footer == 'fenlei' ? 'active' : ''">分类</router-link>
            </div>
            <div>
                <router-link to="/GouWuChe" @click.native="footer = 'gouwuche'" v-bind:class="footer == 'gouwuche' ? 'active' : ''">购物车</router-link>
            </div>
            <div>
                <router-link to="/WoDe" @click.native="footer = 'wode'" v-bind:class="footer == 'wode' ? 'active' : ''">我的</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      footer: 'shouye',
      isFooter: true
    }
  },
  methods: {
    is_show_footer (msg) {
      this.isFooter = this.GLOBAL.isFooter
    }
  }
}
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    a {
        cursor: pointer;
        text-decoration: none;
    }
    html,
    body {
        width: 100%;
        height: 100%;
        background: #fff;
        color: #666;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
    }
    #footer {
        height: 50px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-top: 1px solid #ccc;
        position: absolute;
        bottom: 0;
        width: 100%;
        align-items: center;
        text-align: center;
    }
    #footer div {
        flex: 1;
    }
    #footer div a {
        color: #666;
    }
    #footer div a.active {
        color: red;
    }
</style>
