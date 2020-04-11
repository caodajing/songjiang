<!--战时快报详情-->
<template>
	<div class="container-wrap">
		<div class="newsDetail-wrap">
	    	<div class="content-box">
	    		<div class="back-btn flex" @click="goBack">
	    			<i class="iconfont icon-fanhui"></i>
	    			<span>返回</span>
	    		</div>
	    		<div class="top-box">
	    			<div class="title">战时快报</div>
	    			<div class="line"></div>
	    		</div>
	    		<div class="news-info-box">
	    			<div class="title-common">
		    			<span>战时快报</span>
		    			<div class="line"></div>
		    		</div>
		    		<div class="box">
		    			<div class="inp-box flex">
							<span class="span"><i>*</i>日期</span>
							<el-date-picker
						      	v-model="editData.issueTime"
						      	:editable="false"
						      	:clearable="false"
						      	type="date"
						      	placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>出动时间</span>
							<el-date-picker
						      	v-model="editData.dispatchTime"
						      	:editable="false"
						      	:clearable="false"
						      	type="date"
						      	placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>战别</span>
							<el-select v-model="editData.warSeparation" placeholder="请选择" @change="changeDept">
							    <el-option
							      v-for="item in departmentList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>

						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>处警类型</span>
							<el-select v-model="editData.alarmType" placeholder="请选择">
							    <el-option
							      v-for="item in alarmTypeList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<!-- <div class="inp-box flex inp-box-car"> -->
							<div class="inp-box flex">
								<span class="span paddingLeft"><i>*</i>处警车辆</span>
								<el-select v-model="carOriginList.carNumber" placeholder="请选择">
								    <el-option
								      v-for="item in carList"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
								<i class="add-btn icon-add iconfont" @click="addCar"></i>
							</div>
							<div class="inp-box flex">
								<span class="span">跟车干部</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="carOriginList.carFollowingCadres">
							</div>
							<div class="add-car-list" v-for="carItem,carIndex in carAddList">
								<div class="inp-box flex">
									<span class="span paddingLeft"><i>*</i>处警车辆</span>
									<el-select v-model="carItem.carNumber" placeholder="请选择">
									    <el-option
									      v-for="item in carList"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
									<i class="del-btn icon-del iconfont" @click="delCar(carIndex)"></i>
								</div>
								<div class="inp-box flex">
									<span class="span">跟车干部</span>
									<input type="text" placeholder="请输入…" class="inp" v-model="carItem.carFollowingCadres">
								</div>
							</div>
						<!-- </div> -->
						
						<div class="inp-box flex hours">
							<span class="span">接警至甲车离库时间</span>
							<input type="tel" v-model="editData.leavingTime.hour" @input="validateNumber(editData.leavingTime.hour,1)">
							<i class="i">时</i>
							<input type="tel" v-model="editData.leavingTime.minute" @input="validateNumber(editData.leavingTime.minute,2)"> 
							<i class="i">分</i>
							<input type="tel" v-model="editData.leavingTime.second" @input="validateNumber(editData.leavingTime.second,3)">
							<i class="i">秒</i>
						</div>
						<div class="inp-box flex">
							<span class="span">行驶距离</span>
							<input type="tel" placeholder="请输入…" class="inp" v-model="editData.travelDistance" @input="validateNumber(editData.travelDistance,4)">
						</div>
						<div class="inp-box flex hours">
							<span class="span">到场时间</span>
							<input type="tel" v-model="editData.presentTime.hour" @input="validateNumber(editData.presentTime.hour,5)">
							<i class="i">时</i>
							<input type="tel" v-model="editData.presentTime.minute" @input="validateNumber(editData.presentTime.minute,6)">
							<i class="i">分</i>
							<input type="tel" v-model="editData.presentTime.second" @input="validateNumber(editData.presentTime.second,7)">
							<i class="i">秒</i>
						</div>
						<div class="inp-box flex hours">
							<span class="span">出水时间</span>
							<input type="tel" v-model="editData.effluentTime.hour" @input="validateNumber(editData.effluentTime.hour,8)">
							<i class="i">时</i>
							<input type="tel" v-model="editData.effluentTime.minute" @input="validateNumber(editData.effluentTime.minute,9)">
							<i class="i">分</i>
							<input type="tel" v-model="editData.effluentTime.second" @input="validateNumber(editData.effluentTime.second,10)">
							<i class="i">秒</i>
						</div>
						<div class="inp-box flex hours">
							<span class="span">控制时间</span>
							<input type="tel" v-model="editData.controlTime.hour" @input="validateNumber(editData.controlTime.hour,11)">
							<i class="i">时</i>
							<input type="tel" v-model="editData.controlTime.minute" @input="validateNumber(editData.controlTime.minute,12)">
							<i class="i">分</i>
							<input type="tel" v-model="editData.controlTime.second" @input="validateNumber(editData.controlTime.second,13)">
							<i class="i">秒</i>
						</div>
						<div class="inp-box flex hours">
							<span class="span">熄灭时间</span>
							<input type="tel" v-model="editData.quenchingTime.hour" @input="validateNumber(editData.quenchingTime.hour,14)">
							<i class="i">时</i>
							<input type="tel" v-model="editData.quenchingTime.minute" @input="validateNumber(editData.quenchingTime.minute,15)">
							<i class="i">分</i>
							<input type="tel" v-model="editData.quenchingTime.second" @input="validateNumber(editData.quenchingTime.second,16)">
							<i class="i">秒</i>
						</div>
						<div class="textarea-box inp-box flex">
							<span class="span">备注</span>
							<textarea name="" id="" cols="30" rows="10" v-model="editData.remark"></textarea>
						</div>
						<div class="inp-box flex">
							<span class="span">关联接警单号</span>
							<el-select v-model="editData.processAlarmId" filterable placeholder="请选择">
							    <el-option
							      v-for="item in alarmList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</div>
						<div class="btn-box flex">
							<div class="cancel-btn" @click="goBack">取消</div>
							<div class="save-btn" @click="save">确定</div>
						</div>
		    		</div>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>

