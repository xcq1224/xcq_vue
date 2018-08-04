<template>
    <div class="page">
        <div class="main">
            <p @click="show1=true">啥飞机撒附件阿克苏</p>
        </div>
        <popup v-model="showPictureViewer" class="pictureviewer" height="100%" @on-show="showPop1">
            <a class="iconfont icon-tainjia-copy close"></a>
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
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Popup } from 'vux'
    export default {
        data() {
            return {
                pictureList: [],
                show1: false,
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                    zoom: {
                        toggle: false,
                    },
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            Popup,
        },
        // you can find current swiper instance object like this, while the notNextTick property value must be true
        // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
        // computed: {
        //     swiper() {
        //         return this.$refs.mySwiper.swiper
        //     }
        // },
        activated(){
            this.pictureList = ['https://surmon-china.github.io/vue-awesome-swiper/static/images/surmon-6.jpg',
                                'https://surmon-china.github.io/vue-awesome-swiper/static/images/surmon-1.jpg',
                                'https://surmon-china.github.io/vue-awesome-swiper/static/images/surmon-3.jpg']
        },
        methods: {
            showPop1(){
                this.$refs.mySwiper.swiper.slideTo(1)
            }
        }
    }
</script>
