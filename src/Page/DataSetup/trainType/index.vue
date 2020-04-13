<!--接训练类型首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="trainTypeIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 训练类型</span>
			</div>
			<div class="list-box">
				<div class="util-box clearfix">
					<div class="inp-box clearfix">
						<span>训练类型：</span>
						<el-select v-model="trainTypeVal" placeholder="请选择" :clearable="true">
						    <el-option
						      v-for="item in trainTypeList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						 </el-select>
					</div>
					<div class="inp-box clearfix">
						<span>训练项目：</span>
						<el-select v-model="trainProVal" placeholder="请选择" :clearable="true">
						    <el-option
						      v-for="item in trainProList.list"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						 </el-select>
					</div>
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="addTrainFn">
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
							<th>训练类型</th>
							<th>项目名</th>
							<th>成绩单位</th>
							<th>合格成绩</th>
							<th>良好成绩</th>
							<th>优秀成绩</th>
							<th>备注</th>
							<th>操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in trainProList.list">
								<td style="width:70px;">{{index+1}}</td>
								<td>{{item.projectType}}</td>
								<td @click="open(item.projectName)">{{item.projectName}}</td>
								<td>{{item.achievementUnit}}</td>
								<td>{{item.passStandard}}</td>
								<td>{{item.goodStandard}}</td>
								<td>{{item.excellentStandard}}</td>
								<td @click="open(item.remark)">{{item.remark}}</td>
								<td> 
									<span @click="editTrainFn(item)">编辑</span>
									<span @click="delTrain(item)">删除</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(trainProList.pages)" @changePage="getPage($event)" :TocurrentPage="page_num"></pagination>
			</div>
			<!-- 编辑/新增训练项目 -->
			<div class="mask add-trainType-mask" v-if="addTrainProMask">
				<div class="main">
					<a href="javascript:;" class="close" @click="addTrainProMask = false"></a>
					<div class="title">新建/编辑训练类型</div>
					<div class="box clearfix">
						<div class="inp-box flex">
							<span class="span"><i>*</i>训练类型</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addTrainProData.projectType">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>训练项目</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addTrainProData.projectName">
						</div>
						<div class="inp-box flex">  
							<span class="span"><i>*</i>成绩单位</span>
							<el-select v-model="addTrainProData.achievementUnit" placeholder="请选择">
							    <el-option
							      v-for="item in unitList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex time-box">
							<span class="span">合格成绩</span>
							<div v-if="addTrainProData.achievementUnit == '次' " class="inp">
								<input type="text" placeholder=""  v-model="addTrainProData.passStandard.number" @input="validateNumber(addTrainProData.passStandard.number,1,$event)">
								次
							</div>
							<div v-else class="inp">
								<input type="text" placeholder=""  v-model="addTrainProData.passStandard.minute" @input="validateNumber(addTrainProData.passStandard.minute,2)">
								<i>分</i>
								<input type="text" placeholder=""  v-model="addTrainProData.passStandard.second" @input="validateNumber(addTrainProData.passStandard.second,3)">
								<i>秒</i>
							</div>
						</div>
						<div class="inp-box flex time-box" >
							<span class="span">良好成绩</span>
							<div v-if="addTrainProData.achievementUnit == '次' " class="inp">
								<input type="text" placeholder=""  v-model="addTrainProData.goodStandard.number" @input="validateNumber(addTrainProData.goodStandard.number,4)">
								次
							</div>
							<div v-else class="inp">
								<input type="text" placeholder=""  v-model="addTrainProData.goodStandard.minute" @input="validateNumber(addTrainProData.goodStandard.minute,5)">
								<i>分</i>
								<input type="text" placeholder=""  v-model="addTrainProData.goodStandard.second" @input="validateNumber(addTrainProData.goodStandard.second,6)">
								<i>秒</i>
							</div>
						</div>
						<div class="inp-box flex time-box">
							<span class="span">优秀成绩</span>
							<div v-if="addTrainProData.achievementUnit == '次' " class="inp">
								<input type="text" placeholder=""  v-model="addTrainProData.excellentStandard.number" @input="validateNumber(addTrainProData.excellentStandard.number,7)">
								次
							</div>
							<div v-else class="inp">
								<input type="text" placeholder=""  v-model="addTrainProData.excellentStandard.minute" @input="validateNumber(addTrainProData.excellentStandard.minute,8)">
								<i>分</i>
								<input type="text" placeholder=""  v-model="addTrainProData.excellentStandard.second" @input="validateNumber(addTrainProData.excellentStandard.second,9)">
								<i>秒</i>
							</div>
						</div>
						<div class="inp-box flex">
							<span class="span">备注</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addTrainProData.remark">
						</div>
					</div>
					<div class="btn-box flex">
						<div class="cancel-btn" @click="addTrainProMask = false">取消</div>
						<div class="save-btn" @click="save">确定</div>
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
        name: "trainTypeIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		addTrainProMask:false,  
        		trainProVal:"",
        		trainProList:[], // 训练项目
        		trainTypeVal:"",
        		trainTypeList:[], // 训练类型
        		editFlag: false, // false:新增 true:编辑
        		editId:"",
        		currentTime:"",
        		unitList:[
        			{
        				value:"时间",
        				label:"时间"
        			},
        			{
        				value:"次",
        				label:"次"
        			},
        		],
        		addTrainProData:{
        			projectType:"",
        			projectName:"",
        			achievementUnit:"",
        			passStandard:{
        				number:"",
        				minute:"",
        				second:""
        			},
        			goodStandard:{
        				number:"",
        				minute:"",
        				second:""
        			},
        			excellentStandard:{
        				number:"",
        				minute:"",
        				second:""
        			},
        			remark:""
        		},
        		page_num:1
        	}
        },
        mounted(){
        	this.getTrainTypeList();
        	this.getTrainProList('','',1);
        },
        methods:{
        	save(){
        		let vm = this;
        		this.getCurrentTime();
        		if(this.editFlag){ // 编辑 训练项目
        			let info = this.addTrainProData;
        			if(info.projectType == ''){
        				this.$message('请填写训练类型');
        			}else if(info.projectName == ''){
        				this.$message('请填写训练项目');
        			}else if(info.achievementUnit == ''){
        				this.$message('请填写成绩单位');
        			}else{
        				if(info.achievementUnit == '次'){ // 选择单位为   次
        					if(info.passStandard.number == ''){
        						this.$message('请填写合格成绩');
        					}else if(info.goodStandard.number == ''){
        						this.$message('请填写良好成绩');
        					}else if(info.excellentStandard.number == ''){
        						this.$message('请填写优秀成绩');
        					}else{
        						ajax_common_edit();
        					}	
        				}else{  // 选择单位为   分秒
        					if(info.passStandard.minute == ''){
        						this.$message('请填写合格成绩---分');
        					}else if(info.passStandard.second == ''){
        						this.$message('请填写合格成绩---秒');
        					}else if(info.goodStandard.minute == ''){
        						this.$message('请填写良好成绩---分');
        					}else if(info.goodStandard.second == ''){
        						this.$message('请填写良好成绩---秒');
        					}else if(info.excellentStandard.minute == ''){
        						this.$message('请填写优秀成绩---分');
        					}else if(info.excellentStandard.second == ''){
        						this.$message('请填写优秀成绩---秒');
        					}else{
        						ajax_common_edit();
        					}
        				}
        			}
    				function ajax_common_edit(){
    					if(vm.addTrainProData.achievementUnit == '次'){
        					info.passStandard = info.passStandard.number;
        					info.excellentStandard = info.excellentStandard.number;
        					info.goodStandard = info.goodStandard.number;
        				}else{
        					info.passStandard = info.passStandard.minute + ',' + info.passStandard.second;
        					info.excellentStandard = info.excellentStandard.minute + ',' + info.excellentStandard.second;
        					info.goodStandard = info.goodStandard.minute + ',' + info.goodStandard.second;
        				}
    					vm.$ajax.post(vm.$dataSetUrlY + '/xf-unit/project/updateProject', qs.stringify({
        					id: vm.editId,
		        			projectName: info.projectName,
		        			projectType: info.projectType,
		        			achievementUnit: info.achievementUnit,
		        			passStandard: info.passStandard,
		        			excellentStandard: info.excellentStandard,
		        			goodStandard: info.goodStandard,
		        			remark: info.remark
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.status == 200){
		        				vm.$message({
						            type: 'success',
						            message: '修改成功!'
					          	});
		        				vm.addTrainProMask = false;
		        				vm.addTrainProData = {
				        			projectType:"",
				        			projectName:"",
				        			achievementUnit:"",
				        			passStandard:{
				        				number:"",
				        				minute:"",
				        				second:""
				        			},
				        			goodStandard:{
				        				number:"",
				        				minute:"",
				        				second:""
				        			},
				        			excellentStandard:{
				        				number:"",
				        				minute:"",
				        				second:""
				        			},
				        			remark:""
				        		}
		        				vm.getTrainProList('','',vm.page_num);
		        			}else{
		        				vm.$message.error(data.msg);
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
    				}
        				
        		}else{ // 新增
        			let info = this.addTrainProData;
        			if(info.projectType == ''){
        				this.$message('请填写训练类型');
        			}else if(info.projectName == ''){
        				this.$message('请填写训练项目');
        			}else if(info.achievementUnit == ''){
        				this.$message('请填写成绩单位');
        			}else{
        				if(info.achievementUnit == '次'){ // 选择单位为   次
        					if(info.passStandard.number == ''){
        						this.$message('请填写合格成绩');
        					}else if(info.goodStandard.number == ''){
        						this.$message('请填写良好成绩');
        					}else if(info.excellentStandard.number == ''){
        						this.$message('请填写优秀成绩');
        					}else{
        						ajax_common();
        					}	
        				}else{  // 选择单位为   分秒
        					if(info.passStandard.minute == ''){
        						this.$message('请填写合格成绩---分');
        					}else if(info.passStandard.second == ''){
        						this.$message('请填写合格成绩---秒');
        					}else if(info.goodStandard.minute == ''){
        						this.$message('请填写良好成绩---分');
        					}else if(info.goodStandard.second == ''){
        						this.$message('请填写良好成绩---秒');
        					}else if(info.excellentStandard.minute == ''){
        						this.$message('请填写优秀成绩---分');
        					}else if(info.excellentStandard.second == ''){
        						this.$message('请填写优秀成绩---秒');
        					}else{
        						ajax_common();
        					}
        				}
        			}
        			function ajax_common(){
    					if(vm.addTrainProData.achievementUnit == '次'){
        					info.passStandard = info.passStandard.number;
        					info.excellentStandard = info.excellentStandard.number;
        					info.goodStandard = info.goodStandard.number;
        				}else{
        					info.passStandard = info.passStandard.minute + ',' + info.passStandard.second;
        					info.excellentStandard = info.excellentStandard.minute + ',' + info.excellentStandard.second;
        					info.goodStandard = info.goodStandard.minute + ',' + info.goodStandard.second;
        				}
        				vm.$ajax.post(vm.$dataSetUrlY + '/xf-unit/project/addProject', qs.stringify({
		        			projectName: info.projectName,
		        			projectType: info.projectType,
		        			achievementUnit: info.achievementUnit,
		        			passStandard: info.passStandard,
		        			excellentStandard: info.excellentStandard,
		        			goodStandard: info.goodStandard,
		        			remark: info.remark
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.status == 200){
		        				vm.$message({
						            type: 'success',
						            message: '新增成功!'
					          	});
		        				vm.addTrainProMask = false;
		        				vm.addTrainProData = {
				        			projectType:"",
				        			projectName:"",
				        			achievementUnit:"",
				        			passStandard:{
				        				number:"",
				        				minute:"",
				        				second:""
				        			},
				        			goodStandard:{
				        				number:"",
				        				minute:"",
				        				second:""
				        			},
				        			excellentStandard:{
				        				number:"",
				        				minute:"",
				        				second:""
				        			},
				        			remark:""
				        		}
		        				vm.getTrainProList('','',vm.page_num);
		        			}else{
		        				vm.$message.error(data.msg);
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
    				}


        		}
        	},
        	delTrain(item){ // 删除接警信息
        		this.$confirm('确定删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$ajax.post(this.$dataSetUrlY + '/xf-unit/project/deleteProject', qs.stringify({
	        			id:item.id
	        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
	        			let data = res.data;
	        			if(data.status == 200){
	        				this.$message({
					            type: 'success',
					            message: '删除成功!'
				          	});
	        				this.getTrainProList('','',this.page_num,'del');
	        			}else{
	        				this.$message.error(data.msg);
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
        	addTrainFn(){
        		this.addTrainProMask = true;
        		this.editFlag = false;
        		this.addTrainProData = {
        			projectType:"",
        			projectName:"",
        			achievementUnit:"",
        			passStandard:{
        				number:"",
        				minute:"",
        				second:""
        			},
        			goodStandard:{
        				number:"",
        				minute:"",
        				second:""
        			},
        			excellentStandard:{
        				number:"",
        				minute:"",
        				second:""
        			},
        			remark:""
        		}
        	},
        	editTrainFn(item){
				this.addTrainProMask = true;
        		this.editFlag = true;
        		this.editId = item.id;
        		this.addTrainProData.projectType = item.projectType;
        		this.addTrainProData.projectName = item.projectName;
        		this.addTrainProData.achievementUnit = item.achievementUnit;

        		if(item.achievementUnit == '次'){
        			this.addTrainProData.passStandard.number = item.passStandard;
        			this.addTrainProData.goodStandard.number = item.goodStandard;
        			this.addTrainProData.excellentStandard.number = item.excellentStandard;
        		}else{
        			this.addTrainProData.passStandard.minute = item.passStandard.split(",")[0];
        			this.addTrainProData.passStandard.second = item.passStandard.split(",")[1];

        			this.addTrainProData.goodStandard.minute = item.goodStandard.split(",")[0];
        			this.addTrainProData.goodStandard.second = item.goodStandard.split(",")[1];

        			this.addTrainProData.excellentStandard.minute = item.excellentStandard.split(",")[0];
        			this.addTrainProData.excellentStandard.second = item.excellentStandard.split(",")[1];
        		}
        		this.addTrainProData.remark = item.remark;
        	},
        	search(){
        		this.page_num = 1;
        		this.getTrainProList(this.trainProVal,this.trainTypeVal,1);
        	},
        	getTrainProList(projectId,projectType,pageNum,type){ // 获取 训练项目
        		this.$ajax.get(this.$dataSetUrlY + '/xf-unit/project/selectProject', {
        			params:{
        				projectId: projectId,
	        			projectType: projectType,
	        			pageSize:10,
	        			pageNum:pageNum
        			}
        			
        		}).then((res) => {
        			let data = res.data;
        			console.log(data);
        			if(data.status == 200){
        				this.trainProList = data.data;
        				this.trainProList.list.map((val,i) => {
        					val.value = val.id;
        					val.label = val.projectName;
        				})
        			}else{
        				this.trainProList = [];
        				if(type == 'del'){
        					this.getTrainProList('','',this.page_num-1);
        				}
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getTrainTypeList(){ // 获取 训练类型
        		this.$ajax.get(this.$dataSetUrlY + '/xf-unit/project/getProjectTypeList', {} ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			console.log(data);
        			if(data.status == 200){
        				this.trainTypeList = data.data;
        				this.trainTypeList.map((val,i) => {
        					val.value = val.typeName;
        					val.label = val.typeName;
        				})
        			}else{
        				this.trainTypeList = [];
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getPage(page){
        		this.page_num = page;
        		this.getTrainProList(this.trainProVal,this.trainTypeVal,page);
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
	        validateNumber(val,type,event) {
				if(type == 1){
					this.addTrainProData.passStandard.number = val.replace(/[^\d]/g, "");
				}else if(type == 2){
					this.addTrainProData.passStandard.minute = val.replace(/[^\d]/g, "");
				}else if(type == 3){
					this.addTrainProData.passStandard.second = val.replace(/[^\d]/g, "");
				}else if(type == 4){
					this.addTrainProData.goodStandard.number = val.replace(/[^\d]/g, "");
				}else if(type == 5){
					this.addTrainProData.goodStandard.minute = val.replace(/[^\d]/g, "");
				}else if(type == 6){
					this.addTrainProData.goodStandard.second = val.replace(/[^\d]/g, "");
				}else if(type == 7){
					this.addTrainProData.excellentStandard.number = val.replace(/[^\d]/g, "");
				}else if(type == 8){
					this.addTrainProData.excellentStandard.minute = val.replace(/[^\d]/g, "");
				}else if(type == 9){
					this.addTrainProData.excellentStandard.second = val.replace(/[^\d]/g, "");
				}
	        },
	        open(val) {
		        this.$notify({
		          	title: '详细',
		          	message: val,
		          	offset: 100,
		        });
		    }
        }
    }
</script>

<style scoped>

</style>
