<template>
  <div>
    <el-input-number :controls="false" class="form_item_short" v-model="form.hour" /> 时
    <el-input-number :controls="false" class="form_item_short" v-model="form.min" /> 分
    <el-input-number :controls="false" class="form_item_short" v-model="form.seconds" /> 秒
  </div>
</template>

<script>
export default {
  name: "TimeComp",
  props: {
    value: [String, Number]
  },
  data() {
    return {
      form: {
        hour: 0,
        min: 0,
        seconds: 0
      }
    };
  },
  watch: {
    // value(e) {
    //   console.log(e, "xxxx;");
    //   // this.transTime(e);
    // },
    value: {
      handler(n) {
        if (!n) {
          this.form.hour = 0;
          this.form.min = 0;
          this.form.seconds = 0;
        } else {
          let hour = Math.floor(n / 3600);
          let min = Math.floor((n - 3600 * hour) / 60);
          let seconds = n - 3600 * hour - 60 * min;
          this.form.hour = hour;
          this.form.min = min;
          this.form.seconds = seconds;
        }
      },
      immediate: true
    },
    "form.hour"() {
      this.$emit("input", this.calcTime());
    },
    "form.min"() {
      this.$emit("input", this.calcTime());
    },
    "form.seconds"() {
      this.$emit("input", this.calcTime());
    }
  },
  methods: {
    calcTime() {
      return String(
        this.form.hour * 3600 + this.form.min * 60 + this.form.seconds
      );
    }
  }
};
</script>

<style scoped>
.form_item_short {
  width: 50px;
}
</style>