<template>
    <div class="has-tabbar page">
        <div class="main">
            <img :src="img">
            <video @loadeddata="abc" width="80%" :src="src"></video>
            <input class="open-camera" @change="uploadVideo" type="file" accept="">
            <span @click="play">播放</span>
            
        </div>
    </div>
</template>
<script>
    import { Search, Popover, Scroller } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import { setTimeout } from 'timers';
 
    export default {
        components: {
            Search,
            Popover,
            Scroller,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
        },
        data() {
            return {
                src: null,
                img: null,
            }
        },
        methods: {
            // 上传拍摄
            uploadVideo(e){
                const file = e.target.files[0];
                this.src = URL.createObjectURL(file)
                let that = this
            },
            play(){
                document.getElementsByTagName("video")[0].play()
            },
            abc(){
                let canvas = document.createElement("canvas")
                let video = document.getElementsByTagName('video')[0]
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                let canvasFill = canvas.getContext('2d');
                canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
                console.log(video)
                this.img = canvas.toDataURL("image/jpeg")
            }
        }
    }


    // (function() {
    //     "use strict";
    //     $('#file').on('change', function() {
    //         var files = this.files,
    //         video = $('#video').find('video'),
    //         videoURL = null,
    //         windowURL = window.URL || window.webkitURL;;
    //         if (files && files[0]) {
    //             videoURL = windowURL.createObjectURL(files[0]);
    //             $('#video').html('<video src="' + videoURL + '" controls="controls"></video>');
    //             setTimeout(function() {
    //                 createIMG();
    //             }, 500);
            
    //         }
    //     }).trigger('change');
            
    //     var createIMG = function() {
    //         var scale = 0.25,
    //         video = $('#video').find('video')[0],
    //         canvas = document.createElement("canvas"),
    //         canvasFill = canvas.getContext('2d');
    //         canvas.width = video.videoWidth * scale;
    //         canvas.height = video.videoHeight * scale;
    //         canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
                
    //         var src = canvas.toDataURL("image/jpeg");
    //         $('#imgSmallView').html('<img id="imgSmallView" src="' + src + '" alt="预览图" />');
    //     }       
    // })()
</script>
<style lang="less">
    .box {
        padding: 5px 10px 5px 10px;
        &:first-child {
            padding: 0 10px 5px 10px;
        }
        &:last-child {
            padding: 5px 10px 0 10px;
        }
    }
    img{
        width: 200px;
        height: 200px;
        border: 1px solid red;
    }
    video{
        border: 1px solid #ddd;
        display: block;
        margin: 0 auto;
    }
    .list {
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
        padding: 30px;
    }
    .xs-plugin-pulldown-container {
        line-height: 40px;
    }
    .xs-plugin-pullup-container {
        line-height: 40px;
    }
