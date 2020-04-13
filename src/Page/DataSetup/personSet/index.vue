<!--数据设置-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="personSetIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 人员设置</span>
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
					<div class="search-btn" @click="search">查询</div>
					<div class="add-person-btn common" @click="addPersonMask = true">
						<i class="iconfont icon-add"></i>
						<span>添加人员</span>
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
							<th>姓名</th>
							<th style="width:50px;">性别</th>
							<th>所属单位/部门</th>
							<th>职务</th>
							<th>人员类型</th>
							<th>手机号</th>
							<th>家属姓名</th>
							<th style="width:95px;">家属关系</th>
							<th>家属电话</th>
							<th>家庭地址</th>
							<th style="width:200px">操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in list.dataList">
								<td style="width:70px;">{{index+1}}</td>
								<td @click="open(item.realName)">{{item.realName}}</td>
								<td style="width:50px;">{{item.sex == 0 ? '男' : '女'}}</td>
								<td>{{item.groupName}}</td>
								<td>{{item.roleName}} </td>
								<td>{{item.type == 1 ? '基层干部' : item.type == 2 ? '政府专职消防员' : '现役消防士'}}</td>
								<td @click="open(item.phone)">{{item.phone}}</td>
								<td @click="open(item.familyName)">{{item.familyName}}</td>
								<td style="width:95px;" @click="open(item.familyKinship)">{{item.familyKinship}}</td>
								<td @click="open(item.familyPhone)">{{item.familyPhone}}</td>
								<td @click="open(item.homeAddress)">{{item.homeAddress}}</td>
								<td style="width:200px">
									<div class="checkbox-box1 clearfix" @click="handelCheck(item,index)">
										<div class="span-box">
											<span :class="[item.checked ? 'icon-fuxuankuang' : 'icon-webicon202' , 'iconfont']"></span>
										</div>
										<i>加入对比</i>
									</div>
									<router-link to="" class="go-detail font333" @click.native="goDetail(item.type,item)">详情</router-link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)"></pagination>
			</div>
			<!-- 添加编辑成员 -->
			<div class="mask add-person-mask" v-if="addPersonMask">
				<div class="main">
					<a href="javascript:;" class="close" @click="addPersonMask = false"></a>
					<div class="con">
						<div class="title">编辑/新增人员</div>
						<div class="box clearfix">
							<div class="inp-box flex">
								<span class="span"><i>*</i>账号</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="addPerson.username">
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>密码</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="addPerson.password" maxlength="32">
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>姓名</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="addPerson.realName" maxlength="32">
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>性别</span>
								<div class="radio-box">
									<el-radio v-model="addPerson.sex" label="0">男</el-radio>
	  								<el-radio v-model="addPerson.sex" label="1">女</el-radio>
								</div>
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>所属单位/部门</span>
								<el-select v-model="addPerson.departmentVal" placeholder="请选择">
								    <el-option
								      v-for="item in departmentList"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								 </el-select>
							</div>
							<div class="inp-box flex">  
								<span class="span"><i>*</i>职务</span>
								<el-select v-model="addPerson.roleId" placeholder="请选择">
								    <el-option
								      v-for="item in roleList"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								 </el-select>
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>人员类型</span>
								<el-select v-model="addPerson.personTypeVal" placeholder="请选择">
								    <el-option
								      v-for="item in personTypeList"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								 </el-select>
							</div>
							<div class="inp-box flex">
								<span class="span"><i>*</i>手机号</span>
								<input type="tel" placeholder="请输入…" class="inp" v-model="addPerson.phone" maxlength="11" @input="validateNumber(addPerson.phone,1)">
							</div>
							<div class="inp-box flex">
								<span class="span">家属姓名</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="addPerson.familyName">
							</div>
							<div class="inp-box flex">
								<span class="span">家属关系</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="addPerson.familyKinship">
							</div>
							<div class="inp-box flex">
								<span class="span">家属手机号</span>
								<input type="tel" placeholder="请输入…" class="inp" v-model="addPerson.familyPhone" maxlength="11" @input="validateNumber(addPerson.familyPhone,2)">
							</div>
							<div class="inp-box flex">
								<span class="span">家庭住址</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="addPerson.homeAddress">
							</div>
						</div>
						<div class="btn-box flex">
							<div class="cancel-btn" @click="addPersonMask = false">取消</div>
							<div class="save-btn" @click="addPersonFn">保存</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 对比弹窗 -->
			<div class="compare-TK" v-if="alrCheckedList.length > 0">
				<div class="title">
					<span>[{{alrCheckedList.length}}/2]对比框</span>
					<i class="icon-del1 iconfont" @click="emptyCheckedList"></i>
				</div>
				<div class="list">
					<ul>
						<li class="flex" v-for="item in alrCheckedList">
							<span>{{item.realName}}</span>
							<i class="icon-del1 iconfont" @click="delCheckedList(item)"></i>
						</li>
					</ul>
					<div class="btn-box">
						<div class="compare-btn" @click="startCompare">对比</div>
						<div class="empty-btn" @click="emptyCheckedList">清空对比栏</div>
					</div>
				</div>
			</div>
			<!-- <div class="compare-tips-box" v-if="compareTips">
				<i></i>
				<span>只有同一类型人员才能进行比对哦！</span>
			</div> -->
		</div>
	</div>
	
    
</template>

