import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloFromVux = r => require.ensure([], () => r(require('@/components/HelloFromVux')), 'HelloFromVux');
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test');
const test1 = r => require.ensure([], () => r(require('@/pages/test1')), 'test1');
const test2 = r => require.ensure([], () => r(require('@/pages/test2')), 'test2');
const test3 = r => require.ensure([], () => r(require('@/pages/test3')), 'test3');
const test4 = r => require.ensure([], () => r(require('@/pages/test4')), 'test4');
const test5 = r => require.ensure([], () => r(require('@/pages/test5')), 'test5');
const test_video = r => require.ensure([], () => r(require('@/pages/test_video')), 'test_video');
const testJava = r => require.ensure([], () => r(require('@/pages/testJava')), 'testJava');
const share = r => require.ensure([], () => r(require('@/pages/share')), 'share');
const download = r => require.ensure([], () => r(require('@/pages/download')), 'download');
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login');
const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const bit = r => require.ensure([], () => r(require('@/pages/bit')), 'bit');
const tower = r => require.ensure([], () => r(require('@/pages/tower')), 'tower');
const mine = r => require.ensure([], () => r(require('@/pages/mine')), 'mine');

//  消息
const news = r => require.ensure([], () => r(require('@/pages/news')), 'news');


//  详情介绍
const detail = r => require.ensure([], () => r(require('@/pages/detail')), 'detail');
//  咨询
const advisory = r => require.ensure([], () => r(require('@/pages/advisory')), 'advisory');
//  确认订单
const confirm_order = r => require.ensure([], () => r(require('@/pages/confirm_order')), 'confirm_order');
//  个人主页
const homepage = r => require.ensure([], () => r(require('@/pages/homepage')), 'homepage');
//  技能才干
const skills = r => require.ensure([], () => r(require('@/pages/skills')), 'skills');
//  视频教学
const video_teaching = r => require.ensure([], () => r(require('@/pages/video_teaching')), 'video_teaching');
//  精选
const featured = r => require.ensure([], () => r(require('@/pages/featured')), 'featured');
//  达人
const talent = r => require.ensure([], () => r(require('@/pages/talent')), 'talent');
//  干货
const dry_good = r => require.ensure([], () => r(require('@/pages/dry_good')), 'dry_good');
//  干货详情
const dry_detail = r => require.ensure([], () => r(require('@/pages/dry_detail')), 'dry_detail');
//  我的关注
const attention = r => require.ensure([], () => r(require('@/pages/attention')), 'attention');
//  我的粉丝
const fans = r => require.ensure([], () => r(require('@/pages/fans')), 'fans');
//  设置
const settings = r => require.ensure([], () => r(require('@/pages/settings')), 'settings');
//  账号与安全
const account_security = r => require.ensure([], () => r(require('@/pages/account_security')), 'account_security');
//  第三方账号绑定
const account_binding = r => require.ensure([], () => r(require('@/pages/account_binding')), 'account_binding');
//  修改密码
const reset_password = r => require.ensure([], () => r(require('@/pages/reset_password')), 'reset_password');
//  绑定手机号
const bind_phone = r => require.ensure([], () => r(require('@/pages/bind_phone')), 'bind_phone');
//  视频自动播放
const traffic_source = r => require.ensure([], () => r(require('@/pages/traffic_source')), 'traffic_source');
//  推送
const push = r => require.ensure([], () => r(require('@/pages/push')), 'push');
//  意见反馈
const feedback = r => require.ensure([], () => r(require('@/pages/feedback')), 'feedback');
//  关于塔兮
const about = r => require.ensure([], () => r(require('@/pages/about')), 'about');
//  用户协议及使用条款款
const agreement_terms = r => require.ensure([], () => r(require('@/pages/agreement_terms')), 'agreement_terms');


//  我的订单
const order = r => require.ensure([], () => r(require('@/pages/order')), 'order');
//  我的收藏
const my_skill = r => require.ensure([], () => r(require('@/pages/my_skill')), 'my_skill');
//  我的收藏
const collection = r => require.ensure([], () => r(require('@/pages/collection')), 'collection');
//  个人资料
const personal_info = r => require.ensure([], () => r(require('@/pages/personal_info')), 'personal_info');
//  工作信息
const work_info = r => require.ensure([], () => r(require('@/pages/work_info')), 'work_info');
//  教育信息
const education_info = r => require.ensure([], () => r(require('@/pages/education_info')), 'education_info');



//  注册
const register = r => require.ensure([], () => r(require('@/pages/register')), 'register');
//  忘记密码
const forget_password = r => require.ensure([], () => r(require('@/pages/forget_password')), 'forget_password');
//  完善资料
const complete_info = r => require.ensure([], () => r(require('@/pages/complete_info')), 'complete_info');


//  点滴详情
const bit_detail = r => require.ensure([], () => r(require('@/pages/bit_detail')), 'bit_detail');
//  点滴分类
const bit_manage = r => require.ensure([], () => r(require('@/pages/bit_manage')), 'bit_manage');



