<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}"><span @click="showPopupPicker=true">我的订单<i class="iconfont icon-xia"></i></span></x-header>
        <div class="main">
            <tab :line-width=2 custom-bar-width="70%" v-model="index">
                <tab-item class="vux-center" :selected="index == 0" @click="index = 0">全部</tab-item>
                <tab-item class="vux-center" :selected="index == 1" @click="index = 1">待支付</tab-item>
                <tab-item class="vux-center" :selected="index == 2" @click="index = 2">交易成功</tab-item>
                <tab-item class="vux-center" :selected="index == 3" @click="index = 3">交易关闭</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false" height="100%">
                <swiper-item>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程课程</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span class="text-red">待支付</span>
                            <span class="btn btn-pay">立即支付</span>
                            <span class="btn btn-cancel">取消订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>关闭交易</span>
                            <span class="btn btn-del">删除订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>交易成功</span>
                            <span class="btn btn-del">进入听课</span>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程课程</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span class="text-red">待支付</span>
                            <span class="btn btn-pay">立即支付</span>
                            <span class="btn btn-cancel">取消订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>关闭交易</span>
                            <span class="btn btn-del">删除订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>交易成功</span>
                            <span class="btn btn-del">进入听课</span>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程课程</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span class="text-red">待支付</span>
                            <span class="btn btn-pay">立即支付</span>
                            <span class="btn btn-cancel">取消订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>关闭交易</span>
                            <span class="btn btn-del">删除订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>交易成功</span>
                            <span class="btn btn-del">进入听课</span>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程课程</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span class="text-red">待支付</span>
                            <span class="btn btn-pay">立即支付</span>
                            <span class="btn btn-cancel">取消订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>关闭交易</span>
                            <span class="btn btn-del">删除订单</span>
                        </div>
                    </div>
                    <div class="order-item">
                        <div class="item-body">
                            <img src="../assets/avatar.jpg" alt="">
                            <p class="text-333">机器人编程技能</p>
                            <p><span class="font12">2018-05-22 18:08</span><span class="fr">￥30.00</span></p>
                        </div>
                        <div class="item-footer">
                            <span>交易成功</span>
                            <span class="btn btn-del">进入听课</span>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
        </div>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker" @on-change="pickerChange" :show-cell="false" :data="list1" v-model="value1"></popup-picker>
    </div>
</template>

<script>
    import { XHeader } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, PopupPicker } from 'vux'
    const list = () => ['热门', '精选', '达人', '干货']
    export default {
        components: {
            XHeader,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            PopupPicker,
        },
        data () {
            return {
                //  tab
                index: 0,
                showPopupPicker: false,
                value1: ['全部订单'],
                list1: [['全部订单', '技能学习', '技能变现']]
            }
        },
        activated(){
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
           pickerChange(val){
               console.log(val)
           }
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        background: #f7f7f7;
        overflow: hidden;
        .vux-tab-wrap{
            z-index: 2;
        }
        .vux-slider{
            height: 100%;
            top: -44px;
            padding-top: 44px;
            box-sizing: border-box;
            z-index: 1;
            .vux-swiper-item{
                height: 100%;
                overflow: auto;
            }
        }
    }
    .order-item{
        margin-bottom: 10px;
        background: #fff;
        .item-body{
            padding: 8px 10px 4px;
            border-bottom: 1px solid #ddd;
        }
        img{
            width: 48px;
            height: 40px;
            margin-right: 5px;
            float: left;
        }
        .item-footer{
            padding: 6px 10px 6px;
            font-size: 12px;
            border-bottom: 1px solid #ddd;
            line-height: 24px;
            .btn{
                float: right;
                margin-left: 8px;
                width: 60px;
                height: 22px;
                border-radius: 4px;
                text-align: center;
                line-height: 22px;
                border: 1px solid #ddd;
            }
            .btn-pay{
                border-color: #f00;
                color: #f00;
            }
        }
        
    }
</style>

