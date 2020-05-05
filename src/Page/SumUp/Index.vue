<template>
  <div>
    <router-view :name="name" />
  </div>
</template>

<script>
import { setCookie, getCookie } from "../../assets/js/cookie.js";
export default {
  name: "SumIndex",
  data() {
    return {
      name: ""
    };
  },
  created() {
    let grade = JSON.parse(getCookie("userInfo")).grade;
    if (grade === 2 || grade === 3) {
      this.name = "default";
    } else { //支队权限
      this.name = "detail";
    }
  }
};
</script>

<style>
</style>