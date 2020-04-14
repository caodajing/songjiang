<!--火患分析首页-->
<template>
	<div class="container-wrap">
		<leftNav/>	
		<div class="fireIndex-wrap">
			<div class="head-box">
				<i class="iconfont icon-shouye-copy icon"></i>
				<span>当前位置：数据设置 > 火患分析</span>
			</div>
			<div class="list-box">
				<div class="util-box clearfix">
					<div class="inp-box clearfix">
						<span>标题：</span>
						<el-input type="text" placeholder="输入关键字搜索" v-model="searchName" class="elInp inp" :clearable="true"></el-input>
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
				<div class="table-box">
					<table>
						<thead>
							<th style="width:70px;">序号</th>
							<th>标题</th>
							<th>录入人</th>
							<th>录入时间</th>
							<th style="width:130px;">操作</th>
						</thead>
						<tbody>
							<tr v-for="(item,index) in list.dataList">
								<td style="width:70px;">{{index+1}}</td>
								<td>{{item.title}}</td>
								<td>{{item.createUserId}}</td>
								<td>{{item.createTime}}</td>
								<td style="width:130px;">
									<span @click="goDetail('edit',item)">查看</span>
									<span @click="delFire(item)">删除</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pagination :pageNum="parseInt(list.totalPages)" @changePage="getPage($event)" :TocurrentPage="page_num"></pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import leftNav from '../leftNav'
	import pagination from '../../../components/pagination'
    export default {
        name: "fireIndex",
        components:{
        	pagination,
        	leftNav
        },
        data(){
        	return{
        		departmentVal:"",
        		departmentList:[], // 所属单位
        		searchName:"",//搜索名
        		list:[], // 表格数据
        		page_num:1
        	}
        },
        mounted(){
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	this.getList('','',1);
        },
        methods:{
        	delFire(item){ // 删除接警信息
        		this.$confirm('确定删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.$ajax.post(this.$dataSetUrl + '/apis/fireanalysis/deldata', qs.stringify({
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
        	search(){
        		this.page_num = 1;
        		this.getList(this.departmentVal,this.searchName,1);
        	},
        	getList(groupId,title,pageNum,type){ // 获取表格数据
        		// console.log(groupId,title)
        		this.$ajax.post(this.$dataSetUrl + '/apis/fireanalysis/getdata', qs.stringify({
        			// groupId:groupId,
        			title: title,
        			rowLength:10,
        			pageNum:pageNum
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.list = data.data[0];
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
        	goDetail(type,item){
        		if(type == 'add'){ // 新增
        			this.$router.push({path:'/fire/detail',query:{type:type}});
        		}else{ // 编辑
        			this.$router.push({path:'/fire/detail',query:{type:type,editData:JSON.stringify(item)}});
        		}
        	}
        }
    }
</script>

<style scoped>

</style>
