<template>
    <div class="page" @click="tagIndex = 0"> 
        <x-header class="pst" :left-options="{backText: ''}">
            <span slot="overwrite-left" @click="goBack">取消</span>
            炫技
            <span slot="right">
                <a @click="publish">发布</a>
            </span>
        </x-header>
        <div class="main article-desc-content">
            <div style="background: #fff; border-bottom: 1px solid #ddd;" class="publish-title">
                <x-textarea v-model="title" class="title-textarea" :rows="1" :autosize="true" placeholder="起个炫酷的标题"></x-textarea>
            </div>
            <div class="publish-video">
                <input ref="uploadVideo" @click="openShooting" @change="uploadVideo" v-show="false" type="file" accept="" capture="microphone">
                <div class="iconfont icon-bofang1">
                    <img :src="videoPicture" alt="">
                </div>
                <video v-show="false" ref="video" @loadeddata="loadVideo" :src="getUrl(videoFile)"></video>
            </div>
            <div class="content-box" style="border-bottom: 1px solid #ddd;">
                <x-textarea v-model="content" class="title-textarea" :rows="3" :autosize="true" placeholder="写点儿东西"></x-textarea>
            </div>
            <div class="creative-box">
                <p>
                    <span @click="reprintString='0'">
                        <x-icon v-if="reprintString == '0'" class="active creative-type" type="ios-circle-filled" size="24"></x-icon>
                        <x-icon v-if="reprintString != '0'" class="creative-type" type="ios-circle-outline" size="24"></x-icon> 
                        原创
                    </span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span @click="reprintString='1'">
                        <x-icon v-if="reprintString == '1'" class="active creative-type" type="ios-circle-filled" size="24"></x-icon>
                        <x-icon v-if="reprintString != '1'" class="creative-type" type="ios-circle-outline" size="24"></x-icon> 
                        转载
                    </span>
                </p>
                <div v-show="reprintString=='1'" class="reprint-box">
                    <!-- <x-textarea class="reprint-input" v-model="reprintSource" :height="20" :rows='1' :autosize="true" placeholder="请注明来源网站或原作者"></x-textarea> -->
                    <x-input class="reprint-input" v-model="reprintSource" :show-clear='false' placeholder="请注明来源网站或原作者"></x-input>
                </div>
            </div>
        </div>

        <div class="footer">
            <div>
                <div class="tag-content">
                    <div slot="content" class="tagBox" v-show="tagIndex == 1">
                        <img src="/static/mood1.png" alt="" @click="mood = '1'">
                        <img src="/static/mood2.png" alt="" @click="mood = '2'">
                        <img src="/static/mood3.png" alt="" @click="mood = '3'">
                        <img src="/static/mood4.png" alt="" @click="mood = '4'">
                        <img src="/static/mood5.png" alt="" @click="mood = '5'">
                        <img src="/static/mood6.png" alt="" @click="mood = '6'">
                    </div>
                    <div slot="content" class="tagBox" v-show="tagIndex == 2">
                        <img src="/static/weather1.png" alt="" @click="weather = '1'">
                        <img src="/static/weather2.png" alt="" @click="weather = '2'">
                        <img src="/static/weather3.png" alt="" @click="weather = '3'">
                        <img src="/static/weather4.png" alt="" @click="weather = '4'">
                        <img src="/static/weather5.png" alt="" @click="weather = '5'">
                        <img src="/static/weather6.png" alt="" @click="weather = '6'">
                    </div>
                    <div slot="content" class="tagBox" v-show="tagIndex == 3">
                        <img src="/static/scene1.png" alt="" @click="scene = '1'">
                        <img src="/static/scene2.png" alt="" @click="scene = '2'">
                        <img src="/static/scene3.png" alt="" @click="scene = '3'">
                        <img src="/static/scene4.png" alt="" @click="scene = '4'">
                        <img src="/static/scene5.png" alt="" @click="scene = '5'">
                        <img src="/static/scene6.png" alt="" @click="scene = '6'">
                    </div>
                    <a @click.stop="tagIndex = 1"><span v-if="mood == '0'"> 心情 </span><img v-if="mood != '0'" :src="'/static/mood' + mood + '.png'" alt=""></a>|
                    <a @click.stop="tagIndex = 2"><span v-if="weather == '0'"> 天气 </span><img v-if="weather != '0'" :src="'/static/weather' + weather + '.png'" alt=""></a>|
                    <a @click.stop="tagIndex = 3"><span v-if="scene == '0'"> 场景 </span><img v-if="scene != '0'" :src="'/static/scene' + scene + '.png'" alt=""></a>
                </div>
            </div>
            <div>
                <span @click="geolocation" v-show="!position" class="text-base"><i class="iconfont icon-dingwei"></i>你在哪里</span>
                <span v-show="position"><i class="iconfont icon-dingwei"></i>{{position}}</span>
                <popover placement="top" class="fr" :gutter='0'>
                    <div slot="content" class="search-tab-items">
                        <p v-show="index != searchIndex" :class="index == searchIndex?'active': ''" v-for="(item, index) in searchTabs" :key="index" @click="searchChoose(index)">{{searchTabs[index]}}</p>
                    </div>
                    <span class="tab fr"><i class="iconfont icon-diqiu"></i>{{searchTabs[searchIndex]}}</span>
                </popover>
            </div>
        </div> 
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, XTextarea, XInput, Popup, Popover } from 'vux'
    import jsonp from 'jsonp'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
            XTextarea,
            XInput,
            Popup,
            Popover,
        },
        data () {
            return {
                title: '',
                content: '',
                reprintString: '',              //创作类型
                reprintSource: '',              //..转载说明
                videoPicture: '',               //..视频缩略图
                videoFile: '',                  //  视频文件流

                //  定位
                options : {timeout: 8000},          //  定位超时
                position: '',                        //  地址
                tagIndex: 0,                        //  选择标签分类
                mood: '0',                            //  心情
                weather: '0',                         //  天气
                scene:'0',                           //  场景
                longitude: '',                      //  经度
                latitude: '',                       //  维度
                searchTabs: ['公开', '塔圈', '自己'],
                showSearch: false,  //  公开选项弹框
                searchIndex: 0,     //  公开选项
            }
        },
        activated(){
            this.title = ''
            this.content = ''
            this.reprintString = ''
            this.reprintSource = ''

            //  调起摄像机拍摄
            this.$refs.uploadVideo.click()
        },
        deactivated(){
            this.$store.state.showPicture = false
        },
        methods: {
            //  打开拍摄
            openShooting(){
                window.android.video()
            },
            //  将文件流转化为url
            getUrl(file){
                return file ? URL.createObjectURL(file) : null
            },
            //  播放视频
            playVideo(){
                let videoUrl = this.getUrl(this.videoFile)
                this.openVideo(videoUrl, this.videoImg)
            },
            // 上传拍摄
            uploadVideo(e){
                let files = e.target.files
                var that = this
                if(files[0].type.indexOf("image") != -1){
                    canvasDataURL(this.getUrl(files[0]), 0, {}, (baseUrl, m) => {
                        that.files.push(baseUrl)
                    })
                }else{
                    this.videoFile = files[0];
                }
                e.target.value = ''
            },
            //  视频加载生成缩略图
            loadVideo(){
                let canvas = document.createElement("canvas")
                let video = this.$refs.video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                let canvasFill = canvas.getContext('2d');
                canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
                this.videoPicture = canvas.toDataURL("image/jpeg")
            },


            //  返回
            goBack(){
                this.$router.go(-1)
            },
            updateData(e = ''){  
                this.content = e;  
            },
            //  发布视频
            publish(){
                let content = this.content.replace(/ /g, "&nbsp;&nbsp;");
                if(!this.title.trim()){
                    this.toastFail('请输入标题', "200px")
                    return
                }
                if(!this.content.trim()){
                    this.toastFail('请输入内容2', "200px")
                    return
                }
                let params = new FormData()
                let contentType = 0
                params.append('content', content)
                params.append('title', this.title)
                params.append('title', this.title)
                params.append('title', this.title)
                params.append('contentStatus ', 0)
                params.append('contentType', 6)
                this.$vux.loading.show({
                    text: '发布中...'
                })
                console.log(this.content)
                this.$post("upload", params, (data) => {
                    this.toastSuccess("上传成功")
                    this.$router.go(-1)
                })
                    
            },
            publishText(){
                if(this.videoFile){
                    if(this.reprintString == '1' && !this.reprintSource){
                        this.toastFail('请输入转载来源', "200px")
                        return
                    }
                    if(this.reprintString == '0'){
                        this.reprintSource = ''
                    }
                    let params = new FormData()
                    params.append('video', this.videoFile)
                    params.append('video_img', this.videoPicture)
                    let content = this.textarea.replace(/ /g, "&nbsp;&nbsp;");
                    params.append('content', content)
                    params.append('contentType', 2)
                    params.append('reprintString', this.reprintString)
                    params.append('reprintSource', this.reprintSource)
                    params.append('contentStatus ', this.searchIndex)
                    // params.append('dribKindName', this.className)
                    params.append('mood', this.mood)
                    params.append('weather', this.weather)
                    params.append('scene', this.scene)
                    params.append('position', this.position)
                    params.append('longitude', this.longitude)
                    params.append('latitude', this.latitude)
                    this.$vux.loading.show({
                        text: '发布中...'
                    })
                    this.$post("upload", params, (data) => {
                        this.toastSuccess("上传成功")
                        this.$router.go(-1)
                    })
                }else{
                    this.toastFail('请上传视频', "200px")
                }
            },


        /***************************************获取定位*********************************** */
            geolocation(){
                // this.$vux.loading.show({
                //     text: '定位中...'
                // })
                var geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp")
                geolocation.getLocation(this.showPosition, this.showErr, this.options)
            },
            showPosition(position) {
                this.longitude = position.lng
                this.latitude = position.lat
                var latlon = position.lat + "," + position.lng;
            
                //  百度地图定位
                var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";
                jsonp(url, null, (err, data) => {
                    this.$vux.loading.hide()
                    if(err){
                        this.toastFail('网络异常，请稍后再试', '200px')
                    }else{
                        let addressComponent = data.result.addressComponent
                        // this.position = addressComponent.province + addressComponent.city
                        this.position = addressComponent.city
                        // this.position = addressComponent.province + addressComponent.city + addressComponent.district
                    }
                })
            },
            showErr(){
                this.toastFail("定位失败")
            },
        /********************公开类型************************ */
            //  选择公开类型
            searchChoose(val){
                this.searchIndex = val
            },
        },
    }
    function canvasDataURL(path, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.1; 
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);
        }
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        .publish-video{
            border-bottom: 1px solid #ddd;
            padding: 10px 6px;
            overflow: hidden;
            >div{
                float: left;
                position: relative;
                width: 50%;
                border-radius: 6px;
                img{
                    display: block;
                    width: 100%;
                }
                &:before{
                    position: absolute;
                    font-size: 40px;
                    color: #0090ff;
                    top: 50%;
                    left: 50%;
                    margin-top: -32px;
                    margin-left: -20px;
                }
            }
        }
        .cell{
            font-size: 14px;
            padding: 12px 15px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                float: left;
                margin: 20px 10px 20px 0;
            }
            .title{
                line-height: 26px;
            }
            i{
                font-size: 20px;
                vertical-align: middle;
                margin-right: 10px;
            }
            &:before{
                left: 0;
            }
        }
        .cover{
            border: 1px dashed #ddd;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 16px;
            color: #ccc;
        }
        .thumbnail{
            padding: 15px;
            width: 100%;
            height: 100px;
            border: none;
            box-sizing: border-box;
            float: none;
        }
        .h200{
            height: 200px;
        }
        
        //  原创、转载
        .creative-box{
            border-bottom: 1px solid #ddd;
            .creative-type{
                fill: #ccc;
                vertical-align: bottom;
                &.active{
                    fill: @baseColor;
                }
            }
            >p{
                padding: 6px 10px;
            }
            .reprint-box{
                padding: 0 6px;
                .reprint-input{
                    border: 1px solid #ddd;
                    padding: 4px 6px;
                    border-radius: 4px;
                    margin-bottom: 6px;
                }
            }
        }
    }