//  发布文字
const publish_text = r => require.ensure([], () => r(require('@/pages/publish_text')), 'publish_text');
//  发布视频
const publish_video = r => require.ensure([], () => r(require('@/pages/publish_video')), 'publish_video');
//  发布图片
const publish_picture = r => require.ensure([], () => r(require('@/pages/publish_picture')), 'publish_picture');
//  发布技能
const publish_skill = r => require.ensure([], () => r(require('@/pages/publish_skill')), 'publish_skill');
//  发布小课
const smallClass = r => require.ensure([], () => r(require('@/pages/smallClass')), 'smallClass');
//  发布文章
const article = r => require.ensure([], () => r(require('@/pages/article')), 'article');

const routes = [
  {
    path: '/',
    name: 'HelloFromVux',
    component: HelloFromVux
  },{
    path: '/testJava',
    name: 'testJava',
		component: testJava
  },{
    path: '/test_video',
    name: 'test_video',
		component: test_video
  },{
    path: '/test5',
    name: 'test5',
		component: test5
  },{
    path: '/test4',
    name: 'test4',
		component: test4
  },{
    path: '/test3',
    name: 'test3',
		component: test3
  },{
    path: '/test2',
    name: 'test2',
		component: test2
  },{
    path: '/test1',
    name: 'test1',
		component: test1
  },{
    path: '/test',
    name: 'test',
		component: test
	},{
    path: '/share',
    name: 'share',
		component: share
	},{
    path: '/download',
    name: 'download',
		component: download
	},{
    path: '/login',
    name: 'login',
		component: login
	},{
    path: '/news',
    name: 'news',
		component: news
	},{
    path: '/detail',
    name: 'detail',
		component: detail
	},{
    path: '/advisory',
    name: 'advisory',
		component: advisory
	},{
    path: '/confirm_order',
    name: 'confirm_order',
		component: confirm_order
	},{
    path: '/homepage',
    name: 'homepage',
		component: homepage
	},{
    path: '/skills',
    name: 'skills',
		component: skills
	},{
    path: '/video_teaching',
    name: 'video_teaching',
		component: video_teaching
	},{
    path: '/featured',
    name: 'featured',
		component: featured
	},{
    path: '/talent',
    name: 'talent',
		component: talent
	},{
    path: '/dry_good',
    name: 'dry_good',
		component: dry_good
	},{
    path: '/dry_detail',
    name: 'dry_detail',
		component: dry_detail
	},{
    path: '/attention',
    name: 'attention',
		component: attention
	},{
    path: '/fans',
    name: 'fans',
		component: fans
	},{
    path: '/settings',
    name: 'settings',
		component: settings
	},{
    path: '/account_security',
    name: 'account_security',
		component: account_security
	},{
    path: '/account_binding',
    name: 'account_binding',
		component: account_binding
	},{
    path: '/reset_password',
    name: 'reset_password',
		component: reset_password
	},{
    path: '/bind_phone',
    name: 'bind_phone',
		component: bind_phone
	},{
    path: '/traffic_source',
    name: 'traffic_source',
		component: traffic_source
	},{
    path: '/push',
    name: 'push',
		component: push
	},{
    path: '/feedback',
    name: 'feedback',
		component: feedback
	},{
    path: '/about',
    name: 'about',
		component: about
	},{
    path: '/agreement_terms',
    name: 'agreement_terms',
		component: agreement_terms
	},{
    path: '/order',
    name: 'order',
		component: order
	},{
    path: '/collection',
    name: 'collection',
		component: collection
	},{
    path: '/my_skill',
    name: 'my_skill',
		component: my_skill
	},{
    path: '/personal_info',
    name: 'personal_info',
		component: personal_info
	},{
    path: '/work_info',
    name: 'work_info',
		component: work_info
	},{
    path: '/education_info',
    name: 'education_info',
		component: education_info
	},{
    path: '/register',
    name: 'register',
		component: register
	},{
    path: '/forget_password',
    name: 'forget_password',
		component: forget_password
	},{
    path: '/complete_info',
    name: 'complete_info',
		component: complete_info
	},{
    path: '/bit_detail',
    name: 'bit_detail',
		component: bit_detail
	},{
    path: '/bit_manage',
    name: 'bit_manage',
		component: bit_manage
	},{
    path: '/publish_text',
    name: 'publish_text',
		component: publish_text
	},{
    path: '/publish_video',
    name: 'publish_video',
		component: publish_video
	},{
    path: '/publish_picture',
    name: 'publish_picture',
		component: publish_picture
	},{
    path: '/publish_skill',
    name: 'publish_skill',
		component: publish_skill
	},{
    path: '/smallClass',
    name: 'smallClass',
		component: smallClass
	},{
    path: '/article',
    name: 'article',
		component: article
	},{
    path: '/index',
    name: '',
    component: index,
    children: [
      {
        path: '',
        name: 'home',
        component: home
      }, {
        path: '/bit',
        name: 'bit',
        component: bit
      }, {
        path: '/tower',
        name: 'tower',
        component: tower
      }, {
        path: '/mine',
        name: 'mine',
        component: mine
      }
    ]
	},
]

export default new Router({
  base:'/tower/',
	mode: 'history',
  routes,
})
