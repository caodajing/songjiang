<!--平均到场时效-->
<template>
  <div class="average-arrival">
    <div class="head-title">
      <span>平均到场时效</span>
      <ul>
        <li @click="type=1,presentTimeliness()" :class="{active:type==1}">周</li>
        <li @click="type=2,presentTimeliness()" :class="{active:type==2}">月</li>
        <li @click="type=3,presentTimeliness()" :class="{active:type==3}">年</li>
      </ul>
    </div>
    <div id="myChart11" class="my-chart11"></div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require("echarts/lib/chart/bar");
    // 引入提示框和title组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/dataZoom');
    export default {
        name: "averageArrival",
        data() {
            return {
                type: '1',//周 1   月 2   年3

                dataX: ["泗泾中队", "叶榭中队", "仓桥中队", "岳阳中队", "佘山中队", "大港中队", "新浜中队", "松一中队", "九亭中队", "车墩中队", "新桥中队", "泖港中队", "松江中队"],
                dataY: [],

                fontColor1: 'rgba(102,102,102,1)',
                fontColor2: 'rgba(221,221,221,0.9)',
                fontColor3: 'rgba(221,221,221,0.5)',
            }
        },
        mounted() {
            this.presentTimeliness();
            this.drawingFn();
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,0.2)';
                this.fontColor3 = 'rgba(255,255,255,0.4)';
            }
        },
        methods: {
            presentTimeliness() {
                this.$ajax.get(this.$URL + '/xf-unit/decisionSupport/averageArrivalTime', {
                    params: {
                        type: this.type
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.dataX = [];
                        this.dataY = [];
                        res.data.data.map((e) => {
                            this.dataX.push(e.name);
                            this.dataY.push(e.minute);
                        });
                        // console.log(this.dataX)
                    } else {
                        // this.$message.error(res.data.message)
                    }
                    this.drawingFn();
                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart11'));
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '20px',
                            right: '20px',
                            bottom: '24px',
                            containLabel: true
                        },
                        xAxis: {
                            data: this.dataX,
                            axisLine: {
                                lineStyle: {
                                    color: this.fontColor2,
                                }
                            },
                            axisTick: {//坐标轴刻度相关设置。
                                show: false,
                            },
                            axisLabel: {
                                color: this.fontColor1,
                                fontSize: 14,
                                interval: 0,
                            }
                        },
                        yAxis: {
                            name: "",
                            nameTextStyle: {
                                color: this.fontColor1,
                                fontSize: 14
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: this.fontColor2,
                                }
                            },
                            axisLabel: {
                                color: this.fontColor1,
                                fontSize: 14
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: this.fontColor3,
                                    // type: 'dashed'
                                }
                            },
                            minInterval: 1,
                            splitNumber: 4

                        },
                        dataZoom: [{
                            show: true,
                            height: 15,
                            xAxisIndex: [
                                0
                            ],
                            bottom: 2,
                            start: 0,
                            end: 22,
                            handleSize: '100%',
                            handleStyle: {
                                color: "#e55967",

                            },
                            textStyle: {
                                color: "#42cca6"
                            },
                            borderColor: "#2096ff"


                        }, {
                            "type": "inside",
                            "show": true,
                            "height": 15,
                            "start": 1,
                            "end": 35
                        }],
                        series: [{
                            type: 'bar',
                            barWidth: 18,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00b0ff'
                                    }, {
                                        offset: 0.8,
                                        color: '#7052f4'
                                    }], false)
                                }
                            },
                            data: this.dataY
                        }]
                    }
                );
            },
        }
    }
</script>

<style scoped>

</style>
