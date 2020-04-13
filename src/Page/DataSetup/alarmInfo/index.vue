<!--接警信息首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="alarmInfoIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 接警信息</span>
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
					<div class="inp-box clearfix">
						<el-input type="text" placeholder="输入关键字搜索" v-model="searchName" class="elInp inp" :clearable="true"></el-input>
					</div>
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="addAlarmFn">
						<i class="iconfont icon-add"></i>
						<span>添加</span>
					</div>
					<div class="lead-in-btn common">
						<i class="iconfont icon-piliangdaoru"></i>
						<span>批量导入</span>
					</div>
					<div class="export-btn common">
						<i class="iconfont icon-piliangdaochu"></i>
						<span>批量导出</span>
					</div>
				</div>
				<div class="table-box">
					<table>
						<thead>
							<th style="width:70px;">序号</th>
							<th>接警时间</th>
							<th>单位名称</th>
							<th>报警类型</th>
							<th>接警文字信息</th>
							<th>接警人</th>
							<th>接警方式</th>
							<th>接警单号</th>
							<th>操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in list.dataList">
								<td style="width:70px;">{{index+1}}</td>
								<td>{{item.alarmDate}}</td>
								<td>{{item.groupName}}</td>
								<td>{{item.alarmTypeVal}}</td>
								<td>{{item.remark}}</td>
								<td>{{item.alarmUserId}}</td>
								<td>{{item.alarmMethod}}</td>
								<td>{{item.id}}</td>
								<td>
									<span  @click="editAlarmFn(item)">编辑</span>
									<span @click="delAlarm(item)">删除</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)" :TocurrentPage="page_num"></pagination>
			</div>
			<!-- 编辑/新增接警信息 -->
			<div class="mask add-alarm-mask" v-if="addAlarmMask">
				<div class="main">
					<a href="javascript:;" class="close" @click="addAlarmMask = false"></a>
					<div class="title">编辑/新增接警信息</div>
					<div class="box clearfix">
						<div class="inp-box flex">
							<span class="span"><i class="i">*</i>接警时间</span>
							<el-date-picker
						      	v-model="addAlarmData.alarmDate"
						      	:editable="false"
						      	:clearable="false"
						      	type="date"
						      	placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span"><i class="i">*</i>单位名称</span>
							<el-select v-model="addAlarmData.groupId" placeholder="请选择">
							    <el-option
							      v-for="item in departmentList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span"><i class="i">*</i>报警类型</span>
							<el-select v-model="addAlarmData.alarmType" placeholder="请选择">
							    <el-option
							      v-for="item in alarmTypeList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex textarea-box">
							<span class="span">接警文字信息</span>
							<textarea name="" id="" cols="30" rows="10" v-model="addAlarmData.remark"></textarea>
						</div>
						<div class="inp-box flex">
							<span class="span"><i class="i">*</i>接警人</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addAlarmData.alarmUserId">
						</div>
						<div class="inp-box flex">
							<span class="span"><i class="i">*</i>接警方式</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addAlarmData.alarmMethod">
						</div>
					</div>
					<div class="btn-box flex">
						<div class="cancel-btn" @click="addAlarmMask = false">取消</div>
						<div class="save-btn" @click="save">确定</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {setCookie, getCookie} from '../../../assets/js/cookie.js'
	import leftNav from '../leftNav'
	import pagination from '../../../components/pagination'
    export default {
        name: "alarmInfoIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		userInfo:null,
        		addAlarmMask:false, 
        		departmentVal:"",
        		departmentList:[], // 所属单位
        		alarmTypeList:[ // 报警类型
        			{
			          	value: '1',
			          	label: '火灾扑救'
			        }, 
			        {
			          	value: '2',
			          	label: '社会救助'
			        },
			        {
			          	value: '3',
			          	label: '抢险救援'
			        },
			        {
			          	value: '4',
			          	label: '反恐排爆'
			        },
			        {
			          	value: '5',
			          	label: '其他'
			        }
        		],
        		searchName:"",//搜索名
        		list:[], // 表格数据
        		editFlag: false, // false:新增 true:编辑
        		editId:"",
        		currentTime:"",
        		currentHour:"",
        		addAlarmData:{
        			alarmDate:"", // 接警时间
        			groupId:"", // 单位名称
        			alarmType:"",
        			remark:"",
        			alarmUserId:"",
        			alarmMethod:""
        		},
        		page_num:1
        	}
        },
        mounted(){
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	this.getList('','',1);
        },
        methods:{
        	save(){
        		this.getCurrentTime();
        		if(this.editFlag){ // 编辑 接警信息
        			let info = this.addAlarmData;
        			if(info.alarmDate == ''){
        				this.$message('请选择接警时间');
        			}else if(info.groupId == ''){
        				this.$message('请选择单位名称');
        			}else if(info.alarmType == ''){
        				this.$message('请选择接警类型');
        			}else if(info.alarmUserId == ''){
        				this.$message('请填写接警人');
        			}else if(info.alarmMethod == ''){
        				this.$message('请填写接警方式');
        			}else{
        				this.$ajax.post(this.$dataSetUrl + '/apis/processalarm/updatedata', qs.stringify({
        					id: this.editId,
		        			groupId:info.groupId,
		        			alarmDate: info.alarmDate + ' ' + this.currentHour,
		        			alarmType: info.alarmType,
		        			remark: info.remark,
		        			alarmUserId: info.alarmUserId,
		        			alarmMethod: info.alarmMethod,
		        			createTime: this.currentTime,
		        			updateTime: this.currentTime,
		        			createUserId: this.userInfo.id,
		        			updateUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '修改成功!'
					          	});
		        				this.addAlarmMask = false;
		        				this.getList('','',this.page_num);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
        			}
        		}else{ // 新增
        			let info = this.addAlarmData;
        			if(info.alarmDate == ''){
        				this.$message('请选择接警时间');
        			}else if(info.groupId == ''){
        				this.$message('请选择单位名称');
        			}else if(info.alarmType == ''){
        				this.$message('请选择接警类型');
        			}else if(info.alarmUserId == ''){
        				this.$message('请填写接警人');
        			}else if(info.alarmMethod == ''){
        				this.$message('请填写接警方式');
        			}else{
        				this.$ajax.post(this.$dataSetUrl + '/apis/processalarm/setdata', qs.stringify({
		        			groupId:info.groupId,
		        			alarmDate: info.alarmDate  + ' ' + this.currentHour,
		        			alarmType: info.alarmType,
		        			remark: info.remark,
		        			alarmUserId: info.alarmUserId,
		        			alarmMethod: info.alarmMethod,
		        			createTime: this.currentTime,
		        			updateTime: this.currentTime,
		        			createUserId: this.userInfo.id,
		        			updateUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '新增成功!'
					          	});
		        				this.addAlarmMask = false;
		        				this.getList('','',this.page_num);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
        			}
        		}
        	},
        	delAlarm(item){ // 删除接警信息
        		this.$confirm('确定删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$ajax.post(this.$dataSetUrl + '/apis/processalarm/deldata', qs.stringify({
	        			id:item.id
	        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
	        			let data = res.data;
	        			if(data.code == 200){
	        				this.$message({
					            type: 'success',
					            message: '删除成功!'
				          	});
	        				this.getList('','',this.page_num,'del');
	        			}else{
	        				this.$message.error('接口异常');
	        			}
				    }).catch(function (error) {c
				        console.log(error);
				    })
		          	
		        }).catch(() => {
		          	this.$message({
			            type: 'info',
			            message: '已取消删除'
		          	});          
		        });
        		
        	},
        	addAlarmFn(){
        		this.addAlarmMask = true;
        		this.editFlag = false;
        		this.addAlarmData = {
        			alarmDate:"", // 接警时间
        			groupId:"", // 单位名称
        			alarmType:"",
        			remark:"",
        			alarmUserId:"",
        			alarmMethod:""
        		}
        	},
        	editAlarmFn(item){
				this.addAlarmMask = true;
        		this.editFlag = true;
        		this.editId = item.id;
        		this.addAlarmData.alarmDate = item.alarmDate;
        		this.addAlarmData.groupId = item.groupId;
        		this.addAlarmData.alarmType = item.alarmType;
        		this.addAlarmData.remark = item.remark;
        		this.addAlarmData.alarmUserId = item.alarmUserId;
        		this.addAlarmData.alarmMethod = item.alarmMethod;

        	},
        	search(){
        		this.page_num = 1;
        		this.getList(this.departmentVal,this.searchName,1);
        	},
        	getList(groupId,remark,pageNum,type){ // 获取表格数据
        		console.log(groupId,remark)
        		this.$ajax.post(this.$dataSetUrl + '/apis/processalarm/getdata', qs.stringify({
        			groupId:groupId,
        			remark: remark,
        			rowLength:10,
        			pageNum:pageNum
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.list = data.data[0];
        				this.list.dataList.map((item,index) => {
        					this.departmentList.map((val,i) =>{
        						if(item.groupId == val.groupId){
        							item.groupName = val.groupName;
        						}
        					}) 
        					if(item.alarmType == 1){
        						item.alarmTypeVal = '火灾扑救';
        					}else if(item.alarmType == 2){
        						item.alarmTypeVal = '社会救助';
        					}else if(item.alarmType == 3){
        						item.alarmTypeVal = '抢险救援';
        					}else if(item.alarmType == 4){
        						item.alarmTypeVal = '反恐排爆';
        					}else{
        						item.alarmTypeVal = '其他';
        					}
        				})
        			}else{
        				this.list = [];
        				if(type == 'del'){
        					this.getList('','',this.page_num-1);
        				}
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getPage(page){
        		this.page_num = page;
        		this.getList(this.departmentVal,this.searchName,page);
        	},
        	getCurrentTime(){
	            let year = new Date().getFullYear();
	            let month = new Date().getMonth() + 1;
	            let day = new Date().getDate();
	            let hour = new Date().getHours();
	            let minute = new Date().getMinutes();
	            let second = new Date().getSeconds()
	            month = month < 10 ? '0' + month : month;
	            day = day < 10 ? '0' + day : day;
	            hour = hour < 10 ? '0' + hour : hour;
	            minute = minute < 10 ? '0' + minute : minute;
	            second = second < 10 ? '0' + second : second;
	            let date = year + '-' + month + '-' + day;
	            this.currentTime = date + ' ' + hour + ':' + minute + ':' + second; 
	            this.currentHour = hour + ':' + minute + ':' + second; 
	        },
        }
    }
</script>

<style scoped>

</style>
