<!--执勤中队-->
<template>
  <div class="duty-squadron">
    <warStatistics :myProp="publicData"/>
    <radarMap/>
    <policeTypeAnalyse/>
    <div class="right-box">
      <averageTime/>
      <warningStatistics/>
    </div>
    <div class="map-area" :id="mapId"></div>
  </div>
</template>

<script>
    import loadBMap from '../../assets/js/loadBMap.js'

    import warStatistics from './subtemplate/warStatistics'
    import radarMap from './subtemplate/radarMap'
    import policeTypeAnalyse from './subtemplate/policeTypeAnalyse'
    import averageTime from './subtemplate/averageTime'
    import warningStatistics from './subtemplate/warningStatistics'

    export default {
        name: "dutySquadron",
        components: {
            warStatistics,
            radarMap,
            policeTypeAnalyse,
            averageTime,
            warningStatistics
        },
        data() {
            return {
                mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
                myMap: null,

                publicData: 1,//公共参数，改变子组件下的方法重新调用
            }
        },
        mounted() {
            window.$publicFn = this.headSwitch;
        },
        methods: {

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
                })
                    .catch(err => {
                        console.log('地图加载失败')
                    })
            },
            headSwitch(data) {
                this.publicData = JSON.stringify(data);
                console.log(this.publicData,'heade')
            },
        }
    }
</script>

<style scoped lang="less">
  .duty-squadron {
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
