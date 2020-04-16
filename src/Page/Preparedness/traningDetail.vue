<template>
  <div>
    <div class="list-box">
      <div class="util-box clearfix">
        <div class="inp-box clearfix">
          <span>任务名：</span>
          <input v-model="form.taskName" type="text" placeholder="请输入" class="inp" />
        </div>

        <div class="search-btn" style="cursor:pointer;width: 70px" @click="getPage">查询</div>
        <div class="add-person-btn common" style="cursor:pointer" @click="openDialog">
          <i class="iconfont icon-add"></i>
          <span>添加</span>
        </div>
      </div>
      <el-tabs class="spe_tabs" @tab-click="changeTab" type="card">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="待执行" name="1"></el-tab-pane>
        <el-tab-pane label="执行中" name="2"></el-tab-pane>
        <el-tab-pane label="已执行" name="3"></el-tab-pane>
      </el-tabs>

      <el-table
        v-loading="loadingData"
        class="showScroll"
        stripe
        height="570px"
        :data="list"
        border
      >
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column prop="taskName" align="center" label="任务名" width="180"></el-table-column>
        <el-table-column prop="status" align="center" label="状态" width="100">
          <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
        </el-table-column>
        <el-table-column prop="userName" align="center" width="100" label="创建人"></el-table-column>
        <el-table-column prop="createTime" align="center" width="120" label="创建时间">
          <template slot-scope="scope">{{getTime(scope.row.createTime,'MM-dd hh:mm')}}</template>
        </el-table-column>
        <el-table-column align="center" width="150" label="当前进度">
          <template v-slot="scope">
            <el-progress
              color="#c86dd7"
              :percentage="isNaN((scope.row.overTaskCount/scope.row.totalTaskCount)*100)?0:(scope.row.overTaskCount/scope.row.totalTaskCount)*100"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="taskType" align="center" width="120" label="任务类型">
          <template slot-scope="scope">{{scope.row.taskType | taskTypeFilter}}</template>
        </el-table-column>
        <el-table-column prop="taskLevel" align="center" width="120" label="任务级别">
          <template slot-scope="scope">{{scope.row.taskLevel | taskLevelFilter}}</template>
        </el-table-column>
        <el-table-column prop="taskCategory" align="center" width="120" label="任务类别"></el-table-column>
        <el-table-column prop="deptNames" align="center" width="200" label="执行单位"></el-table-column>
        <el-table-column prop="startTime" align="center" width="120" label="任务开始时间">
          <template slot-scope="scope">{{getTime(scope.row.startTime,'MM-dd hh:mm')}}</template>
        </el-table-column>
        <el-table-column prop="endTime" align="center" width="120" label="任务结束时间">
          <template slot-scope="scope">{{getTime(scope.row.endTime,'MM-dd hh:mm')}}</template>
        </el-table-column>
        <el-table-column prop="taskDeadlineTime" align="center" width="140" label="数据上报截止时间">
          <template slot-scope="scope">{{getTime(scope.row.taskDeadlineTime,'MM-dd hh:mm')}}</template>
        </el-table-column>
        <el-table-column align="center" width="120" label="数据上报频率">
          <template v-slot>每周一次</template>
        </el-table-column>
        <el-table-column prop="address" align="center" width="150" fixed="right" label="操作">
          <template v-slot="scope">
            <template v-if="scope.row.status===1">
              <el-button class="spe_color" type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button class="spe_color" type="text" @click="del(scope.row)">删除</el-button>
            </template>
            <template v-else>
              <el-button class="spe_color" type="text" @click="detail(scope.row)">查看</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from "../../assets/js/cookie.js";
export default {
  name: "TrainingDetail",
  data() {
    return {
      //loading
      loadingData: false,

      deptId: "",

      list: [],

      form: {}
    };
  },
  created() {
    this.groupId = JSON.parse(getCookie("userInfo")).groupId;
    this.getPage();
  },
  methods: {
    getPage() {
      let params = {
        deptId: this.deptId
      };
      this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/task/getUpcomingTask",
        params: params
      })
        .then(res => {
          console.log(res, "res");
        })
        .catch(err => {})
        .finally(_ => {});
    },
    openDialog() {},
    changeTab() {}
  }
};
</script>

<style>
.spe_tabs {
  margin-top: 10px;
}
.spe_tabs .el-tabs__item {
  background: #ffffff;
  box-sizing: border-box;
  height: 100%;
  border: none !important;
}
.spe_tabs .el-tabs__item:hover {
  color: #486dff;
}
.spe_tabs .is-active {
  background: #f2f3f7;
  color: #486dff;
  border-top: 1px solid #486dff !important;
}
</style>