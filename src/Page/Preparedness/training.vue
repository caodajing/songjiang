<!--战备工作-->
<template>
  <div class="container-wrap">
    <leftNav />
    <div class="personSetIndex-wrap">
      <div class="head-box">
        <i class="iconfont icon-shouye-copy icon"></i>
        <span>当前位置：战备工作 > 训练</span>
      </div>
      <router-view :name="name" />
    </div>
  </div>
</template>

<script>
import leftNav from "./leftNav";
import { setCookie, getCookie } from "../../assets/js/cookie.js";

export default {
  name: "Trainging",
  components: {
    leftNav
  },
  created() {
    let grade = JSON.parse(getCookie("userInfo")).grade;
    if (grade === 2 || grade === 3) {
      this.name = "detail";
    } else {
      this.name = "default";
    }
  },
  data() {
    return {
      name: ""
    };
  }
};
</script>

