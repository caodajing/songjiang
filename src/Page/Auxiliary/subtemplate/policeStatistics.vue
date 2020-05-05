<!--警力统计-->
<template>
  <div class="police-statistics">
    <p class="head-title">警力统计</p>
    <div id="myChart7" class="my-chart7"></div>
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
        name: "policeStatistics",
        data() {
            return {
                dataX: ["泗泾中队", "叶榭中队", "仓桥中队", "上海总队", "岳阳中队", "佘山中队", "大港中队", "新浜中队", "松一中队", "九亭中队", "车墩中队", "新桥中队", "泖港中队", "松江支队", "松江中队"],
                dataY1: [],
                dataY2: [],
                dataY3: [],
                fontColor1:'rgba(168,170,176,0.9)',
                fontColor2:'rgba(102,102,102,0.9)',
                fontColor3:'rgba(102,102,102,0.2)',
            }
        },
        created() {
            this.getStatisticsFn();
        },
        mounted(){
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,0.9)';
                this.fontColor3 = 'rgba(255, 255, 255, 0.4)';
                // this.fontColor4 = 'rgba(255,255,255,1)';
            }
            this.drawingFn();
        },
        methods: {
            getStatisticsFn() {
                this.$ajax.get(this.$dataSetUrlTest + '/xf-unit/decisionSupport/policeStatisticsOnType').then((res) => {
                    if (res.data.code == 200) {
                        this.dataX = [];
                        this.dataY1 = [];
                        this.dataY2 = [];
                        this.dataY3 = [];
                        res.data.data.map((e) => {
                            this.dataX.push(e.groupName);
                            this.dataY1.push(e.carCount);
                            this.dataY2.push(e.zhengFuCount);
                            this.dataY3.push(e.xianYiCount);
                        });
                    } else {
                        // this.$message.error(res.data.message)
                    }
                    this.drawingFn();
                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart7'));
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '30px',
                            right: '20px',
                            bottom: '20px',
                            // top: 30,
                            // padding: '0 0 10 0',
                            containLabel: true,
                        },
                        legend: {//图例组件，颜色和名字
                            right: 10,
                            top: 0,
                            itemGap: 16,
                            itemWidth: 10,
                            itemHeight: 10,
                            data: [
                                {
                                    name: '消防车（辆）',
                                },
                                {
                                    name: '现役消防士（人）',
                                },
                                {
                                    name: '政府专职消防员（人）',
                                },
                                
                            ],
                            textStyle: {
                                color: this.fontColor1,
                                fontStyle: 'normal',
                                fontFamily: '微软雅黑',
                                fontSize: 14,
                            }
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,//坐标轴两边留白
                                data: this.dataX,
                                axisLabel: { //坐标轴刻度标签的相关设置。
                                    interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                                    margin: 15,
                                    textStyle: {
                                        color: this.fontColor2,
                                        fontSize: 14,
                                    }
                                },
                                axisTick: {//坐标轴刻度相关设置。
                                    show: false,
                                },
                                axisLine: {//坐标轴轴线相关设置
                                    lineStyle: {
                                        color: this.fontColor2,
                                        opacity: 0.2
                                    }
                                },
                                splitLine: { //坐标轴在 grid 区域中的分隔线。
                                    show: false,
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '',
                                nameTextStyle: {
                                    color: this.fontColor2,
                                    padding: [0, 0, 0, -20]    // 四个数字分别为上右下左与原位置距离
                                },
                                minInterval: 1,
                                splitNumber: 4,
                                axisLabel: {
                                    textStyle: {
                                        color: this.fontColor2,
                                        fontStyle: 'normal',
                                        fontFamily: '微软雅黑',
                                        fontSize: 14,
                                    }
                                },
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: this.fontColor3,
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: this.fontColor3,
                                    }
                                }

                            }
                        ],
                        dataZoom: [
                            {
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
                            }, 
                            {
                                "type": "inside",
                                "show": true,
                                "height": 15,
                                "start": 1,
                                "end": 35
                            }
                        ],
                        series: [
                            {
                                name: '消防车（辆）',
                                type: 'bar',
                                data: this.dataY1,
                                barWidth: 10,
                                barGap: 0,//柱间距离
                                label: {//图形上的文本标签
                                    normal: {
                                        show: false,
                                        position: 'top',
                                        textStyle: {
                                            color: this.fontColor1,
                                            fontStyle: 'normal',
                                            fontFamily: '微软雅黑',
                                            fontSize: 14,
                                        },
                                    },
                                },
                                itemStyle: {//图形样式
                                    normal: {
                                        // barBorderRadius: [5, 5, 0, 0],
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 1, color: '#8D68FC'
                                        }, {
                                            offset: 0.2, color: '#4EA0FB'
                                        }], false),
                                    },
                                },
                            },
                            {
                                name: '政府专职消防员（人）',
                                type: 'bar',
                                data: this.dataY2,
                                barWidth: 10,
                                stack: '消防',
                                label: {//图形上的文本标签
                                    normal: {
                                        show: false,
                                        position: 'top',
                                        textStyle: {
                                            color: this.fontColor1,
                                            fontStyle: 'normal',
                                            fontFamily: '微软雅黑',
                                            fontSize: 14,
                                        },
                                    },
                                },
                                itemStyle: {//图形样式
                                    normal: {
                                        // barBorderRadius: [5, 5, 0, 0],
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 1, color: '#8DDDFC'
                                        }, {
                                            offset: 0.2, color: '#4EFFFB'
                                        }], false),
                                    },
                                },
                            },
                            {
                                name: '现役消防士（人）',
                                type: 'bar',
                                data: this.dataY3,
                                barWidth: 10,
                                stack: '消防',
                                barGap: 0.2,//柱间距离
                                label: {//图形上的文本标签
                                    normal: {
                                        show: false,
                                        position: 'top',
                                        textStyle: {
                                            color: this.fontColor1,
                                            fontStyle: 'normal',
                                            fontFamily: '微软雅黑',
                                            fontSize: 14,
                                        },
                                    },
                                },
                                itemStyle: {//图形样式
                                    normal: {
                                        // barBorderRadius: [5, 5, 0, 0],
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 1, color: '#FF68FC'
                                        }, {
                                            offset: 0.2, color: '#C3A0FB'
                                        }], false),
                                    },
                                },
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
