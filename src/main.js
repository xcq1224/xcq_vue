// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App'
import Home from './components/HelloFromVux'
import  { ConfirmPlugin, ToastPlugin, AlertPlugin, LoadingPlugin   } from 'vux'
import 'lib-flexible/flexible.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Bridge from './config/bridge.js'

//  video.js
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);


FastClick.attach(document.body)

// axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin )
Vue.use(LoadingPlugin )
Vue.use(VueAwesomeSwiper)
Vue.prototype.$bridge = Bridge

//  获取数组长度
Vue.prototype.length = function(arr){
    return arr.length
}
//  成功提示
Vue.prototype.toastSuccess = function(text, width){
    this.$vux.toast.show({
        text: text,
        type: "text",
        width: width || '100px',
        time: 800,
        position: 'top',
    })
}

//  失败提示
Vue.prototype.toastFail = function(text, width){
    this.$vux.toast.show({ 
        text: '<span style="color:#f90">' + text + '</span>',
        type: "text",
        width: width || '100px',
        time: 1600,
        position: 'top',
    })
}

//  打开视频弹窗
Vue.prototype.openVideo = function(videoUrl, videoImg){
    this.$store.state.showVideo = true
    this.$store.state.videoUrl = videoUrl
    this.$store.state.videoImg = videoImg
}

//  打开图片弹窗
Vue.prototype.openPicture = function(index, img1, img2, img3){
    let pictureList = []
    if(img1) pictureList.push(img1)
    if(img2) pictureList.push(img2)
    if(img3) pictureList.push(img3)
    this.$store.state.pictureList = pictureList
    this.$store.state.showPicture = true
    this.$store.state.pictureIndex = index
}

//  跳转到详情
Vue.prototype.toDetail = function(id, type, status){
    let str = status ? '&status=' + status : '&status=0'
    if(type == 3){
        this.$router.push('./detail?id=' + id + str)
    }else{
        this.$router.push('./bit_detail?id=' + id + str)
    }
},
//  跳转页面
Vue.prototype.goTo = function(url){
    if(this.$store.state.towerUserId){
        this.$router.push(url)
    }else{
        this.$store.state.nextUrl = url
        this.$router.push("./login")
    }
},
//  跳转到个人主页
Vue.prototype.toHomepage = function(id){
    this.$router.push('./homepage?id=' + id)
},
//  分享
Vue.prototype.share = function(title, descr, thumbImage, webpageUrl, type){
    title = title || '塔兮'
    descr = descr || ''
    thumbImage = 'http://106.14.7.242/apk/towerx.png'
    webpageUrl = 'http://123.207.255.96/tower/share?id=' + webpageUrl
    console.log(title)
    console.log(descr)
    console.log(thumbImage)
    console.log(webpageUrl)
    console.log(type)
    window.android.share(title, descr, thumbImage, webpageUrl, type)
}

/**
 * 秒转化为分
 * @param {*} val 秒钟
 */
Vue.prototype.secont2minute = function(val){
  let m = val ? parseInt(val/60) : 0
  let s = val ? parseInt(val%60) : 0
  m = m<10? '0'+m : m
  s = s<10? '0'+s : s
  return m + ':' + s;  
}

/**
 * 时间间隔
 * @param {时间戳} t2 
 */
Vue.prototype.longTime = function(t2){
    let str = ''
    let t1 = new Date()
    let t = t1 - t2
    let m = Math.ceil(t/60000)
    let h = parseInt(m/60)
    if(!h){
        return m + '分钟前'
    }
    let d = parseInt(h/24)
    if(!d){
        return h + '小时前'
    }
    let M = parseInt(d/30)
    if(!M){
        return d + '天前'
    }
    let y = parseInt(M/12)
    if(!y){
        return M + '月前'
    }
    return y + '年前';  
}

/**
 * 
 * @param {*} time 时间戳
 * @param {*} fmt   返回时间格式
 */
Vue.prototype.formatDate = function(time, fmt){
    let datetime = new Date(time)
    var fmt = fmt || 'yyyy-MM-dd';
    var o = {  
        "M+": datetime.getMonth() + 1, //月份  
        "d+": datetime.getDate(), //日  
        "h+": datetime.getHours(), //小时  
        "m+": datetime.getMinutes(), //分  
        "s+": datetime.getSeconds(), //秒  
        "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度  
        "S": datetime.getMilliseconds() //毫秒  
    };  
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
  }

