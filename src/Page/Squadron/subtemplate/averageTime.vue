<!--出警处理平均耗时-->
<template>
  <div class="average-time">
    <p>出警处理平均耗时</p>
    <div id="myChart5" class="my-chart5"></div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require("echarts/lib/chart/gauge");
    // 引入提示框和title组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    // require('echarts/lib/component/dataZoom');

    export default {
        name: "averageTime",
        data() {
            return {
                gaugeRadius: '56px',
                yearPanel: {
                    oneName: '35',
                    oneYear: '2016年',
                    twoName: '25',
                    twoYear: '2017年',
                    threeName: '18',
                    threeYear: '2018年'
                }
            }
        },
        mounted() {
            this.drawingFn();
        },
        methods: {
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart5'));
                myChart.setOption(
                    {

                        tooltip: {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        toolbox: {
                            feature: {
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            top: '10px',
                            left: '40px',
                            right: '30px',
                            bottom: '24px',
                            containLabel: true
                        },
                        series: [
                            {
                                name: '业务指标',
                                type: 'gauge',
                                startAngle: 210,
                                endAngle: -30,
                                // min:350,
                                // max:950,
                                center: ['18%', '70px'], // 默认全局居中
                                radius: this.gaugeRadius,
                                // detail: {formatter: '{value}%'},
                                detail: {
                                    offsetCenter: [0, 0],
                                    formatter: `{a|${this.yearPanel.oneName}}{b|分钟}\n{c|${this.yearPanel.oneYear}}`,
                                    rich: {
                                        a: {
                                            color: 'rgba(245,153,13,0.6)',
                                            fontSize: 26,
                                            // padding: [0, 0, 0, 0]
                                        },
                                        b: {
                                            color: 'rgba(245,153,13,0.6)',
                                            fontSize: 14,
                                            padding: [10, 0, 20, 0]
                                        },
                                        c: {
                                            fontSize: 22,
                                            padding: [-25, 0, 15, 0]
                                        }
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        width: 10,
                                        shadowBlur: 0,
                                        color: [
                                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                                {
                                                    offset: 0.1,
                                                    color: '#00126E'
                                                },
                                                {
                                                    offset: 0.4,
                                                    color: '#4DCB73'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#F8990D'
                                                }
                                            ])]],
                                    }
                                },
                                splitLine: {//分隔线样式相关
                                    length: 10,//分割线的长度
                                    lineStyle: {
                                        width: 1,
                                        color: '#fff'
                                    }
                                },
                                axisLabel: {//大刻度标签。
                                    show: false
                                },
                                axisTick: {//小刻度相关
                                    show: false
                                },
                                pointer: {
                                    show: false,
                                },
                            },
                            {
                                name: '业务指标',
                                type: 'gauge',
                                startAngle: 210,
                                endAngle: -30,
                                center: ['50%', '70px'], // 默认全局居中
                                radius: this.gaugeRadius,
                                detail: {
                                    offsetCenter: [0, 0],
                                    formatter: `{a|${this.yearPanel.twoName}}{b|分钟}\n{c|${this.yearPanel.twoYear}}`,
                                    rich: {
                                        a: {
                                            color: 'rgba(0,18,110,0.8)',
                                            fontSize: 26,
                                        },
                                        b: {
                                            color: 'rgba(0,18,110,0.8)',
                                            fontSize: 14,
                                            padding: [10, 0, 20, 0]
                                        },
                                        c: {
                                            fontSize: 22,
                                            padding: [-25, 0, 15, 0]
                                        }
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        width: 10,
                                        shadowBlur: 0,
                                        color: [
                                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                                {
                                                    offset: 0.1,
                                                    color: '#00126E'
                                                },
                                                {
                                                    offset: 0.4,
                                                    color: '#4DCB73'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#F8990D'
                                                }
                                            ])]],
                                    }
                                },
                                splitLine: {//分隔线样式相关
                                    length: 10,//分割线的长度
                                    lineStyle: {
                                        width: 1,
                                        color: '#fff'
                                    }
                                },
                                axisLabel: {//大刻度标签。
                                    show: false
                                },
                                axisTick: {//小刻度相关
                                    show: false
                                },
                                pointer: {
                                    show: false,
                                },
                                // data: [{value: 50, name: '<b>35</b>分钟'}]
                            },
                            {
                                name: '业务指标',
                                type: 'gauge',
                                startAngle: 210,
                                endAngle: -30,
                                // min:350,
                                // max:950,
                                center: ['82%', '70px'], // 默认全局居中
                                radius: this.gaugeRadius,
                                // detail: {formatter: '{value}%'},
                                detail: {
                                    offsetCenter: [0, 0],
                                    formatter: `{a|${this.yearPanel.threeName}}{b|分钟}\n{c|${this.yearPanel.threeYear}}`,
                                    rich: {
                                        a: {
                                            color: 'rgba(73,109,255,0.9)',
                                            fontSize: 26,
                                        },
                                        b: {
                                            color: 'rgba(73,109,255,0.9)',
                                            fontSize: 14,
                                            padding: [10, 0, 20, 0]
                                        },
                                        c: {
                                            fontSize: 22,
                                            padding: [-25, 0, 15, 0]
                                        }
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        width: 10,
                                        shadowBlur: 0,
                                        // color: [[0.3, '#6ced91'],[0.7, '#06a8fd'],[1, '#fe6b7d']]
                                        color: [
                                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                                {
                                                    offset: 0.1,
                                                    color: '#00126E'
                                                },
                                                {
                                                    offset: 0.4,
                                                    color: '#4DCB73'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#F8990D'
                                                }
                                            ])]],
                                    }
                                },
                                splitLine: {//分隔线样式相关
                                    length: 10,//分割线的长度
                                    lineStyle: {
                                        width: 1,
                                        color: '#fff'
                                    }
                                },
                                axisLabel: {//大刻度标签。
                                    show: false
                                },
                                axisTick: {//小刻度相关
                                    show: false
                                },
                                pointer: {
                                    show: false,
                                },
                                // data: [{value: 50, name: '<b>35</b>分钟'}]
                            },
                        ]
                    }
                );
            },
        }
    }
</script>

<style scoped>

</style>
