<!--战备工作-->
<template>
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
        <div class="detachmentLimit-wrap">
            <div class="head-box">
                <i class="iconfont icon-shouye-copy icon"></i>
                <span>当前位置： 执勤动态 > {{clickDept.groupName}}</span>
            </div>
            <div class="list-box">
                <div class="each-box" v-for="item in tableList">
                    <div class="title-box clearfix">
                        <div class="img-box">
                            <img src="" alt="" :onerror= 'defaultImg'/>
                        </div>
                        <p>
                            <span>{{item.carName}}</span>
                            <span>车辆类型：{{item.carProductionType}}</span>
                        </p>
                    </div>
                    <template>
                        <el-table
                            :data="item.dutyDynamicsItemList"
                            border
                            style="width: 100%;" 
                            :cell-style="{color:'#333',fontSize:'16px'}"
                            :header-cell-style="{background:'#F8F8F9',color:'#333',fontSize:'18px'}">
                            <el-table-column type="index" label="序号" align="center" width="60" ></el-table-column>
                            <el-table-column prop="realName" label="姓名" width="180" align="center">
                                <template slot-scope="scope">
                                    <img :src=" 'http://shcloud2.wmtechzone.club:50001/' + scope.row.photo" alt="" class="header">
                                    <span>{{scope.row.realName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="roleName" label="角色" width="100" align="center"></el-table-column>
                            <el-table-column prop="spId" label="特长" align="center"></el-table-column>
                            <el-table-column prop="certificate" label="获得证书" align="center"></el-table-column>
                            <el-table-column align="center" fixed="right" label="操作" width="110">
                                <template slot-scope="scope">
                                    <el-button class="spe_color" type="text"  @click="goDetail(scope.row.userType,scope.row)">详细</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { setCookie, getCookie } from "../../assets/js/cookie.js";

export default {
    name: "detachmentLimit",
    components: {
    
    },
    data() {
        return {
            departmentList:[], // 单位部门
            clickDept:{},
            defaultImg: 'this.src="' + require('../../assets/images/car.png') + '"',
            dutyVehicleList: [],//新增执勤车可选车辆列表
            personnelList: [],
            tableList: [],
        };
    },
    mounted(){
        this.userInfo = JSON.parse(getCookie("userInfo"));
        this.getDeptList();

    },
    methods:{
        getDutyDynamics() {//查询
            this.$ajax.get(this.$dataSetUrlTest + '/xf-unit/dutyDynamic/getDutyDynamic', {
                params: {
                    groupId: this.clickDept.groupId
                }
            }).then((res) => {
                if (res.data.code == 200) {
                    this.tableList = res.data.data;
                    this.tableList.map(val => {
                        val.dutyDynamicsItemList.map(item => {
                            if(item.type == 1){
                                item.roleName = '指挥员';
                            }else if(item.type == 2){
                                item.roleName = '驾驶员';
                            }else if(item.type == 3){
                                item.roleName = '通讯员';
                            }else if(item.type == 4){
                                item.roleName = '战士';
                            }else{
                                item.roleName = '';
                            }
                        })
                    })
                } else {
                    this.tableList=[];
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        navSwitch(item){
            this.clickDept = item;
            this.getDutyDynamics();
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
                            this.getDutyDynamics();
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
        goDetail(type,item){
            if(type == 1){
                this.$router.push({path:"/personSet/grassRootsDetail",query:{userId:item.userId}});
            }else if(type == 2){
                this.$router.push({path:"/personSet/governmentDetail",query:{userId:item.userId}})
            }else{
                this.$router.push({path:"/personSet/activeDetail",query:{userId:item.userId}})
            }
        },
    }
};
</script>
<style scoped lang="less">
    .el-button--text{
        color: #333!important;
    }
    .header{
        width: 70px;
        max-height: 89px;
        border-radius: 50%;
        vertical-align: middle;
    }
</style>