</style>
<style lang="less">
    .publish-title{
        .title-textarea{
            padding: 6px 10px;
        }
        textarea{
            font-weight: bold;  
            &::-webkit-input-placeholder { /* WebKit browsers */ 
                color: #999; 
            } 
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        z-index: 2;
        width: 100%;
        >div{
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
        }
        >p{
            background: #f6f6f6;
            color: #ccc;
            height: 50px;
            line-height: 50px;
            // .upload-box{

            // }
            i{
                margin-left: 20px;
                font-size: 28px;
            }
        }
        .tag-content{
            position: relative;
            .tagBox{
                position: absolute;
                top: -40px;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
            a{
                img{
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
            }
        }
    }
    .tab{
        width: 68px;
        background: #f6f6f6;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        text-align: center;
        border-radius: 14px;
        margin-top: 5px;
        i{
            font-size: 18px;
            line-height: 18px;
            vertical-align: text-bottom;
            color: @baseColor;
            margin-right: 4px;
        }
    }
    .search-tab-items{
        width: 48px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        text-align: center;
        color: #777;
        p{
            line-height: 24px;
            &:not(:last-of-type){
                border-bottom: 1px solid #ddd;
            }
            &.active{
                color: @baseColor;
            }
        }
    }
    .choose-class{
        padding-top: 46px;
        background: #f2f2f2;
        .btn-add{
            height: 46px;
            margin: 10px 0;
            background: #fff;
            padding-left: 10px;
            line-height: 46px;
            i{
                font-size: 20px;
                vertical-align: middle;
                color: #ccc;
            }
            a{
                color: @baseColor;
                font-size: 14px;
            }
        }
    }

    .source-box{
        font-size: 14px;
        .source-type{
            display: flex;
            >div{
                flex: 1;
                text-align: center;
                line-height: 30px;
                padding-top: 10px;
                .source-type-circle{
                    width: 16px;
                    height: 16px;
                    border: 1px solid #ddd;
                    display: inline-block;
                    border-radius: 50%;
                    vertical-align: text-bottom;
                    margin-right: 6px;
                    &.active{
                        background: @baseColor;
                        border-color: @baseColor;
                    }
                }
            }
        }
        a{
            margin: 20px 10px;
        }
    }
</style>



