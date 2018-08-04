<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{showBack: false}">我的点滴
            <!-- <router-link to="./bit_manage" slot="right"><i style="font-size: 24px;" class="iconfont icon-icon-"></i></router-link> -->
            <a slot="right" @click="show1=true"><i style="font-size: 24px;" class="iconfont icon-icon-"></i></a>
        </x-header>
        <div class="main">
            <scroller v-show="n>5" lock-y :scrollbar-x=false>
                <div class="box1" :style="'width: '+ 22*n +'vw;'">
                    <div class="ability-item" v-for="i in n" :key="i">
                        <p>实践经验</p>
                        <p class="num">100</p>
                    </div>
                </div>
            </scroller>
            <div v-show="n>1 & n<6" class="ability">
                <div class="ability-item" v-for="i in n" :style="'width: '+100/n+'%;'" :key="i">
                    <p>实践经验</p>
                    <p class="num">100</p>
                </div>
            </div>
            <div class="bit-title">点滴动态</div>
            <router-link to="./bit_detail" class="card">
                <div class="title">职场第一课，你应该知道哪些道理？职场第一课，你应该知道哪些道理？职场第一课，你应该知道哪些道理？</div>
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
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </router-link>
            <div class="card">
                <div class="title">职场第一课，你应该知道哪些道理？职场第一课，你应该知道哪些道理？职场第一课，你应该知道哪些道理？</div>
                <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </div>
        </div>
        <!--分类管理-->
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header class="pst">
                    分类管理
                    <a slot="overwrite-left" @click="show1=false">取消</a>
                    <a slot="right" @click="show1=false">完成</a>
                </x-header>
                <div class="main">
                    <div class="btn-add" @click="addClass">
                        <i class="iconfont icon-tainjia"></i>
                        <a>新增分类</a>
                    </div>
                    <ul class="items">
                        <li class="list-item " v-for="(item,index) in list" data-type="0" :key="index">
                            <div class="list-box" :index="index" @touchstart.capture="touchStart" @touchmove.capture='touchMove' @touchend.capture="touchEnd" @click="skip">{{item}}</div>
                            <!-- <div class="handle" @click="deleteItem(index)" :data-index="index">删除</div> -->
                            <div class="handle">
                                <div class="edit" @click="editItem(index)">编辑</div>
                                <div class="delete" @click="deleteItem(index)">删除</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </popup>
        <!--添加分类-->
        <popup v-model="show2" height="100%" @on-hide="addText=''">
            <div class="popup2">
                <x-header class="pst">
                    新建分类
                    <a slot="overwrite-left" @click="show2 = false">取消</a>
                    <a slot="right" @click="addSubmit">完成</a>
                </x-header> 
                <group gutter='0' title="新的分类">
                    <x-input ref="addInput" v-model="addText" placeholder="请输入分类名"></x-input>
                </group>
            </div>
        </popup>
        <!--编辑分类-->
        <popup v-model="show3" height="100%">
            <div class="popup3">
                <x-header class="pst">
                    编辑
                    <a slot="overwrite-left" @click="show3 = false">取消</a>
                    <a slot="right" @click="editSubmit">完成</a>
                </x-header> 
                <group gutter='0'>
                    <x-input ref="editInput" placeholder="请输入分类名" v-model="editText"></x-input>
                </group>
            </div>
        </popup>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Scroller, Popup, Group, XInput } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import { setTimeout } from 'timers';

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
            Scroller,
            Popup,
            Group,
            XInput,
        },
        data () {
            return {
                tab: 0,
                n: 7,
                show1: false,   //  分类管理窗口
                show2: false,   //  添加分类窗口
                show3: false,   //  编辑分类窗口

                list : ['技能才艺', 'AAAAA', 'BBBBBB', 'CCCCCC'],
                startX : 0 ,
                endX : 0 ,
                editText: '',
                addText: '',
                index: 0,
            }
        },
        activated(){
            let that = this
            let params = new FormData()
            this.$post('getdrib', params, (data)=>{
                console.log(data)
            })
        },
        methods: {
            skip(){
                if( this.checkSlide() ){
                    this.restSlide();
                }else{
                }
            },
            //滑动开始
            touchStart(e){
                // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            //滑动中
            touchMove(e){
                // 滑动距离
                let parentElement = e.currentTarget.parentElement;
                let s = e.touches[0].clientX - this.startX;
                if(parentElement.dataset.type == 0 & s<0){
                    s = s<-120?-120:s
                    parentElement.setAttribute('style', 'transform: translate3d(' + s + 'px,0,0)')
                }
                if(parentElement.dataset.type == 1 & s>0){
                    s = s>120?0:s-120
                    parentElement.setAttribute('style', 'transform: translate3d(' + s + 'px,0,0)')
                }
            },
            //滑动结束
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
                    this.restSlide();
                    parentElement.setAttribute('style', 'transform: translate3d(-120px,0,0)')
                    parentElement.dataset.type = 1
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
                    this.restSlide();
                    parentElement.setAttribute('style', 'transform: translate3d(0,0,0)')
                    parentElement.dataset.type = 0
                }
                this.startX = 0;
                this.endX = 0;
            },
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
                let listItems = document.querySelectorAll('.list-item');
                for( let i = 0 ; i < listItems.length ; i++){
                    if( listItems[i].dataset.type == 1 ) {
                        return true;
                    }
                }
                return false;
            },
            //复位滑动状态
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].setAttribute('style', 'transform: translate3d(0,0,0)')
                    listItems[i].dataset.type = 0
                }
            },
            addClass(){
                this.show2 = true
                let that = this
                setTimeout(function(){
                    that.$refs.addInput.focus()
                },200)
            },
            //编辑
            editItem(index){
                this.restSlide();
                this.show3 = true
                this.editText = this.list[index]
                this.index = index
            },
            //删除
            deleteItem(index){
                let that = this
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '确定要删除吗?',
                    onCancel () {that.restSlide();},
                    onConfirm () {
                        that.restSlide();
                        that.list.splice(index,1);
                    }
                })
            },
            //  新增分类确定
            addSubmit(){
                this.list.push(this.addText)
                this.show2 = false
                this.addText = ''    
            },
            //  编辑分类确定
            editSubmit(){
                this.show3 = false
                this.list[this.index] = this.editText
            },
            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 0 60px;
        background: #f2f2f2;
        font-size: 12px;
        .bit-title{
          position: relative;
          background: #fff;
          color: @baseColor;
          padding-left: 20px;
          padding-top: 5px;
          line-height: 24px;
          &:before{
            content: '';
            display: block;
            width: 4px;
            height: 18px;
            background: @baseColor; 
            position: absolute;
            left: 10px;
          }
        }
        .box1 {
            height: 50px;
            position: relative;
            background: #fff;
            overflow: hidden;
            text-align: center;
            line-height: 24px;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
            .ability-item{
                float: left;
                width: 80px;
                .num{
                    font-weight: bold;
                }
            }
        }
        .ability{
            background: #fff;
            overflow: hidden;
            text-align: center;
            line-height: 24px;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
            .ability-item{
                float: left;
                width: 22vw;
                .num{
                    font-weight: bold;
                }
            }
        }
        .card{
            padding: 10px 10px 3px;
            background: #fff;
            margin-bottom: 1px;
            color: #777;
            display: block;
            video{
                width: 100%;
                height: auto;
            }
            .img-box{
                overflow: hidden;
                margin-bottom: 5px;
                img{
                    width: 25%;
                    height: auto;
                    float: left;
                }
            }
            .title{
                font-weight: bold;
                margin: 5px 0 7px 10px;
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
        .teaching-card{
            padding: 5px 10px 3px;
            background: #fff;
            margin-bottom: 1px;
            color: #777;
            img{
                width: 100%;
                height: auto;
                margin-bottom: 10px;
            }
            .title{
                font-weight: bold;
                margin: 5px 0;
                font-size: 14px;
            }
            .desc{
                color: #ccc;
                margin-bottom: 5px;
                .num{
                    color: #777;
                }
            }
            .handle{
                color: #ccc;
                .price{
                    color: #f00;
                    float: right;
                    font-weight: bold;
                }
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
    }
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
    .items{
        overflow: hidden;
        .list-item{
            position: relative;
            height: 46px;
            line-height: 46px;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            border-bottom: 1px solid #ddd;
            .list-box{
                padding: 0 10px;
                background: #fff;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
            .handle{
                width: 120px;
                color: #fff;
                text-align: center;
                position: absolute;
                top:0;
                right: -120px;
                display: flex;
                .edit{
                    flex: 1;
                    background: #fbce77;
                }
                .delete{
                    flex: 1;
                    background: #ccc;
                }
            }
        }
    }
    .weui-cell{
        font-size: 14px;
    }
</style>

