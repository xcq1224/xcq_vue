<template>
     <div class="page test3">
             <div class="slider">
                   <div class="content" 
                      @touchstart='touchStart'
                      @touchmove='touchMove'
                      @touchend='touchEnd'
                      :style="deleteSlider"
                   >
                <!-- 插槽中放具体项目中需要内容         -->   
                    <slot><p @click="abc" style="color: #fff;height: 40px;text-align: center; line-height: 40px;">sdafsaf</p></slot>
                   </div>
                   <div class="remove" ref='remove'>
                       删除
                   </div>
            </div>
            <div class="main">
                <div class="video-box" :class="isFullScreen?'active':''">
                    <!-- <video preload='auto' poster="https://bpic.588ku.com/video_listen/588ku_pic/18/06/10/351e30b64c49054f9fd9a82a4b5adac3.jpg!/both/473x264/force/true" id='my-video'  src="https://bpic.588ku.com/video_listen/588ku_preview/18/06/11/14/29/53/video5b1e16e1cb6d1.mp4" webkit-playsinline='true' playsinline='true' x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true' x5-video-ignore-metadata='true'  width='100%' height='100%'><p> 不支持video</p> </video> -->
                    <video class="video" ref="video" @loadedmetadata="loadVideo" @timeupdate="timeupdate" @play="play" @pause="pause"
                       controls poster="https://bpic.588ku.com/video_listen/588ku_pic/18/06/10/351e30b64c49054f9fd9a82a4b5adac3.jpg!/both/473x264/force/true" src="https://bpic.588ku.com/video_listen/588ku_preview/18/06/11/14/29/53/video5b1e16e1cb6d1.mp4"></video>
                    <span v-show="paused" @click="playVideo" class="play-btn"><i class="iconfont icon-bofang"></i></span>
                    <span v-show="!paused" @click="pauseVideo" class="play-btn"><i class="iconfont icon-weibiaoti519"></i></span>
                    <i v-show="!isFullScreen" @click="fullScreen" class="iconfont icon-quanping"></i>
                    <i v-show="isFullScreen" @click="exitFullScreen" class="iconfont icon-icon--1"></i>
                    <!-- <cell primary="content" class="control-bar">
                        <div class="play-desc" slot>
                            <span>{{playTime()}}</span>
                        </div>
                        <range v-model="value" :rangeBarHeight='2' @on-touchstart="onTouchstart" @on-touchend="onTouchend" :max="max"></range>
                    </cell> -->
                </div>
            </div>
     </div>
</template>

