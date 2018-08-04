<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">发布技能</x-header>
        <div class="main">
            <group gutter='0' title="技能信息"  label-width="100px">
                <popup-picker title="技能分类" :data="list1" v-model="value1" placeholder="请选择" value-text-align="left"></popup-picker>
                <x-input title="标题" placeholder="请输入名称"></x-input>
                <x-input title="价格" placeholder="请输入价格"></x-input>
                <datetime class="datetime" placeholder="请选择时间" v-model="datetime" title="截止时间" format="YYYY-MM-DD HH:mm"></datetime>
            </group>
            <group gutter='0' title="图片（首张为显示缩略图）">
                
                <div v-show="files" class="img-box">
                    <div class="img-item" v-for="(item, index) in files" :key="index">
                        <img :src="getUrl(item)" alt="">
                        <span class="del" @click="delImg(index)">x</span>
                    </div>
                </div>
                <div class="img-list">
                    <i class="iconfont icon-web-icon-1 upload" @click="uploadClick"></i>
                    <input class="upload-input" v-show="false" type="file" @change="upload" accept="image/*" multiple="multiple">
                </div>
            </group>
            <group gutter='0' title="描述">
                <x-textarea :rows="6" :max="200" class="textarea" placeholder="最多为200个字符"></x-textarea>
            </group>
        </div>
        <div class="footer">发布技能</div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, PopupPicker, Datetime } from 'vux'

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
            PopupPicker,
            Datetime,
        },
        data () {
            return {
                tabIndex: 0,
                value1: [],
                list1: [['技能才艺', '个人', 'xxx', '默认分类']],
                files: [],
                fileList: [],
                datetime: '',
            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            uploadClick(){
                console.log(3)
                document.getElementsByClassName("upload-input")[0].click()
                console.log(document.getElementsByClassName("upload-input")[0].click())
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
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-top: 46px;
        padding-bottom: 56px;
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            &:before{
                left: 0;
            }
        }
        .weui-cell__ft{
            text-align: left;
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
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: @baseColor;
        color: #fff;
    }
</style>


