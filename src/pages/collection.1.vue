<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">我的收藏</x-header>
        <div class="main">
            <div class="video-card">
                <div class="user-info">
                    <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                </div>
                <div class="title">职场第一课，你应该知道哪些道理？职场第一课，你应该知道哪些道理？职场第一课，你应该知道哪些道理？</div>
                <div class="video-box">
                    <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/15/14/20/41/video5afa7c3928d6b.mp4"></video>
                </div>
                <div class="handle">
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                    <i class="iconfont icon-ego-heart"></i>
                </div>
            </div>
            <div class="video-card">
                <div class="user-info">
                    <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                </div>
                <div class="title">职场第一课，你应该知道哪些道理？</div>
                <div class="picture-big-box">
                    <img src="../assets/picture1.jpg" alt="">
                </div>
                <div class="handle">
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                    <i class="iconfont icon-ego-heart"></i>
                </div>
            </div>
            <div class="video-card">
                <div class="user-info">
                    <img src="../assets/avatar.jpg" width="28" height='28' alt="">&nbsp;&nbsp;曾庆全&nbsp;<i class='iconfont icon-zhongfu'></i>
                </div>
                <div class="title">职场第一课，你应该知道哪些道理？</div>
                <div class="picture-small-box">
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""></div>
                    <div><img src="../assets/avatar.jpg" alt=""><div class="more-img">+1</div></div>
                </div>
                <div class="handle">
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                    <i class="iconfont icon-ego-heart"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
        },
        data () {
            return {
                index: 0,
            }
        },
        methods: {
           
            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .vux-header{
        position: relative;
        z-index: 2;
    }
    .main{
        padding: 46px 0 0;
        background: #f2f2f2;
        font-size: 12px;
        .video-card{
            padding: 10px 10px 0;
            background: #fff;
            color: #777;
            border-bottom: 1px solid #ddd;
            .user-info{
                img{
                    border-radius: 50%;
                    vertical-align: middle;
                }
                a{
                    float: right;
                    margin-top: 3px;
                    height: 25px;
                    width: 50px;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 4px;
                    font-size: 13px;
                    border: 1px solid #ccc;
                    color: #ccc;
                    &.active{
                        color: #fff;    
                        background: @baseColor;
                        border-color: @baseColor;
                    }
                }
            }
            .video-box{
                background: #000;
                video{
                    margin: 0 auto;
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: 146px;
                    display: block;
                }
            }
            .picture-big-box{
                img{
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            .picture-small-box{
                height: 162px;
                overflow: hidden;
                padding-left: 2px;
                >div{
                    position: relative;
                    float: left;
                    width: 25%;
                    height: 82px;
                    padding: 0 2px 2px 0;
                    box-sizing: border-box;
                }
                img{
                    display: block;
                    height: auto;
                    width: 100%;
                    height: 100%;
                }
                .more-img{
                    position: absolute;
                    background: rgba(0, 0, 0, 50%);
                    top: 0;
                    left: 0;
                    bottom: 2px;
                    right: 2px;
                    color: #fff;
                    text-align: center;
                    line-height: 80px;
                    font-size: 16px;
                }
            }
            .title{
                font-weight: bold;
                margin: 5px 0 6px 10px;
            }
            .handle{
                color: #ccc;
                line-height: 30px;
                overflow: hidden;
                i{
                    float: right;
                    margin-right: 10px;
                    font-size: 20px;
                }
            }
        }
    }
</style>

