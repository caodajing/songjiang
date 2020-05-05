<!--火患分析-->
<template>
    <div class="fire-analysis">
        <p>火患场所分析</p>
        <div class="double-graphs">
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
        name: "fireAnalysisPlace",
        data() {
            return {
                dataY :[
                    {
                        value: 34.8,
                        name: "居民住宅",
                        itemStyle:{
                            color:"#5179BC"
                        }
                    },
                    {
                        value: 19.7,
                        name: "其他",
                        itemStyle:{
                            color:"#95C365"
                        }
                    },
                    {
                        value: 11.8,
                        name: "商场、市场",
                        itemStyle:{
                            color:"#41A979"
                        }
                    },
                    {
                        value: 11.3,
                        name: "生产加工企业",
                        itemStyle:{
                            color:"#EDC44C"
                        }
                    },
                    {
                        value: 7.9,
                        name: "餐饮、商店、旅馆",
                        itemStyle:{
                            color:"#ED8948"
                        }
                    },
                    {
                        value: 4.8,
                        name: "仓储、物流",
                        itemStyle:{
                            color:"#E4524F"
                        }
                    },
                    {
                        value: 4,
                        name: "宾馆饭店",
                        itemStyle:{
                            color:"#A966A6"
                        }
                    },
                    {
                        value: 2,
                        name: "写字楼、办公楼等公共场所",
                        itemStyle:{
                            color:"#6F53A0"
                        }
                    },
                    {
                        value: 2,
                        name: "机关、团体、企业",
                        itemStyle:{
                            color:"#4B53A2"
                        }
                    },
                    {
                        value: 1,
                        name: "公共娱乐场所",
                        itemStyle:{
                            color:"#55A9DF"
                        }
                    },
                    {
                        value: 1,
                        name: "学校、幼儿园、托儿所",
                        itemStyle:{
                            color:"#6CC4CC"
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
            if (this.$route.path.indexOf('bigScreen') != -1) {
                this.fontColor1 = 'rgba(255,255,255,1)';
                // this.fontColor2 = 'rgba(255,255,255,0.9)';
            }
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
                        let firePlace = res.data.data.firePlace.split(',');
                        console.log(firePlace)

                        this.dataY.map((val,index) => {
                            switch (index){
                                case 0 : 
                                    val.value = firePlace[0];
                                    break;
                                case 1 : 
                                    val.value = firePlace[13];
                                    break;
                                case 2 : 
                                    val.value = firePlace[1];
                                    break;
                                case 3 : 
                                    val.value = firePlace[2];
                                    break;
                                case 4 : 
                                    val.value = firePlace[3];
                                    break;
                                case 5 : 
                                    val.value = firePlace[4];
                                    break;
                                case 6 : 
                                    val.value = firePlace[5];
                                    break;
                                case 7 : 
                                    val.value = firePlace[6];
                                    break;
                                case 8 : 
                                    val.value = firePlace[12];
                                    break;
                                case 9 : 
                                    val.value = firePlace[11];
                                    break;
                                case 10 : 
                                    val.value = firePlace[10];
                                    break;
                            }
                        })

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
                let myChart = echarts.init(document.getElementById('myChart10'));
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
                            data: ['居民住宅','其他','商场、市场','生产加工企业','餐饮、商店、旅馆','仓储、物流','宾馆饭店','写字楼、办公楼等公共场所','机关、团体、企业','公共娱乐场所','学校、幼儿园、托儿所'],
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
