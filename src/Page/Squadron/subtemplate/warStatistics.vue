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
                deptData: {},
                listData: {name: '松一中队', score: '8.9', one: '22', two: '2', three: '29'}
            }
        },
        props: ['myProp'],
        watch: {
            myProp(newVal) {
                console.log(newVal)
            },
        },
        created() {
            this.deptWarStatistics();
        },
        methods: {
            deptWarStatistics() {
                this.$ajax.get(this.$URL + '/dutySquadron/combatStatistics', {
                    params: {
                        groupId: '177094360841860269'
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        console.log(res.data.data, 1234526);
                    } else {
                        this.$Message.error(res.data.message)
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
