<!--战备工作-->
<template>
  <div class="container-wrap">
    <leftNav />
    <div class="personSetIndex-wrap">
      <div class="head-box">
        <i class="iconfont icon-shouye-copy icon"></i>
        <span>当前位置：战备工作 > 训练</span>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>

import leftNav from "./leftNav";

export default {
  name: "Trainging",
  components: {
    leftNav,
  },
 
};
</script>

