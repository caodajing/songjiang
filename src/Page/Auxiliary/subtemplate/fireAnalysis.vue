<!--火患分析-->
<template>
    <div class="fire-analysis">
        <p>火患类别分析</p>
        <div class="double-graphs">
            <div id="myChart9" class="my-chart9"></div>
           
        </div>
    </div>
</template>

<script>
    // 引入基本模板
    import echarts from 'echarts'
    // let echarts = require('echarts/lib/echarts');
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
                dataY : [
                    {
                        value: 32.7,
                        name: "消防器材、消防安全标志未保持完好有效类",
                        itemStyle:{
                            color:"#5179BC"
                        }
                    },
                    {
                        value: 18.2,
                        name: "电器线路敷设不符合消防技术标准类",
                        itemStyle:{
                            color:"#95C365"
                        }
                    },
                    {
                        value: 16.4,
                        name: "“三合一”“多合一”类",
                        itemStyle:{
                            color:"#41A979"
                        }
                    },
                    {
                        value: 16.4,
                        name: "占用、堵塞、封闭消防车通道类",
                        itemStyle:{
                            color:"#EDC44C"
                        }
                    },
                    {
                        value: 4.5,
                        name: "消防设施未保持完好",
                        itemStyle:{
                            color:"#ED8948"
                        }
                    },
                    {
                        value: 4.5,
                        name: "占用、堵塞、封闭疏散通道、安全出口类",
                        itemStyle:{
                            color:"#E4524F"
                        }
                    },
                    {
                        value: 3.6,
                        name: "未依法申请消防行政或许可备案",
                        itemStyle:{
                            color:"#A966A6"
                        }
                    },
                    {
                        value: '1.85',
                        name: "其他",
                        itemStyle:{
                            color:"#6F53A0"
                        }
                    },
                ],
                legendColor:"#666",
                fontColor1: 'rgba(102,102,102,1)',
                fontColor2: 'rgba(255,255,255,0.9)',
            }
        },
        props:['color'],
        mounted() {
            if(this.color){
                this.legendColor = this.color;
            }
            console.log(this.color)
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                // this.fontColor2 = 'rgba(255,255,255,0.9)';
            }
            this.drawingFn();
            this.getData();
        },
        methods: {
            getData(){
                this.$ajax.get(this.$dataSetUrlTest + '/xf-unit/decisionSupport/getFirlAnalysisStatistics',{
                    params:{
                        // groupId: '901267999502484244'
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        let fireType = res.data.data.fireType.split(',');

                        fireType.map((e,i) => {
                            this.dataY.map((val,index) => {
                                if(i == index){
                                    val.value = e;
                                }
                            })
                        });
                        this.drawingFn();
                    } else {
                        this.$message.error(res.data.message)
                    }
                    this.drawingFn();

                }).catch(function (error) {
                    console.log(error);
                })
            },
            drawingFn() {
                
                let myChart = echarts.init(document.getElementById('myChart9'));
                for (let n in this.dataY) {
                    // this.dataY[n]['name'] = this.dataY[n]['name'] + ' ' + this.dataY[n]['value'] + '%'
                }
                myChart.setOption(
                    {
                        // backgroundColor: "#000",
                        title: {
                            text: '',
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
                            formatter: '{b} : {c}'
                        },
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            data: ['消防器材、消防安全标志未保持完好有效类','电器线路敷设不符合消防技术标准类','“三合一”“多合一”类','占用、堵塞、封闭消防车通道类','消防设施未保持完好','占用、堵塞、封闭疏散通道、安全出口类','未依法申请消防行政或许可备案','其他'],
                            right:0,      //可设定图例在左、右、居中
                            top:0,     //可设定图例在上、下、居中
                            padding: [10, 10, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                            itemWidth:12,
                            itemHeight:12,
                            width: "10px",
                            textStyle: {
                                color: [this.legendColor],
                            }
                        },
                        series: [{
                            type: 'pie',
                            radius: ['40%', '70%'],
                            center: ['25%', '50%'],
                            roam: false, //是否开启拖拽漫游（移动和缩放）
                            nodeClick: false, //点击节点后的行为,false无反应
                            breadcrumb: {
                                show: false
                            },
                            label:{
                                normal:{
                                    show: true,
                                    position:'inside',
                                    formatter:function(obj){
                                        return obj.data.value;
                                    },
                                    fontSize:10,
                                    color:'#fff'
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
                                        show: false
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
