<!--战备工作-->
<template>
    <div class="container-wrap">
        <leftNav />
        <div class="tigerList-wrap">
            <div class="head-box">
                <i class="iconfont icon-shouye-copy icon"></i>
                <span>当前位置：战备工作 > 龙虎榜</span>
            </div>
            <div class="list-box">
                <div class="util-box clearfix">
                    <div class="inp-box clearfix">
                        <span>所属单位/部门：</span>
                        <el-select v-model="departmentVal" placeholder="请选择" :clearable="true">
                            <el-option
                              v-for="item in departmentList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                         </el-select>
                    </div>
                    <div class="inp-box clearfix person-inp-box">
                        <span>人员类型：</span>
                        <el-select v-model="personTypeVal" placeholder="请选择" :clearable="true">
                            <el-option
                              v-for="item in personTypeList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                         </el-select>
                    </div>
                    <div class="inp-box clearfix">
                        <span>姓名：</span>
                        <el-input type="text" class="elInp inp" v-model="name" placeholder="输入关键字搜索" :clearable="true"></el-input>
                    </div>
                    <div class="search-btn" @click="search" >查询</div>
                </div>
                <div class="con-list clearfix">
                    <div class="each-box" >
                        <div class="title">实际战斗指挥-指挥员<i>（显示前Top10）</i></div>
                        <ul>
                            <li class="flex" v-for="item,index in list1">
                                <span class="number">{{index+1}}</span>
                                <div class="header-box flex">
                                    <img src="../../assets/images/header.png" alt="">
                                </div>
                                <p>
                                    <i>{{item.userName}}</i>
                                    <i>{{item.deptName}}</i>
                                </p>
                                <span class="grade">{{item.grade}}</span>
                            </li>
                        </ul>
                        <div v-if="list1.length<=0" class="no-more">暂无数据</div>
                    </div>
                    <div class="each-box" >
                        <div class="title">实际处警战斗-战斗员<i>（显示前Top10）</i></div>
                        <ul>
                            <li class="flex" v-for="item,index in list2">
                                <span class="number">{{index+1}}</span>
                                <div class="header-box flex">
                                    <img src="../../assets/images/header.png" alt="">
                                </div>
                                <p>
                                    <i>{{item.userName}}</i>
                                    <i>{{item.deptName}}</i>
                                </p>
                                <span class="grade">{{item.grade}}</span>
                            </li>
                        </ul>
                        <div v-if="list2.length<=0" class="no-more">暂无数据</div>
                    </div>
                    <div class="each-box" >
                        <div class="title">日常训练-战斗员</div>
                        <ul>
                            <li class="flex" v-for="item,index in list3">
                                <span class="number">{{index+1}}</span>
                                <div class="header-box flex">
                                    <img src="../../assets/images/header.png" alt="">
                                </div>
                                <p>
                                    <i>{{item.userName}}</i>
                                    <i>{{item.deptName}}</i>
                                </p>
                                <span class="grade">{{item.grade}}</span>
                            </li>
                        </ul>
                        <div v-if="list3.length<=0" class="no-more">暂无数据</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import leftNav from "./leftNav";
import { setCookie, getCookie } from "../../assets/js/cookie.js";

export default {
    name: "tigerList",
    components: {
        leftNav
    },
    data(){
        return{
            departmentVal:"",
            name:"", // 名字
            departmentList:[], // 单位部门
            personTypeVal:'',
            personTypeList:[
                {
                    label:"基层干部",
                    value:"1"
                },
                {
                    label:"政府专职消防员",
                    value:"2"
                },
                {
                    label:"现役消防士",
                    value:"3"
                },

            ],
            list1:[],
            list2:[],
            list3:[]
        }
    },
    mounted(){
        this.userInfo = JSON.parse(getCookie("userInfo"));
        this.getDeptList();
        this.getList(1,'','','');
        this.getList(4,'','','');
        this.getList(10,'','','');
    },
    methods:{
        search(){ // 查询
            this.getList(1,this.departmentVal, this.personTypeVal,this.name);
            this.getList(4,this.departmentVal, this.personTypeVal,this.name);
            this.getList(10,this.departmentVal, this.personTypeVal,this.name);
        },
        getList(userRole,groupId,userType,userName) {//查询
            this.$ajax.get(this.$dataSetUrlQ + '/xf-unit/dutyDynamic/dragonTigerList', {
                params: {
                    userRole:userRole, // 必传  1: 实际战斗指挥-指挥员 4 : 实际处警战斗-战士 10 :日常训练-战斗员
                    groupId: groupId,
                    userType:userType,
                    userName:userName
                }
            }).then((res) => {
                if (res.data.code == 200) {
                    if(userRole == 1){
                        this.list1 = res.data.data;
                    }else if(userRole == 4){
                        this.list2 = res.data.data;
                    }else if(userRole == 10){
                        this.list3 = res.data.data;
                    }
                    
                } else {
                    if(userRole == 1){
                        this.list1 = [];
                    }else if(userRole == 4){
                        this.list2 = [];
                    }else if(userRole == 10){
                        this.list3 = [];
                    }
                    
                }
            }).catch(function (error) {
                console.log(error);
            })
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
    }
};
</script>

