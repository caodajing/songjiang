<!--水源首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="waterSourceIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 水源</span>
			</div>
			<div class="list-box">
				<div class="util-box clearfix">
					<div class="inp-box clearfix">
						<span>主管单位：</span>
						<el-input type="text" placeholder="输入关键字搜索" v-model="search_competentUnitId" class="elInp inp" :clearable="true"></el-input>
					</div>
					<div class="inp-box clearfix">
						<span>水源名称：</span>
						<el-input type="text" placeholder="输入关键字搜索" v-model="search_apparatusName" class="elInp inp" :clearable="true"></el-input>
					</div>
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="addWaterFn">
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
							<th>水源名称</th>
							<th>地址</th>
							<th>经度</th>
							<th>纬度</th>
							<th>主管单位</th>
							<th>负责人</th>
							<th>是否完好</th>
							<th>其他</th>
							<th>操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in list.dataList">
								<td style="width:70px;">{{index+1}}</td>
								<td>{{item.apparatusName}}</td>
								<td>{{item.address}}</td>
								<td>{{item.lng}}</td>
								<td>{{item.lat}}</td>
								<td>{{item.competentUnitId}}</td>
								<td>{{item.chargePersonId}}</td>
								<td>{{item.isIntactVal}}</td>
								<td>{{item.remark}}</td>
								<td>
									<span @click="editWaterFn(item)">编辑</span>
									<span @click="delWater(item)">删除</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)"></pagination>
			</div>
			<!-- 编辑/新增水源 -->
			<div class="mask add-water-mask" v-if="addWaterMask">
				<div class="main">
					<a href="javascript:;" class="close" @click="addWaterMask = false"></a>
					<div class="title">编辑/新增水源</div>
					<div class="box clearfix">
						<div class="inp-box flex">
							<span class="span"><i>*</i>水源名称</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addWaterData.apparatusName">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>地址</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addWaterData.address">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>经度</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addWaterData.lng">
						</div>
						<div class="inp-box flex">
							<span class="span"><i>*</i>纬度</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addWaterData.lat">
						</div>
						<div class="inp-box flex">
							<span class="span">主管单位</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addWaterData.competentUnitId">
						</div>
						<div class="inp-box flex">
							<span class="span">负责人</span>
							<input type="text" placeholder="请输入…" class="inp" v-model="addWaterData.chargePersonId">
						</div>
						<div class="inp-box flex">
							<span class="span">是否完好</span>
							<el-select v-model="addWaterData.isIntact" placeholder="请选择">
							    <el-option
							      v-for="item in goodList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex textarea-box">
							<span class="span">其他</span>
							<textarea name="" id="" cols="30" rows="10" v-model="addWaterData.remark"></textarea>
						</div>
					</div>
					<div class="btn-box flex">
						<div class="cancel-btn" @click="addWaterMask = false">取消</div>
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
        name: "waterSourceIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		userInfo:null,
        		addWaterMask:false,
        		goodVal:"",
        		goodList:[ // 是否完好
        			{
			          	value: '0',
			          	label: '完好'
			        }, 
			        {
			          	value: '1',
			          	label: '损坏'
			        }
        		],
        		waterIdData:"",
        		list:[],
        		currentTime:"",
        		editFlag: false, // false:新增 true:编辑
        		editId:"",
        		search_competentUnitId:"", // 搜索 主管单位
        		search_apparatusName:"", // 搜索 水源名
        		addWaterData:{
        			apparatusName:"",
        			address:"",
        			lng:"",
        			lat:"",
        			competentUnitId:"",
        			chargePersonId:"",
        			isIntact:'0',
        			remark:""
        		},
        		page:1
        	}
        },
        mounted(){
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.getTypeList();
        },
        methods:{
        	save(){
        		this.getCurrentTime();
        		if(this.editFlag){ // 编辑 水源
        			let info = this.addWaterData;
        			if(info.apparatusName == ''){
        				this.$message('请填写水源名称');
        			}else if(info.address == ''){
        				this.$message('请填写地址');
        			}else if(info.lng == ''){
        				this.$message('请填写经度');
        			}else if(info.lat == ''){
        				this.$message('请填写纬度');
        			}else{
        				this.$ajax.post(this.$dataSetUrl + '/apis/apparatus/updatedata', qs.stringify({
        					id: this.editId,
		        			apparatusName:info.apparatusName,
		        			apparatusCategoryId: this.waterIdData.id,
		        			address: info.address,
		        			lat: info.lat,
		        			lng: info.lng,
		        			competentUnitId: info.competentUnitId,
		        			chargePersonId: info.chargePersonId,
		        			isIntact: info.isIntact,
		        			remark: info.remark,
		        			parentId: 0,
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
		        				this.addWaterMask = false;
		        				this.getList('','',this.page);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
        			}
        		}else{ // 新增
        			let info = this.addWaterData;
        			if(info.apparatusName == ''){
        				this.$message('请填写水源名称');
        			}else if(info.address == ''){
        				this.$message('请填写地址');
        			}else if(info.lng == ''){
        				this.$message('请填写经度');
        			}else if(info.lat == ''){
        				this.$message('请填写纬度');
        			}else{
        				this.$ajax.post(this.$dataSetUrl + '/apis/apparatus/setdata', qs.stringify({
		        			apparatusName:info.apparatusName,
		        			apparatusCategoryId: this.waterIdData.id,
		        			address: info.address,
		        			lat: info.lat,
		        			lng: info.lng,
		        			competentUnitId: info.competentUnitId,
		        			chargePersonId: info.chargePersonId,
		        			isIntact: info.isIntact,
		        			remark: info.remark,
		        			parentId: 0,
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
		        				this.addWaterMask = false;
		        				this.getList('','',this.page);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
        			}
        		}
        	},
        	delWater(item){ // 删除接警信息
        		this.$confirm('确定删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$ajax.post(this.$dataSetUrl + '/apis/apparatus/deldata', qs.stringify({
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
        	addWaterFn(){
        		this.addWaterMask = true;
        		this.editFlag = false;
        		this.addWaterData = {
        			apparatusName:"",
        			address:"",
        			lng:"",
        			lat:"",
        			competentUnitId:"",
        			chargePersonId:"",
        			isIntact:'0',
        			remark:""
        		}
        	},
        	editWaterFn(item){
				this.addWaterMask = true;
        		this.editFlag = true;
        		this.editId = item.id;
        		this.addWaterData.apparatusName = item.apparatusName;
        		this.addWaterData.address = item.address;
        		this.addWaterData.lng = item.lng;
        		this.addWaterData.lat = item.lat;
        		this.addWaterData.competentUnitId = item.competentUnitId;
        		this.addWaterData.chargePersonId = item.chargePersonId;
        		this.addWaterData.isIntact = item.isIntact;
        		this.addWaterData.remark = item.remark;
        	},
        	search(){
        		this.page = 1;
        		this.getList(this.search_competentUnitId,this.search_apparatusName,1);
        	},
        	getList(competentUnitId,apparatusName,pageNum,type){ // 获取表格数据
        		this.$ajax.post(this.$dataSetUrl + '/apis/apparatus/getdata', qs.stringify({
        			competentUnitId:competentUnitId,
        			apparatusName:apparatusName,
        			categoryId: this.waterIdData.id,
        			rowLength:10,
        			pageNum:pageNum
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.list = data.data[0];
        				this.list.dataList.map((item,index) => {
        					if(item.isIntact == 0){
        						item.isIntactVal = '完好';
        					}else{
        						item.isIntactVal = '损坏';
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
        	getTypeList(){ // 获取所有的设备类型
        		this.$ajax.post(this.$dataSetUrl + '/apis/apparatus/gettypedata', qs.stringify({
        			parentId: -1,// 设备类型层级  (-1为全部类型)
        			rowLength:100,
        			pageNum:1
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.list = data.data[0].dataList;
        				this.list.map((val,i) => {
        					if(val.apparatusName == '水源'){
        						this.waterIdData = val;
        					}
        				})
        				console.log(this.waterIdData)
        				this.getList('','',this.page);
        			}else{
        				this.list = [];
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getPage(page){
        		this.page = page;
        		this.getList(this.search_competentUnitId,this.search_apparatusName,page);
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
