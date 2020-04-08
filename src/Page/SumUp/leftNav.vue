<!--数据设置-->
<template>
  <div class="leftNav-box">
    <div class="title">
      <span>战评总结</span>
      <i>></i>
    </div>
    <!-- <ul class="list">
      <router-link
        :to="item.path"
        tag="li"
        v-for="(item,index) in navList"
        :key="index"
      >{{item.name}}</router-link>
    </ul> -->
  </div>
</template>


<script>
export default {
  name: "leftNav",
  data() {
    return {
      navList: [
        {
          name: "战评总结",
          path: "/summingUp"
        }
      ]
    };
  }
};
</script>


