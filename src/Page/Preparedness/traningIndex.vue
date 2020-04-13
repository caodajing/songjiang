<template>
  <div>
    <div class="list-box">
      <div class="util-box clearfix">
        <div class="inp-box clearfix">
          <span>任务名：</span>
          <input v-model="form.taskName" type="text" placeholder="请输入" class="inp" />
        </div>
        <div class="inp-box clearfix person-inp-box">
          <span>执行中队：</span>
          <el-select clearable v-model="form.deptId" placeholder="请选择">
            <el-option
              v-for="item in teamList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
        </div>
        <div class="inp-box clearfix">
          <span>项目名：</span>
          <el-select clearable v-model="form.projectId" placeholder="请选择">
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.projectName"
              :value="item.id"
            ></el-option>
          </el-select>
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
        v-show="showIndex"
        v-loading="loadingData"
        class="showScroll"
        stripe
        height="500px"
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
              :percentage="(scope.row.overTaskCount/scope.row.totalTaskCount)*100"
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

      <el-table ref="otherTable" v-show="!showIndex" border :data="detailData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              @row-click="row=>handleRowClick(row,props)"
              :data="props.row.taskExecuteSituationVos"
              border
            >
              <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
              <el-table-column prop="deptName" align="center" label="执行单位" width="180"></el-table-column>
              <el-table-column prop="planExecuteDate" align="center" label="计划执行时间" width="180">
                <template slot-scope="scope">{{getTime(scope.row.planExecuteDate,'MM-dd')}}</template>
              </el-table-column>
              <el-table-column prop="currentSchedule" align="center" label="当前进度"></el-table-column>
              <el-table-column prop="taskScheduleString" align="center" label="任务进度"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" align="center" label="序号" width="50">1</el-table-column>
        <el-table-column prop="taskName" label="子任务名" align="center"></el-table-column>
        <el-table-column prop="squadronInvolved" label="执行单位" align="center"></el-table-column>
        <el-table-column align="center" label="执行时间段">
          <template
            slot-scope="scope"
          >{{getTime(scope.row.createdTime,'MM-dd')}} 到 {{getTime(scope.row.taskDeadlineTime,'MM-dd')}}</template>
        </el-table-column>
        <el-table-column prop="taskCompleteScheduleString" label="当前进度" align="center">
          <template slot-scope="scope">
            <el-progress color="#c86dd7" :percentage="scope.row.completeScheduleTotalCount*100"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button style="color:#5879ff" @click="expand(scope.row)" type="text">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination :pageNum="totalPages" @changePage="getPage($event)"></pagination>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form :model="taskForm" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item label="任务类型" prop="taskType">
          <el-select class="form_item" v-model="taskForm.taskType" placeholder="请选择任务类型">
            <el-option
              v-for="item in taskTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务级别" prop="taskLevel">
          <el-select class="form_item" v-model="taskForm.taskLevel" placeholder="请选择任务级别">
            <el-option
              v-for="item in taskLevelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类别" prop="taskCategory">
          <el-input class="form_item" v-model="taskForm.taskCategory" placeholder="请输入任务类别"></el-input>
        </el-form-item>
        <el-form-item label="任务名" prop="taskName">
          <el-input class="form_item" v-model="taskForm.taskName" placeholder="请输入任务名"></el-input>
        </el-form-item>
        <el-form-item label="执行单位" prop="team">
          <el-select
            class="form_item"
            multiple
            collapse-tags
            v-model="taskForm.team"
            placeholder="请选择"
          >
            <el-option
              v-for="item in teamList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" required>
          <template>
            <div v-for="(item,index) in dialogProList" :key="index">
              <el-select
                style="margin-bottom:5px"
                class="form_item"
                v-model="item.project"
                placeholder="请选择项目"
              >
                <el-option
                  v-for="val in projectList"
                  :key="val.id"
                  :label="val.projectName"
                  :value="val.projectName"
                ></el-option>
              </el-select>
              <i
                v-if="dialogProList.length===1 || (dialogProList.length>1 && index===dialogProList.length-1)"
                class="iconfont icon-add"
                style="font-size:20px;cursor:pointer;margin-left:5px"
                @click="addProject"
              ></i>
              <i
                v-else
                class="el-icon-remove-outline"
                style="font-size:20px;cursor:pointer;margin-left:5px"
                @click="delProject(index)"
              ></i>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="任务开始时间" prop="startTime" required>
          <el-date-picker
            class="form_item"
            v-model="taskForm.startTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="任务结束时间" prop="endTime" required>
          <el-date-picker
            class="form_item"
            v-model="taskForm.endTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="数据上报截止时间" prop="taskDeadlineTime" required>
          <el-date-picker
            class="form_item"
            v-model="taskForm.taskDeadlineTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="数据上报频率">
          <el-input class="form_item" disabled value="每周一次"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div style="text-align:center;border-top:1px solid #e0e0e0;padding-top:10px">
          <el-button size="mini" class="cancel_btn" @click="dialogVisible = false">取消</el-button>
          <el-button
            size="mini"
            class="sure_btn"
            type="primary"
            :loading="loadingSubmit"
            @click="submitTask"
          >发布</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog class="detailDialog" title="查看进度" :visible.sync="detailDialog" width="60%">
      <div style="margin-bottom:40px;font-size:20px">{{detailTitle}}</div>
      <el-table :data="detailTable" border>
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="projectName" align="center" label="训练项目" width="200"></el-table-column>
        <el-table-column prop="achievementUnit" align="center" label="成绩单位" width="100"></el-table-column>
        <el-table-column prop="updatedTime" align="center" label="计划执行时间" width="200">
          <template
            slot-scope="scope"
          >{{getTime(scope.row.startTime,'MM-dd hh:mm')}} 到 {{getTime(scope.row.endTime,'MM-dd hh:mm')}}</template>
        </el-table-column>
        <el-table-column prop="checkInNum" align="center" label="参与人数" width="100"></el-table-column>
        <el-table-column prop="participationRateString" align="center" label="参与率" width="100"></el-table-column>
        <el-table-column prop="passNum" align="center" label="达标人数" width="100"></el-table-column>
        <el-table-column prop="complianceRateString" align="center" label="达标率" width="100"></el-table-column>
        <el-table-column prop="prop" align="center" label="未达标人数" width="100">
          <template slot-scope="scope">{{scope.row.totalNum-scope.row.passNum}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="progressDetail(scope.row)">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <div class="fullScreen_detail" v-if="showFullscreen">
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
          <el-form class="my_form_1" ref="form" :model="fullscreenForm" label-width="90px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="子任务名">{{fullscreenForm.taskName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执行单位">{{fullscreenForm.squadronInvolved}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="执行时间段"
                >{{getTime(fullscreenForm.createdTime,'MM-dd')}} 到 {{getTime(fullscreenForm.taskDeadlineTime,'MM-dd')}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="当前进度">{{fullscreenForm.taskSchedule}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目名">{{fullscreenForm.projectName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="录入人">{{fullscreenForm.createdBy}}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="录入时间">{{fullscreenForm.createdTime}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参与人数">{{fullscreenForm.checkInNum}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参与率">{{fullscreenForm.participationRateString}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="达标人数">{{fullscreenForm.passNum}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="达标率">{{fullscreenForm.complianceRateString}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="content" style="margin-bottom: 30px">
        <el-divider class="basic" content-position="left">
          <el-divider direction="vertical"></el-divider>
          <span>训练成绩</span>
        </el-divider>
        <div class="inner">
          <el-table class="score_table" :data="scoreList">
            <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
            <el-table-column prop="achievement" align="center" label="成绩"></el-table-column>
            <el-table-column prop="makeUpExaminationAchievement" align="center" label="补考成绩"></el-table-column>
            <el-table-column prop="remark" align="center" label="备注"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "../../components/pagination";
import { setCookie, getCookie } from "../../assets/js/cookie.js";
export default {
  name: "TrainingIndex",
  components: {
    pagination
  },
  filters: {
    statusFilter(item) {
      let list = ["待执行", "执行中", "已完成"];
      return list[item - 1];
    },
    taskTypeFilter(item) {
      let list = ["训练任务", "其他任务"];
      return list[item - 1];
    },
    taskLevelFilter(item) {
      let list = ["一般", "紧急"];
      return list[item - 1];
    }
  },
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (!value) return callback(new Error("任务开始时间不能为空"));
      if (+value < +new Date())
        return callback(new Error("任务开始时间不能小于当前时间"));
      callback();
    };
    const validateEndTime = (rule, value, callback) => {
      if (!value) return callback(new Error("任务结束时间不能为空"));
      if (+this.taskForm.startTime > +value)
        return callback(new Error("任务开始时间不能大于任务结束时间"));
      callback();
    };
    const validateDeadLine = (rule, value, callback) => {
      if (!value) return callback(new Error("数据上报截止时间不能为空"));
      if (+value < +this.taskForm.endTime)
        return callback(new Error("数据上报时间不能小于任务结束时间"));
      callback();
    };
    return {
      //loading
      loadingData: false,
      loadingSubmit: false,

      teamList: [], //中队名
      projectList: [], //项目名
      userId: "",

      form: {
        taskName: "",
        deptId: "",
        projectId: "",
        page: 1,
        pageSize: 50,
        status: 0
      },

      list: [],
      tableData: [],
      totalPages: 0,

      addTaskMask: false,
      task: {
        type: ""
      },

      //dialog
      title: "",
      dialogVisible: false,
      dialogProList: [],
      taskForm: {
        id: "",
        taskType: "",
        taskLevel: "",
        taskCategory: "",
        taskName: "",
        team: [],
        startTime: "",
        endTime: "",
        taskDeadlineTime: ""
      },
      rules: {
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        taskLevel: [
          { required: true, message: "请选择任务级别", trigger: "change" }
        ],
        taskCategory: [
          { required: true, message: "请输入任务类别", trigger: "blur" }
        ],
        taskName: [
          { required: true, message: "请输入任务名", trigger: "blur" }
        ],
        team: [
          { required: true, message: "请输入执行单位", trigger: "change" }
        ],
        startTime: [{ validator: validateStartTime, trigger: "change" }],
        endTime: [{ validator: validateEndTime, trigger: "change" }],
        taskDeadlineTime: [{ validator: validateDeadLine, trigger: "change" }]
      },
      taskTypeList: [
        {
          label: "训练任务",
          value: 1
        },
        {
          label: "其他任务",
          value: 2
        }
      ],
      taskLevelList: [
        {
          label: "一般",
          value: 1
        },
        {
          label: "紧急",
          value: 2
        }
      ],

      //
      showIndex: true,
      detailData: [],

      //详情展开dialog
      detailDialog: false,
      detailTitle: "",
      detailTable: [],

      //fullscreen
      showFullscreen: false,
      fullscreenForm: {
        taskName: "",
        squadronInvolved: "",
        createdTime: "",
        taskDeadlineTime: "",
        taskSchedule: null,

        checkInNum: "",
        participationRateString: "",
        passNum: "",
        complianceRateString: "",
        createdBy: "", //录入人
        createdTime: "" //录入时间
      },
      scoreList: []
    };
  },
  created() {
    this.getTeam();
    this.getPage();
    // this.getDept();
    this.getProject();
    this.userId = JSON.parse(getCookie("userInfo")).id;
  },
  methods: {
    changeTab(e) {
      if (this.form.status === Number(e.name)) return;
      this.showIndex = true;
      this.form.status = Number(e.name);
      this.getPage();
    },

    getTeam() {
      this.$ajax({
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: this.$dataSetUrl + "/apis/group/getdata",
        data: qs.stringify({
          rowLength: 500,
          pageNum: 1
        })
      })
        .then(res => {
          try {
            this.teamList = res.data.data[0].dataList.filter(
              item => item.grade === '3'
            );
          } catch (error) {
            this.teamList = [];
          }
        })
        .catch(err => {});
    },

    getPage(e) {
      if (e && !isNaN(e)) this.form.page = e;
      let params = {
        taskName: this.form.taskName,
        deptId: String(this.form.deptId),
        projectId: this.form.projectId,
        pageNum: this.form.page,
        pageSize: this.form.pageSize
      };
      if (Number(this.form.status)) params.status = Number(this.form.status);
      this.loadingData = true;
      this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/taskSchedule/selectAll",
        params: params
      })
        .then(res => {
          this.showIndex = true;
          if (res.data.status !== 200) {
            this.list = [];
          } else {
            console.log(res.data.data, "data");
            this.list = res.data.data.list;
            this.totalPages = res.data.data.pages;
          }
        })
        .catch(err => {})
        .finally(_ => {
          this.loadingData = false;
        });
    },

    //获取中队
    getDept() {
      this.$ajax
        .get(this.$combatUrl + "/dept/selectDept", qs.stringify({}))
        .then(res => {
          console.log(res.data.data, "res");
          // this.projectList = res.data.data;
        })
        .catch(err => {});
    },
    //获取项目
    getProject() {
      this.$ajax
        .get(this.$combatUrl + "/project/selectProject", qs.stringify({}))
        .then(res => {
          this.projectList = res.data.data.list;
        })
        .catch(err => {});
    },

    openDialog() {
      this.title = "新增任务";
      this.dialogVisible = true;
      this.$nextTick(_ => {
        this.$refs.ruleForm.resetFields();
        this.taskForm.id = "";
        this.taskForm.taskDeadlineTime = "";
        this.dialogProList = [
          {
            project: ""
          }
        ];
      });
    },

    addProject() {
      this.dialogProList.push({
        project: ""
      });
    },

    delProject(index) {
      this.dialogProList.splice(index, 1);
    },

    //任务详情
    detail(e) {
      this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/taskProject/smallTaskListExecuteSituation",
        params: {
          taskId: e.id,
          type: 2
        }
      })
        .then(res => {
          this.showIndex = false;
          this.detailData = res.data.data;
          console.log(JSON.parse(JSON.stringify(this.detailData)), "res");
        })
        .catch(err => {});
    },

    //编辑任务
    edit(e) {
      console.log(JSON.parse(JSON.stringify(e)), "e");
      let proList = [];
      e.projectIds.split(",").forEach(item => {
        this.projectList.forEach(val => {
          if (val.id === Number(item)) {
            proList.push({
              project: val.projectName
            });
          }
        });
      });
      this.title = "编辑任务";
      this.dialogVisible = true;
      this.$nextTick(_ => {
        this.$refs.ruleForm.resetFields();
        this.taskForm.id = e.id;
        this.taskForm.taskType = e.taskType;
        this.taskForm.taskLevel = e.taskLevel;
        this.taskForm.taskCategory = e.taskCategory;
        this.taskForm.taskName = e.taskName;
        this.taskForm.taskCategory = e.taskCategory;
        this.taskForm.team = e.deptNames.split(",");
        this.taskForm.startTime = e.startTime;
        this.taskForm.endTime = e.endTime;
        this.taskForm.taskDeadlineTime = e.taskDeadlineTime;
        this.dialogProList = proList;
      });
    },

    //删除任务
    del(e) {
      this.$confirm("确定删除该任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax({
            method: "POST",
            url:
              this.$combatUrl + "/taskSchedule/deleteTaskScheduleByPrimaryKey",
            data: qs.stringify({
              id: e.id
            })
          })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success("删除成功");
                this.getPage();
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },

    //展开
    expand(row) {
      this.$refs.otherTable.toggleRowExpansion(row);
    },

    handleRowClick(row, item) {
      this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/taskProject/projectTrainingSituation",
        params: {
          taskId: item.row.id,
          deptId: row.deptId
        }
      })
        .then(res => {
          console.log(JSON.parse(JSON.stringify(item.row)), "???");
          this.detailTitle = item.row.squadronInvolved;
          this.detailTable = res.data.data.projectTrainingSituationVos;
          this.fullscreenForm.taskName = item.row.taskName;
          this.fullscreenForm.squadronInvolved = item.row.squadronInvolved;
          this.fullscreenForm.createdBy = item.row.createdBy;
          this.fullscreenForm.createdTime = item.row.createdTime;
          this.fullscreenForm.taskDeadlineTime = item.row.taskDeadlineTime;
          this.fullscreenForm.taskSchedule = row.taskScheduleString;
          this.detailDialog = true;
        })
        .catch(err => {});
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

    submitTask() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return;
        let proList = [];
        this.dialogProList.forEach(item => {
          this.projectList.forEach(val => {
            if (val.projectName === item.project) {
              proList.push(val.id);
            }
          });
        });

        let deptIds = [];
        this.taskForm.team.forEach(item => {
          this.teamList.forEach(val => {
            if (item === val.groupName) deptIds.push(val.groupId);
          });
        });

        if (!proList.length) return this.$message.error("请先添加项目");
        let params = {
          taskType: this.taskForm.taskType,
          taskCategory: this.taskForm.taskCategory,
          taskLevel: this.taskForm.taskLevel,
          taskName: this.taskForm.taskName,
          startTime: this.getTime(this.taskForm.startTime, "yyyy-MM-dd hh:mm"),
          endTime: this.getTime(this.taskForm.endTime, "yyyy-MM-dd hh:mm"),
          taskDeadlineTime: this.getTime(
            this.taskForm.taskDeadlineTime,
            "yyyy-MM-dd hh:mm"
          ),
          createdBy: this.userId,
          projectIds: proList.join(","),
          deptIds: deptIds.join(","),
          deptNames: this.taskForm.team.join(",")
        };
        let url = "";
        if (this.title === "编辑任务") {
          params.id = this.taskForm.id;
          url = "/taskSchedule/updateTaskScheduleByPrimaryKey";
        } else {
          url = "/task/createTask";
        }
        this.loadingSubmit = true;
        this.$ajax({
          method: "POST",
          url: this.$combatUrl + url,
          data: qs.stringify(params)
        })
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success("操作成功");
              this.dialogVisible = false;
              this.getPage();
            } else {
              this.$message.error("操作失败");
            }
          })
          .catch(err => {})
          .finally(_ => {
            this.loadingSubmit = false;
          });
      });
    },

    addTask() {},

    handleClose(done) {
      done();
    },

    //进度页面
    progressDetail(data) {
      this.$ajax({
        method: "GET",
        url: this.$combatUrl + "/taskProject/projectStaffList",
        params: {
          taskProjectId: data.taskProjectId
        }
      })
        .then(res => {
          console.log(JSON.parse(JSON.stringify(data)), "data");
          this.fullscreenForm.projectName = data.projectName;
          this.fullscreenForm.checkInNum = data.checkInNum;
          this.fullscreenForm.participationRateString =
            data.participationRateString;
          this.fullscreenForm.passNum = data.passNum;
          this.fullscreenForm.complianceRateString = data.complianceRateString;
          this.scoreList = res.data.data.projectUserList;

          console.log(
            JSON.parse(JSON.stringify(this.scoreList)),
            "this.scoreList"
          );
          this.showFullscreen = true;
        })
        .catch(err => {});
    },

    //fullcreen
    closeFullscreen() {
      this.showFullscreen = false;
    }
  }
};
</script>

