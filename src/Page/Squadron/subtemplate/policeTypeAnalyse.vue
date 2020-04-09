<!--出警类型分析-->
<template>
  <div class="police-type-analyse">
    <div class="head-title">
      <span>出警类型分析</span>
      <p>时间范围
        <el-select v-model="timeLine" placeholder="" @change="getAlarmTypeData">
          <el-option
            v-for="item in timeList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </p>
    </div>

    <div id="myChart4" class="my-chart4"></div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require("echarts/lib/chart/pie");
    // 引入提示框和title组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/dataZoom');

    export default {
        name: "policeTypeAnalyse",
        data() {
            return {
                groupId: '',
                timeLine: '1',
                timeList: [{name: '本周', code: '1'}, {name: '上周', code: '2'}],

                maxNumY: 0,
                dataY: [
                    {value: 0, name: '体育技能'},
                    {value: 0, name: '体育行为'},
                    {value: 0, name: '体质健康'},
                    {value: 0, name: '体育意识'},
                    {value: 0, name: '体育知识'}],

                fontColor1: 'rgba(211, 211, 211, 1)',
                fontColor2: 'rgba(85, 85, 85, 1)',
                fontColor3: 'rgba(26, 180, 184, 1)',
                fontColor4: 'rgba(250,250,250,0.5)',
            }
        },
        props: ['myProp'],
        watch: {
            myProp(newVal) {
                this.groupId = JSON.parse(newVal).groupId;
                this.getAlarmTypeData();
            },
        },
        mounted(){
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                this.fontColor2 = 'rgba(255,255,255,0.9)';
                // this.fontColor3 = 'rgba(255, 255, 255, 1)';
                // this.fontColor4 = 'rgba(255,255,255,1)';
            }
            this.drawingFn();
        },
        methods: {
            getAlarmTypeData() {//data.code
                this.$ajax.get(this.$URL + '/xf-unit/dutySquadron/analysisOfPoliceType', {
                    params: {
                        groupId: this.groupId,
                        type: this.timeLine,
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.maxNumY = 0;
                        this.dataY=[];
                        res.data.data.map((e) => {
                            this.dataY.push({value: e.finishCount,name:e.alarmType});
                            this.maxNumY += (e.finishCount - 0);
                        });
                        // console.log(this.maxNumY,this.dataY, '出警类型分析');
                    } else {
                        this.$message.error(res.data.message)
                    }
                    this.drawingFn();
                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {

                let colorList = ['#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c', "rgba(250,250,250,0.5)"];
                // let sportsIcon = {
                //     'a':'https://gallery.echartsjs.com/asset/get/s/data-1559121268278-ozjd-lXoz.png',
                //     'b':'https://gallery.echartsjs.com/asset/get/s/data-1559121263841-UC5w7mTJ9.png',
                //     'c':'https://gallery.echartsjs.com/asset/get/s/data-1559121259198-sxyPSimU9.png',
                //     'd':'https://gallery.echartsjs.com/asset/get/s/data-1559121254241-xj5JAIBzC.png',
                //     'e':'https://gallery.echartsjs.com/asset/get/s/data-1559121249274-QxHDAdQGy.png',
                // };

                let myChart = echarts.init(document.getElementById('myChart4'));
                myChart.setOption(
                    {
                        title: {
                            text: '',
                            subtext: '',
                            x: 'center',
                            y: 'center',
                            textStyle: {
                                fontSize: 30,
                                fontWeight: 'normal',
                                color: ['#333']
                            },
                            subtextStyle: {
                                color: '#666',
                                fontSize: 16
                            },
                        },
                        grid: {
                            bottom: 150,
                            left: 0,
                            right: '10%'
                        },
                        legend: {
                            show: false,
                            orient: 'vertical',
                            top: "middle",
                            right: "5%",
                            textStyle: {
                                color: '#f2f2f2',
                                fontSize: 25,

                            },
                            icon: 'roundRect'
                        },
                        series: [
                            // 主要展示层的
                            {
                                radius: ['22%', '42%'],
                                center: ['50%', '50%'],
                                type: 'pie',
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 15,
                                        length2: 120,
                                        lineStyle: {
                                            color: this.fontColor1
                                        },
                                        align: 'right'
                                    },
                                    color: "#000",
                                    emphasis: {
                                        show: true
                                    }
                                },
                                label: {
                                    normal: {
                                        formatter:  (params)=> {
                                            let temp=this.maxNumY==0?'0':(params.value*100/this.maxNumY).toFixed(0);
                                            let str = '{a|}\n{nameStyle|' + params.name + ' }' + '{rate|' + temp + '%}';
                                            return str
                                        },
                                        padding: [0, -140],
                                        // height: 165,
                                        rich: {
                                            a: {
                                                width: 38,
                                                height: 38,
                                                lineHeight: 50,
                                                align: 'left'
                                            },
                                            b: {
                                                width: 29,
                                                height: 45,
                                                lineHeight: 50,
                                                align: 'left'
                                            },
                                            c: {
                                                width: 34,
                                                height: 33,
                                                lineHeight: 50,
                                                align: 'left'
                                            },
                                            d: {
                                                width: 34,
                                                height: 44,
                                                lineHeight: 50,
                                                align: 'left'
                                            },
                                            e: {
                                                width: 38,
                                                height: 30,
                                                lineHeight: 50,
                                                // backgroundColor: {
                                                //     image: sportsIcon.a
                                                // },
                                                align: 'left'
                                            },
                                            nameStyle: {
                                                fontSize: 16,
                                                color: this.fontColor2,
                                                align: 'left'
                                            },
                                            rate: {
                                                fontSize: 20,
                                                color: this.fontColor3,
                                                align: 'left'
                                            }
                                        }
                                    }
                                },
                                data: this.dataY
                            },
                            // 边框的设置
                            {
                                radius: ['37%', '42%'],
                                center: ['50%', '50%'],
                                type: 'pie',
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                },
                                animation: false,
                                tooltip: {
                                    show: false
                                },
                                itemStyle: {
                                    normal: {
                                        color: this.fontColor4
                                    }
                                },
                                data: [{
                                    value: 1,
                                }],
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