</style>
<style lang="less" scoped>
    @baseColor: #b5e1fe;
    .bg-base{
        background: @baseColor;
    }
    .header{
        background: #b5e1fe;
        display: flex;
        height: 46px;
        .search{
            flex: 1;
            .weui-search-bar{
                background: #b5e1fe;
            }
        }
        .news{
            line-height: 46px;
            padding-right: 13px;
            color: #fff;
            position: relative;
            i{
                font-size: 24px;
            }
            &.active:after{
                content: '';
                position: absolute;
                top: 10px;
                right: 15px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: red;
            }
        }
    }
    .tab{
        background: #fff;
        display: flex;
        a{
            flex: 1;
            text-align: center;
            height: 80px;
            p{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                line-height: 40px;
                margin: 10px auto 3px;
                color: #fff;
                i{
                    font-size: 20px;
                }
            }
        }
    }
    .main{
        padding-top: 136px;
        padding-bottom: 60px;
        .title{
            background: #fff;
            padding-left: 10px;
            font-weight: bold;
            i{
                color: #f36;
                font-weight: normal;
            }
        }
    }
    .hot-card{
        padding: 10px 10px 3px;
        background: #fff;
        margin-bottom: 15px;
        color: #777;
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
        video{
            width: 100%;
            height: auto;
        }
        .title{
            font-weight: bold;
            margin: 5px 0 3px 10px;
        }
        .handle{
            color: #ccc;
            i{
                float: right;
                margin-right: 10px;
                font-size: 20px;
                line-height: 22px;
            }
        }
    }

    .subnav{
        height: 34px;
        padding-top: 6px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 10px;
        background: #fff;
        position: relative;
        >div{
            width: 50%;
            height: 24px;
            float: left;
            text-align: center;
            line-height: 24px;
            box-sizing: border-box;
            &:first-of-type{
                border-right: 1px solid #e5e5e5;
            }
            .subnav-item.active{
                color: @baseColor;
            }
        }
        ul{
            position: absolute;
            width: 100vw;
            top: 41px;
            left: 0;
            background: #fff;
            padding: 3px 7px 10px;
            box-sizing: border-box;
            overflow: hidden;
            z-index: 2;
            li{
                width: 20%;
                float: left;
                list-style: none;
                a{
                    display: block;
                    margin: 7px;
                    border: 1px solid @baseColor;
                    text-align: center;
                    line-height: 22px;
                    border-radius: 10px;
                    font-size: 12px;
                    &.active{
                        background: @baseColor;
                        color: #fff;
                    }
                }
                &.title{
                    width: 100%; 
                    text-align: left;
                    padding-left: 16px;
                }
                &.title:not(:first-of-type){
                    margin-top: 10px;
                }
            }
        }
    }
    .chosen-card{
        padding: 12px 8px;
        margin-bottom: 1px;
        background: #fff;
        overflow: hidden;
        font-size: 12px;
        img{
            float: left;
            border-radius: 8px;
            margin-right: 10px;
            width: 118px;
            height: 70px;
        }
        p{
            color: #ccc;
            &.title{
                color: #777;
                font-weight: bold;
                height: 38px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .num{
                color: #777;
            }
            .sprice{
                float: right;
                color: #f00;
                margin-right: 18px;
                font-weight: bold;
            }
        }
    }
    .talent-card{
        margin-bottom: 1px;
        background: #fff;
        padding: 10px;
        font-size: 12px;
        position: relative;
        img{
            width: 64px;
            height: 64px;
            border-radius: 50%;
            margin: 0 10px;
            float: left;
        }
        p{
            line-height: 22px;
        }
        .title{
            color: #333;
            font-weight: bold;
        }
        .attention{
            position: absolute;
            right: 10px;
            top: 4px;
        }
    }
    .attention{
        display: block;
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
    
    
    .search-tab{
        background: #fff;
        padding: 0 2px 0 6px;
        display: block;
        height: 28px;
        font-size: 14px;
        i{
            font-size: 20px;
            line-height: 28px;
            vertical-align: middle;
        }
    }
    .search-tab-items{
        width: 64px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        text-align: center;
        color: #777;
        p{
            line-height: 26px;
            &:not(:last-of-type){
                border-bottom: 1px solid #ddd;
            }
            &.active{
                color: @baseColor;
            }
        }
    }
    .search-box{
        background: #fff;
        text-align: center;
        margin: 9px 10px;
        color: #ccc;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        i{
            vertical-align: middle; 
            margin-right: 10px;
        }
    }
    .result-box{
      background: #f7f7f7;
      height: 100vh;
      overflow: auto;
      box-sizing: border-box;
      padding-bottom: 46px;
      .search-title{
        line-height: 36px;
        padding-left: 10px;
        font-size: 16px;
      }
      .search-body{
        background: #fff;
        overflow: hidden;
        padding: 10px 10px;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
        line-height: 20px;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            margin-top: 2px;
            float: left;
        }
        .title{
            margin-bottom: 5px;
            &.active{
                margin-top: 12px;
            }
        }
      }
    }
</style>