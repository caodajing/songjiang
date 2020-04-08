<template>
  <div class="header-box">
    <span>松江消防救援总队</span>
    <div class="sign-out">
      <span>欢迎 {{userName}}</span>
      <span @click="quitBtn">退出</span>
    </div>
    <ul class="header-nav">
      <li v-for="(item,index) in navData">
        <router-link :to="item.path">
          {{item.name}}
        </router-link>
        <div class="list-box">
          <p v-for="temp in item.list" :class="{active:squadronCode==temp.code}" @click="selectSquadron(temp)">
            <router-link :to="item.path">
              {{temp.name}}
            </router-link>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import {getCookie, delCookie} from '../assets/js/cookie.js'

    import dutySquadronPage from '../Page/Squadron/dutySquadron'
    const $dutySquadronPage=dutySquadronPage;

    export default {
        name: "Header",
        data() {
            return {
                userName: getCookie('userName'),
                navData: [
                    {name: '首页', icon: '', path: '/homePage'},
                    {
                        name: '执勤中队', icon: '',
                        list: [{name: '松一中队', code: '1'}, {name: '松江中队', code: '2'}, {name: '泖港中队', code: '3'},
                            {name: '佘山中队', code: '4'}, {name: '仓桥中队', code: '5'}, {name: '新桥中队', code: '6'},
                            {name: '新浜中队', code: '7'}, {name: '九亭中队', code: '8'}, {name: '叶榭中队', code: '9'},
                            {name: '车墩中队', code: '10'}, {name: '大港中队', code: '11'}, {name: '泗泾中队', code: '12'}],
                        path: '/dutySquadron'
                    },
                    {name: '辅助决策', icon: '', path: '/assistMakePolicy'},
                    {name: '执勤动态', icon: '', path: '/dutyDynamics'},
                    {name: '战备工作', icon: '', path: '/training/index'},
                    {name: '战评总结', icon: '', path: '/summingUp'},
                    {name: '数据设置', icon: '', path: '/personSet/index'},
                    {name: '大屏模式', icon: '', path: '/bigScreenMode'},
                ],
                squadronCode: '1',
            }
        },
        methods: {
            selectSquadron(data) {
                this.squadronCode = data.code;
                // console.log(this.$root.store)
                if(window.$publicFn){
                    window.$publicFn(data);
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
    height: 80px;
    background-color: #496dff;
    box-sizing: border-box;
    color: #fff;

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

            &.active{
              background-color: #496dff;
              a{
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
</style>
