<template>
    <div class="page register"> 
        <x-header class="pst" :left-options="{backText: ''}">注册</x-header>
        <div class="main">
            <img src="../assets/picture2.jpg" alt="">
            <x-input text-align="center" class="input" v-model="phone" placeholder="手机号" required type="tel" ref='phone' is-type="china-mobile" :show-clear='false'></x-input>
            <x-input text-align="center" class="input" title="&nbsp;" v-model="code" label-width="100px" placeholder="验证码" ref='code' required type="tel" :min="4" :max="4" :show-clear='false'>
                <div v-show="!start" class="text-base get-code" slot="right" @click="getCode">获取验证码</div>
                <div v-show="start" class="get-code" slot="right">重新获取(<countdown v-model="time" :start="start" @on-finish="finish"></countdown>)</div> 
            </x-input>
            <x-input text-align="center" class="input" :is-type="passwordValid" required v-model="password" placeholder="请输入6~20位数字/字母/'.'/'_'的密码" type="password" ref='password' :show-clear='false'></x-input>
            <x-input text-align="center" class="input" :is-type="secondPassword" required v-model="password1" placeholder="再次输入密码" type="password" ref='password1' :show-clear='false'></x-input>
            <x-input text-align="center" class="input" :min="3" :max="10" required v-model="nick" placeholder="昵称(3~10)字符" ref='nick' :show-clear='false'></x-input>
            <a class="input btn-submit" @click="submit">注册</a>
            <p class="font12 text-ccc">点击[注册]代表你已阅读并同意塔兮用户协议</p>
        </div>
    </div>
</template>

<script>

    import { XHeader, XButton, XInput, Countdown } from 'vux'

    export default {
        components: {
            XHeader,
            XButton,
            XInput,
            Countdown,
        },
        data () {
            return {
                phone: '',
                code: '',
                password: '',
                password1: '',
                nick: '',
                time: 60,
                start: false,
                refsList: ['phone', 'code', 'password', 'password1', 'nick'],
                passwordValid: function(value){
                    let uPassword = /^([a-zA-Z0-9]|[._]){6,20}$/
                    return{
                        valid: uPassword.test(value),
                        msg: "请输入6~20位数字/字母/'.'/'_'",
                    }
                },
                secondPassword: function(value){
                    return{
                        valid: value === this.$parent.password,
                        msg: "两次密码输入不一样",
                    }
                },
            }
        },
        activated(){

        },
        methods: {
            submit(){
                let flag = true
                this.refsList.map(item=>{
                    if(!this.$refs.phone.valid){
                        this.$refs[item].focus()
                        this.$refs[item].blur()
                        flag = false
                    }
                })
                if(!flag) return;
                let that = this
                let params = new FormData();
                params.append('phone', this.phone)
                params.append('verification', this.code)
                params.append('password', this.password)
                params.append('towerUserName', this.nick)
                this.$post("register", params, (data) => {
                    this.$router.push("./login")
                })
            },
            finish (index) {
                this.start = false
                this.time = 60
            },
            getCode(){
                if(this.$refs.phone.valid){
                    let that = this
                    let params = new FormData()
                    params.append('phone', this.phone)
                    this.$post("getverification", params, (data) => {
                        this.start = true
                    })
                }
                else{
                    this.$refs['phone'].focus()
                    this.$refs['phone'].blur()
                }
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 30px 0;
        img{
            display: block;
            margin: 60px auto;
        }
        .input{
            width: 100%;
            padding: 8px 0 10px;
            border: 1px solid #ddd;
            border-radius: 40px;
            margin-bottom: 10px;
            &:before{
                display: none;
            }
        }
        .btn-submit{
            display: block;
            background: @baseColor;
            color: #fff;
            border-color: @baseColor;
            text-align: center;
        }
        p{
            text-align: center;
        }
        .get-code{
            width: 90px;
            display: inline-block;
            margin-right: 10px;
            position: relative;
            top: 2px;
        }
    }
</style>

