<template>
    <div class="page login"> 
        <x-header class="pst" :left-options="{backText: ''}">登录</x-header>
        <div class="main">
            <img src="../assets/picture2.jpg" alt="">
            <x-input text-align="center" class="input" v-model="phone" placeholder="手机号" type="tel" ref='phone' :show-clear='false'></x-input>
            <x-input text-align="center" class="input" v-model="password" placeholder="请输入密码" type="password" ref='password' :show-clear='false'></x-input>
            <a class="input btn-submit" @click="login">登录</a>
            <p>
                <router-link to="./register" class="text-base">注册塔兮</router-link>
                <span class="text-ccc"> | </span>
                <router-link to="./reset_password">忘记密码</router-link>
            </p>
        </div>
    </div>
</template>

<script>

    import { XHeader, XButton, XInput } from 'vux'

    export default {
        components: {
            XHeader,
            XButton,
            XInput,
        },
        data () {
            return {
                phone: '',
                password: '',
                passwordValid: function(value){
                    let uPassword = /^([a-zA-Z0-9]|[._]){6,20}$/
                    return{
                        valid: uPassword.test(value),
                        msg: "请输入6~20位数字/字母/'.'/'_'",
                    }
                },
            }
        },
        activated(){
            console.log(this.$store.state.nextUrl)
        },
        deactivated(){
            this.$store.state.nextUrl = ''
        },
        methods: {
            login(){
                let flag = true
                let uPhone = /^1[0-9]{10}$/
                let uPassword = /^([a-zA-Z0-9]|[._]){6,20}$/
                if(!uPhone.test(this.phone)){
                    this.toastFail("手机号错误")
                    return
                }
                if(!uPassword.test(this.password)){
                    this.toastFail("密码错误")
                    return
                }
                let params = new FormData();
                params.append('phone', this.phone)
                params.append('password', this.password)
                this.$post("login", params, (data) => {
                    this.$store.state.towerUserId = data.towerUserId
                    this.$store.state.avatar = data.icon
                    this.$store.state.userName = data.name
                    window.android.login(data.towerUserId, data.name, data.icon)
                    let nextUrl = this.$store.state.nextUrl
                    if(nextUrl){
                        this.$store.state.nextUrl = ''
                        this.$router.push(nextUrl)
                    }else{
                        this.$router.back(-1)
                    }
                })
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
            height: 40px;
            padding: 0;
            border: 1px solid #ddd;
            border-radius: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
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
        }
        p{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .login .weui-input{
        text-align: center;
    }
</style>