//  不用了
Vue.prototype.post = function(url, params, success, error){
    if(this.$store.state.towerUserId){
        console.log(this.$store.state.towerUserId)
        params.append('towerUserId', this.$store.state.towerUserId)
    }
    this.$axios.post(url, params).then(res => {
        if(res.data.returnStatus == 'false'){
            if(error){
                error(res.data)
            }else{
                this.$vux.toast.show({
                    type: 'text',
                    width: '200px',
                    text: data.msg,
                })
            }
        }else{
            success(res.data)
        }
    }).catch(error => {
        this.$vux.toast.show({
            type: 'text',
            width: '200px',
            text: '网络异常，请稍后再试！',
        })
    })
}

/**
 * 
 * @param {*} action 接口名
 * @param {*} params post参数
 * @param {*} success 成功回调函数
 * @param {*} error 错误回调函数
 */
Vue.prototype.$post = function(action, params, success, error){
    let url = 'http://towerxi.com/app/account!' + action + '.action'
    if(this.$store.state.towerUserId){
        console.log(this.$store.state.towerUserId)
        params.append('towerUserId', this.$store.state.towerUserId)
    }
    this.$axios.post(url, params).then(res => {
        this.$vux.loading.hide()
        if(res.data.returnStatus == 'false'){
            if(error){
                error(res.data)
            }else{
                this.toastFail(res.data.msg, '200px')
            }
        }else{
            success(res.data)
        }
    }).catch(error => {
        this.$vux.loading.hide()
        this.toastFail('网络异常，请稍后再试', '200px')
    })
}

// document.addEventListener("plusready", function() {  
//     // 注册返回按键事件  
//     alert(4)
//     plus.key.addEventListener('backbutton', function() {  
//         // 事件处理  
//         alert(4)
//         window.history.back();
//     }, false);  
// }); 
/**
 * 使用 HTML5 的 History 新 API pushState 来曲线监听 Android 设备的返回按钮
 * XBack.listen(function(){
    alert('oh! you press the back button');
  });
 */
// ;!function(pkg, undefined){
//     var STATE = 'x-back';
//     var element;
//     var onPopState = function(event){
//       event.state === STATE && fire();
//     }
//     var record = function(state){
//       history.pushState(state, null, location.href);
//     }
//     var fire = function(){
//       var event = document.createEvent('Events');
//       event.initEvent(STATE, false, false);
//       element.dispatchEvent(event);
//     }
//     var listen = function(listener){
//       element.addEventListener(STATE, listener, false);
//     }
//     ;!function(){
//       element = document.createElement('span');
//       window.addEventListener('popstate', onPopState);
//       this.listen = listen;
//       record(STATE);
//     }.call(window[pkg] = window[pkg] || {});
//   }('XBack');
//   XBack.listen(function(){
//     alert('back');
//   });

    // var XBack = {};
	// (function(XBack) {
	// 	XBack.STATE = 'x - back';
	// 	XBack.element;
 
	// 	XBack.onPopState = function(event) {
	// 		event.state === XBack.STATE && XBack.fire();
	// 		XBack.record(XBack.STATE); //初始化事件时，push一下
	// 	};
 
	// 	XBack.record = function(state) {
	// 		history.pushState(state, null, location.href);
	// 	};
 
	// 	XBack.fire = function() {
	// 		var event = document.createEvent('Events');
	// 		event.initEvent(XBack.STATE, false, false);
	// 		XBack.element.dispatchEvent(event);
	// 	};
 
	// 	XBack.listen = function(listener) {
	// 		XBack.element.addEventListener(XBack.STATE, listener, false);
	// 	};
 
	// 	XBack.init = function() {
	// 		XBack.element = document.createElement('span');
	// 		window.addEventListener('popstate', XBack.onPopState);
	// 		XBack.record(XBack.STATE);
	// 	};
 
	// })(XBack); // 引入这段js文件
 
	// XBack.init();
	// XBack.listen(function() {
    //     alert(3)
    // });

/* eslint-disable no-new */
new Vue({
  router,
  store,
  created: function(){
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
    //  设置页面高度解决键盘顶起footer
    document.documentElement.style.height = document.documentElement.clientHeight + 'px'
    //  android返回本地的数据
    let data = JSON.parse(window.android.isLogin())
    if(data.isLogin == 'true'){
        this.$store.state.towerUserId = data.towerUserId
        this.$store.state.avatar = data.icon
        this.$store.state.userName = data.name
    }
    
    //  重新加载时关闭视频弹窗
    this.$store.state.showVideo = false
    this.$store.state.showPicture = false
  },
  render: h => h(App)
}).$mount('#app-box')


