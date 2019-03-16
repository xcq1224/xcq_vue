<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{showBack: false}">我的点滴</x-header>
        <div class="main">
            <scroller lock-y :scrollbar-x=false>
                <div class="box1">
                    <div class="ability-item">
                        <p @click="popup8 = true">分类</p>
                    </div>
                    <div class="ability-item">
                        <p @click="popup9 = true">时间</p>
                    </div>
                    <div class="ability-item">
                        <p @click="popup10 = true">城市</p>
                    </div>
                    <div class="ability-item">
                        <p @click="popup5 = true">心情</p>
                    </div>
                    <div class="ability-item">
                        <p @click="popup6 = true">天气</p>
                    </div>
                    <div class="ability-item">
                        <p @click="popup7 = true">场景</p>
                    </div>
                    <div class="ability-item">
                        <p>足迹</p>
                    </div>
                </div>
            </scroller>
            <scroller v-show="!isEmpty" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
                lock-x ref="scrollerBottom" height="-142" @on-scroll="onScroll">
                <div class="scroll-box">
                    <div class="hot-card" v-if="!dribKindId && !filterFiled">
                        <div class="thumbnail" :style="{backgroundImage: 'url(' + cardUrls[0] + ')' }" style="margin-right: 5px;"></div>
                        <div class="bit-content" style="text-align: left;">
                            <p class="bit-time">我的名片</p>
                            <p class="bit-address">&nbsp;</p>
                            <p class="" v-for="(item, index) in label" :key="index">{{item}}</p>
                        </div>
                    </div>
                    <div v-else-if="!contentShowList.length" style="text-align: center; line-height: 40px;">没有找到任何记录！</div>
                    <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentShowList" :key="index">
                        <div v-if="item.imgUrls.length" class="thumbnail" :style="{backgroundImage: 'url(' + item.imgUrls[0] + ')' }"></div>
                        <div v-if="item.videoImg" class="thumbnail bit-video iconfont icon-bofang1" :style="{backgroundImage: 'url(' + item.videoImg + ')' }"></div>
                        <div class="bit-content">
                            <p class="bit-time">{{formatDate(item.createDate, 'yyyy.MM.dd')}}</p>
                            <p class="bit-address">{{item.position || '&nbsp;'}}</p>
                            <p class="content-text text-ellipsis2" style="word-break: break-all;-webkit-line-clamp: 3;">{{item.content}}</p>
                            <p class="bit-card-ft">
                                <img v-if="item.mood != '0' && item.mood" :src="'/static/mood' + item.mood + '.png'" width="16"/>
                                <img v-if="item.weather != '0' && item.weather" :src="'/static/weather' + item.weather + '.png'" width="16"/>
                                <img v-if="item.scene != '0' && item.scene" :src="'/static/scene' + item.scene + '.png'" width="16"/>
                            </p>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <!--编辑默认分类描述-->
        <popup v-model="popup0" height="100%"  @on-show="showPopup0">
            <x-header class="pst">
                {{dribKindName}}
                <a slot="overwrite-left" @click="popup0 = false">取消</a>
                <a slot="right" @click="savePopup0">保存</a>
            </x-header>
            <x-textarea :height="140" class="textarea" v-model="dribKindDetail" ref="textarea" placeholder="请输入描述" style="background: #fff;"></x-textarea>
        </popup>
        <!--分类管理-->
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header class="pst">
                    分类管理
                    <a slot="overwrite-left" @click="show1=false">取消</a>
                    <a slot="right" @click="show1=false">完成</a>
                </x-header>
                <div class="main" style="padding-bottom: 0;">
                    <div class="btn-add" @click="addClass">
                        <i class="iconfont icon-tainjia"></i>
                        <a>新增分类</a>
                    </div>
                    <ul class="items">
                        <li class="list-item" v-if="item.dribKindType == 1" v-for="(item,index) in dribKindList" data-type="0" :key="index">
                            <div class="list-box" :index="index" @touchstart.capture="touchStart" @touchmove.capture='touchMove' @touchend.capture="touchEnd" @click="skip">{{item.dribKindName}}</div>
                            <!-- <div class="handle" @click="deleteItem(index)" :data-index="index">删除</div> -->
                            <div class="handle">
                                <div class="edit" @click="editItem(index)">编辑</div>
                                <div class="delete" @click="deleteItem(item.dribKindId,index)">删除</div>
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
                    <x-input ref="addInput" v-model="addText" placeholder="请输入分类名(2-6字符)"></x-input>
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
                <group gutter='20'>
                    <x-textarea :height="140" class="textarea" v-model="editDesc" ref="textarea" placeholder="请输入描述" style="background: #fff;"></x-textarea>
                </group>
            </div>
        </popup>
        <!-- 选择分类 -->
        <popup v-model="popup4" height="" style="background: #fbf9fe;">
            <group gutter='0'>
                <radio :selected-label-style="{color: '#008ab1'}" :options="kinds" v-model="kind" @on-change="modifydribkind"></radio>
            </group>
        </popup>
        <!-- 筛选 -->
        <div v-show="popup5" class="filter-wrap" @click="popup5 = false">
            <div class="filter" style="background: #24ceff;">
                <p>
                    <img src="/static/mood1.png" alt="" @click="filter('mood', '1')">
                    <img src="/static/mood2.png" alt="" @click="filter('mood', '2')">
                    <img src="/static/mood3.png" alt="" @click="filter('mood', '3')">
                    <img src="/static/mood4.png" alt="" @click="filter('mood', '4')">
                    <img src="/static/mood5.png" alt="" @click="filter('mood', '5')">
                    <img src="/static/mood6.png" alt="" @click="filter('mood', '6')">
                </p>
            </div>
        </div>
        <div v-show="popup6" class="filter-wrap" @click="popup6 = false">
            <div class="filter" style="background: #24ceff;">
                <p>
                    <img src="/static/weather1.png" alt="" @click="filter('weather', '1')">
                    <img src="/static/weather2.png" alt="" @click="filter('weather', '2')">
                    <img src="/static/weather3.png" alt="" @click="filter('weather', '3')">
                    <img src="/static/weather4.png" alt="" @click="filter('weather', '4')">
                    <img src="/static/weather5.png" alt="" @click="filter('weather', '5')">
                    <img src="/static/weather6.png" alt="" @click="filter('weather', '6')">
                </p>
            </div>
        </div>
        <div v-show="popup7" class="filter-wrap" @click="popup7 = false">
            <div class="filter" style="background: #24ceff;">
                <p>
                    <img src="/static/scene1.png" alt="" @click="filter('scene', '1')">
                    <img src="/static/scene2.png" alt="" @click="filter('scene', '2')">
                    <img src="/static/scene3.png" alt="" @click="filter('scene', '3')">
                    <img src="/static/scene4.png" alt="" @click="filter('scene', '4')">
                    <img src="/static/scene5.png" alt="" @click="filter('scene', '5')">
                    <img src="/static/scene6.png" alt="" @click="filter('scene', '6')">
                </p>
            </div>
        </div>
        <div v-show="popup8" class="filter-wrap" @click="popup8 = false">
            <div class="filter" style="background: #24ceff;padding-bottom: 0;">
                <scroller v-show="dribKindList.length>5" lock-y :scrollbar-x=false>
                    <div class="box2" :style="'width: '+ 22*(dribKindList.length + 3) +'vw;'">
                        <div :class="dribKindName == '' ? 'ability-item text-base' : 'ability-item'" @click="getDribByKind('', '', '')">
                            全部
                        </div>
                        <div :class="item.dribKindName == dribKindName ?'ability-item text-base' : 'ability-item'" v-for="(item, index) in dribKindList" :key="index" @click="getDribByKind(item.dribKindId, item.dribKindName, item.dribKindDetail)">
                            {{item.dribKindName || '默认分类'}}
                        </div>
                        <div class="ability-item">
                            <div class="follow-more" @click="show1 = true">●●●</div>
                        </div>
                        <div class="ability-item">
                            <router-link to="./resume">导出履历</router-link>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
        <div v-show="popup9" class="filter-wrap" @click="popup9 = false">
            <div class="filter" style="background: #24ceff;padding-bottom: 0;display: flex;">
                <div class="filter-date" style="flex: 1;">
                    <datetime v-model="startTime" @on-clear="startTime = ''" clear-text="清除" @click.native.stop class="date-custom" format="YYYY-MM-DD"></datetime>
                </div>
                <span class="data_">~</span>
                <div class="filter-date" style="flex: 1;">
                    <datetime v-model="endTime" @on-clear="endTime = ''" clear-text="清除" @click.native.stop class="date-custom" format="YYYY-MM-DD"></datetime>
                </div>
                <span class="data_" @click="refresh">确定&nbsp;&nbsp;</span>
            </div>
        </div>
        <div v-show="popup10" class="filter-wrap" @click="popup10 = false">
            <div class="filter city-box" style="background: #24ceff;">
                <div>
                    <span class="city-item" v-for="(item, index) in cityList" :key="index" @click="filter('city', item)">{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Scroller, Popup, Group, XInput } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XTextarea, Radio, Icon, Datetime } from 'vux'
    import { setTimeout } from 'timers';

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
            Swiper,
            SwiperItem,
            Scroller,
            Popup,
            Group,
            XInput,
            XTextarea,  
            Radio,
            Icon,
            Datetime,
        },
        data () {
            return {
                tab: 0,
                show1: false,   //  分类管理窗口
                show2: false,   //  添加分类窗口
                show3: false,   //  编辑分类窗口
                popup0: false,  //  编辑默认分类描述
                startX : 0 ,
                endX : 0 ,
                editText: '',
                editDesc: '',
                addText: '',
                index: 0,

                //  个人信息
                sex: '',
                label: [],
                cardUrls: [],

                contentAllList: [],     //  所有数据
                contentShowList: [],    //  页面显示数据    
                dribKindList: [],       //  点滴分类列表 
                length: 5,              //  显示数据长度
                pageNum: 1,             //  当前页
                dribKindId: '',         //  点滴分类id
                dribKindName: '',        //  当前分类名称
                dribKindDetail: '',     //  分类描述

                //  刷新、加载
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,
                isEmpty: false,         //  没有数据

            //  修改内容分类
                popup4: false,          
                kinds: [],              //  分类列表
                kind: '',               //  选择分类
                towerContentId: '',     //  当前编辑的内容id
            //  筛选
                popup5: false,
                popup6: false,
                popup7: false,
                popup8: false,
                popup9: false,
                popup10: false,
                filterFiled: '',
                filterType: '',
                startTime: '',
                endTime: '',
                cityList: [],
            }
        },
        created(){
            let params = new FormData()
            this.$post("getusercard", params, (data) => {
                this.sex = data.sex
                this.label = this.toArray(data.label)
                this.cardUrls = data.cardUrls
            })
        },
        mounted(){
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
            this.$vux.loading.show()
            this.loadMore()
            this.getCity()
        },
        activated(){
            this.getdribkind()
        },
        deactivated(){
            this.popup5 = false
            this.popup6 = false
            this.popup7 = false
            this.popup8 = false
            this.popup9 = false
            this.popup10 = false
        },
        methods: {
            //获取城市列表
            getCity(){
                let params = new FormData()
                this.$post("getdribcity", params, (data) => {
                    this.cityList = data.cityList
                })
            },

            //  筛选
            filter(filterFiled, filterType){
                this.filterFiled = filterFiled
                this.filterType = filterType
                this.dribKindId = ''
                this.dribKindName = ''
                this.dribKindDetail = ''
                this.refresh()
            },

            //  获取点滴分类
            getdribkind(){
                let params = new FormData()
                this.$post("getdribkind", params, (data) => {
                    this.dribKindList = data.dribKindList
                })
            },

            //  获取分类内容
            getDribByKind(dribKindId, dribKindName, dribKindDetail){
                this.dribKindName = dribKindName
                this.dribKindDetail = dribKindDetail
                this.dribKindId = dribKindId
                this.filterFiled = ''
                this.filterType = ''
                this.refresh()
            },

            //  打开点滴默认分类编辑
            showPopup0(){
                setTimeout(() => {
                    this.$refs.textarea.focus()
                },200)
            },

            //  保存点滴默认分类
            savePopup0(){
                let params = new FormData();
                params.append("dribKindId", this.dribKindId)
                params.append("dribKindName", this.dribKindName)
                params.append("dribKindDetail", this.dribKindDetail)
                this.$post("editdribkind", params, (data) => {
                    this.popup0 = false
                    this.getdribkind()
                })
            },

            fetchData(cb) {
                var that = this
                setTimeout(function(){
                    that.$nextTick(() => {
                        that.$refs.scrollerBottom.reset()
                    })
                    cb()
                }, 200)
            },

            //  下拉刷新
            refresh() {
                this.fetchData(data => {
                    this.pageNum = 1
                    this.$refs.scrollerBottom.enablePullup()
                    this.$refs.scrollerBottom.donePulldown()
                    let params = new FormData()
                    params.append("pageNum", 1)
                    params.append("dribKindId", this.dribKindId)
                    params.append(this.filterFiled, this.filterType)
                    params.append("startTime", this.startTime)
                    params.append("endTime", this.endTime)
                    this.$vux.loading.show()
                    this.$post("getdrib", params, (data) => {
                        // this.dribKindName = dribKindName
                        // this.dribKindDetail = dribKindDetail
                        this.$refs.scrollerBottom.reset({top: 0})
                        this.contentShowList = [].concat(data.contentList)
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            //  加载数据
            loadMore() {
                this.fetchData(() => {
                    let params = new FormData()
                    params.append("pageNum", this.pageNum)
                    params.append("dribKindId", this.dribKindId)
                    params.append(this.filterFiled, this.filterType)
                    params.append("startTime", this.startTime)
                    params.append("endTime", this.endTime)
                    this.$vux.loading.show()
                    this.$post("getdrib", params, (data) => {
                        data.contentList.map(item => {
                            item['isError'] = false
                            this.contentShowList.push(item)
                        })
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            onScroll(e){
                
            },

            

            //  删除内容
            deleteContent(id, index){
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '确定要删除吗?',
                    onCancel: () => {},
                    onConfirm: () => {
                        let params = new FormData()
                        params.append('towerContentId', id)
                        this.$post("deletecontent", params, (data) => {
                            this.contentShowList.splice(index, 1)
                            this.toastSuccess("删除成功")
                        })
                    }
                })
            },
        /**********************************修改内容的分类************************************ */
            editContent(towerContentId){
                this.towerContentId = towerContentId
                this.kinds = []
                this.dribKindList.forEach(item => {
                    this.kinds.push({
                        key: item.dribKindId,
                        value: item.dribKindName
                    })
                });
                this.popup4 = true
            },
            modifydribkind(value){
                let params = new FormData()
                params.append("towerContentId", this.towerContentId)
                params.append("dribKindId", value)
                this.$post("modifydribkind", params, (data) => {
                    this.toastSuccess("修改成功")
                    this.popup4 = false
                })
            },

        /*********************************分类管理****************************** */
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
        /************************************新增修改编辑分类********************************* */
            //编辑
            editItem(index){
                this.restSlide();
                this.show3 = true
                this.editText = this.dribKindList[index].dribKindName
                this.editDesc = this.dribKindList[index].dribKindDetail
                this.index = index
            },
            //删除
            deleteItem(id, index){
                let that = this
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '确定要删除吗?',
                    onCancel () {that.restSlide();},
                    onConfirm () {
                        let params = new FormData()
                        params.append("dribKindId", id)
                        that.$post("deletedribkind", params, (data) => {
                            that.restSlide();
                            that.dribKindList.splice(index,1);
                        })
                    }
                })
            },
            //  新增分类确定
            addSubmit(){
                if(this.addText.length < 2 || this.addText.length > 6){
                    this.toastFail('请输入2-6字符', '160px')
                }else{
                    let params = new FormData()
                    params.append("dribKindName", this.addText)
                    this.$post("adddribkind", params, (data) => {
                        this.dribKindList.push({
                            "dribKindId": data.dribKindId,
                            "dribKindName": this.addText,
                            "dribKindNum": '0',
                            "dribKindType": '1'
                        })
                        this.toastSuccess('添加成功')
                        this.show2 = false
                        this.addText = ''    
                    })
                }
            },
            //  编辑分类确定
            editSubmit(){
                let params = new FormData()
                params.append("dribKindId", this.dribKindList[this.index].dribKindId)
                params.append("dribKindName", this.editText)
                params.append("dribKindDetail", this.editDesc)
                this.$post('editdribkind', params, (data) => {
                    this.show3 = false
                    this.dribKindList[this.index].dribKindName = this.editText
                    this.dribKindList[this.index].dribKindDetail = this.editDesc
                    this.$vux.toastSuccess("修改成功")
                })
            },
            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 0 60px;
        background: #fff;
        font-size: 12px;
        .box1 {
            position: relative;
            display: flex;
            background: #fff;
            overflow: hidden;
            text-align: center;
            line-height: 40px;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            .ability-item{
                float: left;
                flex: 1;
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
        .desc-info{
            background: #fff;   
            padding: 10px;
            line-height: 20px;
            color: #ccc;
        }
        .scroll-box{
            overflow: hidden;
            padding: 0 5px;
            position: relative;
            &:after{
                content: '';
                width: 1px;
                height: 100%;
                position: absolute;
                left: 50%;  
                background: #333;
            }
        }
        .hot-card{
            background: #fff;
            margin-bottom: 15px;
            padding-right: 3px;
            color: #777;
            float: left;
            width: 50%; 
            box-sizing: border-box;
            min-height: 160px;
            overflow: hidden;
            border-top-left-radius: 6px;
            position: relative;
            &:before{
                content: "";
                display: block;
                height: 1px;
                width: calc(100% - 3px);
                background: #333;
                position: absolute;
                right: 0;
            }
            &:nth-of-type(2n){
                float: right;
                border-top-left-radius: 0;
                border-top-right-radius: 6px;
                padding-left: 3px;
                padding-right: 0;
                .thumbnail{
                    float: right;
                }
                &:before{
                    left: 0;
                }
                .bit-content{
                    text-align: left; 
                }
                .bit-card-ft{
                    text-align: right;
                }
            }
            &:nth-of-type(2){
                margin-top: 120px;
            }
            &:nth-of-type(1){
                margin-top: 20px;
            }
            .thumbnail{
                height: 110px;
                width: 110px;
                float: left;
                margin: 0;
                margin-bottom: 5px;
                border: 1px solid #333;
                border-radius: 6px;
                position: relative;
            }
            .bit-video:before{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: auto;
                width: 40px;
                height: 40px;
                font-size: 40px;
                line-height: 40px;
                color: #fff;
            }
            .bit-content{
                text-align: right; 
            }
            .content-text{
                margin-bottom: 24px;
            }
            .bit-time{
                font-weight: bold;
            }
            .bit-card-ft{
                text-align: left;
                clear: both;
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
    .filter-wrap{
        position: absolute;
        top: 0px;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        .filter{
            background: #fff;
            margin-top: 86px;
            padding-bottom: 20px;
            p{
                padding: 15px 15px 0;
            }
            .label{
                margin-right: 20px;
            }
            img{
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin: 0 3px;
            }
        }
        .data_{
            line-height: 40px;
            color: #fff;
            font-weight: bold;
        }
        .date-custom{
            height: 20px;
            background: #fff;
            padding: 5px;
            margin: 5px;
        }
    }
    .box2{
        position: relative;
        overflow: hidden;
        text-align: center;
        line-height: 40px;
        color: #fff;
        .ability-item{
            float: left;
            width: 80px;
        }
    }
    .city-box{
        line-height: 40px;
        // padding-bottom: 0 !important;
        height: 40px;
        box-sizing: border-box;
        overflow: hidden;
        >div{
            overflow: auto;
            height: 50px;
            color: #fff;
            padding-right: 10px;
            span{
                padding-left: 10px;
            }
        }
    }
</style>
<style lang="less">
    .page .date-custom .weui-cell__ft{
        padding-right: 0;
        text-align: center;
        &:after{
            display: none;
        }
    }
</style>


