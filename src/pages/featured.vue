<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">小课</x-header>
        <div class="main">
            <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore(0)"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh(0)"
                lock-x ref="scrollerBottom0" height="100%">
                <div v-show="isEmpty0">
                    <div class="chosen-card" @click="toDetail(item.towerContentId, 3)" v-for="(item, index) in skillList0" :key="index">
                        <img :src="item.videoImg || item.imgUrls[0]">
                        <p class="title">{{item.title}}</p>
                        <p>{{item.name}}</p>
                        <p><span class="num">{{item.learnNum}}</span>人在学<span class="sprice"></span></p>
                    </div>
                </div>
                <div v-show="!isEmpty0">
                    <div style="text-align: center;">暂无数据</div>
                </div>
            </scroller>
        </div>
        <!-- 筛选 -->
        <div v-show="popup1" class="filter-wrap" @click="popup1 = false">
            <div class="filter">
                <p>
                    <span :class="item.skillCategoryId == skillCategoryId ? 'text-base' : ''" @click="filterSkillList(item.skillCategoryId)" v-for="(item, index) in skillCategorys" :key="index">{{item.skillCategoryName}}</span>&nbsp;
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller} from 'vux'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    const pulldownDefaultConfig = {
        content: '下拉刷新',
        height: 40,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放后刷新',
        loadingContent: '正在刷新...',
        clsPrefix: 'xs-plugin-pulldown-'
    }
    const pullupDefaultConfig = {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
    }
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
            // Swiper,
            // SwiperItem,
            Scroller,
            swiper, 
            swiperSlide,
        },
        data () {
            return {
                //  精选
                skillType: 0,          //   技能类型
                pageNum0: 1,            //  小课页数
                pageNum1: 1,            //  服务页数
                pageNum2: 1,            //  需求页数
                barsNum: 10,            //  每页10条
                skillList0: [],              //  小课列表
                skillList1: [],              //  服务列表
                skillList2: [],              //  需求列表
                isEmpty0: 1,                //  列表1是否显示空
                isEmpty1: 1,                //  列表2是否显示空
                isEmpty2: 1,                //  列表3是否显示空

                //  刷新、加载
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,

                popup1: false,
                skillCategorys: [],
                skillCategoryId: '',
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.$refs.scrollerBottom0.reset({top: 0})
            })
            this.getSkillList(0,0)
        },
        activated(){
            
        },
        methods: {
            //  筛选
            filterSkillList(skillCategoryId){
                this.skillCategoryId = skillCategoryId
                this.refresh(1)
            },
            //  切换tab
            changeTab(){
                this.skillType = this.$refs.mySwiper.swiper.activeIndex
            },
            getSkillList(skillType, pageNum, skillCategoryId){
                let params = new FormData()
                params.append("skillType", skillType)
                params.append("pageNum", pageNum)
                params.append("barsNum", this.barsNum.toString())
                if(skillType == 1 && skillCategoryId){
                    params.append("skillCategoryId", skillCategoryId)
                }
                this.$post("getskilllist", params, (data) => {
                    this['skillList' + skillType] = this['skillList' + skillType].concat(data.skillList)
                    this['isEmpty' + skillType] = this['skillList' + skillType].length
                    if(data.skillList.length == this.barsNum){
                        this['pageNum' + skillType]++
                        this.$refs['scrollerBottom' + skillType].donePullup()
                    }else{
                        this.$refs['scrollerBottom' + skillType].disablePullup()
                    }
                })
            },
            //  确认订单
            goPay(id, type){
                // this.$router.push("./confirm_order?id=" + id)
                this.$router.push("./detail?id=" + id + "&type=" + type)
            }, 
            //  切换tab
            slideTo(index){
                if(this.skillType == 1 && index == 1){
                    this.popup1 = true
                }
                this.skillType = index
                this.$refs.mySwiper.swiper.slideTo(index)
            },

            getSkillCategorys(){
                let params = new FormData()
                this.$post("getskillcategory", params, (data) => {
                    this.skillCategorys = data.skillCategorys
                })
            },

            //  加载数据
            fetchData(cb) {
                var that = this
                setTimeout(function(){
                    that.$nextTick(() => {
                        that.$refs['scrollerBottom' + that.skillType].reset()
                    })
                    cb()
                }, 200)
            },
            //  下拉刷新
            refresh(type) {
                this.fetchData(data => {
                    this['pageNum' + type] = 0
                    this.$refs['scrollerBottom' + type].donePulldown()
                    let params = new FormData()
                    params.append("skillType", type)
                    if(type == 1 && this.skillCategoryId){
                        params.append("skillCategoryId", this.skillCategoryId)
                    }
                    params.append("pageNum", 1)
                    params.append("barsNum", this.barsNum.toString())
                    this.$post("getskilllist", params, (data) => {
                        this['skillList' + type] = data.skillList
                        this['isEmpty' + type] = data.skillList.length
                        if(data.skillList.length == this.barsNum){
                            this['pageNum' + type] = 2
                            this.$refs['scrollerBottom' + type].donePullup()
                            this.$refs['scrollerBottom' + type].enablePullup()
                        }else{
                            this.$refs['scrollerBottom' + type].disablePullup()
                        }
                    })
                })
            },
            //  加载首页数据
            loadMore(type) {
                this.fetchData(() => {
                    this.getSkillList(type, this['pageNum' + type], this.skillCategoryId)
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
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
    }
    .main{
        padding-top: 46px;
        background: #f2f2f2;
        font-size: 12px;
        .vux-slider{
            height: 100%;
        }
    }
    .chosen-card{
        padding: 12px 8px 8px;
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
                font-size: 14px;
                line-height: 18px;
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
    .filter-wrap{
        position: absolute;
        top: 0px;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        .filter{
            background: #fff;
            margin-top: 90px;
            padding-bottom: 20px;
            p{
                padding: 15px 15px 0;
                span{
                    padding: 0 5px;
                }
            }
        }
    }
</style>

