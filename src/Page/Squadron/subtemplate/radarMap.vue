<!--雷达图模板-->
<template>
  <div class="radar-map">
    <p>雷达属性</p>
    <div id="myChart3" class="my-chart3"></div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require("echarts/lib/chart/radar");
    // 引入提示框和title组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/dataZoom');
    export default {
        name: "radarMap",
        data() {
            return {}
        },
        mounted(){
            this.drawingFn();
        },
        methods: {
            drawingFn(){
                let myChart = echarts.init(document.getElementById('myChart3'));
                myChart.setOption(
                    {
                        backgroundColor: "#2E3444",
                        color: ['#3D91F7', '#61BE67'],

                        title: {
                            text: '基础雷达图'
                        },
                        tooltip: {},
                        legend: {
                            show: true,
                            icon: "circle",
                            bottom: 30,
                            center: 0,
                            itemWidth: 14,
                            itemHeight: 14,
                            itemGap: 21,
                            orient: "horizontal",
                            data: ['a', 'b'],
                            textStyle: {
                                fontSize: 14,
                                color: '#8C8C8C'
                            },
                        },
                        radar: {
                            // shape: 'circle',
                            name: {
                                textStyle: {
                                    color: '#fff',
                                    borderRadius: 3,
                                    padding: [3, 5]
                                }
                            },
                            indicator: [{
                                name: '资金周转',
                                max: 6500
                            },

                                {
                                    name: '金融理财',
                                    max: 30000
                                },
                                {
                                    name: '投资',
                                    max: 38000
                                },
                                {
                                    name: '个人消费',
                                    max: 52000
                                },
                                {
                                    name: '固定资产',
                                    max: 25000
                                },
                                {
                                    name: '生产经营',
                                    max: 25000
                                }
                            ],
                            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                                show: true,
                                areaStyle: { // 分隔区域的样式设置。
                                    color: ['#21293d'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。


                                }

                            },
                            // axisLabel:{//展示刻度
                            //     show: true
                            // },
                            axisLine: { //指向外圈文本的分隔线样式
                                lineStyle: {
                                    color: '#E5E5E6'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#E5E5E6', // 分隔线颜色
                                    width: 1, // 分隔线线宽
                                }
                            }

                        },

                        series: [{
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            //areaStyle: {normal: {}},

                            data: [{
                                value: [4300, 28000, 35000, 50000, 19000, 21000],
                                name: 'a',
                                areaStyle: {
                                    normal: {
                                        color: '#366BAF'
                                    },
                                },


                            },
                                {
                                    value: [5000, 28000, 31000, 42000, 21000, 19000],
                                    name: 'b',
                                    areaStyle: {
                                        normal: {
                                            color: '#4B8659'
                                        },
                                    },
                                }
                            ]
                        }]
                    }
                );
            },
        }
    }
</script>

<style scoped>

</style>
