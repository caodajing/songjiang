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
    padding-top: 80px;
    width: 100%;
    height: calc(100% - 80px);
    // overflow: hidden;
  }
</style>
