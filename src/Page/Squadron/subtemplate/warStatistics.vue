<!--战力统计模板-->
<template>
  <div class="war-statistics">
    <p><span>{{'战力统计 — '+listData.name}}</span>
      <span class="score">{{listData.score}}</span><i class="iconfont icon-jieshi"></i></p>
    <ul>
      <li>
        <span>处警压力</span>
        <p><b>{{listData.one}}</b>起</p>
      </li>
      <li>
        <span>待命车辆总数</span>
        <p><b>{{listData.two}}</b>辆</p>
      </li>
      <li>
        <span>待命警力数</span>
        <p><b>{{listData.two}}</b>人</p>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "warStatistics",
        data() {
            return {
                groupId: '',
                listData: {name: '泗泾中队', score: '0', one: '0', two: '0', three: '0'}
            }
        },
        props: ['myProp'],
        watch: {
            myProp(newVal) {
                this.listData.name = JSON.parse(newVal).groupName;
                this.groupId = JSON.parse(newVal).groupId;
                // this.listData.name=newVal.name;
                this.deptWarStatistics();
            },
        },
        // created() {
        //     this.deptWarStatistics();
        // },
        methods: {
            deptWarStatistics(data) {//data.code
                this.$ajax.get(this.$URL + '/xf-unit/dutySquadron/combatStatistics', {
                    params: {
                        groupId: this.groupId
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.listData.score = res.data.data.combatScore;
                        this.listData.one = res.data.data.policePressure;
                        this.listData.two = res.data.data.standbyVehicles;
                        this.listData.three = res.data.data.standbyForce;
                        // console.log(res.data.data, 1234526);
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

<style scoped>

</style>
