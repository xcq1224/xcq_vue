import Vue from 'vue'
import Router from 'vue-router'
import ShouYe from '@/components/ShouYe'
import FenLei from '@/components/FenLei'
import GouWuChe from '@/components/GouWuChe'
import WoDe from '@/components/WoDe'
import Goods from '@/components/Goods'
import Second from '@/components/Second'
import Three from '@/components/Three'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShouYe',
      component: ShouYe
    },
    {
      path: '/fenlei',
      name: 'FenLei',
      component: FenLei
    },
    {
      path: '/gouwuche',
      name: 'GouWuChe',
      component: GouWuChe
    },
    {
      path: '/wode',
      name: 'WoDe',
      component: WoDe
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/second',
      name: 'Second',
      component: Second
    },
    {
      path: '/three',
      name: 'Three',
      component: Three
    }
  ]
})
