<!--辅助决策-->
<template>
    <div class="assist-makePolicy">
        <ul class="layout-box">
            <li>
                <policeStatistics/>
                <policePressure/>
                <fireAnalysis/>
            </li>
            <li>
                <ul class="map-sign-box">
                    <li><b class="one"></b>松江消防支队</li>
                    <li><b class="two"></b>消防中队</li>
                    <li><b class="three"></b>六熟悉</li>
                </ul>
                <div class="map-area" :id="mapId"></div>
                <averageArrival/>
            </li>
            <li>
                <agingDistribution/>
                <alarmTrend/>
                <trainingStatistics/>
            </li>
        </ul>
    </div>
</template>

<script>
    import loadBMap from '../../assets/js/loadBMap.js'

    import policeStatistics from './subtemplate/policeStatistics'
    import policePressure from './subtemplate/policePressure'
    import fireAnalysis from './subtemplate/fireAnalysis'

    import averageArrival from './subtemplate/averageArrival'

    import agingDistribution from './subtemplate/agingDistribution'
    import alarmTrend from './subtemplate/alarmTrend'
    import trainingStatistics from './subtemplate/trainingStatistics'

    import mapIcon1 from '../../assets/images/mapIcon1.png'
    import mapIcon2 from '../../assets/images/mapIcon2.png'
    import mapIcon3 from '../../assets/images/mapIcon3.png'

    export default {
        name: "assistMakePolicy",
        components: {
            policeStatistics,
            policePressure,
            fireAnalysis,
            averageArrival,
            agingDistribution,
            alarmTrend,
            trainingStatistics
        },
        data() {
            return {
                mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
                myMap: null,

                publicData: '',//公共参数，改变子组件下的方法重新调用

                fireWaterSource: '',
                fireSquadron: '',
                fireDetachment: '',

                heatmapOverlay:''
            }
        },
        mounted() {
            this.initMap();
            this.getMapCoordinate();

            setTimeout(()=>{
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.src =
                    "http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js";
                document.body.appendChild(script);
            },2000);

            //一定要先让地图加载出来才加载热力图，我这里做演示直接写个setTimeout了
            setTimeout(()=>{this.heatMapDraw();},3000)
        },
        methods: {
            getMapCoordinate() {
                this.$ajax.get(this.$URL + '/xf-unit/homePage/selectGroupLocation', {
                    params: {
                        groupId: ''
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.fireDetachment = [];
                        res.data.data.map((e) => {
                            if (e.id = '154861516185315154') {//此处写死为上海总队id，如后续有其他总队，根据登陆人的总队id比较
                                this.fireWaterSource = e.apparatusList;
                            }
                            this.fireDetachment.push({id: e.id, name: e.name, lat: e.lat, lng: e.lng});
                            this.fireSquadron = e.selectGroupLocationVoList[0].selectGroupLocationVoList;
                        });
                        this.mapRendering();
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            initMap() {
                loadBMap('isZkHarwgZspmmnDOBpTGgGDpoMKRBAx').then(() => {
                    // 百度地图API功能
                    this.myMap = new BMap.Map(this.mapId) // 创建Map实例
                    this.myMap.centerAndZoom(new BMap.Point(121.469026, 31.229388), 13); // 初始化地图,设置中心点坐标和地图级别
                    //添加地图类型控件
                    this.myMap.addControl(
                        new BMap.MapTypeControl({
                            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
                        })
                    );
                    this.myMap.setCurrentCity('上海') // 设置地图显示的城市 此项是必须设置的
                    this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
                    this.myMap.setMapStyleV2({
                        styleJson: this.$MapStyle
                    });
                    setTimeout(() => {
                        this.getBoundary();
                    }, 1000)
                })
                    .catch(err => {
                        console.log('地图加载失败')
                    })
            },
            mapRendering() {
                this.myMap.clearOverlays();
                // 设备点的显示
                let tempMapIcon1 = new BMap.Icon(mapIcon1, new BMap.Size(50, 50), {
                    anchor: new BMap.Size(13, 13),
                });
                let tempMapIcon2 = new BMap.Icon(mapIcon2, new BMap.Size(50, 50), {
                    anchor: new BMap.Size(13, 13),
                });
                let tempMapIcon3 = new BMap.Icon(mapIcon3, new BMap.Size(50, 50), {
                    anchor: new BMap.Size(13, 13),
                });
                // console.log(this.fireWaterSource,'33333')
                for (let i = 0; i < this.fireWaterSource.length; i++) {
                    let point = new BMap.Point(this.fireWaterSource[i].lng, this.fireWaterSource[i].lat);
                    let marker = new BMap.Marker(point, {icon: tempMapIcon3}); // 创建标注
                    this.myMap.addOverlay(marker);
                }
                // console.log(this.fireDetachment,'22222')
                for (let i = 0; i < this.fireDetachment.length; i++) {
                    let point = new BMap.Point(this.fireDetachment[i].lng, this.fireDetachment[i].lat);
                    let marker = new BMap.Marker(point, {icon: tempMapIcon1}); // 创建标注
                    this.myMap.addOverlay(marker);
                }
                // console.log(this.fireSquadron,'11111')
                for (let i = 0; i < this.fireSquadron.length; i++) {
                    let point = new BMap.Point(this.fireSquadron[i].lng, this.fireSquadron[i].lat);
                    let marker = new BMap.Marker(point, {icon: tempMapIcon2}); // 创建标注
                    this.myMap.addOverlay(marker);
                }
            },
            getBoundary() {
                let bdary = new BMap.Boundary();
                bdary.get("上海市松江区", (rs) => {       //获取行政区域
                    // this.myMap.clearOverlays();        //清除地图覆盖物
                    var count = rs.boundaries.length; //行政区域的点有多少个
                    if (count === 0) {
                        alert('未能获取当前输入行政区域');
                        return;
                    }
                    var pointArray = [];
                    for (var i = 0; i < count; i++) {
                        var ply = new BMap.Polygon(rs.boundaries[i], {
                            strokeWeight: 2,
                            StrokeStyle: "solid",
                            strokeColor: "#0164ff",
                            fillColor: "#0164ff",
                            fillOpacity: 0.1
                        }); //建立多边形覆盖物
                        this.myMap.addOverlay(ply);  //添加覆盖物
                        pointArray = pointArray.concat(ply.getPath());
                    }
                    this.myMap.setViewport(pointArray);    //调整视野

                });
            },
            heatMapDraw(){
                let points =[
                    {"lng":121.228261,"lat":31.031984,"count":50},
                    {"lng":121.233332,"lat":31.026532,"count":51},
                    {"lng":121.229787,"lat":31.040658,"count":15},
                    {"lng":121.228455,"lat":31.030921,"count":40},
                    {"lng":121.228843,"lat":31.025516,"count":100},
                    {"lng":121.23546,"lat":31.028503,"count":6},
                    {"lng":121.233289,"lat":31.029989,"count":18},
                    {"lng":121.228162,"lat":31.025051,"count":80},
                    {"lng":121.232039,"lat":31.02782,"count":11},
                    {"lng":121.22387,"lat":31.027253,"count":7},
                    {"lng":121.22773,"lat":31.029426,"count":42},
                    {"lng":121.231107,"lat":31.026445,"count":4},
                    {"lng":121.227521,"lat":31.027943,"count":27},
                    {"lng":121.229812,"lat":31.030836,"count":23},
                    {"lng":121.230682,"lat":31.02463,"count":60},
                    {"lng":121.225424,"lat":31.034675,"count":8},
                    {"lng":121.229242,"lat":31.024509,"count":15},
                    {"lng":121.232766,"lat":31.031408,"count":25},
                    {"lng":121.231674,"lat":31.034396,"count":21},
                    {"lng":121.237268,"lat":31.03267,"count":1},
                    {"lng":121.227721,"lat":31.030034,"count":51},
                    {"lng":121.222456,"lat":31.03667,"count":7},
                    {"lng":121.230432,"lat":31.029114,"count":11},
                    {"lng":121.235013,"lat":31.031611,"count":35},
                    {"lng":121.228733,"lat":31.041037,"count":22},
                    {"lng":121.229336,"lat":31.041134,"count":4},
                    {"lng":121.223557,"lat":31.033254,"count":5},
                    {"lng":121.228367,"lat":31.03943,"count":3},
                    {"lng":121.234312,"lat":31.029621,"count":100},
                    {"lng":121.233874,"lat":31.029447,"count":87},
                    {"lng":121.234225,"lat":31.033091,"count":32},
                    {"lng":121.227801,"lat":31.031854,"count":44},
                    {"lng":121.227129,"lat":31.038227,"count":21},
                    {"lng":121.236426,"lat":31.032286,"count":80},
                    {"lng":121.231597,"lat":31.02948,"count":32},
                    {"lng":121.233895,"lat":31.030787,"count":26},
                    {"lng":121.233563,"lat":31.031197,"count":17},
                    {"lng":121.227982,"lat":31.032547,"count":17},
                    {"lng":121.236126,"lat":31.031938,"count":25},
                    {"lng":121.23326,"lat":31.025782,"count":100},
                    {"lng":121.229239,"lat":31.026759,"count":39},
                    {"lng":121.227185,"lat":31.039123,"count":11},
                    {"lng":121.227237,"lat":31.037518,"count":9},
                    {"lng":121.227784,"lat":31.025754,"count":47},
                    {"lng":121.230193,"lat":31.027061,"count":52},
                    {"lng":121.232735,"lat":31.025619,"count":100},
                    {"lng":121.228495,"lat":31.025958,"count":46},
                    {"lng":121.226292,"lat":31.041166,"count":9},
                    {"lng":121.229916,"lat":31.034055,"count":8},
                    {"lng":121.23189,"lat":31.031308,"count":11},
                    {"lng":121.223765,"lat":31.039376,"count":3},
                    {"lng":121.228232,"lat":31.030348,"count":50},
                    {"lng":121.227554,"lat":31.040511,"count":15},
                    {"lng":121.228568,"lat":31.028161,"count":23},
                    {"lng":121.223461,"lat":31.036306,"count":3},
                    {"lng":121.23232,"lat":31.03161,"count":13},
                    {"lng":121.2274,"lat":31.038616,"count":6},
                    {"lng":121.234679,"lat":31.025499,"count":21},
                    {"lng":121.23171,"lat":31.025738,"count":29},
                    {"lng":121.227836,"lat":31.026998,"count":99},
                    {"lng":121.230755,"lat":31.038001,"count":10},
                    {"lng":121.224077,"lat":31.040655,"count":14},
                    {"lng":121.236092,"lat":31.032995,"count":16},
                    {"lng":121.22535,"lat":31.041054,"count":15},
                    {"lng":121.223022,"lat":31.031895,"count":13},
                    {"lng":121.225551,"lat":31.023373,"count":17},
                    {"lng":121.231191,"lat":31.036572,"count":1},
                    {"lng":121.229612,"lat":31.027119,"count":9},
                    {"lng":121.228237,"lat":31.031337,"count":54},
                    {"lng":121.233776,"lat":31.031919,"count":26},
                    {"lng":121.227694,"lat":31.03536,"count":17},
                    {"lng":121.225377,"lat":31.024137,"count":19},
                    {"lng":121.227434,"lat":31.024394,"count":43},
                    {"lng":121.23588,"lat":31.032622,"count":27},
                    {"lng":121.228345,"lat":31.029467,"count":8},
                    {"lng":121.236883,"lat":31.027171,"count":3},
                    {"lng":121.233877,"lat":31.026659,"count":34},
                    {"lng":121.225712,"lat":31.025613,"count":14},
                    {"lng":121.229869,"lat":31.041416,"count":12},
                    {"lng":121.226956,"lat":31.035377,"count":11},
                    {"lng":121.23066,"lat":31.035017,"count":38},
                    {"lng":121.226244,"lat":31.030215,"count":91},
                    {"lng":121.22929,"lat":31.025908,"count":54},
                    {"lng":121.232116,"lat":31.029658,"count":21},
                    {"lng":121.2283,"lat":31.035015,"count":15},
                    {"lng":121.231969,"lat":31.023527,"count":3},
                    {"lng":121.232936,"lat":31.031854,"count":24},
                    {"lng":121.22905,"lat":31.039217,"count":12},
                    {"lng":121.234579,"lat":31.024987,"count":57},
                    {"lng":121.23076,"lat":31.025251,"count":70},
                    {"lng":121.235867,"lat":31.028989,"count":8}];

                if(!this.isSupportCanvas()){
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                }
                this.heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 40,opacity:0.4});
                this.myMap.addOverlay(this.heatmapOverlay);
                this.heatmapOverlay.setDataSet({ data: points, max: 20 });
                // let heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
                // this.myMap.addOverlay(heatmapOverlay);
                // heatmapOverlay.setDataSet({data:points,max:100});
            },
            isSupportCanvas(){
                let elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            }
        }
    }
</script>

<style scoped lang="less">
    .assist-makePolicy {
        width: 100%;
        height: 100%;

        /*.map-area {*/
        /*  width: 100%;*/
        /*  height: 100%;*/
        /*}*/

    }
</style>
