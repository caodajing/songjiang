<!--雷达图模板-->
<template>
  <div class="radar-map1">
    <p>处警态势</p>
    <div id="policeState" class="my-chart3"></div>
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
        name: "policeState",
        data() {
            return {
                groupId: '125524365788435502',

                dataY: [0,0,0,0,0],//[9.8, 6.0, 8.8, 9.0, 8.8, 9.8]
                radiusSize: 100,

                fontColor1: 'rgba(68, 68, 68, 1)',
                fontColor2: 'rgba(73, 109, 255, 1)',
                fontColor3: 'rgba(73, 109, 255, 0.5)',
                fontColor4: 'rgba(220, 220, 220, 1)',
            }
        },
        props:['clickDept'],
        watch:{
            clickDept(newVal) {
                console.log(newVal);
                this.groupId = JSON.parse(newVal).groupId;
                this.getRadarData();
            },
        },
        mounted() {
            let tempWidth = document.getElementById('policeState').offsetWidth;
            let tempHeight = document.getElementById('policeState').offsetHeight;
            if (tempWidth - 40 > tempHeight) {
                this.radiusSize = parseInt(tempHeight * 0.3);
            } else {
                this.radiusSize = parseInt(tempWidth * 0.26);
            }

            // if (this.$route.path.indexOf('bigScreen') != -1) {
            //     this.fontColor1 = 'rgba(255,255,255,0.9)';
            //     this.fontColor2 = 'rgba(250,166,55,1)';
            //     this.fontColor3 = 'rgba(73, 109, 255, 0.8)';
            //     this.fontColor4 = 'rgba(255,255,255,0.6)';
            // }
            this.getRadarData();
            this.drawingFn();
        },
        methods: {
            drawingFn() {
                let myChart = echarts.init(document.getElementById('policeState'));
                myChart.setOption(
                    {
                        // backgroundColor: "#2E3444",
                        color: ['#3D91F7', '#61BE67'],

                        // title: {
                        //     text: '基础雷达图'
                        // },
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
                                color: '#fff'
                            },
                        },
                        tooltip:{
                            show:false
                        },
                        radar: {
                            // shape: 'circle',
                            center: ['50%', '50%'],
                            radius: this.radiusSize,

                            splitNumber: 5,
                            name: {
                                textStyle: {
                                    color: '#444',
                                    borderRadius: 3,
                                    padding: [0, 5]
                                },
                                color: '#fff',
                                padding: [0, 10, 0, 10],
                                formatter: function (value, indicator) {
                                    return '{a|' + value + '}{b|' + indicator.num + '}'
                                    // return '{a|' + value + '}\n{b|' + indicator.num + '}'

                                },
                                lineHeight: 0,
                                rich: {
                                    a: {
                                        color: this.fontColor1,
                                        fontSize: 14,
                                        align: 'center'
                                    },
                                    b: {
                                        color: this.fontColor2,
                                        fontSize: 18,
                                        align: 'center'
                                    }
                                }
                            },
                            indicator: [
                                {
                                    name: '人员能力',
                                    max: 10,
                                    num: this.dataY[0],
                                    padding: [0, 0, 0, 0]
                                },
                                {
                                    name: '处警时效',
                                    max: 10,
                                    num: this.dataY[1]
                                },
                                {
                                    name: '装备配置',
                                    max: 10,
                                    num: this.dataY[2]
                                },
                                {
                                    name: '战备工作',
                                    max: 10,
                                    num: this.dataY[3]
                                },
                                {
                                    name: '作战经历',
                                    max: 10,
                                    num: this.dataY[4]
                                },
                            ],
                            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                                show: true,
                                areaStyle: { // 分隔区域的样式设置。
                                    color: ['transparent'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                                }
                            },
                            // axisLabel:{//展示刻度
                            //     show: true
                            // },
                            axisLine: { //指向外圈文本的分隔线样式
                                lineStyle: {
                                    color: this.fontColor4
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: this.fontColor4, // 分隔线颜色
                                    width: 1, // 分隔线线宽
                                }
                            }

                        },

                        series: [{
                            name: '',
                            type: 'radar',

                            data: [{
                                value: this.dataY,
                                name: '',
                                areaStyle: {
                                    normal: {
                                        color: this.fontColor3
                                    },
                                },
                            }],
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         formatter: (params) => {
                            //             return params.value
                            //         },
                            //     },
                            // },
                        }]
                    }
                );
            },
            getRadarData(data) {  
                this.$ajax.get(this.$dataSetUrlTest + '/xf-unit/dutySquadron/radarAttributes', {
                    params: {
                        groupId: this.groupId
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.dataY=[];
                        this.dataY.push(res.data.data.personnelCapacity);
                        this.dataY.push(res.data.data.policeTime);
                        this.dataY.push(res.data.data.equipmentConfiguration);
                        this.dataY.push(res.data.data.combatReadiness);
                        this.dataY.push(res.data.data.fightExperience);
                        this.drawingFn();
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .radar-map1{
        height: 465px;
        background:#fff;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(222, 222, 222, 1);
        p{
            background:#FAFCFE;
            height: 52px;
            line-height: 52px;
            text-indent: 16px;
            font-size: 20px;
            color: #2B2B42;
            font-weight: bold;
        }
        .my-chart3{
            width:100%;
            height: 350px;
        }
    }
</style>
