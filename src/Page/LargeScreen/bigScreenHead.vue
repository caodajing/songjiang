<!--大屏头部-->
<template>
  <div class="big-screenHead">
    <ul class="header-nav">
      <li>
        <router-link to="/bigScreenHome">
          首 页
        </router-link>
      </li>
      <li>
        <router-link :to="squadronPath">
          执勤中队
        </router-link>
        <div class="list-box">
          <p v-for="temp in deptList" :class="{active:squadronCode==temp.groupId}" @click.stop="selectSquadron(temp)">
            <router-link to="bigScreenSquadron">
              {{temp.groupName}}
            </router-link>
          </p>
        </div>
      </li>
      <li>
        <router-link to="/bigScreenAuxiliary">
          辅助决策
        </router-link>
      </li>
    </ul>
    <span class="exit-big-screen" @click="exitBigScreen">退出大屏</span>
  </div>
</template>

<script>
    import {getCookie, delCookie} from '../../assets/js/cookie.js'
    export default {
        name: "bigScreenHead",
        data() {
            return {
                deptList: [],
                squadronCode: '1',
                squadronPath:'/bigScreenSquadron'
            }
        },
        created() {
            
            let grade = JSON.parse(getCookie("userInfo")).grade;
            console.log(grade)
            if (grade === 2 || grade === 3) { 
                this.squadronPath = '/bigScreenSquadron';
                this.getDeptList();
            }else{ // 支队权限
                this.squadronPath = '/bigScreenSquadronDetachmentLimit';
                
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
                        this.deptList = res.data.data[0].dataList;
                        this.selectSquadron(res.data.data[0].dataList[0]);
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            selectSquadron(data) {
                this.squadronCode = data.groupId;
                if (window.$bigPublicFn) {
                    window.$bigPublicFn(data);
                }
            },
            exitBigScreen() {
                this.$router.push('/homePage');
            }
        }
    }
</script>

<style scoped lang="less">
  .big-screenHead {
    position: absolute;
    left: 50%;
    top: 1rem;
    width: calc(100vw - 2rem);
    height: 5.59vw;
    background-image: url("../../assets/images/head-bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateX(-50%);
    z-index: 103;

    .header-nav {
      position: absolute;
      top: 1.3vw;
      left: 3vw;

      li {
        position: relative;
        display: inline-block;
        margin-right: 1rem;

        > a {
          display: inline-block;
          width: 100px;
          height: 33px;
          line-height: 33px;
          background-image: url("../../assets/images/text-box.png");
          text-align: center;
          color: #00aef7;

          &.router-link-active {
            background-image: url("../../assets/images/text-box-select.png");
            color: #6bf0fc;
          }
        }

        .list-box {
          position: absolute;
          /*padding: 0.2rem 0;*/
          width: 100%;
          max-height: 0;
          background-color: #060e1e;
          text-align: center;
          z-index: 102;
          transition: all 0.25s ease-in-out;
          overflow: hidden;

          p {
            padding: 0.4rem 0;
            background-color: #060e1e;
            box-shadow: 0px 0px 1px 1px rgba(27, 78, 170, 0.6) inset;
            box-sizing: border-box;
            transition: all 0.25s ease-in-out;

            a {
              color: #00aef7;
            }

            &:hover{
              color: rgba(106, 240, 235, 1);
              box-shadow: 0px 0px 5px 3px rgba(106, 240, 235, 0.9) inset;
            }
          }

        }
        &:hover .list-box {
          max-height: 30rem;
        }
        &:first-child a {
          letter-spacing: 10px;
          text-align: right;
          padding-right: 8px;
          box-sizing: border-box;
        }
      }
    }

    .exit-big-screen {
      position: absolute;
      top: 1.3vw;
      right: 3vw;
      width: 100px;
      height: 33px;
      line-height: 33px;
      background-image: url("../../assets/images/text-box.png");
      text-align: center;
      color: #00aef7;
      cursor: pointer;
    }
  }
</style>
