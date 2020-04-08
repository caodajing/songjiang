<!--数据设置-->
<template>
  <div class="leftNav-box">
    <div class="title">
      <span>战备工作</span>
      <i>></i>
    </div>
    <ul class="list">
      <router-link
        :to="item.path"
        tag="li"
        v-for="(item,index) in navList"
        :key="index"
      >{{item.name}}</router-link>
    </ul>
  </div>
</template>


<script>
export default {
  name: "leftNav",
  data() {
    return {
      navList: [
        {
          name: "训练",
          path: "/training/index"
        },
        {
          name: "六熟悉",
          path: "/sixFamiliar/index"
        }
      ]
    };
  }
};
</script>


