<!--天气模板-->
<template>
  <div class="weather-box">
    <ul>
      <li>
        <div>
          {{'发布时间：'+dateTime}}
        </div>
        <div>
          <span>发布范围：</span>
          <span>{{weatherData.place}}</span>
        </div>
      </li>
      <li>
        <div v-show="weatherData.alarmMsgTitle!='None'">{{weatherData.alarmMsgTitle}}</div>
        <div v-show="weatherData.alarmMsgTitle=='None'">暂无天气预警</div>
      </li>
      <li>{{weatherData.aqi}}</li>
      <li><span>温度：</span><span>{{weatherData.curTemp}}</span></li>
      <li>{{weatherData.realIcomfort}}</li>
    </ul>
    <div class="weather-img" v-show="weatherData.alarmMsgImg=='None'"></div>
        <div class="weather-img-box" v-show="weatherData.alarmMsgImg!='None'"
             :style="{backgroundImage:'url('+weatherData.alarmMsgImg+ ')'}"></div>
  </div>
</template>

<script>
    export default {
        name: "weatherBox",
        data() {
            return {
                weatherData: '',
                dateTime: '',
                weatherImg: false
            }
        },
        created() {
            this.getWeatherData();
            this.dateTime = this.$conversionTime(new Date());
            // console.log(this.dateTime)
        },
        methods: {
            getWeatherData() {
                this.$ajax.get(this.$URL + '/xf-unit/homePage/getWeather',
                    {
                        params: {
                            place: '松江'
                        }
                    }
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.weatherData = res.data.data;
                        // this.weatherData.alarmMsgImg='http://image.nmc.cn/assets/img/alarm/p0007004.png';
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
        }
    }
</script>