<script type="text/ecmascript-6">
    import { Range, Cell } from 'vux'

    export default {
        components: {
            Range,
            Cell,
        },
        data() {
            return {
                startX:0,   //触摸位置
                endX:0,     //结束位置
                moveX: 0,   //滑动时的位置
                disX: 0,    //移动距离
                deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"


                value: 0,
                max: 0,
                duration: 0,
                paused: true,
                isChange: false,
                isFullScreen: false,
            }
        },
        methods:{
            abc(){
                // this.$refs.video.webkitRequestFullScreen()
                // this.$refs.video.play()
                var ele = this.$refs.video;
                if (ele .requestFullscreen) {
                    ele .requestFullscreen();
                } else if (ele .mozRequestFullScreen) {
                    ele .mozRequestFullScreen();
                } else if (ele .webkitRequestFullScreen) {
                    ele .webkitRequestFullScreen();
                }
            },
            touchStart(ev){
                ev= ev || event
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
    
                if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            touchMove(ev){
                ev = ev || event;
                   //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd=this.$refs.remove.offsetWidth;
                if(ev.touches.length == 1) {
                    // 滑动时距离浏览器左侧实时距离
                    this.moveX = ev.touches[0].clientX
            
                    //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                    this.disX = this.startX - this.moveX;
                    console.log(this.disX)
                    // 如果是向右滑动或者不滑动，不改变滑块的位置
                    if(this.disX < 0 || this.disX == 0) {
                        this.deleteSlider = "transform:translateX(0px)";
                    // 大于0，表示左滑了，此时滑块开始滑动 
                    }else if (this.disX > 0) {
                            //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
                        
                        // 最大也只能等于删除按钮宽度 
                        if (this.disX*5 >=wd) {
                            this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                            
                        }
                    }
                }
            },
            touchEnd(ev){
                ev = ev || event;
                let wd=this.$refs.remove.offsetWidth;
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                      
                    this.disX = this.startX - endX;
                    console.log(this.disX)
                    //如果距离小于删除按钮一半,强行回到起点
                    
                    if ((this.disX*5) < (wd/2)) {
                    
                        this.deleteSlider = "transform:translateX(0px)";
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+ "px)";
                    }
                }
            },
            
            
            //  加载完视频长度
            loadVideo(e){  
                this.max = parseInt(e.srcElement.duration*10)
            },
            //  控制条时间显示
            playTime(){
                return this.secont2minute(this.value/10) + '/' + this.secont2minute(this.max/10)
            },
            //  播放按钮
            playVideo(){
                let video = document.getElementsByClassName("video")[0]
                video.play()
            },
            play(e){
                this.paused = e.srcElement.paused
            },
            //  暂停按钮
            pauseVideo(){
                let video = document.getElementsByClassName("video")[0]
                video.pause()
            },
            pause(e){
                this.paused = e.srcElement.paused
            },
            //  播放中
            timeupdate(e){
                if(!this.isChange){
                    this.value = e.srcElement.currentTime*10
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

            
        }
    }
</script>

<style scoped lang="less" scoped>
    .main{
        padding-top: 50px;
        background: #000;
        .iconfont{
            position: absolute;
            top: 0px;
            font-size: 30px;
            right: 10px;
        }
        .video-box{
            height: 200px;
            width: 100%;
            background: #000;
            position: relative;
            video{
                width: 100%;
                height: 100%;
                max-height: 100%;
                max-width: 100%;
            }
            .play-btn{
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                width: 50px;
                height: 50px;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                background: rgba(51, 51, 51, 0.6);
                z-index: 9999999999;
                i{
                    font-size: 30px;
                    line-height: 50px;
                }
            }
            &.active{
                transform: rotate(90deg);
                transform-origin: 0% 0%;
                width: 100vh;
                height: 100vw;
                position: fixed;
                top: 0;
                left: 100vw;
                right: 0;
                bottom: 0;
                z-index: 100;
            }
        }
    }
    .slider{
        width: 100%;
        height:50px;
        position: relative;
         user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background:green;
            z-index: 100;
            //    设置过渡动画
            transition: 0.3s;
             
        }
        .remove{
            position: absolute;
            width:100px;
            height:100%;
            background:red;
            right: 0;
            top: 0;
            color:#fff;
            text-align: center;
            font-size: 40px;
            line-height: 200px;
        }
    }
 
</style>
<style lang="less">
    .test3{
        video::-webkit-media-controls-panel {
            background: rgba(0,0,0,0.9);
        }
        // .control-bar{
        //     position: absolute;
        //     width: 100%;
        //     box-sizing: border-box;
        //     bottom: 0;
        //     z-index: 9999999999;
        //     &:before{
        //         display: none;
        //     }
        //     .vux-range-input-box{
        //         margin-left: 0 !important;
        //         margin-right: 100px !important;
        //     }
        //     .range-handle{
                
        //         top: -16px !important;
        //     }
        //     .range-max{
        //         display: none;
        //     }
        //     .play-desc{
        //         color: #fff;
        //         position: absolute;
        //         bottom: 0;
        //         right: 10px;
        //     }
        // }
        // video::-webkit-media-controls-enclosure {
        //     /*禁用播放器控制栏的样式*/
        //     display: none !important;
        // }
    }   
    // :-webkit-full-screen {
    //     background-color: white;
    //     z-index: 5 !important;
    // }
</style>

