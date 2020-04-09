<!--辐射到场时间分布-->
<template>
  <div class="aging-distribution">
    <p>辐射到场时间分布</p>
    <div class="content-box" :class="{active:state}">
      <div class="operate-btn">
        <el-button :class="{active:!state}" @click="state=true" type="primary">交通高峰期</el-button>
        <br>
        <el-button :class="{active:state}" @click="state=false" type="primary">交通低估期</el-button>
      </div>
      <ul>
        <li>10分钟内到达</li>
        <li>20分钟内到达</li>
        <li>30分钟内到达</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "agingDistribution",
        data(){
            return{
                state:true,
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="less">
</style>
