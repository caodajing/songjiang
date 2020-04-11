<!--首页-->
<template>
    <div class="home-page">
        <policeToday/>
        <vehicleList/>
        <div class="bottom-echart">
            <policeHandling :myProp="publicData"/>
            <fireEquipment :myProp="publicData"/>
        </div>
        <weatherBox/>
        <ul class="map-sign-box">
            <li><b class="one"></b>静安消防支队</li>
            <li><b class="two"></b>消防中队</li>
            <li><b class="three"></b>消防水源</li>
        </ul>
        <div class="map-area" :id="mapId"></div>
    </div>
</template>

<script>
    import loadBMap from '../../assets/js/loadBMap.js'

    import policeToday from './subtemplate/policeToday'
    import policeHandling from './subtemplate/policeHandling'
    import vehicleList from './subtemplate/vehicleList'
    import fireEquipment from './subtemplate/fireEquipment'
    import weatherBox from './subtemplate/weatherBox'

    import mapIcon1 from '../../assets/images/mapIcon1.png'
    import mapIcon2 from '../../assets/images/mapIcon2.png'
    import mapIcon3 from '../../assets/images/mapIcon3.png'

    export default {
        name: "homePage",
        components: {
            policeToday,
            policeHandling,
            vehicleList,
            fireEquipment,
            weatherBox
        },
        data() {
            return {
                mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
                myMap: null,

                publicData: false,//公共参数，改变子组件下的方法重新调用

                fireWaterSource: [],//消防水源
                fireDetachment: [],//消防支队
                fireSquadron: []//消防中队
            }
        },
        mounted() {
            this.initMap();
            this.getBuildingLocation();
            this.getMapCoordinate();
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
            getBuildingLocation() {
                this.$ajax.get(this.$URL + '/xf-unit/homePage/selectGroupLocation', {
                    params: {
                        groupId: '',
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        res.data.data.map((e) => {
                            if (e.id = '154861516185315154') {//此处写死为上海总队id，如后续有其他总队，根据登陆人的总队id比较
                                this.fireWaterSource = e.apparatusList;
                            }
                        })
                        // this.fireWaterSource=
                        console.log(res.data, '经纬度坐标');
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
    .home-page {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #666;

        .map-area {
            width: 100%;
            height: 100%;
        }
    }
</style>

