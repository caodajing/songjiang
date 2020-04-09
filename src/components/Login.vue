<template>
    <div class="login">
        <div class="login-box">
            <div class="title">松江支队效能评估系统</div>
            <div class="small-title">Effectiveness evaluation system of Songjiang District</div>
            <div class="input-box">
                <p>用户登录</p>
                <el-input
                        maxlength="16"
                        placeholder="请输入用户名"
                        prefix-icon="iconfont icon-yonghuming"
                        v-model="userName">
                </el-input>
                <el-input
                        maxlength="16"
                        placeholder="请输入密码"
                        prefix-icon="iconfont icon-mima"
                        v-model="passWord">
                </el-input>

                <el-button class="login-btn" type="primary" @click="loginFn">登录</el-button>
                <i class="top edge-angle"></i>
                <i class="bottom edge-angle"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {setCookie, getCookie} from '../assets/js/cookie.js'

    export default {
        name: "Login",
        data() {
            return {
                userName: '',
                passWord: '',
            }
        },
        mounted() {
            document.onkeyup = (event) => {
                let e = event || window.event;
                let keyCode = e.keyCode || e.which;
                switch (keyCode) {
                    case 13:
                        this.loginFn();
                        break;
                    default:
                        break;
                }
            }
        },
        beforeDestroy() {
            document.onkeyup = null;
        },
        methods: {
            loginFn() {
                if (this.userName && this.passWord) {
                    this.$ajax.post(this.$URL + '/xf-unit/user/userLogin', qs.stringify({
                        username: this.userName,
                        password: this.passWord
                    }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                        let data = res.data;
                        if (data.code == 200) {
                            setCookie('userInfo', JSON.stringify(data.data));
                            setCookie('token', data.data.id);
                            setCookie('userName', decodeURI(data.data.realName));
                            this.$router.push('/homePage');
                        } else {
                            this.$message.error(data.msg);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })

                } else {
                    this.$alert('请确认输入账号与密码', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/images/sign-in-bg.jpg") no-repeat fixed top;
        background-size: cover;
        color: #fff;

        .login-box {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 42.8rem;
            text-align: center;
            transform: translate(-50%, -50%);

            .title {
                font-size: 3rem;
                letter-spacing: 16px;
            }

            .small-title {
                font-size: 1.3rem;
                letter-spacing: 3px;
            }

            .input-box {
                position: relative;
                margin: 2rem auto 0 auto;
                padding: 3rem;
                width: 25rem;
                border: 1px solid #0e27aa;
                background-color: rgba(0, 18, 110, 0.6);

                .edge-angle {
                    position: absolute;
                    width: 100%;
                    height: 10px;
                    background: url("../assets/images/optical-edge.png");
                    background-size: cover;
                    background-repeat: no-repeat;

                    &:after {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        content: '';
                        background-image: url("../assets/images/edge-angle.png");
                        background-repeat: no-repeat;
                        background-size: cover;
                    }

                    &:before {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        content: '';
                        transform: rotate(-90deg);
                        background-image: url("../assets/images/edge-angle.png");
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }

                .top {
                    top: -5px;
                    left: 0;

                    &:after {
                        top: 0;
                        right: -2px;
                    }

                    &:before {
                        top: 0;
                        left: -2px;
                    }
                }

                .bottom {
                    bottom: -5px;
                    left: 0;

                    &:after {
                        bottom: 0;
                        right: -2px;
                        transform: rotate(90deg);
                    }

                    &:before {
                        bottom: 0;
                        left: -2px;
                        transform: rotate(180deg);
                    }
                }

                > p {
                    font-size: 2.4rem;
                    letter-spacing: 8px;
                }


            }

            .login-btn {
                margin-top: 2rem;
                width: 100%;
                font-size: 1.4rem;
            }
        }
    }
</style>
<style>
    .login .login-box .el-input {
        margin-top: 2rem;
    }

    .login .login-box .el-input input {
        padding-left: 2.4rem;
        font-size: 1rem;
        color: #fff;
        background-color: transparent;
    }

    .login .login-box .el-input .el-input__icon {
        font-size: 2rem;
        color: #fff;
    }
</style>