<script>
	import {setCookie, getCookie} from '../../../assets/js/cookie.js'
    export default {
        name: "newsDetail",
        data(){
        	return{
        		userInfo:null,
        		departmentList:[], // 所属单位
        		alarmTypeList:[
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
        		carNum:0, // 处警车辆的数量
        		queryData:{},
        		queryType:'',
        		editData:{
        			issueTime:"",
        			dispatchTime:"",
        			warSeparation:"",
        			alarmType:"",
        			dispatchVehicle:"",
        			carFollowingCadres:"",
        			leavingTime:{
        				hour:"",
        				minute:"",
        				second:""
        			},
        			travelDistance:'',
        			presentTime:{
        				hour:"",
        				minute:"",
        				second:""
        			},
        			effluentTime:{
        				hour:"",
        				minute:"",
        				second:""
        			},
        			controlTime:{
        				hour:"",
        				minute:"",
        				second:""
        			},
        			quenchingTime:{
        				hour:"",
        				minute:"",
        				second:""
        			},
        			remark:"",
        			processAlarmId:""
        		},
        		currentHour:"",
        		carList:[], // 获取所有处警车辆
        		alarmList:[], // 接警单号模糊查询
        		carOriginList:{ // 默认有一个处警车辆
        			carNumber:"",
        			carFollowingCadres:'', // 跟车干部
        		}, 
        		carAddList:[], // 添加的处警车辆
        	}
        },
        mounted(){
        	this.queryType = this.$route.query.type;
        	if(this.$route.query.item){
        		this.queryData = JSON.parse(this.$route.query.item);
        	}
        	console.log(this.queryData);

        	if(this.queryType == 'edit'){
        		this.init();
        	}
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	// this.getalarmList('',this.editData.warSeparation);
        	// this.getCarList(this.editData.warSeparation,'','',1);
        	

        },
        methods:{
        	init(){ // 编辑----赋值
        		let data = this.queryData;
        		this.editData.issueTime = data.issueTime;

        		// 出动时间
        		this.editData.dispatchTime = data.dispatchTime;

        		this.editData.warSeparation = data.warSeparation;
        		// 处警车辆、跟车干部
        		let dispatchVehicle = data.dispatchVehicle.split(",");
        		let carFollowingCadres = data.carFollowingCadres.split(",");
        		this.carOriginList.carNumber = dispatchVehicle[0];
        		this.carOriginList.carFollowingCadres = carFollowingCadres[0];
        		dispatchVehicle.map((val,i) => {
        			if(i != 0){
        				let each = {
        					carNumber:"",
        					carFollowingCadres:'', // 跟车干部
        				};
        				each.carNumber = val;
        				this.carAddList.push(each);
        			}
        		})
        		carFollowingCadres.map((val,i) => {
        			if(i != 0){
        				this.carAddList[i-1].carFollowingCadres = val;
        			}
        		})

        		this.editData.carFollowingCadres = data.carFollowingCadres;
        		this.editData.dispatchVehicle = data.dispatchVehicle;


        		this.editData.alarmType = data.alarmType;

        		// 离库时间
        		if(data.leavingTime != -1 && data.leavingTime != ''){
	        		let min = Math.floor(data.leavingTime%3600);
	        		this.editData.leavingTime.hour = Math.floor(data.leavingTime/3600);
	        		this.editData.leavingTime.minute = Math.floor(min/60);
	        		this.editData.leavingTime.second = data.leavingTime%60;
        		}
        		

        		// 到场时间
        		if(data.presentTime != ''){
	        		let min = Math.floor(data.presentTime%3600);
	        		this.editData.presentTime.hour = Math.floor(data.presentTime/3600);
	        		this.editData.presentTime.minute = Math.floor(min/60);
	        		this.editData.presentTime.second = data.presentTime%60;
        		}
        		

        		this.editData.travelDistance = data.travelDistance;

        		// 出水时间
        		if(data.effluentTime != -1 && data.effluentTime != ''){
	        		let min = Math.floor(data.effluentTime%3600);
	        		this.editData.effluentTime.hour = Math.floor(data.effluentTime/3600);
	        		this.editData.effluentTime.minute = Math.floor(min/60);
	        		this.editData.effluentTime.second = data.effluentTime%60;
        		}
        		

        		// 控制时间
        		if(data.controlTime != ''){
	        		let min = Math.floor(data.controlTime%3600);
	        		this.editData.controlTime.hour = Math.floor(data.controlTime/3600);
	        		this.editData.controlTime.minute = Math.floor(min/60);
	        		this.editData.controlTime.second = data.controlTime%60;
        		}
        		

        		// 熄灭时间
        		if(data.quenchingTime != ''){
	        		let min = Math.floor(data.quenchingTime%3600);
	        		this.editData.quenchingTime.hour = Math.floor(data.quenchingTime/3600);
	        		this.editData.quenchingTime.minute = Math.floor(min/60);
	        		this.editData.quenchingTime.second = data.quenchingTime%60;
        		}
        		

        		this.editData.processAlarmId = data.processAlarmId;
        		this.editData.remark = data.remark;

        	},
        	dateFilter(date){
        		if(date != ''){
        			console.log(date)
        			return date.split(" ")[1].split(":");
        		}
        	},
        	save(){
        		let info = this.editData;
        		let carNumberList = [];  // 处警车辆
        		let carTogetherList = []; // 跟车干部
        		let list = this.carAddList.concat(this.carOriginList); // 处警车辆
        		list.map((val,i) => {
        			carNumberList.push(val.carNumber);
        		})
        		list.map((val,i) => {
        			carTogetherList.push(val.carFollowingCadres);
        		})
        		if(carNumberList.length > 0){
        			info.dispatchVehicle = carNumberList.join(",");
        		}
        		if(carTogetherList.length > 0){
        			info.carFollowingCadres = carTogetherList.join(",");
        		}
        		
        		// console.log(list)
        		// console.log(info.dispatchVehicle);
        		// console.log(info.carFollowingCadres)

        		if(info.issueTime == ''){
        			this.$message('请选择日期');
        		}else if(info.dispatchTime == ''){
        			this.$message('请选择出动时间');
        		}else if(info.warSeparation == ''){
        			this.$message('请选择战别');
        		}else if(info.alarmType == ''){
        			this.$message('请选择处警类型');
        		}else if(info.dispatchVehicle == ''){
        			this.$message('请选择处警车辆');
        		}else{
        			this.getCurrentTime();
        			if(this.queryType == 'add'){ // 新增
        				if(info.travelDistance == ''){
        					info.travelDistance = 0;
        				}
        				this.$ajax.post(this.$dataSetUrl + '/apis/wartimeexpress/setdata', qs.stringify({
		        			issueTime: info.issueTime,
		        			dispatchTime: info.dispatchTime,
		        			warSeparation: info.warSeparation,
		        			carFollowingCadres: info.carFollowingCadres,
		        			dispatchVehicle: info.dispatchVehicle,
		        			alarmType: info.alarmType,
		        			
		        			leavingTime: Number(info.leavingTime.hour*3600) + Number(info.leavingTime.minute*60) + Number(info.leavingTime.second),

		        			presentTime: Number(info.presentTime.hour*3600) + Number(info.presentTime.minute*60) + Number(info.presentTime.second),
		        			travelDistance:  info.travelDistance,

		        			effluentTime:  Number(info.effluentTime.hour*3600) + Number(info.effluentTime.minute*60) + Number(info.effluentTime.second),

		        			controlTime: Number(info.controlTime.hour*3600) + Number(info.controlTime.minute*60) + Number(info.controlTime.second),

		        			quenchingTime: Number(info.quenchingTime.hour*3600) + Number(info.quenchingTime.minute*60) + Number(info.quenchingTime.second),
		        			processAlarmId: info.processAlarmId,
		        			remark: info.remark,
		        			createUserId: this.userInfo.id,
		        			updateUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '新增成功!'
					          	});
					          	this.$router.push({path:'/news/index'});
		        				
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {c
					        console.log(error);
					    })
        			}else{ // 编辑
        				if(info.travelDistance == ''){
        					info.travelDistance = 0;
        				}
        				this.$ajax.post(this.$dataSetUrl + '/apis/wartimeexpress/updatedata', qs.stringify({
        					id: this.queryData.id,
		        			issueTime: info.issueTime,
		        			dispatchTime: info.dispatchTime,
		        			warSeparation: info.warSeparation,
		        			carFollowingCadres: info.carFollowingCadres,
		        			dispatchVehicle: info.dispatchVehicle,
		        			alarmType: info.alarmType,
		        			
		        			leavingTime: Number(info.leavingTime.hour*3600) + Number(info.leavingTime.minute*60) + Number(info.leavingTime.second),

		        			presentTime: Number(info.presentTime.hour*3600) + Number(info.presentTime.minute*60) + Number(info.presentTime.second),
		        			travelDistance:  info.travelDistance,

		        			effluentTime:  Number(info.effluentTime.hour*3600) + Number(info.effluentTime.minute*60) + Number(info.effluentTime.second),

		        			controlTime: Number(info.controlTime.hour*3600) + Number(info.controlTime.minute*60) + Number(info.controlTime.second),

		        			quenchingTime: Number(info.quenchingTime.hour*3600) + Number(info.quenchingTime.minute*60) + Number(info.quenchingTime.second),
		        			processAlarmId: info.processAlarmId,
		        			remark: info.remark,
		        			createUserId: this.userInfo.id,
		        			updateUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '修改成功!'
					          	});
					          	this.$router.push({path:'/news/index'});
		        				
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {c
					        console.log(error);
					    })
        			}
        			
        		}
        	},
        	changeDept(){
        		this.getalarmList('',this.editData.warSeparation);
        		this.getCarList(this.editData.warSeparation,'','',1);
        	},
        	getalarmList(alarmProcessId,groupId){ // 获取接警单号模糊查询
        		console.log(alarmProcessId,groupId)
        		this.$ajax.post(this.$dataSetUrl + '/apis/processalarm/getdata', qs.stringify({
        			alarmProcessId: alarmProcessId, // 模糊搜寻条件（接警信息id）
        			groupId:groupId,
        			remark: '',
        			rowLength:100,
        			pageNum:1
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.alarmList = data.data[0].dataList;
        				this.alarmList.map((val,i) => {
        					val.value = val.id;
        					val.label = val.id;
        				})
        			}else{
        				this.alarmList = [];
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getCarList(groupId,carStatus,carNumber,pageNum){ // 获取车辆列表
        		this.$ajax.post(this.$dataSetUrl + '/apis/car/getdata', qs.stringify({
        			groupId:groupId,
        			carStatus: carStatus,
        			carNumber: carNumber,
        			rowLength:100,
        			pageNum:pageNum
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.carList = data.data[0].dataList;
        				this.carList.map((val,i) => {
        					val.value = val.id;
        					val.label = val.carNumber;
        				})
        			}else{
        				this.carList = [];
        			}
			    }).catch(function (error) {c
			        console.log(error);
			    })
        	},
        	addCar(){ // 增加处警车辆
        		let each = {
        			carNumber:"",
        			carFollowingCadres:'', // 跟车干部
        		}
        		this.carAddList.push(each);
        	},
        	delCar(index){ // 删除处警车辆
        		this.carAddList.splice(index,1);
        	},
        	goBack(){
	        	this.$router.go(-1);
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
	            this.currentTime = date; 
	            this.currentHour = hour + ':' + minute + ':' + second; 
	        },
	        validateNumber(val,type) {
				if(type == 1){
					this.editData.leavingTime.hour = val.replace(/[^\d]/g, "");
				}else if(type == 2){
					this.editData.leavingTime.minute = val.replace(/[^\d]/g, "");
				}else if(type == 3){
					this.editData.leavingTime.second = val.replace(/[^\d]/g, "");
				}else if(type == 4){
					this.editData.travelDistance = val.replace(/[^\d.]/g, "");
				}else if(type == 5){
					this.editData.presentTime.hour = val.replace(/[^\d]/g, "");
				}else if(type == 6){
					this.editData.presentTime.minute = val.replace(/[^\d]/g, "");
				}else if(type == 7){
					this.editData.presentTime.second = val.replace(/[^\d]/g, "");
				}else if(type == 8){
					this.editData.effluentTime.hour = val.replace(/[^\d]/g, "");
				}else if(type == 9){
					this.editData.effluentTime.minute = val.replace(/[^\d]/g, "");
				}else if(type == 10){
					this.editData.effluentTime.second = val.replace(/[^\d]/g, "");
				}else if(type == 11){
					this.editData.controlTime.hour = val.replace(/[^\d]/g, "");
				}else if(type == 12){
					this.editData.controlTime.minute = val.replace(/[^\d]/g, "");
				}else if(type == 13){
					this.editData.controlTime.second = val.replace(/[^\d]/g, "");
				}else if(type == 14){
					this.editData.quenchingTime.hour = val.replace(/[^\d]/g, "");
				}else if(type == 15){
					this.editData.quenchingTime.minute = val.replace(/[^\d]/g, "");
				}else if(type == 16){
					this.editData.quenchingTime.second = val.replace(/[^\d]/g, "");
				}
	        },
        }
    }
</script>


