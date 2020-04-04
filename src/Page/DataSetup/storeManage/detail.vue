<!--仓库详情 即普通仓库的准备列表-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="storeManageDetail-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 仓库管理 > {{deptName}} 仓库站点</span>
			</div>
			<div class="list-box">
				<div class="util-box clearfix">
					<div class="inp-box clearfix">
						<!-- <span>一级类型：</span> -->
						<input type="text" placeholder="请输入关键字搜索" v-model="searchName" class="inp">
					</div>
					<div class="search-btn" @click="searchEquipment">查询</div>
					<div class="add-person-btn common" @click="addEquitment">
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
							<th>装备名</th>
							<th>所属分类</th>
							<th>品牌</th>
							<th>数量</th>
							<th>货架号</th>
							<!-- <th>所属中队</th> -->
							<th>录入人</th>
							<th>录入时间</th>
							<th>操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in list.list">
								<td style="width:70px;">{{index+1}}</td>
								<td>{{item.equipmentName}}</td>
								<td>{{item.relationName}}</td>
								<td>{{item.bland}}</td>
								<td>{{item.eqCount}}</td>
								<td>{{item.shelvescode}}</td>
								<!-- <td>{{item.equipmentName}}</td>	 -->
								<td>{{item.editUserId}}</td>	
								<td>{{item.storegeTime}}</td>	
								<td>
									<span @click="goDetail(item.equipmentTypeId)">详情</span>
									<span @click="edit(item.equipmentTypeId)">编辑</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(list.pages)" @changePage="getPage($event)"></pagination>
			</div>
			<div class="mask" v-if="enterEquitmentMask">
	            <div class="main">
	                <div class="title-box">
	                    <p>{{enterEquitmentText}}</p>
	                </div>
	                <div class="box">
	                    <div class="each clearfix">
	                        <span class="span">装备名</span>
	                        <div class="inp">
	                            <el-input v-model="enterEquitment.name" placeholder="请输入" @change="enterEquitmentInput()" maxlength="100"></el-input>
	                        </div>
	                    </div>
	                    <div class="each clearfix type">
	                        <span class="span">所属分类</span>
	                        <div class="inp">
	                            <el-select v-model="equipmentValFirst" placeholder="一级分类" @change="equipmentTypeSelect($event,2)">
	                                <el-option
	                                  v-for="item in equipmentTypeFirst"
	                                  :key="item.id"
	                                  :label="item.equipmentTypeName"
	                                  :value="item.id"
	                                  :disabled="item.disabled">
	                                </el-option>
	                            </el-select>
	                            <el-select v-model="equipmentValTwo" placeholder="二级分类" @change="equipmentTypeSelect($event,3)">
	                                <el-option
	                                  v-for="item in equipmentTypeTwo"
	                                  :key="item.id"
	                                  :label="item.equipmentTypeName"
	                                  :value="item.id"
	                                  :disabled="item.disabled">
	                                </el-option>
	                            </el-select>
	                            <el-select v-model="equipmentValThree" placeholder="三级分类" @change="equipmentTypeSelect($event,4)">
	                                <el-option
	                                  v-for="item in equipmentTypeThree"
	                                  :key="item.id"
	                                  :label="item.equipmentTypeName"
	                                  :value="item.id"
	                                  :disabled="item.disabled">
	                                </el-option>
	                            </el-select>
	                        </div>
	                    </div>
	                    <div class="each clearfix">
	                        <span class="span">品牌</span>
	                        <div class="inp">
	                            <el-input v-model="enterEquitment.brand" placeholder="请输入" maxlength="100"></el-input>
	                        </div>
	                    </div>
	                    <div class="each clearfix">
	                        <span class="span">数量</span>
	                        <div class="inp">
	                            <el-input v-model="enterEquitment.number" placeholder="请输入" type="text" @input="validateNumber(enterEquitment.number)" maxlength="5"></el-input>
	                        </div>
	                    </div>
	                     <div class="each clearfix">
	                        <span class="span">货架号</span>
	                        <div class="inp">
	                            <el-input v-model="enterEquitment.shelvescode" placeholder="请输入" maxlength="100"></el-input>
	                        </div>
	                    </div>
	                </div>
	                <div class="btn-box flex">
	                    <div class="save" @click="equitmentSave()">保存</div>
	                    <div class="cancel" @click="equitmentCancel()">取消</div>
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
        name: "storeManageDetail",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		enterEquitmentMask:false,
        		enterEquitment:{  // 录入装备弹窗
	                name:"" , // 装备名
	                brand:"",
	                number:"",
	                shelvescode:"",
	                id:"",
	                add: true
	            },
	            equipmentTypeFirst:[], // 装备分类一级
	            equipmentTypeTwo:[], // 装备分类二级
	            equipmentTypeThree:[], // 装备分类三级
	            equipmentTypeFour:[], // 装备分类四级
	            equipmentValFirst:'',// 装备一级分类值
	            equipmentValTwo:'',// 装备二级分类值
	            equipmentValThree:'',// 装备三级分类值
	            equipmentIdThree:'', // 装备三级分类id
	            searchName:"",
            	enterEquitmentText:"录入装备",
            	page:1,
        		list:[],
        		storehouseName:"", // 仓库名字
	            deptCode:"", // 部门码
	            deptName:"", // 部门名
	            storehouseId:"", // 仓库id
        	}
        },
        mounted(){
        	this.storehouseName = this.$route.query.storehouseName;
	        this.deptCode = this.$route.query.deptCode;
	        this.deptName = this.$route.query.deptName;
	        this.storehouseId = this.$route.query.storehouseId;
	        this.userInfo = JSON.parse(getCookie("userInfo"));
	        // console.log(this.userInfo)
	        this.getEquipmentType(-1,1,'');
	        this.getEquipmentList(this.page);
        },
        methods:{
        	searchEquipment(){
	            this.page = 1;
	            this.getEquipmentList(this.page);
	        },
        	addEquitment(){
	            this.enterEquitmentMask = true;
	            this.enterEquitmentText = "录入装备";
	            this.enterEquitment = {  // 录入装备弹窗
	                name:"" , // 装备名
	                brand:"",
	                number:"",
	                shelvescode:"",
	                id:"",
	                add: true
	            }
	            this.equipmentValFirst = '';// 装备一级分类值
	            this.equipmentValTwo = '';// 装备二级分类值
	            this.equipmentValThree = '';// 装备三级分类值
	            this.equipmentIdThree = ''; // 装备三级分类id
	        },
        	getEquipmentList(pageNum){ // 获取装备列表
	            let vm = this;
	            tool.getdata(apiPath.equipmentList,'get',{
	                storehouseName: vm.storehouseName , // 仓库名
	                deptCode: vm.deptCode, 
	                pageNum:pageNum,
	                pageSize:10,
	                searchSpace: vm.searchName
	            },function(data){
	                if(data.status == 200){
	                    vm.list = data.data;
	                }else{
	                	vm.list = [];
	                }
	            },false)
	        },
	        getEquipmentType(equipmentTypePId,layer,equipmentTypeName){ // 获取装备分类
            	let vm = this;
	            tool.getdata(apiPath.equipmentType,'get',{
	                equipmentTypePId: equipmentTypePId, // 母类型id第一层传-1
	                layer: layer,  // 层级第一层就传1
	                equipmentTypeName: equipmentTypeName, // 模糊查找类型名称
	            },function(data){
	                if(data.status == 200){
	                    if(layer == 1){ // 一级
	                        vm.equipmentTypeFirst = data.data;

	                       let list = [];
	                        vm.equipmentTypeFirst.map(function(val,i) {
	                            if(val.equipmentTypeName == vm.equipmentValFirst){
	                                list.push(val);
	                            }
	                        });
	                        if(list.length == 0){
	                            vm.equipmentValFirst = '';
	                        }

	                    }else if(layer == 2){ // 二级
	                        vm.equipmentTypeTwo = data.data;
	                        let list = [];
	                        vm.equipmentTypeTwo.map(function(val,i) {
	                            if(val.equipmentTypeName == vm.equipmentValTwo){
	                                list.push(val);
	                            }
	                        });
	                        if(list.length == 0){
	                            vm.equipmentValTwo = '';
	                            vm.equipmentValThree = '';
	                        }
	                    }else if(layer == 3){ // 三级
	                        vm.equipmentTypeThree = data.data;
	                        let list = [];
	                        vm.equipmentTypeThree.map(function(val,i) {
	                            if(val.equipmentTypeName == vm.equipmentValThree){
	                                list.push(val);
	                            }
	                        });
	                        if(list.length == 0){
	                            vm.equipmentValThree = '';
	                        }
	                    }else if(layer == 4){ // 四级 即 装备名
	                        vm.equipmentTypeFour = data.data;
	                    }
	                }
	            },false)
	        },
	        equitmentSave(){ // 录入装备 保存弹窗
	            let vm = this;
	            if(vm.enterEquitment.name == ''){
	                tool.toast("请填写装备名");
	            }else if(vm.equipmentValFirst == ''){
	                tool.toast("请选择一级分类");
	            }else if(vm.equipmentValTwo == ''){
	                tool.toast("请选择二级分类");
	            }else if(vm.equipmentValThree == ''){
	                tool.toast("请选择三级分类");
	            }else if(vm.enterEquitment.brand == ''){
	                tool.toast("请填写品牌名");
	            }else if(vm.enterEquitment.number == ''){
	                tool.toast("请填写数量");
	            }else if(vm.enterEquitment.shelvescode == ''){
	                tool.toast("请填写货架号");
	            }else{
	                if(vm.enterEquitment.number>10000){
	                    tool.toast('数量不能超过10000');
	                }else{
	                    if(vm.enterEquitment.add == true){ // 新增
	                        tool.getdata(apiPath.addEquipment,'post',{
	                            pid: vm.equipmentIdThree, // 第三级类型的id
	                            equipmentName: vm.enterEquitment.name, // 装备名称
	                            deptCode: vm.deptCode, // 部门
	                            eqCount: vm.enterEquitment.number, // 数量
	                            shelvescode:vm.enterEquitment.shelvescode, // 货架号
	                            storehouseName: vm.storehouseName, // 仓库名
	                            bland: vm.enterEquitment.brand, // 品牌
	                            userId: vm.userInfo.id, // 登录人id
	                        },function(data){
	                            if(data.status == 200){
	                                tool.toast('新增成功');
	                                vm.enterEquitment.name = '';
	                                vm.enterEquitment.brand = '';
	                                vm.enterEquitment.number = '';
	                                vm.enterEquitment.shelvescode = '';
	                                vm.equipmentValFirst = '';// 装备一级分类值
	                                vm.equipmentValTwo = '';// 装备二级分类值
	                                vm.equipmentValThree = '';// 装备三级分类值
	                                vm.equipmentIdThree = ''; // 装备三级分类id
	                                vm.enterEquitmentMask = false;
	                                vm.getEquipmentList(vm.page);

	                            }
	                        },true)
	                    }else{ // 编辑
	                        tool.getdata(apiPath.editeEquipmentDetail,'post',{
	                            storehouseId: vm.storehouseId,
	                            deptCode: vm.deptCode,
	                            eqCount: vm.enterEquitment.number,
	                            equipmentTypeId: vm.enterEquitment.id,
	                            equipmentName: vm.enterEquitment.name,
	                            bland: vm.enterEquitment.brand, // 品牌
	                            userId: vm.userInfo.id, // 登录人id
	                            model: '',
	                            shelvesCode: vm.enterEquitment.shelvescode, // 货架号
	                            remark: '',
	                            thirdTypeId:vm.equipmentIdThree, // 第三级类型的id
	                        },function(data){
	                            if(data.status == 200){
	                                // vm.equipmentTypeId = data.data.equipmentTypeId;
	                                vm.storehouseId = data.data.storehouseId;
	                                vm.enterEquitmentMask = false;
	                                vm.getEquipmentList(vm.page);
	                                tool.toast('保存成功');
	                                vm.$router.push({path:'/storeManage/detail',query:{"storehouseName":vm.storehouseName,deptCode:vm.deptCode,storehouseId:vm.storehouseId}})
	                            }
	                        },true)
	                    }
	                }
	            } 
	        },
	        equipmentTypeSelect(event,layer){ // 选择装备类型下拉
	            if(layer == 4){ // 获取三级的选中id 用于模糊查询
	                this.equipmentIdThree = event;
	            }
	            this.getEquipmentType(event,layer,'');
	        },
	        goDetail(equipmentTypeId){
	            this.$router.push({path:'/storeManage/storeDetail',query:{storehouseId:this.storehouseId,deptCode:this.deptCode,equipmentTypeId:equipmentTypeId,storehouseName:this.storehouseName}})
	        },
	        addEquitment(){
	            this.enterEquitmentMask = true;
	            this.enterEquitmentText = "录入装备";
	            this.enterEquitment = {  // 录入装备弹窗
	                name:"" , // 装备名
	                brand:"",
	                number:"",
	                shelvescode:"",
	                id:"",
	                add: true
	            }
	            this.equipmentValFirst = '';// 装备一级分类值
	            this.equipmentValTwo = '';// 装备二级分类值
	            this.equipmentValThree = '';// 装备三级分类值
	            this.equipmentIdThree = ''; // 装备三级分类id
	        },
	        edit(equipmentTypeId){ // 装备编辑
	            this.enterEquitmentMask = true;
	            this.enterEquitmentText = "编辑装备";
	            this.enterEquitment.id = equipmentTypeId;
	            this.enterEquitment.add = false;

	            this.list.list.map((val,i) => {
	                if(val.equipmentTypeId == equipmentTypeId){
	                    this.enterEquitment.name = val.equipmentName;
	                    this.enterEquitment.brand = val.bland;
	                    this.enterEquitment.number = val.eqCount;
	                    this.enterEquitment.shelvescode = val.shelvescode;
	                    let str = val.relationName.split('->');
	                    this.equipmentValFirst = str[0] ;// 装备一级分类值
	                    this.equipmentValTwo = str[1] ;// 装备二级分类值
	                    this.equipmentValThree = str[2] ;// 装备三级分类值
	                    this.equipmentIdThree = val.thirdTypeId; // 装备三级分类id
	                }
	            })
	        },
	        enterEquitmentInput(){ // 手动输入装备名 模糊 查询  layer传4 pid就是传第三级的id
	            this.getEquipmentType(this.equipmentIdThree,4,this.enterEquitment.name);
	        },
	        equitmentCancel(type){ // 录入装备 取消弹窗
	            this.enterEquitmentMask = false;
	        },
	        getPage(val){
	            this.getEquipmentList(val);
	            this.page = val;
	        },
	        validateNumber(val) {
	            this.enterEquitment.number = val.replace(/[^\d]/g, "");
	        }
        }
    }
</script>

<style scoped>

</style>
