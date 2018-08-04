<template>
    <div class="has-tabbar page">
        <div class="main">
            <div class="header"><span @click="$router.back(-1)">取消</span><span class="fr text-base">发布</span></div>
            <x-textarea :height="140" class="textarea" placeholder="分享这一刻的想法..."></x-textarea>
            <div v-show="files.length" class="img-box">
                <div class="img-item" v-for="(item, index) in files" :key="index">
                    <img :src="getUrl(item)" alt="">
                    <span class="del" @click="delImg(index)">x</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <div>
                <span><i class="iconfont icon-dingwei"></i>你在哪里</span>
                <popover placement="bottom" class="fr" :gutter='0'>
                    <div slot="content" class="search-tab-items">
                        <p v-show="index != searchIndex" :class="index == searchIndex?'active': ''" v-for="(item, index) in searchTabs" :key="index" @click="searchChoose(index)">{{searchTabs[index]}}</p>
                    </div>
                    <span class="tab fr"><i class="iconfont icon-diqiu"></i>{{searchTabs[searchIndex]}}</span>
                </popover>
            </div>
            <p>
                <i class="iconfont upload icon-xiangce" @click="uploadClick"></i>
                <input class="upload-input" v-show="false" type="file" @change="upload" accept="image/*" multiple="multiple">
            </p>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Popover } from 'vux'

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
            InlineXSwitch,
            XTextarea,
            XInput,
            Popover,
        },
        data () {
            return {
                showSearch: false,
                searchIndex: 0,
                searchTabs: ['公开', '自己', '塔圈'],
                files: [],
                fileList: [],
            }
        },
        activated(){
            document.getElementsByTagName('textarea')[0].focus()
            let files = this.$store.state.pictureFiles
            this.$store.state.pictureFiles = ''
            for(var i=0; i<files.length; i++){
                this.files.push(files[i])
            }
        },
        methods: {
            uploadClick(){
                console.log(3)
                document.getElementsByClassName("upload-input")[0].click()
                document.getElementsByClassName("upload-input")[0].click()
            },
            upload(e){
                const files = e.target.files;
                for(var i=0; i<files.length; i++){
                    this.files.push(files[i])
                }
            },
            getUrl(file){
                return URL.createObjectURL(file)
            },
            delImg(index){
                this.files.splice(index,1)
            },

            searchChoose(val){
                this.searchIndex = val
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        .header{
            line-height: 36px;
            padding: 0 10px;
        }
        .tab{
            .cell{
                padding: 15px 20px;
                font-size: 14px;
            }
            span{
                display: inline-block;
                width: 110px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #f2f2f2;
                margin-right: 25px;
                border-radius: 4px;
                &.active{
                    background: @baseColor;
                    color: #fff;
                }
            }
        }
        .textarea{
            font-size: 14px;
            height: 130px;
        }
        .img-box{
            overflow: hidden;
            padding: 10px;
            .img-item{
                width: 80px;
                height: 80px;
                border: 1px solid #ddd;
                background: #f7f7f7;
                position: relative;
                float: left;
                margin-right: 8px;
                margin-bottom: 10px;
                &:nth-of-type(4n){
                    margin-right: 0;
                }
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .del{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 15px;
                    border-radius: 50%;
                    background: #b8bdae;
                    color: #69833a;
                }
            }
        }
        .img-list{
            padding-left: 10px;
            .upload{
                font-size: 44px;
                color: #ccc;
            }
        }
        .weui-cell{
            font-size: 14px;
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
</style>


