<template>
  <div class="content">
    <Header/>
    <!--    <LeftNav/>-->
    <router-view></router-view>
  </div>
</template>
<script>
    import Header from './Header'

    export default {
        name: "Home",
        components: {
            Header,
        },
    }
</script>

<style scoped lang="less">
  .content {
    padding-top: 60px;
    width: 100%;
    height: 100%;
  }
</style>
