<!--训练统计-->
<template>
  <div class="training-statistics">
    <div class="head-title">
      <span>训练统计</span>
      <p>选择中队：
        <el-select v-model="dept" placeholder="" @change="getTrainingStatistics">
          <el-option
            v-for="item in deptList"
            :key="item.groupId"
            :label="item.groupName"
            :value="item.groupId">
          </el-option>
        </el-select>
      </p>
    </div>
    <div id="myChart13" class="my-chart13"></div>
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
        name: "trainingStatistics",
        data() {
            return {
                dept: '1',
                deptList: [{groupName: '全部中队', groupId: '1'}, {groupName: '其他中队', groupId: '2'}],

                dataX: ["泗泾中队", "叶榭中队", "仓桥中队", "上海总队", "岳阳中队", "佘山中队", "大港中队", "新浜中队", "松一中队", "九亭中队", "车墩中队", "新桥中队", "泖港中队", "松江支队", "松江中队"],
                dataY1: [],
                dataY2: [],

                fontColor1: 'rgba(168,170,176,0.9)',
                fontColor2: 'rgba(102,102,102,0.9)',
                fontColor3: 'rgba(102,102,102,0.2)',
            }
        },
        mounted() {
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,0.9)';
                this.fontColor3 = 'rgba(255, 255, 255, 0.4)';
                // this.fontColor4 = 'rgba(255,255,255,1)';
            }
            // this.getTrainingStatistics();
            this.getDeptList();
        },
        methods: {
            getTrainingStatistics() {
                this.$ajax.get(this.$URL + '/xf-unit/decisionSupport/trainingStatistics', {
                    params: {
                        groupId: this.dept
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.dataX = [];
                        this.dataY1 = [];
                        this.dataY2 = [];
                        res.data.data.map((e) => {
                            this.dataX.push(e.projectName);
                            this.dataY1.push(e.participateCount);
                            this.dataY2.push(e.qualifiedCount)
                        })
                    } else {
                        this.$message.error(res.data.message)
                    }
                    this.drawingFn();
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getDeptList() {
                this.$ajax.post(this.$URLSpare + '/apis/group/getdata',
                    'parentId=901267999502484244&grade=3&rowLength=100&pageNum=1',
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.dept = res.data.data[0].dataList[0].groupId;
                        this.deptList = res.data.data[0].dataList;
                        this.getTrainingStatistics();
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart13'));
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '20px',
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
                            itemWidth: 18,
                            itemHeight: 10,
                            data: [{
                                name: '参与人数',
                                //icon:'image://../wwwroot/js/url2.png', //路径
                            },
                                {
                                    name: '达标人数',
                                }],
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
                                        fontStyle: 'normal',
                                        fontFamily: '微软雅黑',
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
                                splitNumber: 4,
                                minInterval: 1,
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
                                    show: false
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: this.fontColor3,
                                    }
                                }

                            }
                        ],
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
                        // dataZoom:[
                        //     {
                        //         type: 'slider',
                        //         xAxisIndex: 0,
                        //         filterMode: 'empty',
                        //         start: 0,
                        //         end: 20,
                        //         zoomLock:true
                        //     },
                        // ],
                        series: [
                            {
                                name: '参与人数',
                                type: 'bar',
                                data: this.dataY1,
                                barWidth: 10,
                                barGap: 0,//柱间距离
                                label: {//图形上的文本标签
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: this.fontColor2,
                                            fontStyle: 'normal',
                                            fontFamily: '微软雅黑',
                                            fontSize: 14,
                                        },
                                    },
                                },
                                itemStyle: {//图形样式
                                    normal: {
                                        barBorderRadius: [5, 5, 0, 0],
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 1, color: 'rgba(255, 104, 252, 0.3)'
                                        }, {
                                            offset: 0.9, color: 'rgba(255, 104, 252, 0.4)'
                                        }, {
                                            offset: 0.31, color: 'rgba(255, 104, 252, 0.5)'
                                        }, {
                                            offset: 0.15, color: 'rgba(255, 104, 252, 0.65)'
                                        }, {
                                            offset: 0, color: 'rgba(255, 104, 252, 0.8)'
                                        }], false),
                                    },
                                },
                            },
                            {
                                name: '达标人数',
                                type: 'bar',
                                data: this.dataY2,
                                barWidth: 10,
                                barGap: 0.2,//柱间距离
                                label: {//图形上的文本标签
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: this.fontColor2,
                                            fontStyle: 'normal',
                                            fontFamily: '微软雅黑',
                                            fontSize: 14,
                                        },
                                    },
                                },
                                itemStyle: {//图形样式
                                    normal: {
                                        barBorderRadius: [5, 5, 0, 0],
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 1, color: 'rgba(78, 160, 251, 0.3)'
                                        }, {
                                            offset: 0.9, color: 'rgba(78, 160, 251, 0.5)'
                                        }, {
                                            offset: 0.25, color: 'rgba(78, 160, 251, 0.8)'
                                        }, {
                                            offset: 0, color: 'rgba(78, 160, 251, 1)'
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

<style scoped lang="less">
</style>
