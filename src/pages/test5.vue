<template>
     <div class="page">
            <p>拍照: <input type="file" value="拍照" @click="showToast1()"/></p>
            <popup v-model="showVideo" height="100%" style="background: #000;">
                <div class="showVideo">
                    <x-header class="pst" style="background-color: transparent;">
                        <a slot="overwrite-left" @click="showVideo = false" class="">
                            <div class="left-arrow"></div>&nbsp;&nbsp;&nbsp;&nbsp;返回
                        </a>
                    </x-header>
                </div>
                <div class="main">
                    <div class="video-box" @click="clickVideo" :class="isFullScreen?'active':''">
                        <video class="video" @play="play" @pause="pause" @ended="ended"
                        controls src="../assets/movie.mp4"></video>
                        <i v-show="!isFullScreen" @click="isFullScreen = true" class="iconfont icon-quanping"></i>
                        <i v-show="isFullScreen" @click="isFullScreen = false" class="iconfont icon-icon--1"></i>
                        <span v-show="showPlayBtn" @click.stop="playVideo" class="play-btn iconfont" :class="paused?'icon-bofang':'icon-weibiaoti519'"></span>
                    </div>
                </div>
            </popup>
     </div>
</template>

<script type="text/ecmascript-6">
    import { Range, Cell, Popup, XHeader } from 'vux'
import { setTimeout, clearTimeout } from 'timers';
    export default {
        components: {
            Range,
            Cell,
            Popup,
            XHeader,
        },
        data() {
            return {
                paused: true,
                showVideo: false,    //  是否弹出视频框
                showPlayBtn: true,
                timer: null,
                isFullScreen: false,    //  是否全屏
            }
        },
        methods:{
            showToast1() {
                window.android.video();
            },
            clickVideo(){
                if(!this.paused){
                    let that = this
                    this.showPlayBtn = true
                    clearTimeout(this.timer)
                    this.timer = setTimeout(function(){
                        if(!that.paused){
                            that.showPlayBtn = false
                        }
                    }, 3000)
                }
            },
            //  播放按钮
            playVideo(){
                let video = document.getElementsByClassName("video")[0]
                if(this.paused){
                    video.play()
                    this.showPlayBtn = false
                    // this.isFullScreen = true
                }else{
                    video.pause()
                    // this.isFullScreen = false
                }
            },
            //  播放中
            play(e){
                this.paused = e.srcElement.paused
            },
            //  暂停中
            pause(e){
                this.paused = e.srcElement.paused
            },
            //  播放结束
            ended(e){
                this.paused = true
                this.showPlayBtn = true
            },

            
        }
    }
</script>

<style scoped lang="less" scoped>
    .main{
        padding-top: 50px;
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
 
</style>
<style lang="less">
    .page{
        .control-bar{
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            bottom: 0;
            z-index: 9999999999;
            &:before{
                display: none;
            }
            .vux-range-input-box{
                margin-left: 0 !important;
                margin-right: 100px !important;
            }
            .range-handle{
                width: 10px;
                height: 10px;
                top: -5px !important;
            }
            .range-max{
                display: none;
            }
            .play-desc{
                color: #fff;
                position: absolute;
                bottom: 0;
                right: 10px;
            }
        }
        video::-webkit-media-controls-enclosure {
            /*禁用播放器控制栏的样式*/
            // display: none !important;
        }
        video::-webkit-media-controls-panel {
            /*禁用播放器控制栏的样式*/
            background-color: transparent;
        }
        video::-internal-media-controls-download-button{
            /*禁用播放器控制栏的样式*/
            display: none;
        }
        
        video{
            &::-webkit-media-controls-current-time-display,
            &::-webkit-media-controls-time-remaining-display{
                /*禁用播放器控制栏的样式*/
                color: #fff;
            }
            &::-webkit-media-controls-mute-button,
            &::-webkit-media-controls-volume-slider{
                display: none;
            }
            &::-webkit-media-controls-fullscreen-button,{
                // background-image: url("../assets/picture3.jpg");
            }
            &::-webkit-media-controls-enclosure{ 
                overflow: hidden; 
            }
            &::-webkit-media-controls-panel{ width: calc(80% + 8px); }
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
    // :-webkit-full-screen {
    //     background-color: white;
    //     z-index: 5 !important;
    // }
</style>

