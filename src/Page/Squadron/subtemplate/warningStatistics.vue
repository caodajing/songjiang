<!--警情处置统计模板-->
<template>
  <div class="warning-statistics">
    <p>警情处置统计</p>
    <div id="myChart6" class="my-chart6"></div>
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
    // require('echarts/lib/component/dataZoom');
    export default {
        name: "warningStatistics",
        data() {
            return {
                groupId: '',

                dataTitle: [],
                dataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
                dataY1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                dataY2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                dataY3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                fontColor1: 'rgba(136, 136, 136, 1)',
                fontColor2: 'rgba(221, 221, 221, 1)',
                fontColor3: 'rgba(88, 88, 88, 0.7)',
            }
        },
        props: ['myProp'],
        watch: {
            myProp(newVal) {
                this.groupId = JSON.parse(newVal).groupId;
                this.getDisposalStatistics();
            },
        },
        mounted() {
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,0.9)';
                this.fontColor2 = 'rgba(255,255,255,0.5)';
                this.fontColor3 = 'rgba(255,255,255,0.9)';
            }
            this.drawingFn();
        },
        methods: {
            getDisposalStatistics(data) {
                this.$ajax.get(this.$URL + '/xf-unit/dutySquadron/policeDispositionStatistics', {
                    params: {
                        groupId: this.groupId
                    }
                }).then((res) => {
                    this.dataTitle = [];
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
                        // console.log(this.dataTitle,this.dataY1,this.dataY2,this.dataY3)
                        this.drawingFn();
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart6'));
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            color: ["#19A689", "#59BCFB", "#59BCFB"],
                            data: this.dataTitle,
                            left: 'center',
                            bottom: 'bottom'
                        },
                        grid: {
                            top: 'middle',
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            height: '80%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: this.dataX,
                            axisLine: {
                                lineStyle: {
                                    color: this.fontColor1,
                                }
                            },
                            axisLabel: {
                                interval: 0,
                                // fontSize: 14,
                            }
                        },
                        yAxis: {
                            type: 'value',
                            minInterval: 1,
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    color: this.fontColor2
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: this.fontColor3
                                },
                            },
                            nameTextStyle: {
                                color: "#999"
                            },
                            splitArea: {
                                show: false
                            }
                        },
                        series: [{
                            name: this.dataTitle[0],
                            type: 'line',
                            data: this.dataY1,
                            color: "#F58080",
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#FFCAD4' // 0% 处的颜色
                                        }, {
                                            offset: 0.4,
                                            color: '#F58080' // 100% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#F58080' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(245,128,128, 0.5)',
                                    shadowBlur: 2,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F58080',
                                    borderWidth: 2,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                     shadowBlur: 100,*/
                                    borderColor: "#F58080"
                                }
                            },
                            smooth: true
                        },
                            {
                                name: this.dataTitle[1],
                                type: 'line',
                                data: this.dataY2,
                                lineStyle: {
                                    normal: {
                                        width: 1,
                                        color: {
                                            type: 'linear',

                                            colorStops: [{
                                                offset: 0,
                                                color: '#AAF487' // 0% 处的颜色
                                            },
                                                {
                                                    offset: 0.4,
                                                    color: '#47D8BE' // 100% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#47D8BE' // 100% 处的颜色
                                                }
                                            ],
                                            globalCoord: false // 缺省为 false
                                        },
                                        shadowColor: 'rgba(71,216,190, 0.5)',
                                        shadowBlur: 2,
                                        shadowOffsetY: 7
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#AAF487',
                                        borderWidth: 2,
                                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                                         shadowBlur: 100,*/
                                        borderColor: "#AAF487"
                                    }
                                },
                                smooth: true
                            },
                            {
                                name: this.dataTitle[2],
                                type: 'line',
                                data: this.dataY3,
                                lineStyle: {
                                    normal: {
                                        width: 1,
                                        color: {
                                            type: 'linear',

                                            colorStops: [{
                                                offset: 0,
                                                color: '#F6D06F' // 0% 处的颜色
                                            },
                                                {
                                                    offset: 0.4,
                                                    color: '#F9A589' // 100% 处的颜色
                                                }, {
                                                    offset: 1,
                                                    color: '#F9A589' // 100% 处的颜色
                                                }
                                            ],
                                            globalCoord: false // 缺省为 false
                                        },
                                        shadowColor: 'rgba(249,165,137, 0.5)',
                                        shadowBlur: 2,
                                        shadowOffsetY: 7
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#F6D06F',
                                        borderWidth: 2,
                                        /*shadowColor: 'rgba(72,216,191, 0.3)',
                                         shadowBlur: 100,*/
                                        borderColor: "#F6D06F"
                                    }
                                },
                                smooth: true
                            }
                        ]
                    }
                );
            },
        }
    }
</script>

<style scoped>

</style>
