<!--战时快报首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="newsIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 战时快报</span>
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
						<el-select v-model="alarmType" placeholder="搜寻处警类型" :clearable="true">
						    <el-option
						      v-for="item in alarmTypeList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						 </el-select>
					</div>
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="goDetail('add')">
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
							<span>日期</span>
							<span>出动时间</span>
							<span>战别</span>
							<span>出动车辆</span>
							<span>跟车干部</span>
							<span>出警类型</span>
							<span>接警至甲车离库时间</span>
							<span>到场时间</span>
							<span>行驶距离</span>
							<span>出水时间</span>
							<span>控制时间</span>
							<span>熄火时间</span>
							<span>备注</span>
							<span>关联接警单号</span>
						</div>
						<li class="clearfix" v-for="item,index in list.dataList">
							<span>{{index+1}}</span>
							<span>{{item.issueTime}}</span>
							<span>{{item.dispatchTime}}</span>
							<span>{{item.warSeparationVal}}</span>
							<span>{{item.carNumbers}}</span>
							<span>{{item.carFollowingCadres}}</span>
							<span>{{item.alarmTypeVal}}</span>
							<span>{{item.leavingTime == -1 ? '中途返回' : item.leavingTimeVal}}</span>
							<span>{{item.presentTimeVal}}</span>
							<span>{{parseInt(item.travelDistance) == 0 ? '' : item.travelDistance}}</span>
							<span>{{item.effluentTime == -1 ? '未出水' : item.effluentTimeVal}}</span>
							<span>{{item.controlTimeVal}}</span>
							<span>{{item.quenchingTimeVal}}</span>
							<span>{{item.remark}}</span>
							<span>{{item.processAlarmId}}</span>
						</li>
					</ul>
					<ul class="positionDiv">
						<div class="title-list">
							<span>操作</span>
						</div>
						<li class="clearfix" v-for="item,index in list.dataList">
							<span>
								<i @click="goDetail('edit',item)">编辑</i>
								<i @click="delAlarm(item)">删除</i>
							</span>
						</li>
					</ul>
				</div>
				<pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)"></pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {setCookie, getCookie} from '../../../assets/js/cookie.js'
	import leftNav from '../leftNav'
	import pagination from '../../../components/pagination'
    export default {
        name: "newsIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		userInfo:null,
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
        		alarmType:"",
        		departmentVal:"",
        		departmentList:[], // 所属单位
        		list:[], // 表格数据
        		currentTime:"",
        		currentHour:"",
        		page:1
        	}
        },
        mounted(){
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	this.getList('','',1);
        },
        methods:{
        	delAlarm(item){ // 删除接警信息
        		this.$confirm('确定删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$ajax.post(this.$dataSetUrl + '/apis/wartimeexpress/deldata', qs.stringify({
	        			id:item.id
	        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
	        			let data = res.data;
	        			if(data.code == 200){
	        				this.$message({
					            type: 'success',
					            message: '删除成功!'
				          	});
	        				this.getList('','',this.page,'del');
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
        	search(){
        		this.page = 1;
        		this.getList(this.departmentVal,this.alarmType,1);
        	},
        	getList(warSeparation,alarmType,pageNum,type){ // 获取表格数据
        		this.$ajax.post(this.$dataSetUrl + '/apis/wartimeexpress/getdata', qs.stringify({
        			warSeparation:warSeparation,
        			alarmType: alarmType,
        			rowLength:10,
        			pageNum:pageNum
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.list = data.data[0];
        				this.list.dataList.map((item,index) => {
        					this.departmentList.map((val,i) =>{
        						if(item.warSeparation == val.groupId){
        							item.warSeparationVal = val.groupName;
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

        					// 离库时间
        					if(item.leavingTime != '' || item.leavingTime != -1){
        						let min = Math.floor(item.leavingTime%3600);
        						item.leavingTimeVal = Math.floor(item.leavingTime/3600) + '时' + Math.floor(min/60) + '分' + item.leavingTime%60 + '秒';
        					}

        					// 到场时间
        					if(item.presentTime != '' || item.presentTime != -1){
        						let min = Math.floor(item.presentTime%3600);
        						item.presentTimeVal = Math.floor(item.presentTime/3600) + '时' + Math.floor(min/60) + '分' + item.presentTime%60 + '秒';
        					}

        					// 出水时间
        					if(item.effluentTime != '' || item.effluentTime != -1){
        						let min = Math.floor(item.effluentTime%3600);
        						item.effluentTimeVal = Math.floor(item.effluentTime/3600) + '时' + Math.floor(min/60) + '分' + item.effluentTime%60 + '秒';
        					}

        					// 控制时间
        					if(item.controlTime != '' || item.controlTime != -1){
        						let min = Math.floor(item.controlTime%3600);
        						item.controlTimeVal = Math.floor(item.controlTime/3600) + '时' + Math.floor(min/60) + '分' + item.controlTime%60 + '秒';
        					}

        					// 熄灭时间
        					if(item.quenchingTime != '' || item.quenchingTime != -1){
        						let min = Math.floor(item.quenchingTime%3600);
        						item.quenchingTimeVal = Math.floor(item.quenchingTime/3600) + '时' + Math.floor(min/60) + '分' + item.quenchingTime%60 + '秒';
        					}

        					

        				})
        			}else{
        				this.list = [];
        				if(type == 'del'){
        					this.getList('','',this.page-1);
        				}
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getPage(page){
        		this.page = page;
        		this.getList(this.departmentVal,this.alarmType,page);
        	},
        	goDetail(type,item){ // 
        		if(type == 'add'){ // 新增
        			this.$router.push({path:'/news/detail',query:{type:type}});
        		}else{ // 编辑
        			this.$router.push({path:'/news/detail',query:{type:type,item:JSON.stringify(item)}});
        		}
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
