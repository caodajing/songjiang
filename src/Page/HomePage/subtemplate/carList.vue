<!--消防装备统计-->
<template>
  <div class="fire-equipment">
    <p class="head-title">各中队消防车辆情况</p>
    <div id="myChart2" class="my-chart2"></div>
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
        name: "carList",
        data() {
            return {
                dataX: [],
                dataY: [],

                fontColor1: 'rgba(102,102,102,1)',
                fontColor2: 'rgba(221,221,221,0.8)',
                fontColor3: 'rgba(221,221,221,0.8)',
            }
        },
        mounted() {
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,0.4)';
            }
            this.drawingFn();
            this.getCarList();
        },
        methods: {  
            getCarList() {
                this.$ajax.get(this.$dataSetUrlTest + '/xf-unit/car/everyGroupCarSituation').then((res) => {
                    if (res.data.code == 200) {
                        this.dataX = [];
                        this.dataY = [];
                        res.data.data.map((e) => {
                            this.dataX.push(e.groupName);
                            this.dataY.push(e.carCount);
                        });
                    } else {
                        this.$message.error(res.data.message)
                    }
                    this.drawingFn();

                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart2'));
                myChart.setOption(
                    {
                        grid: {
                            left: '30px',
                            right: '20px',
                            bottom: '24px',
                            containLabel: true
                        },
                        legend: {
                            data: ['车辆数'],
                            x: 'right',      //可设定图例在左、右、居中
                            // y:'center',     //可设定图例在上、下、居中
                            padding: [10, 10, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                            itemWidth:10,
                            itemHeight:10,
                            textStyle: {
                                color: ['#666'],
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: {
                            data: this.dataX,
                            axisLine: {
                                lineStyle: {
                                    color: this.fontColor3
                                }
                            },
                            axisLabel: {
                                color: this.fontColor1,
                                fontSize: 14,
                                interval: 0,
                            }
                        },
                        yAxis: {
                            name: '单位(辆)',
                            nameTextStyle: {
                                color: this.fontColor1,
                                fontSize: 14
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: this.fontColor3
                                }
                            },
                            axisLabel: {
                                color: this.fontColor1,
                                fontSize: 14
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: this.fontColor3
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
                            end: 30,
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
                            name:"车辆数",
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
