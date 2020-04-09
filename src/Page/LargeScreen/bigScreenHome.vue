<!--大屏首页-->
<template>
    <div class="big-screen-home big-screenMode">
        <BigHeader/>
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

    import BigHeader from "./bigScreenHead";
    import policeToday from '../HomePage/subtemplate/policeToday'
    import policeHandling from '../HomePage/subtemplate/policeHandling'
    import vehicleList from '../HomePage/subtemplate/vehicleList'
    import fireEquipment from '../HomePage/subtemplate/fireEquipment'

    import weatherBox from '../HomePage/subtemplate/weatherBox'

    import mapIcon1 from '../../assets/images/mapIcon1.png'
    import mapIcon2 from '../../assets/images/mapIcon2.png'
    import mapIcon3 from '../../assets/images/mapIcon3.png'

    export default {
        name: "bigScreenHome",
        components: {
            BigHeader,
            policeToday,
            policeHandling,
            vehicleList,
            fireEquipment,
            weatherBox
        },
        data() {
            return {
                mapId: 'BMap-11',
                myMap: null,

                publicData: true,//公共参数，改变子组件下的方法重新调用
            }
        },
        created() {
            this.initMap();
            this.getMapCoordinate();
        },
        methods: {
            initMap() {
                loadBMap('isZkHarwgZspmmnDOBpTGgGDpoMKRBAx').then(() => {
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
                    this.myMap.setMapStyle({style: 'midnight'});
                    this.myMap.setMapStyleV2({
                        styleJson: this.$MapStyleBig
                    });
                })
                    .catch(err => {
                        console.log('地图加载失败')
                    })
            },
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
        }
    }
</script>

<style scoped lang="less">
    .big-screenMode {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /*background-color: #0e27aa;*/
        z-index: 1005;

        .map-area {
            width: 100%;
            height: 100%;
        }
    }
</style>
