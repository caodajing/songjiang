<template>
    <div class="header-box">
        <span>松江消防救援支队</span>
        <div class="sign-out">
            <span>欢迎 {{userName}}</span>
            <span @click="quitBtn">退出</span>
        </div>
        <ul class="header-nav">
            <li v-for="(item,index) in navData" @click="specialHandlingFn(item.path)">
                <router-link :to="item.path">
                    {{item.name}}
                </router-link>
                <div class="list-box">
                    <p v-for="temp in item.list" :class="{active:squadronCode==temp.groupId}"
                       @click.stop="selectSquadron(temp,item)">
                        <router-link :to="item.path">
                            {{temp.groupName}}
                        </router-link>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getCookie, delCookie} from '../assets/js/cookie.js'

    export default {
        name: "Header",
        data() {
            return {
                userName: decodeURIComponent(getCookie('userName')),
                parentDeptID: getCookie('parentId'),
                deptList: [],
                navData: [
                    {name: '首页', icon: '', path: '/homePage'},
                    {
                        name: '执勤中队', icon: '',
                        list: [],
                        path: '/dutySquadron',
                    },
                    {name: '辅助决策', icon: '', path: '/assistMakePolicy'},
                    {name: '执勤动态', icon: '', path: '/dutyDynamics'},
                    {name: '战备工作', icon: '', path: '/training/index'},
                    {name: '战评总结', icon: '', path: '/summingUp'},
                    {name: '数据设置', icon: '', path: '/personSet/index'},
                    {name: '大屏模式', icon: '', path: '/bigScreenHome'},
                ],
                squadronCode: '1',
            }
        },
        created() {
            console.log(JSON.parse(getCookie("userInfo")));
            let grade = JSON.parse(getCookie("userInfo")).grade;
            console.log(JSON.parse(getCookie("userInfo")).grade === 3)
            if (grade === 2 || grade === 3) {
                this.navData[1].path = '/dutySquadron';
                this.navData[3].path = '/dutyDynamics';
                this.getDeptList();
            }else{  // 支队权限
                this.navData[1].path = '/dutyDetachmentLimit';
                this.navData[3].path = '/detachmentLimit';
            }
        },
        methods: {
            getDeptList() {
                this.$ajax.post(this.$URLSpare + '/apis/group/getdata',
                    'parentId=901267999502484244&grade=3&rowLength=100&pageNum=1',
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.squadronCode = res.data.data[0].dataList[0].groupId;
                        this.navData[1].list = res.data.data[0].dataList;
                        this.navData[3].list = res.data.data[0].dataList;
                        this.$root.DEPTLIST = res.data.data[0].dataList;
                        this.$root.SELECTEDDEPT = res.data.data[0].dataList[0].groupId;
                        // console.log(this.$root.DEPTLIST,this.$root.SELECTEDDEPT);
                        this.specialHandlingFn()
                    } else {
                        this.$Message.error(res.data.message)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            selectSquadron(data, data1) {
                this.squadronCode = data.code;
                // console.log(data,'参数查看')
                if (window.$publicFn1 && data1.path == '/dutySquadron') {
                    window.$publicFn1(data);
                }
                if (window.$publicFn2 && data1.path == '/dutyDynamics') {
                    window.$publicFn2(data);
                }
            },
            specialHandlingFn(data) {
                let temp = data ? data : this.$route.path;
                if (temp == '/dutySquadron') {
                    window.$publicFn1(this.navData[1].list[0]);
                }
                if (temp == '/dutyDynamics') {
                    window.$publicFn2(this.navData[1].list[0]);
                }
            },
            quitBtn() {
                this.$confirm('确定退出吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*删除cookie*/
                    delCookie('token');
                    this.$router.push('/login')

                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped lang="less">
    .header-box {
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 30px;
        width: 100%;
        height: 60px;
        background-color: #496dff;
        box-sizing: border-box;
        color: #fff;
        z-index:2;

        > span {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-right: 2rem;
            font-size: 1.6rem;
        }

        .sign-out {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;

            span {
                font-size: 1.2rem;
                margin-right: 20px;
                font-weight: normal;
                cursor: pointer;
            }
        }

        .header-nav {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            z-index: 1003;

            li {
                position: relative;
                display: inline-block;

                > a {
                    padding: 0.4rem 1.2rem;
                    display: inline-block;
                    color: #fff;
                    border-top-left-radius: 0.2rem;
                    border-top-right-radius: 0.2rem;
                    -moz-border-radius-topleft: 0.2rem;
                    -moz-border-radius-topright: 0.2rem;
                    transition: all 0.25s ease-in-out;

                    &.router-link-active:after {
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        width: 60%;
                        border: 1px solid #fff;
                        content: '';
                        transform: translateX(-50%);
                        /*border-bottom: #fff;*/
                    }
                }

                .list-box {
                    position: absolute;
                    width: 100%;
                    max-height: 0;
                    border-right: 1px solid #496dff;
                    border-left: 1px solid #496dff;
                    transition: all 0.25s ease-in-out;
                    overflow: hidden;
                    z-index: 100;

                    p {
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                        border-bottom: 1px solid #496dff;
                        background-color: #fff;
                        cursor: pointer;
                        transition: all 0.25s ease-in-out;

                        a {
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            color: #496dff;

                            &:hover {
                                color: #fff;
                                background-color: #496dff;
                            }
                        }

                        &:first-child {
                            border-top: 1px solid #496dff;
                        }

                        &.active {
                            background-color: #496dff;

                            a {
                                color: #fff;
                            }
                        }
                    }
                }

                &:hover .list-box {
                    max-height: 30rem;
                }
            }

            &:after {
                position: absolute;
                left: -1rem;
                top: 50%;
                height: 1.6rem;
                border-left: 1px solid rgba(255, 255, 255, 0.6);
                content: '';
                transform: translateY(-50%);
            }
        }
    }
</style>
<style>
    @import "../assets/css/web-page-public.css";
    @import "../assets/css/big-public.css";
</style>
