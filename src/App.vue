<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <popup v-model="showVideo" height="100%" style="background: rgba(0,0,0,0.8);" @on-hide="closeVideoModal" @on-show="openVideoModal">
        <div class="main">
            <a @click="goBack" class="iconfont icon-tainjia-copy close closeVideo"></a>
            <div id="id_test_video" style="width:100%; height:100%;"></div>
        </div>
    </popup>
    <popup v-model="showPicture" class="pictureviewer" height="100%" @on-show="openPictureModal">
        <a class="iconfont icon-tainjia-copy close" @click="closePictire"></a>
        <swiper :options="swiperOption" ref="mySwiper" class="picture-swiper">
            <!-- slides -->
            <swiper-slide v-for="(item, index) in pictureList" :key="index">
                <div class="swiper-zoom-container">
                    <img :src="item">
                </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import {Popup, XHeader, Cell} from 'vux'

export default {
  name: 'app',
  components: {
      Popup,
      XHeader,
      Cell,
  },
  computed: {
    ...mapState(['showVideo', "videoUrl", "videoImg", "showPicture", "pictureList"]),
  },
  data(){
    return {
        // showVideo: this.$store.state.showVideo,
        // videoUrl: this.$store.state.videoUrl,
        // videoImg: this.$store.state.videoImg,
        isFullScreen: false,    //  是否全屏
        paused: true,
        swiperOption: {
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            zoom: {
                toggle: false,
            },
        },
        player: {},          
    }
  },
  mounted(){
    window.player = ""
  },
  methods: {
    //   <div class="modal-video" :class="isFullScreen?'active':''">
    //             <a slot="right" @click="goBack" class="iconfont icon-tainjia-copy close"></a>
    //             <video class="video" ref="modalVideo" @loadedmetadata="loadVideo" @timeupdate="timeupdate" @play="play" @pause="pause"
    //                 controls :src="videoUrl" :poster="videoImg"></video>
    //             <!-- <span v-show="paused" @click="playVideo" class="play-btn"><i class="iconfont icon-bofang"></i></span>
    //             <span v-show="!paused" @click="pauseVideo" class="play-btn"><i class="iconfont icon-weibiaoti519"></i></span> -->
    //             <i v-show="!isFullScreen" @click="fullScreen" class="iconfont icon-quanping full-screen"></i>
    //             <i v-show="isFullScreen" @click="exitFullScreen" class="iconfont icon-icon--1 full-screen"></i>
    //         </div>
    //  加载完视频
    loadVideo(e){  
    },
    //  播放按钮
    playVideo(){
        this.$refs.modalVideo.play()
    },
    play(e){
        this.paused = this.$refs.modalVideo.paused
    },
    //  暂停按钮
    pauseVideo(){
        this.$refs.modalVideo.pause()
    },
    pause(e){
        this.paused = this.$refs.modalVideo.paused
    },
    //  播放中
    timeupdate(e){
        if(!this.isChange){
            this.value = this.$refs.modalVideo.currentTime*10
        }
    },

    //  控制条改变
    onTouchstart () {
        this.isChange = true
    },
    onTouchend () {
        let video = document.getElementsByClassName("video")[0]
        video.currentTime = this.value/10
        this.isChange = false
    },
    //  全屏显示
    fullScreen(){
        this.isFullScreen = true
    },
    exitFullScreen(){
        this.isFullScreen = false
    },
    goBack(){
      this.$store.state.showVideo = false
    },
    ended(e){
        e.target.nextElementSibling.setAttribute('style', 'display: block')
    },
    //  视频加载错误
    videoError(index){
        this.contentShowList[index].isError = true
        this.contentShowList[index].videoImg = null
    },
    openVideo(videoUrl, videoImg, index){
        this.videoPlayIndex = index
        this.videoUrl = videoUrl
        this.videoImg = videoImg
        this.showVideo = true
    },
    //  打开视频弹框
    openVideoModal(){
        player = new TcPlayer('id_test_video', {
            // "mp4": "https://pic.ibaotu.com/00/94/10/67F888piCGHu.mp4", //请替换成实际可用的播放地址
            "mp4": this.$store.state.videoUrl,
            "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
            "x5_orientation": 2,
            "coverpic" : {"style": "cover", "src": this.$store.state.videoImg},
            // "controls": 'system', //default||'' 显示默认控件，none 不显示控件，system 移动端显示系统控件
            "systemFullscreen": true,
            "wording": { 2032: '请求视频失败，请检查网络'},
            "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
            "height" : '100%'//视频的显示高度，请尽量使用视频分辨率高度
        })
        player.play()
        console.log(player)
        // setTimeout(() => {
        //     this.$refs.modalVideo.play()
        // }, 200)
    },
    //  关闭视频弹框
    closeVideoModal(){
        if(player) player.destroy()
    },


    //  打开图片弹框
    openPictureModal(){
        this.$refs.mySwiper.swiper.slideTo(this.$store.state.pictureIndex)
    },
    //  关闭图片弹框
    closePictire(){
        this.$store.state.showPicture = false
        this.$store.state.pictureList = []
        this.$store.state.pictureIndex = 0
    },
  },
}
</script>


<style lang="less">
@import '~vux/src/styles/reset.less';
@import './style/base.less';
@import 'swiper/dist/css/swiper.css';
@import "./style/iconfont.css";

.closeVideo{
    position: absolute;
    z-index: 100001;
    font-size: 24px;
    color: #ccc;
}
</style>
