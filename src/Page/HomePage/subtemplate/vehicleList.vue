<!--各中队车辆列表模板-->
<template>
  <div class="vehicle-list">
    <p>各中队车辆列表</p>
    <div class="vehicle-list-box scroll-bar-style">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="item in carList" :key="item.id" :title="item.name+'（'+item.sysCarList.length+'辆）'" :name="item.id">
          <p class="each-msg" v-for="temp in item.sysCarList">
            <span>{{temp.carNumber}}</span><span>{{temp.productionName}}</span></p>
          <p v-show="item.sysCarList.length==0" style="text-align: center;font-size: 1rem;color: #999">暂无数据</p>
        </el-collapse-item>
      </el-collapse>
      <p v-show="carList.length==0" style="text-align: center;font-size: 1rem;margin-top: 1rem;color: #999">暂无数据</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "vehicleList",
        data() {
            return {
                activeNames: [],
                carList: []
            }
        },
        // props: ['myProp'],
        // watch: {
        //     myProp(newVal) {
        //         console.log(newVal)
        //     },
        // },
        created() {
            this.getCarList();
        },
        methods: {
            getCarList() {
                this.$ajax.get(this.$URL + '/xf-unit/homePage/selectCarByGroup').then((res) => {
                    if (res.data.code == 200) {
                        this.carList = res.data.data;
                        // console.log(res.data.data, 69696)
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
        }
    }
</script>

<style scoped lang="less">

</style>
