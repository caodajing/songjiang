<script src="../../../test-html/luyinggongneng/代码移交/港城录音系统开发文件/港城录音系统开发文件/gcvoice/js/index.js"></script>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="css" scoped>
    @import "./assets/css/dataSet.css"
</style>
<script>
    export default {
        name: 'App'
    }
</script>

<style>
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  ul, ol, p {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  /*滚动条 start*/
  .scroll-bar-style{
    overflow: auto;
    float: left;
    margin: 5px;
    border: none;
  }
  .scroll-bar-style::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .scroll-bar-style::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  .scroll-bar-style::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }
  /*滚动条 end*/

  .BMap_noprint{
    display: none;
  }
  .anchorBL{
    display: none;
  }
  /*.BMap_noprint anchorTR*/
</style>