<style scoped>
.spe_color {
  color: #486dff;
}
.form_item {
  width: 300px;
}
.spe_mask {
  width: 500px !important;
  margin: 0 !important;
  transform: translate(-50%, -50%);
}
.sure_btn {
  color: #ffffff;
  background: #486dff;
  border-color: #486dff;
}
.cancel_btn {
  color: #486dff;
}
.fullScreen_detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background: #ffffff;
  overflow: auto;
}
.fullScreen_detail .header {
  padding: 20px 200px 0;
}
.fullScreen_detail .back_btn {
  background: #f3f6fb;
  color: #2385d7;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.fullScreen_detail .content {
  padding: 20px 300px 0;
}
.fullScreen_detail .content .inner {
  background: #f8f8f9;
  border: 1px dotted #c4c3c4;
  padding: 30px 50px;
}
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
.fullScreen_detail .content .el-divider__text {
  padding: 0;
}
.fullScreen_detail .content .el-divider__text.is-left {
  left: 0;
}
.fullScreen_detail .content .el-divider--vertical {
  width: 3px;
  background: #486dff;
}
.score_table .el-table__header th {
  background: #486dff;
  color: #ffffff;
}
.detailDialog .el-dialog__body {
  padding: 0 20px 30px;
}
.my_form_1 .el-form-item__label {
  color: #999999;
}
.my_form_1 .el-form-item__content {
  font-weight: 600;
  color: #666666;
}

.basic .el-divider__text {
  width: 100px;
}
</style>
