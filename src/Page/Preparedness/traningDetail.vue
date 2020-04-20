<template>
  <div>
    <div class="list-box">
      <div class="util-box clearfix">
        <div class="inp-box clearfix">
          <span>任务名：</span>
          <input
            style="width: 300px"
            v-model="form.taskName"
            type="text"
            placeholder="请输入"
            class="inp"
          />
        </div>

        <div class="search-btn" style="cursor:pointer;width: 70px" @click="getPage">查询</div>
      </div>
      <el-tabs class="spe_tabs" @tab-click="changeTab" v-model="status" type="card">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="待执行" name="1"></el-tab-pane>
        <el-tab-pane label="执行中" name="2"></el-tab-pane>
        <el-tab-pane label="已执行" name="3"></el-tab-pane>
      </el-tabs>

      <el-table
        ref="otherTable"
        v-loading="loadingData"
        class="showScroll"
        stripe
        height="570px"
        :data="list"
        border
        @expand-change="handleExpand"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.expandList">
              <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
              <el-table-column prop="projectName" align="center" label="项目名"></el-table-column>
              <el-table-column prop="totalNum" align="center" label="参与人数"></el-table-column>
              <el-table-column prop="participationRateString" align="center" label="参与率"></el-table-column>
              <el-table-column prop="passNum" align="center" label="达标人数"></el-table-column>
              <el-table-column prop="complianceRateString" align="center" label="达标率"></el-table-column>
              <el-table-column align="center" label="具体成绩" width="100">
                <template slot-scope="scopeProp">
                  <el-button type="text" @click="setRecord(scopeProp.row)">录入成绩</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
        <el-table-column prop="taskName" align="center" label="所属任务名"></el-table-column>
        <el-table-column prop="createdBy" align="center" label="发布人" width="200"></el-table-column>
        <el-table-column prop="time" align="center" label="执行时间段" width="160"></el-table-column>
        <el-table-column prop="taskCategory" align="center" label="项目类型" width="160"></el-table-column>
        <el-table-column align="center" label="操作" width="130">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status===1"
              type="text"
              :loading="scope.row.loadingData"
              @click="setDate(scope.row)"
            >设置日程</el-button>
            <el-button v-if="scope.row.status===2" type="text" @click="detail(scope.row)">录入成绩</el-button>
            <el-button v-if="scope.row.status===3" type="text" @click="detail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination :pageNum="totalPages" @changePage="getPage($event)"></pagination>
    </div>

    <el-dialog title="设置日程" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <el-table :data="dialogList" stripe border @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="projectName" label="训练项目" align="center"></el-table-column>
        <el-table-column label="选择人员" align="center">
          <template slot-scope="scope">
            <el-select
              class="spe_date_picker"
              multiple
              collapse-tags
              v-model="scope.row.selected"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" width="220">
          <template slot-scope="scope">
            <el-date-picker
              class="spe_date_picker"
              v-model="scope.row.startTime"
              type="datetime"
              placeholder="选择开始时间"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" width="220">
          <template slot-scope="scope">
            <el-date-picker
              class="spe_date_picker"
              v-model="scope.row.endTime"
              type="datetime"
              placeholder="选择结束时间"
            ></el-date-picker>
          </template>
        </el-table-column>
      </el-table>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取消</el-button>
          <el-button
            size="small"
            style="background:#486dff;border-color:#486dff"
            type="primary"
            :loading="loadingSave"
            @click="saveDate"
          >保存</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="record_fullscreen" v-if="showFullscreen">
      <div class="header">
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          class="back_btn"
          @click="closeFullscreen"
        >返回</el-button>
      </div>
      <div class="content">
        <el-divider class="basic" content-position="left">
          <el-divider direction="vertical"></el-divider>
          <span>基本信息</span>
        </el-divider>
        <div class="inner">
          <div style="font-weight:bold;font-size:24px;margin-bottom:5px">{{activeName}}</div>
          <el-table class="record_table" :data="recordUserList">
            <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
            <el-table-column align="center" prop="achievement" label="成绩">
              <template slot-scope="scope">
                <el-input-number
                  :controls="false"
                  v-model="scope.row.achievement"
                  placeholder="请输入"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="makeUpExaminationAchievement" label="补考成绩">
              <template slot-scope="scope">
                <el-input-number
                  :controls="false"
                  v-model="scope.row.makeUpExaminationAchievement"
                  placeholder="请输入"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="footer">
          <el-button
            size="small"
            type="default"
            style="color:#496dff"
            :loading="loadingOtherSave"
            @click="saveGrade"
          >保存</el-button>
          <el-button
            size="small"
            type="primary"
            style="background:#496dff;border-color:#496dff;color:#ffffff"
            :loading="loadingOtherSubmit"
            @click="submitGrade"
          >提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import pagination from "../../components/pagination";
