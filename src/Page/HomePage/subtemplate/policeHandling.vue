<!--警情处理模板-->
<template>
  <div class="police-handling">
    <div class="head-title">
      <span>警情处理</span>
      <p>时间范围
        <el-select v-model="timeLine" placeholder="" @change="getPoliceHandling">
          <el-option
            v-for="item in timeList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </p>
    </div>
    <div id="myChart1" class="my-chart1"></div>
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
        name: "policeHandling",
        data() {
            return {
                timeLine: '1',
                dataX: [],
                dataY1: [],
                dataY2: [],
                dataY3: [],
                dataY4: [],
                dataY5: [],
                fontColor1:'rgba(221,221,221,0.8)',
                fontColor2:'rgba(51,51,51,0.8)',
                fontColor3:'rgba(158,167,196,0.8)',

                timeList: [{name: '本周', code: '1'}, {name: '上周', code: '2'}],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        watch: {
            myProp(newVal) {
                console.log(newVal)
            },
        },
        mounted() {
            if(this.$route.path.indexOf('bigScreen')!=-1){
                this.fontColor1='rgba(255,255,255,0.4)';
                this.fontColor2='rgba(255,255,255,1)';
                this.fontColor3='rgba(255,255,255,1)';
            }
            this.drawingFn();
            this.getPoliceHandling();
        },
        methods: {
            drawingFn() {
                let myChart = echarts.init(document.getElementById('myChart1'));
                myChart.setOption(
                    {
                        // backgroundColor: '#001120',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: ['火灾扑救', '社会救助', '抢险救援', '反恐排爆', '其他',],
                            x: 'right',      //可设定图例在左、右、居中
                            // y:'center',     //可设定图例在上、下、居中
                            padding: [10, 10, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                            textStyle: {
                                color: [],
                            }
                        },
                        grid: {
                            left: '40px',
                            right: '30px',
                            bottom: '24px',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: this.dataX,
                                splitLine: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: this.fontColor1
                                    }
                                },
                                axisLabel: {
                                    color: this.fontColor2,
                                    fontSize: 14,
                                    interval: 0,
                                }
                            }
                        ],
                        yAxis: [
                            {
                                name: '单位(件)',
                                nameTextStyle: {
                                    color: this.fontColor2,
                                    padding: [0, 0, 0, -20]    // 四个数字分别为上右下左与原位置距离
                                },
                                type: 'value',
                                minInterval: 1,
                                splitNumber: 4,
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: this.fontColor1
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: this.fontColor1
                                    }
                                },
                                axisLabel: {textStyle: {color: this.fontColor3, fontSize: 14}},
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
                                name: '火灾扑救',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '-100%',
                                stack: '广告',
                                itemStyle: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.4,
                                        color: "rgba(195,160,251,1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(255,104,252,1)"
                                        }
                                    ])
                                },
                                data: this.dataY1
                            },
                            {
                                name: '社会救助',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '-100%',
                                stack: '广告',
                                itemStyle: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.4,
                                        color: "rgba(78,160,251,1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(141,104,252,1)"
                                        }
                                    ])
                                },
                                data: this.dataY2
                            },

                            {
                                name: '抢险救援',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '-100%',
                                stack: '广告',
                                itemStyle: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.4,
                                        color: "rgba(78,255,251,1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(141,221,252,1)"
                                        }
                                    ])
                                },
                                data: this.dataY3
                            },

                            {
                                name: '反恐排爆',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '-100%',
                                stack: '广告',
                                itemStyle: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.4,
                                        color: "rgba(247,181,0,1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(250,100,0,1)"
                                        }
                                    ])
                                },
                                data: this.dataY4
                            },

                            {
                                name: '其他',
                                type: 'bar',
                                barWidth: 20,
                                barGap: '-100%',
                                stack: '广告',
                                itemStyle: {
                                    barBorderRadius: 2,
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0.4,
                                        color: "rgba(109,212,0,1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(87,247,0,1)"
                                        }
                                    ])
                                },
                                data: this.dataY5
                            }

                        ]
                    }
                );
            },
            getPoliceHandling() {
                this.$ajax.get(this.$URL + '/xf-unit/homePage/alertHandling',{
                    params: {
                        type : this.timeLine
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.dataX = []
                        this.dataY1 = [];
                        this.dataY2 = [];
                        this.dataY3 = [];
                        this.dataY4 = [];
                        this.dataY5 = [];
                        res.data.data.map((e) => {
                            if (e.efWarTimeExpressNewsList.length > 0) {
                                let temp1 = 0;
                                let temp2 = 0;
                                let temp3 = 0;
                                let temp4 = 0;
                                let temp5 = 0;
                                e.efWarTimeExpressNewsList.map((m) => {
                                    if (m.handlingType == '火警扑救') {
                                        temp1 = m.count;
                                    }
                                    if (m.handlingType == '社会救助') {
                                        temp2 = m.count;
                                    }
                                    if (m.handlingType == '抢险救援') {
                                        temp3 = m.count;
                                    }
                                    if (m.handlingType == '反恐排爆') {
                                        temp4 = m.count;
                                    }
                                    if (m.handlingType == '其他') {
                                        temp5 = m.count;
                                    }
                                });
                                this.dataY1.push(temp1);
                                this.dataY2.push(temp2);
                                this.dataY3.push(temp3);
                                this.dataY4.push(temp4);
                                this.dataY5.push(temp5);
                            } else {
                                this.dataY1.push(0);
                                this.dataY2.push(0);
                                this.dataY3.push(0);
                                this.dataY4.push(0);
                                this.dataY5.push(0);
                            }
                            this.dataX.push(e.name);
                        });
                    } else {
                        this.$message.error(res.data.message)
                    }
                    this.drawingFn();
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>
