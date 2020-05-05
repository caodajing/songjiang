<!--大屏执勤中队-->
<template>
    <div class="big-screen-squadron big-screenMode">
        <BigHeader/>
        <div class="container-wrap">
            <div class="leftNav-box">
                <div class="title">
                    <span>执勤中队</span>
                    <i>></i>
                </div>
                <ul class="list">
                    <li  v-for="(item,index) in departmentList" :key="index" :class="[clickDept.groupId == item.groupId ? 'act' : '']" @click="navSwitch(item)">{{item.groupName}}</li>
                </ul>
            </div>
            <div class="dutyDetachmentLimit-wrap">
                <div class="head-box">
                    <i class="iconfont icon-shouye-copy icon"></i> 
                    <span>当前位置： 执勤中队 > {{clickDept.groupName}}</span>
                </div>
                <div class="box flex">
                    <div class="left-box">
                        <div class="info-box">
                            <div class="img-box flex">
                                <img src="" alt="" :onerror="defaultTeamImg">
                            </div>
                            <div class="info">
                                <div class="clearfix">
                                    <h3>{{clickDept.groupName}}</h3>
                                    <span>{{listData.peopleCount}}人</span>
                                    <i></i>
                                    <span>{{listData.carCount}}辆</span>
                                    <i></i>
                                    <p class="score"> {{listData.score}}分 </p>
                                    <i class="question-icon"></i>
                                </div>
                                <p class="time">成立时间：{{listData.establishmentDate}}</p>
                                <p class="addr">地理位置：{{listData.address}}</p>
                            </div>
                            <div class="count-box">
                                <ul class="flex">
                                    <li>
                                        <p>处警压力</p>
                                        <p class="color1">
                                            <span>{{listData.one}}</span>
                                            <i>起</i> 
                                        </p>
                                    </li>
                                     <li>
                                        <p>待命车辆总数</p>
                                        <p class="color2"> 
                                            <span>{{listData.two}}</span>
                                            <i>辆</i> 
                                        </p>
                                    </li>
                                     <li>
                                        <p>待命警力数</p>
                                        <p class="color3">
                                            <span>{{listData.three}}</span>
                                            <i>人</i> 
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- 处警时效 -->
                        <div class="police-time-box">
                            <div class="title">处警时效</div>
                            <template>
                                <el-table
                                    height="330"
                                    :data="PoliceTimeList"
                                    style="width: 100%">
                                    <el-table-column prop="alarmDate" label="接警时间" align="center" width="180"></el-table-column>
                                    <el-table-column prop="presentTimeString" label="到场用时" align="center" width="180"></el-table-column>
                                    <el-table-column prop="alarmAddress" align="center" label="处警地址"></el-table-column>
                                    <el-table-column prop="remark" align="center" label="警情描述"></el-table-column>
                                    <el-table-column prop="carNumbers" align="center" label="到场车辆"></el-table-column>
                                    <el-table-column prop="peopleCount" align="center" label="随车人数"></el-table-column>
                                </el-table>
                            </template>
                        </div>
                         <!-- 人员对比 -->
                         <div class="person-box clearfix">
                                <div class="page-box clearfix">
                                    <div class="page">
                                        <span>每页显示</span>
                                        <el-input type="text" class="elInp inp" v-model="everyPageNum" placeholder="" :clearable="false" @input="validateNumber(everyPageNum)" @change="everyPageChange"></el-input>
                                    </div>
                                    
                                </div>
                                <div class="list">
                                    <template>
                                        <el-table
                                            height="710"
                                            :data="list.dataList"
                                            stripe
                                            border
                                            :header-cell-style="{background:'#F8F8F9',color:'#333',fontSize:'18px'}"
                                            :cell-style="{color:'#333',fontSize:'16px'}"
                                            style="width: 100%">
                                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                                            <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
                                            <el-table-column prop="sexName" label="性别" align="center"></el-table-column>
                                            <el-table-column prop="groupName" label="部门" align="center"></el-table-column>
                                            <el-table-column prop="roleName" label="职务" align="center"></el-table-column>
                                            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                                            <el-table-column prop="phone" label="当前状态" align="center"></el-table-column>
                                            <el-table-column label="加入比对" align="center">  
                                                <template slot-scope="scope">
                                                <div class="checkbox-box1 clearfix" @click="handelCheck(scope.row,scope.$index)">
                                                    <div class="span-box">
                                                        <span :class="[scope.row.checked ? 'icon-fuxuankuang' : 'icon-webicon202' , 'iconfont']"></span>
                                                    </div>
                                                </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                    <pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)"></pagination>
                                    <div class="button" @click="startCompare">加入人员比对</div>
                                </div>
                         </div>
                    </div>
                    <div class="right-box1">
                        <policeState :clickDept="JSON.stringify(clickDept)"/>
                        <div class="radar-attribute-box">
                            <p class="title">车辆状态</p>
                            <template>
                                <el-table
                                    :data="carStateList"
                                    style="width: 100%">
                                    <el-table-column prop="carNumber" label="车牌号" align="center" width="120"></el-table-column>
                                    <el-table-column prop="carStatusVal" align="center" label="当前状态"></el-table-column>
                                </el-table>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { setCookie, getCookie } from "../../assets/js/cookie.js";
    import BigHeader from "./bigScreenHead";
    import pagination from '../../components/pagination'
    import policeState from '../Squadron/subtemplate/policeState'
    export default {
        name: "bigScreenSquadronDetachmentLimit",
        components: {
            pagination,
            policeState,
            BigHeader,
        },
        data() {
            return {
                defaultTeamImg: 'this.src="' + require('../../assets/images/team-icon.png') + '"',
                departmentList:[], // 单位部门
                roleList:[], // 职务
                clickDept:{},
                list: [],
                everyPageNum:10, // 每页显示个数
                alrCheckedList:[], // 已选中的checkbox
                PoliceTimeList:[], // 处警时效
                carStateList:[], // 车辆状态
                listData: {name: '泗泾中队', score: '0', one: '0', two: '0', three: '0'}, // 战力统计

            }
        },
        mounted() {
            this.userInfo = JSON.parse(getCookie("userInfo"));
            this.getDeptList();
            this.getRoleList();
        },
        methods: {
            getCarStateList(){ // 车辆状态
                this.$ajax.get(this.$dataSetUrlTest + '/xf-unit/car/get', {
                    params:{
                        groupId: this.clickDept.groupId
                    }
                } ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                    let data = res.data;
                    if(data.code == 200){
                        this.carStateList = data.data;
                        this.carStateList.map(item => {
                            if(item.carStatus == 1){
                                item.carStatusVal = '在库';
                            }else if(item.carStatus == 2){
                                item.carStatusVal = '出警';
                            }else if(item.carStatus == 3){
                                item.carStatusVal = '训练';
                            }else if(item.carStatus == 4){
                                item.carStatusVal = '维修';
                            }else if(item.carStatus == 5){
                                item.carStatusVal = '清洗';
                            }else if(item.carStatus == 6){
                                item.carStatusVal = '加油';
                            }else if(item.carStatus == 7){
                                item.carStatusVal = '报废';
                            }
                        })
                    }else{
                        this.carStateList = [];
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            deptWarStatistics(data) { // 战力统计
                this.$ajax.get(this.$URL + '/xf-unit/dutySquadron/combatStatistics', {
                    params: {
                        groupId: this.clickDept.groupId
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.listData.score = res.data.data.combatScore;
                        this.listData.carCount = res.data.data.carCount;
                        this.listData.peopleCount = res.data.data.peopleCount;
                        this.listData.address  = res.data.data.address ;
                        this.listData.establishmentDate  = res.data.data.establishmentDate ;
                        this.listData.one = res.data.data.policePressure;
                        this.listData.two = res.data.data.standbyVehicles;
                        this.listData.three = res.data.data.standbyForce;
                        // console.log(res.data.data, 1234526);
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getPoliceTimeList(){ // 处警时效
                this.$ajax.get(this.$dataSetUrlQ + '/xf-unit/processAlarm/getProcessAlarmList', {
                    params:{
                        groupId: this.clickDept.groupId
                    }
                } ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                    let data = res.data;
                    if(data.code == 200){
                        this.PoliceTimeList = data.data;
                    }else{
                        this.PoliceTimeList = [];
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            startCompare(){ // 开始对比
                let list = this.alrCheckedList;
                if(list.length < 2){
                    this.$message('请选择两条数据进行对比');
                }else{
                    if(list[0].type == 1){ // 基层干部
                        this.$router.push({path:"/personSet/grassRootsCompare",query:{"alrCheckedList":JSON.stringify(list)}});
                    }else if(list[0].type == 2){
                        this.$router.push({path:"/personSet/governmentCompare",query:{"alrCheckedList":JSON.stringify(list)}})
                    }else{
                        this.$router.push({path:"/personSet/activeCompare",query:{"alrCheckedList":JSON.stringify(list)}})
                    }
                }
            },
            handelCheck(item,index){ // 对比
                let list = this.list.dataList;
                list.map((val,i) => {
                    if(val.id == item.id){
                        val.checked = !item.checked;
                    }
                })
                this.$forceUpdate();
                let alrCheckedList = this.alrCheckedList;
                if(alrCheckedList.length == 0){
                    alrCheckedList.push(item);
                }else{
                    if(alrCheckedList.length < 2){
                        if(item.checked == true){ // 选择
                            let flag = true;
                            alrCheckedList.map((val,i) => {
                                if(val.type == item.type){
                                    flag = true;
                                }else{
                                    this.$message('只有同一类型人员才能进行比对哦');
                                    this.list.dataList.map((val,i) => {
                                        if(val.id == item.id){
                                            val.checked = false;
                                        }
                                    })
                                    flag = false;
                                }
                            })
                            if(flag){
                                alrCheckedList.push(item);
                            }
                        }else{ // 取消
                            alrCheckedList.map((val,i) => {
                                if(val.id == item.id){
                                    alrCheckedList.splice(i,1);
                                }
                            })
                        }
                    }else{
                        if(item.checked == true){ // 选择第三条
                            this.$message('最多选择两条数据~');
                            this.list.dataList.map((val,i) => {
                                if(val.id == item.id){
                                    val.checked = false;
                                }
                            })
                            this.$forceUpdate();
                        }else{ // 取消已选中的两条之一
                            alrCheckedList.map((val,i) => {
                                if(val.id == item.id){
                                    alrCheckedList.splice(i,1);
                                }
                            })
                        }
                    }
                }
            },
            getRoleList(){ // 获取职务列表
                this.$ajax.post(this.$dataSetUrl + '/apis/role/getdata', {

                } ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                    let data = res.data;
                    if(data.code == 200){
                        this.roleList = data.data[0];
                        this.roleList.map((val,i) => {
                            val.value = val.id;
                            val.label = val.remark;
                        })
                        window.localStorage.setItem("roleList",JSON.stringify(this.roleList));
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            everyPageChange(){
                this.getList(this.clickDept.groupId,'','',1);
            },
            getList(groupId,personTypeVal,realName,pageNum){ // 获取表格数据
                this.$ajax.post(this.$dataSetUrl + '/apis/userbasic/getdata', qs.stringify({
                    groupId:groupId,
                    userType: personTypeVal,
                    realName:realName,
                    rowLength: this.everyPageNum,
                    pageNum:pageNum
                }) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                    let data = res.data;
                    if(data.code == 200){
                        this.list = data.data[0];
                        this.list.dataList.map((val,i) => {
                            val.checked = false;
                        })
                        this.list.dataList.map((item,index) => {
                            if(item.sex == 0){
                                item.sexName = '男';
                            }else{
                                item.sexName = '女';
                            }
                            this.departmentList.map((val,i) =>{
                                if(item.groupId == val.groupId){
                                    item.groupName = val.groupName;
                                }
                            })
                            this.roleList.map((val,i) =>{
                                if(item.roleId == val.id){
                                    item.roleName = val.label;
                                }
                            })
                        })
                    }else{
                        this.list = [];
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getPage(page){
                this.getList(this.clickDept.groupId,'','',page);
            },
            navSwitch(item){
                this.clickDept = item;
                this.getPoliceTimeList();
                this.deptWarStatistics();
                this.getCarStateList();
                this.getList(this.clickDept.groupId,'','',1);
            },
            getDeptList(){ // 获取单位部门
                this.$ajax.post(this.$dataSetUrl + '/apis/group/getdata', qs.stringify({
                    grade:1,
                    rowLength:100,
                    pageNum:1
                }) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                    let data = res.data;
                    console.log(data)
                    if(data.code == 200){
                        let list = data.data[0].dataList;
                        let sj = {};
                        list.map((val,i) => {
                            if(val.groupName == '松江支队'){
                                sj.groupId = val.groupId;
                                sj.groupName = val.groupName;
                            }
                        })
                        // 获取松江支队下的所有 中队
                        this.$ajax.post(this.$dataSetUrl + '/apis/group/getdata', qs.stringify({
                            parentId: sj.groupId,
                            grade:3,
                            rowLength:100,
                            pageNum:1
                        }) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                            let data = res.data;
                            console.log(data)
                            if(data.code == 200){
                                let list = data.data[0].dataList;
                                list.map((val,i) => {
                                    let each = val;
                                    each.value = val.groupId;
                                    each.label = val.groupName;
                                    this.departmentList.push(each);
                                })
                                this.clickDept = this.departmentList[0]; // 默认选中第一个中队
                                this.getList(this.clickDept.groupId,'','',1);
                                this.getPoliceTimeList();
                                this.deptWarStatistics();
                                this.getCarStateList();
                                window.localStorage.setItem("departmentList",JSON.stringify(this.departmentList));
    
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            validateNumber(val) {
                this.everyPageNum = val.replace(/[^\d]/g, "");
            },
        }
    }
</script>

<style scoped lang="less">
    .dutyDetachmentLimit-wrap .pagination-wrap{
        bottom:35px;
    }
</style>

<style scoped lang="less"> 
    .big-screenMode {
        // position: fixed;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
        // background-color: #0e27aa;
        // z-index: 1005;
        position:relative;
        z-index:10;
        background:#123549;
        margin-top: -59px;
        padding-top: 80px;

    }
</style>