<script>
	import {setCookie, getCookie} from '../../../assets/js/cookie.js'
	import leftNav from '../leftNav'
	import pagination from '../../../components/pagination'
    export default {
        name: "personSetIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		userInfo:null,
        		addPersonMask:false, // 添加成员 Mask
        		compareTK:false, // 对比弹窗
        		compareTips:false,
        		departmentVal:"",
        		name:"", // 名字
        		departmentList:[], // 单位部门
        		roleVal:"", // 
        		roleList:[], // 职务
        		sexRadio:"1",
        		pageNum:1,
        		list:[], // 表格数据
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
        		alrCheckedList:[], // 已选中的checkbox
        		addPerson:{ // 后端传参
        			username:"",
					password:"",
					realName:"",
					sex: '0',
					departmentVal:"",
					roleId:"",
					personTypeVal:"",
					phone:"",
					familyName:"",
					familyKinship:"",
					familyPhone:"",
					homeAddress:"",
        		}
        	}
        },
        mounted(){
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.getDeptList();
        	this.getRoleList();
        	this.getList('','','',1);
        },
        methods:{
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
        	delCheckedList(item){ // 删除对比框
        		this.alrCheckedList.map((val,i) => {
					if(val.id == item.id){
						this.alrCheckedList.splice(i,1);
					}
				})
				this.list.dataList.map((val,i) => {
					if(val.id == item.id){
        				val.checked = false;
        			}
        		})
        	},
        	emptyCheckedList(){ // 清空对比框
        		this.alrCheckedList = [];
        		this.list.dataList.map((val,i) => {
        			val.checked = false;
        		})
        		this.$forceUpdate();
        	},
        	search(){ // 查询
        		console.log(this.departmentVal);
        		this.getList(this.departmentVal,this.personTypeVal,this.name,1);
        	},
        	addPersonFn(){ // 新增人员
        		let addPerson = this.addPerson;
        		if(addPerson.username == ''){
        			this.$message('请填写账号');
        		}else if(addPerson.password == ''){
        			this.$message('请填写密码');
        		}else if(addPerson.realName == ''){
        			this.$message('请填写姓名');
        		}else if(addPerson.departmentVal == ''){
        			this.$message('请选择所属单位/部门');
        		}else if(addPerson.roleId == ''){
        			this.$message('请选择职务');
        		}else if(addPerson.personTypeVal == ''){
        			this.$message('请选择人员类型');
        		}else{
        			if(this.telValidate(addPerson.phone,1)){
        				let vm = this;
        				function ajaxCommon(){
        					vm.$ajax.post(vm.$dataSetUrl + '/apis/userbasic/setdata', qs.stringify({
			        			realName: addPerson.realName,
			        			username: addPerson.username,
			        			password: addPerson.password,
			        			type: addPerson.personTypeVal,
			        			roleId: addPerson.roleId,
			        			groupId: addPerson.departmentVal,
			        			sex: addPerson.sex,
			        			homeAddress: addPerson.homeAddress,
			        			familyName: addPerson.familyName,
			        			familyKinship: addPerson.familyKinship,
			        			familyPhone: addPerson.familyPhone,
			        			phone: addPerson.phone,
			        			createUserId: vm.userInfo.id,
		    					updateUserId: vm.userInfo.id,	
		    					delFlag:0 , // 是否停用(0可用;1停用)
			        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
			        			let data = res.data;
			        			if(data.code == 200){
			        				vm.addPersonMask = false;
			        				vm.$message({
							            type: 'success',
							            message: '新增成功!'
						          	});
			        				vm.getList('','','',1);
			        				vm.addPerson = { // 后端传参
					        			username:"",
										password:"",
										realName:"",
										sex: '0',
										departmentVal:"",
										roleId:"",
										personTypeVal:"",
										phone:"",
										familyName:"",
										familyKinship:"",
										familyPhone:"",
										homeAddress:"",
					        		}
			        			}else if(data.code == 302){
			        				vm.$message('重复的手机号');
			        			}
						    }).catch(function (error) {
						        console.log(error);
						    })
        				}
        				if(addPerson.familyPhone != ''){
        					if(this.telValidate(addPerson.familyPhone,2)){
        						ajaxCommon();
        					}
        				}else{
        					ajaxCommon();
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
        	getList(groupId,personTypeVal,realName,pageNum){ // 获取表格数据
        		this.$ajax.post(this.$dataSetUrl + '/apis/userbasic/getdata', qs.stringify({
        			groupId:groupId,
        			userType: personTypeVal,
        			realName:realName,
        			rowLength:10,
        			pageNum:pageNum
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.list = data.data[0];
        				this.list.dataList.map((val,i) => {
        					val.checked = false;
        				})
        				this.list.dataList.map((item,index) => {
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
        	goDetail(type,item){
        		if(type == 1){
        			this.$router.push({path:"/personSet/grassRootsDetail",query:{userId:item.id}});
        		}else if(type == 2){
        			this.$router.push({path:"/personSet/governmentDetail",query:{userId:item.id}})
        		}else{
        			this.$router.push({path:"/personSet/activeDetail",query:{userId:item.id}})
        		}
        	},
        	//前端验证手机号
			telValidate(phone,type){
			    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
			    if(phone==''){
			    	this.$message('手机号不能为空');
			        return false;
			    }else if( !myreg.test(phone) ){
			    	if(type == 1){
						this.$message('请输入有效的手机号码');
			    	}else{
			    		this.$message('请输入家属有效的手机号码');
			    	}
			        return false;
			    }else if( phone.length != 11 ){
			    	this.$message('请输入有效的手机号码');
			        return false;
			    }else if(isNaN(phone)){
			    	this.$message('请输入正确的格式');
			        return false;
			    }else{
			        return true;
			    }
			},
			validateNumber(val,type) {
				if(type == 1){
					this.addPerson.phone = val.replace(/[^\d]/g, "");
				}else{
					this.addPerson.familyPhone = val.replace(/[^\d]/g, "");
				}
	        },
        	getPage(page){
        		this.getList(this.departmentVal,this.personTypeVal,this.name,page);
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
