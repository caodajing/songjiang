<!--仓库管理首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="storeManageIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 仓库管理</span>
			</div>
			<div class="list-box">
				<div class="util-box clearfix">
					<div class="inp-box clearfix">
						<span>所属单位/部门：</span>
						<el-select v-model="departmentVal" placeholder="请选择">
						    <el-option
						      v-for="item in departmentList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						 </el-select>
					</div>
					<div class="inp-box clearfix">
						<span>仓库名称：</span>
						<input type="text" class="inp" v-model="searchName">
					</div>
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="addStoreMask = true">
						<i class="iconfont icon-add"></i>
						<span>添加车辆/仓库</span>
					</div>
				</div>
				<div class="table-box">
					<table>
						<thead>
							<th style="width:4.3%;">序号</th>
							<th style="width:10.5%;">仓库名</th>
							<th style="width:23.6%;">仓库类型</th>
							<th style="width:33.5%;">所属单位/部门</th>
							<th style="width:8.7%;">创建人</th>
							<th style="width:8.5%;">创建时间</th>
							<th style="width:10.9%;">操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in list.list">
								<td  style="width:4.3%;">{{index+1}}</td>
								<td  style="width:10.5%;">{{item.storehouseName}}</td>
								<td  style="width:23.6%;">{{item.type == 0 ? '普通仓库' : '车辆仓库'}}</td>
								<td  style="width:33.5%;">{{item.deptName}}</td>
								<td  style="width:8.7%;">{{item.editUserId}}</td>
								<td  style="width:8.5%;">{{item.createTime}}</td>
								<td  style="width:10.9%;">
									<span @click="goDetail(item.type,item.storehouseName,item.deptCode,item.id,item.deptName)">详情</span>
									<!-- <span>编辑</span> -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(list.pages)" @changePage="getPage($event)"></pagination>
			</div>
			<!-- 添加 车辆/仓库 -->
			<div class="mask add-store-mask" v-if="addStoreMask">
				<div class="main">
					<a href="javascript:;" class="close" @click="addStoreMask = false"></a>
					<div class="content">
						<div class="title">新增车辆/仓库</div>
						<div class="box">
							<div class="inp-box flex">
								<span class="span"><i>*</i>仓库名</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="storeName">
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>仓库类型</span>
								<el-select v-model="storeType" placeholder="请选择" @change="selectStore($event)">
		                            <el-option
		                              v-for="item in storeTypeList"
		                              :key="item.value"
		                              :label="item.label"
		                              :value="item.value"
		                              :disabled="item.disabled">
		                            </el-option>
		                        </el-select>
							</div>
							<div class="inp-box flex"> 
								<span class="span"><i>*</i>所属单位/部门</span>
								<el-select v-model="departmentValTk" placeholder="请选择" >
		                            <el-option
		                              v-for="item in departmentList"
		                              :key="item.value"
		                              :label="item.label"
		                              :value="item.value"
		                              :disabled="item.disabled">
		                            </el-option>
		                        </el-select>
							</div>
							
						</div>
						<div class="btn-box flex">
							<div class="cancel-btn" @click="addStoreMask = false">取消</div>
							<div class="save-btn" @click="addStore">保存</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import leftNav from '../leftNav'
	import pagination from '../../../components/pagination'
    export default {
        name: "storeManageIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		addStoreMask:false, // 添加仓库
        		departmentVal:"",
        		searchName:"", // 搜索的仓库名称
        		departmentList:[], // 所属单位
        		storeType:"",
        		storeTypeList: [{ // 添加仓库的 类型
	                value: '0',
	                label: '普通仓库'
	            },
	            {
	                value: '2',
	                label: '车辆仓库',
	            }],
	            storeTypeId: '',
	            departmentValTk:"", // 弹窗 部门单位
	            storeName:'',  // 仓库名
        		list:[], 
        	}
        },
        mounted(){
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	this.getStore(this.departmentVal,'',1);
        },
        methods:{
        	addStore(){ // 添加仓库
	            let vm= this;
	            if(vm.storeName == ''){
	            	tool.toast('请填写名称');
	            }else if(vm.storeTypeId == ''){
	            	tool.toast('请选择仓库类型');
	            }else if(vm.departmentValTk == ''){
	            	tool.toast('请选择所属单位/部门');
	            }else{
	                if(vm.storeName.length > 50){
	                    tool.toast('输入的字符不能大于50个');
	                }else{
	                    tool.getdata(apiPath.addStore,'post',{
	                        storehouseName: vm.storeName,
	                        remark: '',
	                        type: vm.storeTypeId,
	                        deptCode: vm.departmentValTk
	                    },function(data){
	                        if(data.status == 200){
	                            vm.addStoreMask = false;
	                            vm.storeName = '';
	                            vm.storeTypeId = '';
	                            vm.storeType = '';
	                            vm.departmentValTk = '';
	                            vm.getStore(vm.departmentVal,'',1);
	                            // vm.$emit("updateDeptCode",vm.getData.deptCode); // 通知父组件更新 该部门仓库
	                        }
	                    },true) 
	                }
	            }
	        },
	        selectStore (event) { // 选择仓库下拉
	            this.storeTypeId = event;
	        },
        	search(){
        		this.getStore(this.departmentVal,this.searchName,1);
        	},
        	getStore(deptCode,storehouseName,pageNum){ // 获取仓库
	            let vm = this;
	            tool.getdata(apiPath.getStore,'get',{
	                type:'', // 0-普通仓库 2-车辆仓库
	                deptCode:deptCode, // 部门码
	                storehouseName:storehouseName,
	                pageSize:10,
	                pageNum:pageNum
	            },function(data){
	                if(data.status == 200){
	                    vm.list = data.data;
	                    vm.list.list.map((val,i) => {
	                        vm.departmentList.map((val1,i1) => {
	                        	if(val.deptCode == val1.groupId){
	                        		val.deptName = val1.groupName;
	                        	}
	                        })
	                    })
	                }else if(data.status == -1){
	                    vm.list = [];
	                }
	            },true)
	        },
	        goDetail(type,storehouseName,deptCode,id,deptName){
	        	console.log(12121)
	            if(type == 0){ // 普通仓库
	                this.$router.push({path:'/storeManage/detail',query:{"storehouseName":storehouseName,deptCode:deptCode,storehouseId:id,deptName:deptName}})
	            }else if(type == 2){ // 车辆仓库
	                this.$router.push({path:'/storeManage/carDetail',query:{"storehouseName":storehouseName,deptCode:deptCode,storehouseId:id}})
	            }
	        },
	        getPage(page){
        		this.getStore(this.departmentVal,this.searchName,page);
        	},
        }
    }
</script>

<style scoped>

</style>
