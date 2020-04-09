<!--接警量趋势-->
<template>
  <div class="alarm-trend">
    <p>接警量趋势</p>
    <div id="myChart12" class="my-chart12"></div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require("echarts/lib/chart/line");
    // 引入提示框和title组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/dataZoom');
    export default {
        name: "alarmTrend",
        data() {
            return {
                dataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dataY1: [],//[96.3,96.4,97.5,95.6,98.1,94.8,89.6,94.1,80.1,52.4,75.8,94.7],
                dataY2: [],//[97.3,99.2,99.3,100.0,99.6,90.6,80.0,91.5,69.8,67.5,90.4,84.9],
                dataY3: [],//[84.2,81.0,67.5,72.1,43.7,88.5,91.9,101.8,79.7,87.6,92.9,0]
                dataTitle: ['2018', '2019', '2020'],

                fontColor1: 'rgba(102, 102, 102, 1)',
                fontColor2: 'rgba(102,102,102,0.2)',
            }
        },
        mounted() {
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,0.4)';
                // this.fontColor3 = 'rgba(255, 255, 255, 1)';
                // this.fontColor4 = 'rgba(255,255,255,1)';
            }
            this.drawingFn();
            this.getAlarmReceptionTrend();
        },
        methods: {
            getAlarmReceptionTrend() {
                this.$ajax.get(this.$URL + '/xf-unit/decisionSupport/alarmVolumeTrend').then((res) => {
                    if (res.data.code == 200) {
                        this.dataTitle = [];
                        this.dataY1 = [];
                        this.dataY2 = [];
                        this.dataY3 = [];
                        this.dataX = [];

                        for (let prop in res.data.data) {
                            this.dataTitle.push(prop);
                            res.data.data[prop].map((e) => {
                                if (prop == this.dataTitle[0]) {
                                    this.dataY1.push(e.count);
                                }
                                if (prop == this.dataTitle[1]) {
                                    this.dataY2.push(e.count);
                                }
                                if (prop == this.dataTitle[2]) {
                                    this.dataY3.push(e.count);
                                    this.dataX.push((e.date.substr(5, 2) - 0) + '月')
                                }
                            })
                        }
                        this.drawingFn();
                    } else {
                        this.$message.error(res.data.message)
                    }
                    // this.drawingFn();
                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart12'));
                myChart.setOption(
                    {
                        // backgroundColor: '#394056',
                        title: {
                            text: '',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 14,
                                // color: '#666'
                            },
                            left: '6%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    // color: '#57617B'
                                }
                            }
                        },
                        legend: {
                            icon: 'rect',
                            itemWidth: 14,
                            itemHeight: 5,
                            itemGap: 13,
                            data: this.dataTitle,
                            right: '4%',
                            textStyle: {
                                fontSize: 14,
                                color: this.fontColor1
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: this.fontColor2,
                                }
                            },
                            axisTick: {//坐标轴刻度相关设置。
                                show: false,
                            },
                            axisLabel: {
                                interval: 0,
                                textStyle: {
                                    color: this.fontColor1,
                                    fontSize: 14,
                                }
                            },
                            data: this.dataX
                        }],
                        yAxis: [{
                            type: 'value',
                            minInterval: 1,
                            splitNumber: 4,
                            axisTick: {
                                show: true,
                                lineStyle: {
                                    color: this.fontColor2
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: this.fontColor1
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14,
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: this.fontColor2
                                }
                            }
                        }],
                        series: [{
                            name: this.dataTitle[0],
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            // areaStyle: {
                            //     normal: {
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: 'rgba(137, 189, 27, 0.3)'
                            //         }, {
                            //             offset: 0.8,
                            //             color: 'rgba(137, 189, 27, 0)'
                            //         }], false),
                            //         shadowColor: 'rgba(0, 0, 0, 0.1)',
                            //         shadowBlur: 10
                            //     }
                            // },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(137,189,27)'
                                }
                            },
                            data: this.dataY1
                        }, {
                            name: this.dataTitle[1],
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            // areaStyle: {
                            //     normal: {
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: 'rgba(0, 136, 212, 0.3)'
                            //         }, {
                            //             offset: 0.8,
                            //             color: 'rgba(0, 136, 212, 0)'
                            //         }], false),
                            //         shadowColor: 'rgba(0, 0, 0, 0.1)',
                            //         shadowBlur: 10
                            //     }
                            // },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(0,136,212)'
                                }
                            },
                            data: this.dataY2
                        }, {
                            name: this.dataTitle[2],
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            // areaStyle: {
                            //     normal: {
                            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //             offset: 0,
                            //             color: 'rgba(219, 50, 51, 0.3)'
                            //         }, {
                            //             offset: 0.8,
                            //             color: 'rgba(219, 50, 51, 0)'
                            //         }], false),
                            //         shadowColor: 'rgba(0, 0, 0, 0.1)',
                            //         shadowBlur: 10
                            //     }
                            // },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(219,50,51)'
                                }
                            },
                            data: this.dataY3
                        },]
                    }
                );
            },
        }
    }
</script>