export default {
  name: "TrainingDetail",
  components: {
    pagination
  },
  data() {
    return {
      //loading
      loadingData: false,
      loadingSave: false,
      loadingOtherSave: false,
      loadingOtherSubmit: false,

      status: "0",
      deptId: "",

      list: [],
      totalPages: 0,
      form: {},

      //设置日程
      dialogVisible: false,
      dialogList: [],
      userList: [],
      dialogParams: {
        taskId: "",
        deptId: "",
        projects: []
      },
      selectProjects: [],

      showFullscreen: false,
      recordUserList: [],
      activeName: ""
    };
  },
  created() {
    this.deptId = JSON.parse(getCookie("userInfo")).groupId;
    this.getPage();
  },
  methods: {
    getPage() {
      let params = {
        deptId: this.deptId
      };
      if (this.form.taskName) params.taskName = this.form.taskName;
      if (Number(this.status)) params.status = Number(this.status);
      this.loadingData = true;
      this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/task/getUpcomingTask",
        params: params
      })
        .then(res => {
          if (res.data.status !== 200) return (this.list = []);
          res.data.data.list.forEach(item => (item.expandList = []));
          this.list = res.data.data.list;
          this.totalPages = res.data.data.pages;
        })
        .catch(err => {})
        .finally(_ => {
          this.loadingData = false;
        });
    },
    openDialog() {},
    changeTab() {
      this.getPage();
    },

    async getPersons() {
      await this.$ajax({
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: this.$dataSetUrl + "/apis/userbasic/getdata",
        data: qs.stringify({
          rowLength: 500,
          pageNum: 1
        })
      })
        .then(res => {
          try {
            this.userList = res.data.data[0].dataList;
          } catch (error) {
            this.userList = [];
          }
        })
        .catch(err => {});
    },

    async handleExpand(row, tree) {
      await this.getExpandData(row);
    },

    async getExpandData(e) {
      let params = {
        taskId: e.saTaskId,
        deptId: e.deptId
      };
      await this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/taskProject/projectTrainingSituation",
        params: params
      }).then(res => {
        res.data.data.projectTrainingSituationVos.forEach(
          item => (item.projectId = res.data.data.id)
        );
        e.expandList = res.data.data.projectTrainingSituationVos;
      });
    },

    async getStaffList(taskProjectId) {
      await this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/taskProject/projectStaffList",
        params: {
          taskProjectId: taskProjectId
        }
      }).then(res => {
        res.data.data.projectUserList.forEach(
          item => (item.saTaskProjectId = taskProjectId)
        );
        this.recordUserList = res.data.data.projectUserList;
      });
    },

    async detail(e) {
      await this.getExpandData(e);
      this.$refs.otherTable.toggleRowExpansion(e);
    },

    handleSelectionChange(e) {
      this.selectProjects = e;
    },

    //设置日程
    async setDate(e) {
      this.$set(e, "loadingData", true);
      await this.getPersons();
      await this.getExpandData(e);
      this.dialogParams.taskId = e.saTaskId;
      this.dialogParams.deptId = e.deptId;
      let list = this.$c(e.expandList);
      list.forEach(item => {
        item.startTime = "";
        item.endTime = "";
        item.selected = this.userList.map(item => item.id);
      });
      this.dialogList = list;
      this.$set(e, "loadingData", false);
      this.dialogVisible = true;
    },

    saveDate() {
      if (!this.selectProjects.length)
        return this.$message.error("请先至少选择一个项目");
      let checkNoDate = false;
      this.selectProjects.forEach(item => {
        if (!item.startTime || !item.endTime) checkNoDate = true;
      });
      if (checkNoDate) return this.$message.error("请选择时间");

      let checkDate = true;
      let projects = this.selectProjects.map(item => {
        if (+new Date(item.startTime) >= +new Date(item.endTime)) {
          checkDate = false;
        }
        return {
          taskProjectId: item.projectId,
          startTime: this.getTime(item.startTime, "yyyy-MM-dd hh:mm"),
          endTime: this.getTime(item.endTime, "yyyy-MM-dd hh:mm")
        };
      });
      if (!checkDate) return this.$message.error("结束时间不能小于开始时间");
      let params = {
        taskId: this.dialogParams.taskId,
        deptId: this.dialogParams.deptId,
        projects: projects
      };
      this.loadingSave = true;
      this.$ajax({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        url: this.$combatUrl + "/taskProject/editTaskProject",
        data: params
      })
        .then(res => {
          this.$message.success("操作成功");
          this.dialogVisible = false;
          this.getPage();
        })
        .finally(_ => {
          this.loadingSave = false;
        });
    },

    async setRecord(e) {
      await this.getStaffList(e.taskProjectId);
      this.activeName = e.projectName;
      this.showFullscreen = true;
    },

    closeFullscreen() {
      this.showFullscreen = false;
    },

    saveGrade() {
      this.$confirm("确定保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = this.$c(this.recordUserList).map(item => {
            let obj = {
              id: item.id,
              ischeckin: item.ischeckin ? 1 : 0,
              achievement: Number(item.achievement),
              saTaskProjectId: item.saTaskProjectId
            };
            if (item.makeUpExaminationAchievement)
              obj.makeUpExaminationAchievement = Number(
                item.makeUpExaminationAchievement
              );
            if (item.remark) obj.remark = item.remark;
            return obj;
          });
          this.loadingOtherSave = true;
          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            url: this.$combatUrl + "/taskProject/replaceProjectUserSave",
            data: params
          })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success("操作成功");
                this.showFullscreen = false;
                this.getPage();
              }
            })
            .finally(_ => {
              this.loadingOtherSave = false;
            });
        })
        .catch(() => {});
    },

    submitGrade() {
      this.$confirm("确定提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = this.$c(this.recordUserList).map(item => {
            let obj = {
              id: item.id,
              ischeckin: item.ischeckin ? 1 : 0,
              achievement: Number(item.achievement),
              saTaskProjectId: item.saTaskProjectId
            };
            if (item.makeUpExaminationAchievement)
              obj.makeUpExaminationAchievement = Number(
                item.makeUpExaminationAchievement
              );
            if (item.remark) obj.remark = item.remark;
            return obj;
          });
          this.loadingOtherSubmit = true;
          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            url: this.$combatUrl + "/taskProject/enteringGrades",
            data: params
          })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success("操作成功");
                this.showFullscreen = false;
                this.getPage();
              }
            })
            .finally(_ => {
              this.loadingOtherSubmit = false;
            });
        })
        .catch(() => {});
    },

    handleClose(done) {
      done();
    },

    getTime(time, fmt = "yyyy-MM-dd") {
      if (!time) return "";
      let transTime = new Date(time);
      let o = {
        "M+": transTime.getMonth() + 1, //月份
        "d+": transTime.getDate(), //日
        "h+": transTime.getHours(), //小时
        "m+": transTime.getMinutes(), //分
        "s+": transTime.getSeconds(), //秒
        "q+": Math.floor((transTime.getMonth() + 3) / 3), //季度
        S: transTime.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (transTime.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },

    $c(e) {
      return JSON.parse(JSON.stringify(e));
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: center;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}
.spe_date_picker {
  width: 100%;
}

.record_fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1500;
  background: #ffffff;
  overflow: auto;
}
.record_fullscreen .header {
  padding: 20px 180px 0;
}
.record_fullscreen .back_btn {
  background: #f3f6fb;
  color: #2385d7;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.record_fullscreen .content {
  padding: 20px 250px 0;
}
.record_fullscreen .content .inner {
  background: #f8f8f9;
  border: 1px dotted #c4c3c4;
  padding: 30px 50px;
}

.record_table /deep/ .el-table__header-wrapper th {
  background: #496dff;
  color: #ffffff;
}
.record_table /deep/ .el-table__body-wrapper td {
  background: #f8f8f9;
  color: #676767;
}

.record_fullscreen .footer {
  text-align: center;
  margin-top: 10px;
}
</style>

</style>

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

.record_fullscreen .content .el-divider__text {
  padding: 0;
}
.record_fullscreen .content .el-divider__text.is-left {
  left: 0;
}
.record_fullscreen .content .el-divider--vertical {
  width: 3px;
  background: #486dff;
}
</style>