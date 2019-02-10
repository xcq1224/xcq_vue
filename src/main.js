// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App'
import  { ConfirmPlugin, ToastPlugin, AlertPlugin, LoadingPlugin   } from 'vux'
import 'lib-flexible/flexible.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Bridge from './config/bridge.js'

//  定位
import "./js/geolocation.min"

//  富文本编辑器
import initRichText from './js/edit';  
initRichText();

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

//  字符串转数组
Vue.prototype.toArray = function(str){
    if(str){
        return str.split(",")
    }else{
        return []
    }
}

//  内容格式化
Vue.prototype.getFormatContent = function(content){
    content = content.replace(/\r/g, "<br/>");
    var regexp = /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/ig;
    // var regexp = /(http:\/\/|https:\/\/)((w|=|?|.|\/|&|-)+)/g;
    // var regexp = /(https:\/\/[\w.\/]+)(?![^<]+>)/gi;
    content = content.replace(regexp,function($url){
        return "<a class='text-base' href='" + $url + "' target='_blank'>" + $url + "</a>";
    });
    // console.log(content)
    // content = content.replace(/&lt;/g, "<")
    // content = content.replace(/&gt;/g, ">")
    this.$refs.content.innerHTML = content
},

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

// document.addEventListener('plusready', function(){
//     //  打开视频弹窗
//     Vue.prototype.openVideo = function(videoUrl, videoImg){
//         this.$store.state.showVideo = true
//         this.$store.state.videoUrl = videoUrl
//         this.$store.state.videoImg = videoImg
//     }
// });

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

//  选择系统图片
Vue.prototype.choosePicture = function(){
    window.android.storage()
}

//  打开视频弹窗
Vue.prototype.openVideo = function(videoUrl, videoImg){
    this.$store.state.videoUrl = videoUrl
    this.$store.state.videoImg = videoImg
    this.$store.state.showVideo = true
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
//  打开图片弹窗
Vue.prototype.viewPicture = function(pictureList, index){
    this.$store.state.pictureList = pictureList
    this.$store.state.showPicture = true
    this.$store.state.pictureIndex = index
}

//  跳转到详情
Vue.prototype.toDetail = function(id, type, status){
    let str = status ? '&status=' + status : '&status=0'
//  if(type == 3){
//      this.$router.push('./detail?id=' + id + str)
//  }else{
//      this.$router.push('./bit_detail?id=' + id + str)
//  }
    if(type == 3){
        str = str + '&title=小课'
    }
    if(type == 6){
        this.$router.push('./bit_detail?id=' + id + str)
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
    thumbImage = 'http://web.towerxi.com/apk/towerx.png'
    webpageUrl = 'http://web.towerxi.com/share?id=' + webpageUrl
    // webpageUrl = 'http://123.207.255.96/tower/share?id=' + webpageUrl
    window.android.share(title, descr, thumbImage, webpageUrl, type)
}
//  分享简历
Vue.prototype.shareResume = function(title, descr, thumbImage, webpageUrl, type){
    title = title || '塔兮'
    descr = descr || ''
    thumbImage = 'http://web.towerxi.com/apk/towerx.png'
    webpageUrl = 'http://web.towerxi.com/share_resume?id=' + webpageUrl
    // webpageUrl = 'http://123.207.255.96/tower/share?id=' + webpageUrl
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
        if(!params.has("towerUserId")){
            params.append('towerUserId', this.$store.state.towerUserId)
        }
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

//  动态title
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    let list = ['bit', 'tower']
    // let url = './' + name
    let name = to.name
    if(list.indexOf(name) != -1 && !store.state.towerUserId){
        // store.state.nextUrl = url
        router.push("./login")
    }
    next()
});

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


