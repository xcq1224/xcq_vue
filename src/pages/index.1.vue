<template>
    <div class="wrap">
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <tabbar v-if="flag">
            <tabbar-item selected link="/index">
                <i slot="icon" class="iconfont icon-shouye"></i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/bit">
                <i slot="icon" class="iconfont icon-iconset0457"></i>
                <span slot="label">点滴</span>
            </tabbar-item>
            <tabbar-item @on-item-click="show_more">  
                <span slot="label" class="more"><i slot="icon" class="iconfont icon-add"></i></span>
            </tabbar-item>  
            <tabbar-item link="/tower">
                <i slot="icon" class="iconfont icon-kehuqunzu"></i>
                <span slot="label">塔圈</span>
            </tabbar-item>
            <tabbar-item link="/mine">
                <i slot="icon" class="iconfont icon-wode"></i>
                <span slot="label">我的</span>
            </tabbar-item> 
        </tabbar>
        <div class="mode-box" v-show="showMore">
            <div class="mode" @click="hide_more"></div>
            <div class="more-handle">
                <div class="more-handle-body">
                    <div>
                        <span style="background: #f66;"><i class="iconfont icon-hetong2"></i></span>
                        <p>文字</p>
                    </div>
                    <div>
                        <span style="background: #fbce77;"><i class="iconfont icon-paizhao"></i></span>
                        <p>拍摄</p>
                    </div>
                    <div>
                        <span style="background: #86df79;"><i class="iconfont icon-xiangce"></i></span>
                        <p>相册</p>
                    </div>
                    <div>
                        <span style="background: #b5e1fe;"><i class="iconfont icon-jinengtechang--"></i></span>
                        <p>技能</p>
                    </div>
                </div>
                <div class="more-handle-footer">
                    <span @click="hide_more"><i class="iconfont icon-add"></i></span>
                </div>
            </div>
        </div>
        
     </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'

export default {
    components: {
        Tabbar,
        TabbarItem,
    },
    data() {
            return {
                flag: true,
                showMore: false,
            }
    },
    methods: {
        show_more(){
            this.showMore = true;
            let box = document.getElementsByClassName('more-handle')[0]
            animate(box, {bottom: 0}, 10, function(){})
        },
        hide_more(){
            this.showMore = true;
            let that = this;
            let box = document.getElementsByClassName('more-handle')[0]
            animate(box, {bottom: -210}, 10, function(){
                that.showMore = false
            })
        },

    }  
}
function animate(dom, o,time,fn) {  
    if(time==undefined){  //默认的切换频率  
        time=10;  
    }  
    //dom.termId :为每一个运动的物体添加一个属于自己的线程标识  
    clearInterval(dom.termId);  

    dom.termId = setInterval(function() { //创建一个定时器，实现运动  
        dom.isOver = true; //是否可以停止定時器  
        for (var property in o) {  
            if (property == "opacity") {//如果是透明度  
                var currentValue = parseInt(getStylePropertyValue(dom, property) * 100); //当前样式属性的值       
            } else{//其他样式属性  
                var currentValue = parseInt(getStylePropertyValue(dom, property)); ////当前样式属性的值  
            }  
                
            //速度   正速度  负速度  
            var speed = (o[property] - currentValue) / 10;  
            // 三元表达式  三目运算符  
            speed = currentValue > o[property] ? Math.floor(speed) : Math.ceil(speed)  

            currentValue += speed; //改变样式属性的值  

            if (currentValue != o[property]) {  
                dom.isOver = false; //標識不停止定時器  
            }  

            if (property == "opacity") {  
                dom.style.opacity = currentValue / 100;  
                dom.style.filter = 'alpha(opacity= ' + currentValue + ')';  
            } else {  
                dom.style[property] = currentValue + "px"; //改变物体的样式属性值       
            }  

        }  

        if (dom.isOver) {  //停止定时器  
            clearInterval(dom.termId);  
            if(fn){  //执行回调函数  
                fn();  
            }  
        }  

    }, time)  //基于切换的频率来改变运动的快慢  

}  

/*获取指定样式的属性值*/  
function getStylePropertyValue(dom, property) {  
    if (window.getComputedStyle) { //標準瀏覽器  
        //  
        return getComputedStyle(dom, null)[property];  
    } else {  
        return dom.currentStyle[property]; //IE瀏覽器  
    }  
}  
</script>
<style lang="less" scoped>
    @import "../style/base_color.less";
    .content{
        background: #f2f2f2;
    }
    .mode-box{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        .mode{
            width: 100%;
            height: 100%;
        }
        .more-handle{
            width: 100%;
            height: 175px;
            padding-top: 35px;
            position: absolute;
            bottom: -210px;
            background: #fff;
            overflow: hidden;
            .more-handle-body{
                display: flex;
                text-align: center;
                >div{
                    flex: 1;
                    margin-bottom: 65px;
                    span{
                        display: inline-block;
                        border-radius: 50%;
                        width: 45px;
                        height: 45px;
                        color: #fff;
                        margin-bottom: 10px;
                        i{
                            font-size: 28px;
                        }
                    }
                }
            }
            .more-handle-footer{
                position: relative;
                border-top: 1px solid #ddd;
                text-align: center;
                &:before{
                    position: absolute;
                    top: 0;
                    display: block;
                    content: '';
                    background: #fff;
                    height: 30px;
                    width: 100%;
                    z-index: 2;
                }
                span{
                    position: relative;
                    top: -27px;
                    display: inline-block;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    width: 54px;
                    height: 54px;
                    background: #fff;
                    i{
                        font-size: 40px;
                        position: relative;
                        top: -4px;
                        z-index: 3;
                        color: #ddd;
                    }
                }
            }
        }
    }
    .weui-tabbar{
        background: #f2f2f2;
        position: fixed;
        z-index: 409;
        .iconfont{
            position: relative;
            top: -4px;
        }
        .more{
            background: #fff;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            top: -6px;
            i{
                font-size: 36px;
                line-height: 56px;
                color: @baseColor;
                top: 0;
            }
        }
    }  
</style>
