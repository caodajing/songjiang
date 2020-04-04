<!--火患分析详情-->
<template>
	<div class="container-wrap">
		<div class="fireDetail-wrap">
			<div class="content-box">
				<div class="back-btn flex" @click="goBack">
		            <i class="iconfont icon-fanhui"></i>
		            <span>返回</span>
		        </div>
		        <div class="nav-box">
		        	<ul class="nav-list" id="nav-list">
		                <a href="javascript:;" :class="[item.act ? 'act' : '']" v-for="item,index in navList" @click="navSwitch(index,item.id)">{{item.name}}</a>
		            </ul>
		        </div>
	            <div class="line"></div>
	            <!-- 基本信息 -->
	            <a name="baseInfo" id="baseInfo">
	            	<div class="baseInfo-box">
	            		<div class="title-common">
	                        <span>基本信息</span>
	                        <div class="line"></div>
	                    </div>
	                    <div class="box">
	                    	<div class="inp-box clearfix">
								<span class="span">标题</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="editData.title" >
							</div>
	                    </div>
	            	</div>
	            </a>
				<a name="fireType" id="fireType">
					<div class="fireType-box">
						<div class="title-common">
	                        <span>火患类别</span>
	                        <div class="line"></div>
	                    </div>
	                    <div class="box">
	                    	<div class="inp-box">
								<span class="span"><i>*</i>消防器材、消防安全标志未保持完好有效性</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[0]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>电气线路敷设不符合消防技术标准类</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[1]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>“三合一”“多合一”类</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[2]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>占用、堵塞、封闭消防车通道类</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[3]">
							</div> 
							<div class="inp-box">
								<span class="span"><i>*</i>消防设施未保持完好有效性类</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[4]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>占用、堵塞、封闭疏散通道、安全出口类</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[5]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>未依法申请消防行政许可或备案</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[6]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>其他</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="fireTypeList[7]">
							</div>
							
	                    </div>
					</div>
				</a>
				<a name="firePlace" id="firePlace">
					<div class="firePlace-box">
						<div class="title-common">
	                        <span>火患场所</span>
	                        <div class="line"></div>
	                    </div>
	                    <div class="box">
	                    	<div class="inp-box">
								<span class="span"><i>*</i>居民住宅</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[0]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>商场、市场</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[1]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>生产加工企业</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[2]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>餐饮、商店、旅馆</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[3]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>仓储、物流</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[4]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>宾馆饭店</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[5]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>写字楼、办公室等公共场所</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[6]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>医院</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[7]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>施工现场</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[8]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>体育场馆</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[9]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>学校、幼儿园、托儿所</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[10]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>公共娱乐场所</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[11]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>机关、团体、企业</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[12]">
							</div>
							<div class="inp-box">
								<span class="span"><i>*</i>其他</span>
								<input type="text" placeholder="请输入…" class="inp" v-model="firePlaceList[13]">
							</div>
							
	                    </div>
					</div>
				</a>
	            <div class="btn-box-common flex">
                    <div class="cancel-btn" @click="goBack">取消</div>
                    <div class="save-btn" @click="save">确定</div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
	import {setCookie, getCookie} from '../../../assets/js/cookie.js'
    export default {
        name: "fireDetail",
        components:{

        },
        data(){
        	return{
        		userInfo:null,
        		navList:[
	                {
	                    name:'基本信息',
	                    id: 'baseInfo',
	                    act:true
	                },
	                {
	                    name:'火患类别',
	                    id: 'fireType',
	                    act:false
	                },
	                {
	                    name:'火患场所',
	                    id: 'firePlace',
	                    act:false
	                }
	                
	            ],
	            fireTypeList:["","","","","","","","",""],
	            firePlaceList:["","","","","","","","","","","","","",""],
        		queryType:"",
        		editData:{
        			title:"",
        			fireType:"", // 8个用逗号隔开
        			firePlace:"", // 用逗号隔开
        		}
        	}
        },
        mounted(){
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.queryType = this.$route.query.type;
        	if(this.$route.query.editData){
        		let fireType = this.$route.query.editData.fireType;
        		let firePlace = this.$route.query.editData.firePlace;
        		this.editData.title = this.$route.query.editData.title;
        		this.editData.fireType = fireType;
        		this.editData.firePlace = firePlace;
        		this.editData.id = this.$route.query.editData.id;

        		this.fireTypeList = fireType.split(",");
        		this.firePlaceList = firePlace.split(",");

        	}
        },
        methods:{
        	save(type){
        		console.log(this.fireTypeList)
        		let info = this.editData;
    			info.fireType = this.fireTypeList.join(",");
    			info.firePlace = this.firePlaceList.join(",");
				if(info.title == ''){
    				this.$message('请填写标题');
    			}else if(this.fireTypeList[0] == ''){
    				this.$message('请填写消防器材、消防安全标志未保持完好有效性');
    			}else if(this.fireTypeList[1] == ''){
    				this.$message('请填写电气线路敷设不符合消防技术标准类');
    			}else if(this.fireTypeList[2] == ''){
    				this.$message('请填写“三合一”“多合一”类');
    			}else if(this.fireTypeList[3] == ''){
    				this.$message('请填写占用、堵塞、封闭消防车通道类');
    			}else if(this.fireTypeList[4] == ''){
    				this.$message('请填写消防设施未保持完好有效性类');
    			}else if(this.fireTypeList[5] == ''){
    				this.$message('请填写占用、堵塞、封闭疏散通道、安全出口类');
    			}else if(this.fireTypeList[6] == ''){
    				this.$message('请填写未依法申请消防行政许可或备案');
    			}else if(this.fireTypeList[7] == ''){
    				this.$message('请填写火患类别其他');
    			}else if(this.firePlaceList[0] == ''){
    				this.$message('请填写居民住宅');
    			}else if(this.firePlaceList[1] == ''){
    				this.$message('请填写商场、市场');
    			}else if(this.firePlaceList[2] == ''){
    				this.$message('请填写生产加工企业');
    			}else if(this.firePlaceList[3] == ''){
    				this.$message('请填写餐饮、商店、旅馆');
    			}else if(this.firePlaceList[4] == ''){
    				this.$message('请填写仓储、物流');
    			}else if(this.firePlaceList[5] == ''){
    				this.$message('请填写宾馆饭店');
    			}else if(this.firePlaceList[6] == ''){
    				this.$message('请填写写字楼、办公室等公共场所');
    			}else if(this.firePlaceList[7] == ''){
    				this.$message('请填写医院');
    			}else if(this.firePlaceList[8] == ''){
    				this.$message('请填写施工现场');
    			}else if(this.firePlaceList[9] == ''){
    				this.$message('请填写体育场馆');
    			}else if(this.firePlaceList[10] == ''){
    				this.$message('请填写学校、幼儿园、托儿所');
    			}else if(this.firePlaceList[11] == ''){
    				this.$message('请填写公共娱乐场所');
    			}else if(this.firePlaceList[12] == ''){
    				this.$message('请填写机关、团体、企业');
    			}else if(this.firePlaceList[13] == ''){
    				this.$message('请填写火患场所其他');
    			}else{
    				if(this.queryType == 'edit'){ // 编辑
    					this.$ajax.post(this.$dataSetUrl + '/apis/fireanalysis/updatedata', qs.stringify({
	    					id: info.id,
		        			title: info.title,
		        			fireType: info.fireType,
		        			firePlace: info.firePlace,
		        			createUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '修改成功!'
					          	});
					          	this.goBack();
		        				this.getList('','',1);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
    				}else{
    					this.$ajax.post(this.$dataSetUrl + '/apis/fireanalysis/setdata', qs.stringify({
		        			title: info.title,
		        			fireType: info.fireType,
		        			firePlace: info.firePlace,
		        			createUserId: this.userInfo.id,
		        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		        			let data = res.data;
		        			if(data.code == 200){
		        				this.$message({
						            type: 'success',
						            message: '修改成功!'
					          	});
					          	this.goBack();
		        				this.getList('','',1);
		        			}else{
		        				this.$message.error('接口异常');
		        			}
					    }).catch(function (error) {
					        console.log(error);
					    })
    				}
    			}
        	},
        	navSwitch(index,_id){
	            let id = '#' + _id;
	            document.querySelector(id).scrollIntoView(true);
	            this.navList.map((val,i) => {
	                if(i == index){
	                    val.act = true;
	                }else{
	                    val.act = false;
	                }
	            })
	        },
	        goBack(){
	        	this.$router.go(-1);
	        },
        }
    }
</script>

<style scoped>

</style>
