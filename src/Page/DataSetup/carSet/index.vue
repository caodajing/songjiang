<!--车辆设置首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="carSetIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 车辆设置</span>
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
						<span>车辆状态：</span>
						<el-select v-model="carStatus" placeholder="请选择">
						    <el-option
						      v-for="item in carStatusList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						 </el-select>
					</div>
					<div class="inp-box clearfix">
						<span>车牌：</span>
						<input type="text" class="inp" v-model="carNumber">
					</div>
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="addCarFn">
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
				<div class="list-box">
					<ul>
						<div class="title-list clearfix">
							<span>序号</span>
							<span>所属单位/部门</span>
							<span>车辆名称</span>
							<!-- <span>编号</span> -->
							<span>生产类型</span>
							<span>品牌</span>
							<span>车牌号</span>
							<span>原车牌</span>
							<span>基本性能</span>
							<span>灭火药剂装载量</span>
							<span>装备时间</span>
							<span>报废年限</span>
							<span>车架号</span>
							<span>发动机号</span>
							<span>行车记录仪是否正常</span>
							<span>保险情况</span>
							<span>产权</span>
							<span>车辆状态</span>
							<span>损坏情况</span>
						</div>
						<li class="clearfix" v-for="item,index in list.dataList">
							<span>{{index+1}}</span>
							<span>{{item.groupName}}</span>
							<span>{{item.carName}}</span>
							<!-- <span>{{item.carName}}</span> -->
							<span>{{item.productionType == 1 ? '组装' : '原装'}}</span>
							<span>{{item.brand}}</span>
							<span>{{item.carNumber}}</span>
							<span>{{item.oldCarNumber}}</span>
							<span>{{item.basicPerformance}}</span>
							<span>{{item.fireExtinguishingAgentLoad}}</span>
							<span>{{item.equipmentTime}}</span>
							<span>{{item.scrappedYears == 0 ? '' : item.scrappedYears}}</span>
							<span>{{item.frameNumber}}</span>
							<span>{{item.engineNumber}}</span>
							<span>{{item.driveRecorder == 0 ? '正常' : '异常'}}</span>
							<span>{{item.insuranceSituation}}</span>
							<span>{{item.propertyRight}}</span>
							<span>{{item.carStatusVal}}</span>
							<span>{{item.damageSituation}}</span>
						</li>
					</ul>
					<ul class="positionDiv">
						<div class="title-list">
							<span>操作</span>
						</div>
						<li class="clearfix" v-for="item,index in list.dataList">
							<span>
								<i @click="editCarFn(item)">编辑</i>
								<i @click="delCar(item)">删除</i>
							</span>
						</li>
					</ul>
				</div>
				<pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)"></pagination>
			</div>
			<!-- 编辑/新增 车辆 -->
			<div class="mask add-car-mask" v-if="addCarMask">
				<div class="main">
					<a href="javascript:;" class="close" @click="addCarMask = false"></a>
					<div class="title">编辑/新增车辆</div>
					<div class="box clearfix">
						<div class="inp-box flex">
							<span class="span"><i>*</i>车牌</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.carNumber">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>所属单位/部门</span>
							<el-select v-model="addCarData.groupId" placeholder="请选择">
							    <el-option
							      v-for="item in departmentList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>车辆名称</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.carName">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>车辆状态</span>
							<el-select v-model="addCarData.carStatus" placeholder="请选择">
							    <el-option
							      v-for="item in carStatusList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">生产类型</span>
							<el-select v-model="addCarData.productionType" placeholder="请选择">
							    <el-option
							      v-for="item in productionTypeList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">产权</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.propertyRight">
						</div>
						<div class="inp-box flex">
							<span class="span">原车牌</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.oldCarNumber">
						</div>
						<div class="inp-box flex">
							<span class="span">品牌</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.brand">
						</div>
						<div class="inp-box flex">
							<span class="span">灭火药剂装载量</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.fireExtinguishingAgentLoad">
						</div>
						<div class="inp-box flex">
							<span class="span">基本性能</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.basicPerformance">
						</div>
						<div class="inp-box flex">
							<span class="span">报废年限</span>
							<input type="tel" placeholder="请输入…" class="inp" v-model="addCarData.scrappedYears" @input="validateNumber(addCarData.scrappedYears,1)">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>装备时间</span>
							<el-date-picker
						      	v-model="addCarData.equipmentTime"
						      	:editable="false"
						      	:clearable="false"
						      	type="date"
						      	placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span">发动机号</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.engineNumber">
						</div>
						<div class="inp-box flex">
							<span class="span">车架号</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.frameNumber">
						</div>
						<div class="inp-box flex">
							<span class="span">保险情况</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addCarData.insuranceSituation">
						</div>
						<div class="inp-box flex">
							<span class="span">行车记录仪是否正常</span>
							<el-select v-model="addCarData.driveRecorder" placeholder="请选择">
							    <el-option
							      v-for="item in driveRecorderList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex textarea-box">
							<span class="span">损坏情况</span>
							<textarea name="" id="" cols="30" rows="10" v-model="addCarData.damageSituation"></textarea>
						</div>
					</div>
					<div class="btn-box flex">
						<div class="cancel-btn" @click="addCarMask = false">取消</div>
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
        name: "carSetIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		addCarMask:false,
        		departmentVal:"",
        		departmentList:[],
        		carStatus:"", // 车辆状态
        		carStatusList:[
        			{
			          	value: '1',
			          	label: '在库'
			        }, 
			        {
			          	value: '2',
			          	label: '出警'
			        },
			        {
			          	value: '3',
			          	label: '训练'
			        },
			        {
			          	value: '4',
			          	label: '维修'
			        },
			        {
			          	value: '5',
			          	label: '清洗'
			        },
			        {
			          	value: '6',
			          	label: '加油'
			        },
			        {
			          	value: '7',
			          	label: '报废'
			        }
        		],
        		driveRecorderList:[
        			{
			          	value: '0',
			          	label: '正常'
			        }, 
			        {
			          	value: '1',
			          	label: '异常'
			        },
        		],
        		productionTypeList:[
        			{
			          	value: '1',
			          	label: '组装'
			        }, 
			        {
			          	value: '2',
			          	label: '原装'
			        },
        		],
        		carNumber:"", // 车牌
        		list:[], // 表格数据
        		editFlag: false, // false:新增 true:编辑
        		editId:"",
        		currentTime:"",
        		currentHour:"",
        		addCarData:{
        			carNumber:"",
        			groupId:"",
        			carName:"",
        			carStatus:"",
        			productionType:'1',
        			propertyRight:"",
        			oldCarNumber:"",
        			brand:"",
        			fireExtinguishingAgentLoad:"",
        			basicPerformance:"",
        			scrappedYears:'',
        			equipmentTime:"",
        			engineNumber:"",
        			frameNumber:"",
        			insuranceSituation:"",
        			driveRecorder: '0',
        			damageSituation:""
        		}
        		
        	}
        },
        mounted(){
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	this.getList('','','',1);
        },
        methods:{
        	save(){
        		this.getCurrentTime();
        		if(this.editFlag){ // 编辑 接警信息
        			let info = this.addCarData;
        			if(info.carNumber == ''){
        				this.$message('请填写车牌号');
        			}else if(info.groupId == ''){
        				this.$message('请选择单位名称');
        			}else if(info.carName == ''){
        				this.$message('请填写车辆名称');
        			}else if(info.carStatus == ''){
        				this.$message('请选择车辆状态');
        			}else if(info.equipmentTime == ''){
        				this.$message('请选择装备时间');
        			}else{
        				if(info.scrappedYears == ''){
        					info.scrappedYears = 0;
        				}
        				this.$ajax.post(this.$dataSetUrl + '/apis/car/updatedata', qs.stringify({
        					id: this.editId,
        					carNumber: info.carNumber,
		        			groupId:info.groupId,
		        			carName: info.carName,
		        			carStatus: info.carStatus,
		        			productionType: info.productionType,
		        			propertyRight: info.propertyRight,
		        			oldCarNumber: info.oldCarNumber,
		        			brand: info.brand,
		        			fireExtinguishingAgentLoad: info.fireExtinguishingAgentLoad,
		        			basicPerformance: info.basicPerformance,
		        			scrappedYears: info.scrappedYears,
		        			equipmentTime: info.equipmentTime,
		        			engineNumber: info.engineNumber,
		        			frameNumber: info.frameNumber,
		        			insuranceSituation: info.insuranceSituation,
		        			driveRecorder: info.driveRecorder,
		        			damageSituation: info.damageSituation,
		        			createUserId: this.userInfo.id,
		        			updateUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '修改成功!'
					          	});
		        				this.addCarMask = false;
		        				this.getList('','','',1);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {c
					        console.log(error);
					    })
        			}
        		}else{ // 新增
        			let info = this.addCarData;
        			if(info.carNumber == ''){
        				this.$message('请填写车牌号');
        			}else if(info.groupId == ''){
        				this.$message('请选择单位名称');
        			}else if(info.carName == ''){
        				this.$message('请填写车辆名称');
        			}else if(info.carStatus == ''){
        				this.$message('请选择车辆状态');
        			}else if(info.equipmentTime == ''){
        				this.$message('请选择装备时间');
        			}else{
        				if(info.scrappedYears == ''){
        					info.scrappedYears = 0;
        				}
        				this.$ajax.post(this.$dataSetUrl + '/apis/car/setdata', qs.stringify({
		        			carNumber: info.carNumber,
		        			groupId:info.groupId,
		        			carName: info.carName,
		        			carStatus: info.carStatus,
		        			productionType: info.productionType,
		        			propertyRight: info.propertyRight,
		        			oldCarNumber: info.oldCarNumber,
		        			brand: info.brand,
		        			fireExtinguishingAgentLoad: info.fireExtinguishingAgentLoad,
		        			basicPerformance: info.basicPerformance,
		        			scrappedYears: info.scrappedYears,
		        			equipmentTime: info.equipmentTime  + ' ' + this.currentHour,
		        			engineNumber: info.engineNumber,
		        			frameNumber: info.frameNumber,
		        			insuranceSituation: info.insuranceSituation,
		        			driveRecorder: info.driveRecorder,
		        			damageSituation: info.damageSituation,
		        			createUserId: this.userInfo.id,
		        			updateUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '新增成功!'
					          	});
		        				this.addCarMask = false;
		        				this.getList('','','',1);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {c
					        console.log(error);
					    })
        			}
        		}
        	},
        	delCar(item){ // 删除接警信息
        		this.$confirm('确定删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$ajax.post(this.$dataSetUrl + '/apis/car/deldata', qs.stringify({
	        			id:item.id
	        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
	        			let data = res.data;
	        			if(data.code == 200){
	        				this.$message({
					            type: 'success',
					            message: '删除成功!'
				          	});
	        				this.getList('','','',1);
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
        	addCarFn(){
        		this.addCarMask = true;
        		this.editFlag = false;
        		this.addCarData = {
        			carNumber:"",
        			groupId:"",
        			carName:"",
        			carStatus:"",
        			productionType:'1',
        			propertyRight:"",
        			oldCarNumber:"",
        			brand:"",
        			fireExtinguishingAgentLoad:"",
        			basicPerformance:"",
        			scrappedYears:'',
        			equipmentTime:"",
        			engineNumber:"",
        			frameNumber:"",
        			insuranceSituation:"",
        			driveRecorder: '0',
        			damageSituation:""
        		}
        	},
        	editCarFn(item){
				this.addCarMask = true;
        		this.editFlag = true;
        		this.editId = item.id;
        		this.addCarData.carNumber = item.carNumber;
        		this.addCarData.groupId = item.groupId;
        		this.addCarData.carName = item.carName;
        		this.addCarData.carStatus = item.carStatus;
        		this.addCarData.productionType = item.productionType;
        		this.addCarData.propertyRight = item.propertyRight;
        		this.addCarData.oldCarNumber = item.oldCarNumber;
        		this.addCarData.brand = item.brand;
        		this.addCarData.fireExtinguishingAgentLoad = item.fireExtinguishingAgentLoad;
        		this.addCarData.basicPerformance = item.basicPerformance;
        		this.addCarData.scrappedYears = item.scrappedYears;
        		this.addCarData.equipmentTime = item.equipmentTime;
        		this.addCarData.engineNumber = item.engineNumber;
        		this.addCarData.frameNumber = item.frameNumber;
        		this.addCarData.insuranceSituation = item.insuranceSituation;
        		this.addCarData.driveRecorder = item.driveRecorder;
        		this.addCarData.damageSituation = item.damageSituation;

        	},
        	search(){
        		this.getList(this.departmentVal,this.carStatus,this.carNumber,1);
        	},
        	getList(groupId,carStatus,carNumber,pageNum){ // 获取表格数据
        		console.log(groupId,carStatus,carNumber)
        		this.$ajax.post(this.$dataSetUrl + '/apis/car/getdata', qs.stringify({
        			groupId:groupId,
        			carStatus: carStatus,
        			carNumber: carNumber,
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
        					}else{
        						item.carStatusVal = '报废';
        					}
        				})
        			}else{
        				this.list = [];
        			}
			    }).catch(function (error) {c
			        console.log(error);
			    })
        	},
        	getPage(page){
        		this.getList(this.departmentVal,this.carStatus,this.carNumber,page);
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
	        validateNumber(val,type) {
				if(type == 1){
					this.addCarData.scrappedYears = val.replace(/[^\d]/g, "");
				}
	        },
        }
    }
</script>

<style scoped>

</style>
