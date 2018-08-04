<template>
  <div class="page">
    <x-header class="pst" :left-options="{backText: ''}">滑动组件</x-header>
    <div class="main">
        <ul>
            <li class="list-item " v-for="(item,index) in list " data-type="0" :key="index">
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
</template>


<script>
    import { XHeader } from 'vux'

    export default {
        components: {
            XHeader,
        },
        data () {
            return {
                list : ['Chrome更新了', '电影新资讯', '聚焦两会·共筑中国梦', '微信团队'],
                startX : 0 ,
                endX : 0 ,
            }
        },
        methods: {
            skip(){
                if( this.checkSlide() ){
                    this.restSlide();
                }else{
                    ap.getLocation(function(res) {
                        console.log(3)
                    });
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
            //编辑
            editItem(index){
                this.restSlide();
                console.log('编辑')
            },
            //删除
            deleteItem(index){
                this.restSlide();
                this.list.splice(index,1);
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseColor: #b5e1fe;
    .main{
        padding-top: 46px;
        ul{
            overflow: hidden;
        }
    }
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
                background: #b5e1fe;
            }
            .delete{
                flex: 1;
                background: #f00;
            }
        }
    }
</style>
