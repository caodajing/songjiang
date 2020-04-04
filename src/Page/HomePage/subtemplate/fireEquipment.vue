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
            return {}
        },
        mounted() {
            this.drawingFn();
        },
        methods: {
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart2'));
                myChart.setOption(
                    {
                        grid: {
                            left: '20px',
                            right: '20px',
                            bottom: '10px',
                            containLabel: true
                        },
                        xAxis: {
                            data: ['涉恐人员', '涉稳人员', '涉毒人员', '在逃人员', '刑事犯罪\n前科、劣迹人员', '肇事肇祸\n精神病人', '重点上访\n人员'],
                            axisLine: {
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            axisLabel: {
                                color: '#666',
                                fontSize: 14
                            }
                        },
                        yAxis: {
                            name: "（人）",
                            nameTextStyle: {
                                color: '#666',
                                fontSize: 16
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            axisLabel: {
                                color: '#666',
                                fontSize: 16
                            },
                            splitLine: {
                                show:false,
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            minInterval: 1,

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
                            handleStyle:{
                                color:"#e55967",

                            },
                            textStyle:{
                                color:"#42cca6"},
                            borderColor:"#2096ff"


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
                            itemStyle:{
                                normal:{
                                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00b0ff'
                                    }, {
                                        offset: 0.8,
                                        color: '#7052f4'
                                    }], false)
                                }
                            },
                            data: [254, 3254, 1654, 2454, 4757, 2011, 1211]
                        }]
                    }
                );
            },
        }
    }
</script>

<style scoped>

</style>
