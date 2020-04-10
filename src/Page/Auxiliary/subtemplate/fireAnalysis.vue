<!--火患分析-->
<template>
    <div class="fire-analysis">
        <p>火患分析</p>
        <div class="double-graphs">
            <div id="myChart9" class="my-chart9"></div>
            <div id="myChart10" class="my-chart10"></div>
        </div>
    </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require("echarts/lib/chart/treemap");
    // 引入提示框和title组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/dataZoom');
    export default {
        name: "fireAnalysis",
        data() {
            return {
                dataY: [],

                fontColor1: 'rgba(102,102,102,1)',
                fontColor2: 'rgba(255,255,255,0.9)',
            }
        },
        mounted() {
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                // this.fontColor2 = 'rgba(255,255,255,0.9)';
            }
            this.drawingFn();
            this.drawingFn1()
        },
        methods: {
            drawingFn() {
                this.dataY = [
                    {
                        value: 34.78,
                        name: "未依法申请消防行政或许可备案"
                    },
                    {
                        value: 27.78,
                        name: "占用、堵塞、封闭疏散通道、安全出口类"
                    },
                    {
                        value: 8.72,
                        name: "消防设施未保持完好"
                    },
                    {
                        value: 6.73,
                        name: "其他"
                    },
                    {
                        value: 5.24,
                        name: "占用、毒舌"
                    },
                    {
                        value: 4,
                        name: "分类4"
                    },
                    {
                        value: 6,
                        name: "分类9"
                    },
                    {
                        value: 2,
                        name: ""
                    },
                    {
                        value: 2,
                        name: ""
                    },
                    {
                        value: 2,
                        name: ""
                    },
                ];
                let myChart = echarts.init(document.getElementById('myChart9'));
                for (let n in this.dataY) {
                    this.dataY[n]['name'] = this.dataY[n]['name'] + ' ' + this.dataY[n]['value'] + '%'
                }
                myChart.setOption(
                    {
                        // backgroundColor: "#000",
                        title: {
                            text: '火患类别占比',
                            subtext: '',
                            left: '50%',
                            top: '5px',
                            textAlign: 'center',
                            textStyle: {
                                color: this.fontColor1,
                                fontWeight: 'normal',
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}"
                        },
                        series: [{
                            type: 'treemap',
                            width: '100%',
                            height: '85%',
                            top: '15%',
                            roam: false, //是否开启拖拽漫游（移动和缩放）
                            nodeClick: false, //点击节点后的行为,false无反应
                            breadcrumb: {
                                show: false
                            },
                            label: { //描述了每个矩形中，文本标签的样式。
                                normal: {
                                    show: true,
                                    position: ['10%', '40%']
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14,
                                    },
                                    borderWidth: 1,
                                    borderColor: this.fontColor2,
                                },

                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: this.dataY
                        }]
                    }
                );
            },
            drawingFn1() {
                this.dataY = [
                    {
                        value: 14.78,
                        name: "居民住宅"
                    },
                    {
                        value: 27.78,
                        name: "餐饮、商店、旅馆"
                    },
                    {
                        value: 8.72,
                        name: "生产加工企业"
                    },
                    {
                        value: 6.73,
                        name: "仓库、物流"
                    },
                    {
                        value: 5.24,
                        name: "宾馆饭店"
                    },
                    {
                        value: 4,
                        name: "商场、市场"
                    },
                    {
                        value: 6,
                        name: "校园、幼儿园"
                    },
                    {
                        value: 2,
                        name: "体育场所"
                    },
                    {
                        value: 2,
                        name: ""
                    },
                    {
                        value: 2,
                        name: ""
                    },
                ];
                let myChart = echarts.init(document.getElementById('myChart10'));
                for (let n in this.dataY) {
                    this.dataY[n]['name'] = this.dataY[n]['name'] + ' ' + this.dataY[n]['value'] + '%'
                }
                myChart.setOption(
                    {
                        // backgroundColor: "#000",
                        title: {
                            text: '火患场所占比',
                            subtext: '',
                            left: '50%',
                            top: '5px',
                            textAlign: 'center',
                            textStyle: {
                                color: this.fontColor1,
                                fontWeight: 'normal',
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}"
                        },
                        series: [{
                            type: 'treemap',
                            width: '100%',
                            height: '85%',
                            top: '15%',
                            roam: false, //是否开启拖拽漫游（移动和缩放）
                            nodeClick: false, //点击节点后的行为,false无反应
                            breadcrumb: {
                                show: false
                            },
                            label: { //描述了每个矩形中，文本标签的样式。
                                normal: {
                                    show: true,
                                    position: ['10%', '40%']
                                }
                            },
                            itemStyle: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14,
                                    },
                                    borderWidth: 1,
                                    borderColor: this.fontColor2,
                                },

                                emphasis: {
                                    label: {
                                        show: true
                                    }
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
