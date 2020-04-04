<!--今日处警模板-->
<template>
  <div class="police-today">
    <div class="police-today-box">
      <p>今日处警</p>
      <div class="bottom-box">
        <div class="num-font"><span>{{policeToday.one}}</span><span>{{policeToday.two}}</span>
          <span>{{policeToday.three}}</span><span>{{policeToday.four}}</span></div>
        <div class="bottom">本周累计处警：<span>{{totalAlarm}}</span>
          <a @click="lastWeekSwitch=!lastWeekSwitch">查看上周<i class="iconfont icon-more1"></i></a></div>
      </div>
    </div>
    <div class="police-last-week" :class="{active:lastWeekSwitch}">
      <p>上周处警</p>
      <ul>
        <li>
          <a><i class="iconfont icon-chujing"></i></a>
          <p>处警</p>
          <p><span>{{policeLastWeek.one}}</span>次</p>
        </li>
        <li>
          <a><i class="iconfont icon-huojing"></i></a>
          <p>火警</p>
          <p><span>{{policeLastWeek.two}}</span>次</p>
        </li>
        <li>
          <a><i class="iconfont icon-qita"></i></a>
          <p>其他</p>
          <p><span>{{policeLastWeek.three}}</span>次</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "policeToday",
        data() {
            return {
                policeToday: {one: '0', two: '0', three: '0', four: '0'},
                totalAlarm: '0',
                policeLastWeek: {one: '20', two: '8', three: '12'},
                lastWeekSwitch: false
            }
        },
        props: ['myProp'],
        watch: {
            myProp(newVal) {
                console.log(newVal)
            },
        },
        created() {
            this.getPoliceToday();
            this.policeLastWeekFn();
        },
        methods: {
            getPoliceToday() {
                this.$ajax.get(this.$URL + '/homePage/selectTodayHandlingCount').then((res) => {
                    if (res.data.code == 200) {
                        let temp = res.data.data.todayHandlingCount.toString();
                        this.policeToday.one = temp.length > 3 ? temp.split('')[temp.length - 4] : '0';
                        this.policeToday.two = temp.length > 2 ? temp.split('')[temp.length - 3] : '0';
                        this.policeToday.three = temp.length > 1 ? temp.split('')[temp.length - 2] : '0';
                        this.policeToday.four = temp.length > 0 ? temp.split('')[temp.length - 1] : '0';
                        this.totalAlarm = res.data.data.thisWeekHandlingCount;
                    } else {
                        // this.$Message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            policeLastWeekFn() {
                this.$ajax.get(this.$URL + '/homePage/selectLastWeekHandlingCount').then((res) => {
                    if (res.data.code == 200) {
                        this.policeLastWeek.one = res.data.data.policeOfficer;
                        this.policeLastWeek.two = res.data.data.fireAlarm;
                        this.policeLastWeek.three = res.data.data.other;
                        // console.log(res.data.data, 1234526);
                    } else {
                        this.policeLastWeek.one = '0';
                        this.policeLastWeek.one = '0';
                        this.policeLastWeek.one = '0';
                        this.$Message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>
