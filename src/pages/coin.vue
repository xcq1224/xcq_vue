<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">塔兮币</x-header>
        <div class="main">
            <group gutter='0'>
                <cell @click.native="changeType(1)">
                    <x-icon v-if="type == 1" type="ios-checkmark" size="26" slot="icon"></x-icon>
                    <x-icon v-if="type != 1" type="ios-circle-outline" size="26" slot="icon"></x-icon>
                    <div slot="title"><span>10塔兮币</span></div>
                    <div slot=""><span style="color: #fc673d;">1元</span></div>
                </cell>
                <cell>
                    <x-icon v-if="type == 1" type="ios-checkmark" size="26" slot="icon"></x-icon>
                    <x-icon v-if="type != 1" type="ios-circle-outline" size="26" slot="icon"></x-icon>
                    <div slot="title"><span>100塔兮币</span></div>
                    <div slot=""><span style="color: #fc673d;">9元</span></div>
                </cell>
                <cell>
                    <x-icon v-if="type == 1" type="ios-checkmark" size="26" slot="icon"></x-icon>
                    <x-icon v-if="type != 1" type="ios-circle-outline" size="26" slot="icon"></x-icon>
                    <div slot="title"><span>200塔兮币</span></div>
                    <div slot=""><span style="color: #fc673d;">17元</span></div>
                </cell>
                <cell>
                    <x-icon v-if="type == 1" type="ios-checkmark" size="26" slot="icon"></x-icon>
                    <x-icon v-if="type != 1" type="ios-circle-outline" size="26" slot="icon"></x-icon>
                    <div slot="title"><span>500塔兮币</span></div>
                    <div slot=""><span style="color: #fc673d;">40元</span></div>
                </cell>
                <cell>
                    <x-icon v-if="type == 1" type="ios-checkmark" size="26" slot="icon"></x-icon>
                    <x-icon v-if="type != 1" type="ios-circle-outline" size="26" slot="icon"></x-icon>
                    <div slot="title"><span>1000塔兮币</span></div>
                    <div slot=""><span style="color: #fc673d;">70元</span></div>
                </cell>
            </group>
            <div class="btn-box">
                <x-button type="warn" siz="mini" @click.native="charge">购买</x-button>
            </div>
            <p class="my-coin">塔兮币余额<span>{{coin}}币</span></p>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, Checklist, Icon, XButton  } from 'vux'

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
            Checklist,
            Icon,
            XButton,
        },
        data () {
            return {
                type: '',   
                coin: "",
            }
        },
        activated(){
            this.type = ''
            this.getCoin()
        },
        methods: {
            getCoin(){
                let params = new FormData()
                this.$post("getcoins", params, (data) => {
                    this.coin = data.coin
                })
            },
            changeType (val) {
                this.type = val
            },
            charge(){
                let params = new FormData()
                params.append("coin", "100")
                this.$post("charge", params, (data) => {
                    console.log(data)
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .page{
    }
    .main{
        padding-top: 46px;
        .cell{
            font-size: 14px;
            padding: 12px 15px;
            &:before{
                left: 0;
            }
        }
        .btn-box{
            padding: 20px 10px;
        }
        .my-coin{
            padding: 10px;
            span{
                font-size: 20px;
                color: #fc673d;
                font-weight: bold;
                margin-left: 6px;
            }
        }
        .vux-x-icon{
            fill: #fc673d;
            vertical-align: middle;
            margin-right: 3px;
        }
    }
</style>


