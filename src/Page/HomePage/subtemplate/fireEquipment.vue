<!--消防装备统计-->
<template>
  <div class="fire-equipment">
    <p class="head-title">消防装备统计</p>
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
        name: "fireEquipment",
        data() {
            return {
                dataX: ["个人防护", "抢险救援器材", "灭火器材装备", "灭火药剂", "其他类消防装备", "特种消防装备", "消防车，船(艇)，飞行器", "消防通讯指挥装备", "训练器材", "低压消防泵", "未分类", "救生", "排爆", "空勤类"],
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
            this.fireEquipment();
        },
        methods: {
            fireEquipment() {
                this.$ajax.get(this.$URL + '/xf-unit/homePage/fireEquipmentStatistics').then((res) => {
                    if (res.data.code == 200) {
                        this.dataX = [];
                        this.dataY = [];
                        res.data.data.map((e) => {
                            this.dataX.push(e.equipmentTypeName);
                            this.dataY.push(e.count);
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
                            left: '20px',
                            right: '20px',
                            bottom: '24px',
                            containLabel: true
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
                            name: '单位(件)',
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
