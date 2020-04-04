<!--现役对比-->
<template>
	<div class="container-wrap">
		<div class="grassRootsCompare-wrap governmentCompare-wrap">
	    	<div class="content-box">
	    		<div class="back-btn flex" @click="goBack">
	    			<i class="iconfont icon-fanhui"></i>
	    			<span>返回</span>
	    		</div>
	    		<div class="top-fixed-box">
		    		<div class="user-info-box">
		    			<div class="head-img">
		    				<img src="" alt="" class="icon-touxiang iconfont">
		    			</div>
		    			<div class="info-box">
		    				<div class="name-box clearfix">
		    					<span class="name">{{getData[0].sysUser.realName}}</span>
		    					<div class="info">
		    						<span class="sex">{{getData[0].sysUser.sex == 0 ? '男' : '女'}}</span>
		    						<i></i> 
		    						<span class="age" v-if="getData[0].sysUserInfo">{{getData[0].sysUserInfo.age}}岁</span>
		    						<i v-if="getData[0].sysUserInfo"></i>
		    						<span class="state">{{getData[0].sysUser.type == 1 ? '基层干部' : getData[0].sysUser.type == 2 ? '政府专职消防员' : '现役消防士'}}</span>
		    						<i></i>
		    					</div>
		    				</div>
		    				<p class="belong">所属中队  {{getData[0].sysUser.groupName}}</p>
		    				<div class="speciality-tag flex">
		    					<span>+</span>	
		    					特长标签
		    				</div>
		    			</div>
		    		</div>
		    		<div class="line"></div>
		    		<div class="user-info-box">
		    			<div class="head-img">
		    				<img src="" alt="" class="icon-touxiang iconfont">
		    			</div>
		    			<div class="info-box">
		    				<div class="name-box clearfix">
		    					<span class="name">{{getData[0].sysUser.realName}}</span>
		    					<div class="info">
		    						<span class="sex">{{getData[0].sysUser.sex == 0 ? '男' : '女'}}</span>
		    						<i></i> 
		    						<span class="age" v-if="getData[0].sysUserInfo">{{getData[0].sysUserInfo.age}}岁</span>
		    						<i v-if="getData[0].sysUserInfo"></i>
		    						<span class="state">{{getData[0].sysUser.type == 1 ? '基层干部' : getData[0].sysUser.type == 2 ? '政府专职消防员' : '现役消防士'}}</span>
		    						<i></i>
		    					</div>
		    				</div>
		    				<p class="belong">所属中队  {{getData[0].sysUser.groupName}}</p>
		    				<div class="speciality-tag flex">
		    					<span>+</span>	
		    					特长标签
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    	<div class="common-box">
		    		<div class="title-common">
		    			<span>身体数据</span>
		    			<div class="line"></div>
		    		</div>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th style="width:420px;">{{getData[0].sysUser.realName}}</th>
		    					<th style="width:287px;">身体数据</th>
		    					<th style="width:420px;">{{getData[1].sysUser.realName}}</th>
		    				</thead>
		    				<tbody>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.height}}</td>
		    						<td style="width:287px;">身高</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.height}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.headCircumference}}</td>
		    						<td style="width:287px;">头围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.headCircumference}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.hips}}</td>
		    						<td style="width:287px;">臀围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.hips}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.waist}}</td>
		    						<td style="width:287px;">腰围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.waist}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.bust}}</td>
		    						<td style="width:287px;">胸围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.bust}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.footLength}}</td>
		    						<td style="width:287px;">脚围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.footLength}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.neck}}</td>
		    						<td style="width:287px;">领围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.neck}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:420px;">{{getData[0].sysUserPhysicalData.plantarCircumference}}</td>
		    						<td style="width:287px;">跖围</td>
		    						<td style="width:420px;">{{getData[1].sysUserPhysicalData.plantarCircumference}}</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
		    	<div class="common-box userInfo-box">
		    		<div class="title-common">
		    			<span>个人信息</span>
		    			<div class="line"></div>
		    		</div>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th style="width:443px;">{{getData[0].sysUser.realName}}</th>
		    					<th style="width:244px;">项目</th>
		    					<th style="width:443px;">{{getData[1].sysUser.realName}}</th>
		    					<th style="width:443px;">李四</th>
		    				</thead>
		    				<tbody>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.nation}}</td>
		    						<td style="width:244px;">民族</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.nation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfWork}}</td>
		    						<td style="width:244px;">工作时间</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfWork}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.collegeStudent}}</td>
		    						<td style="width:244px;">是否大学生士兵</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.collegeStudent}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.placeOfEnlistment}}</td>
		    						<td style="width:244px;">入伍地</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.placeOfEnlistment}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.politicalAffiliation}}</td>
		    						<td style="width:244px;">政治面貌</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.politicalAffiliation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.marriageTime}}</td>
		    						<td style="width:244px;">结婚时间</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.marriageTime}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.fertilitySituation}}</td>
		    						<td style="width:244px;">生育情况</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.fertilitySituation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUser.groupName}}</td>
		    						<td style="width:244px;">单位</td>
		    						<td style="width:443px;">{{getData[1].sysUser.groupName}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.birthday}}</td>
		    						<td style="width:244px;">出生日期</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.birthday}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.fireRescueRank }}</td>
		    						<td style="width:244px;">消防救援衔</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.fireRescueRank }}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.professionalPost}}</td>
		    						<td style="width:244px;">专业岗位</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.professionalPost}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.placeOfBeforeEnlishment}}</td>
		    						<td style="width:244px;">入伍前户籍所在地</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.placeOfBeforeEnlishment}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.degreeOfEducation}}</td>
		    						<td style="width:244px;">文化程度</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.degreeOfEducation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.mritalStatus}}</td>
		    						<td style="width:244px;">婚姻状况</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.mritalStatus}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.spouseRegistration}}</td>
		    						<td style="width:244px;">配偶户籍</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.spouseRegistration}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.technicalGrade}}</td>
		    						<td style="width:244px;">技术等级</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.technicalGrade}}</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
		    	<div class="common-box">
		    		<div class="title-common">
		    			<span>训练数据</span>
		    			<div class="line"></div>
		    		</div>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th style="width:221px;">训练次数</th>
		    					<th style="width:221px;">最好成绩</th>
		    					<th style="width:244px;">项目名</th>
		    					<th style="width:221px;">训练次数</th>
		    					<th style="width:221px;">最好成绩</th>
		    				</thead>
		    				<tbody>
		    					<tr v-for="item in 10">
		    						<td style="width:221px;">内容</td>
		    						<td style="width:221px;">身高</td>
		    						<td style="width:244px;">内容</td>
		    						<td style="width:221px;">内容</td>
		    						<td style="width:221px;">内容</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
		    	<div class="common-box">
		    		<div class="title-common">
		    			<span>培训数据</span>
		    			<div class="line"></div>
		    		</div>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th style="width:221px;">训练时间</th>
		    					<th style="width:221px;">培训结果</th>
		    					<th style="width:244px;">培训项目</th>
		    					<th style="width:221px;">培训时间</th>
		    					<th style="width:221px;">培训结果</th>
		    				</thead>
		    				<tbody>
		    					<tr v-for="item in 10">
		    						<td style="width:221px;">内容</td>
		    						<td style="width:221px;">身高</td>
		    						<td style="width:244px;">内容</td>
		    						<td style="width:221px;">内容</td>
		    						<td style="width:221px;">内容</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
	    	</div>
	    </div>
	</div>
</template>

<script>
    export default {
        name: "activeCompare",
        data(){
        	return{
        		alrCheckedList:[],
        		getData:[
        			{
        				sysUser:{},  // 基本信息
	        			sysUserPhysicalData:{
	        				height:"",
	        				headCircumference:"",
	        				hips:"",
	        				waist:"",
	        				bust:"",
	        				footLength:"",
	        				neck:"",
	        				plantarCircumference:""
	        			},  // 身体数据
	        			sysUserInfo:{} // 个人信息
        			},
        			{
        				sysUser:{},  // 基本信息
	        			sysUserPhysicalData:{
	        				height:"",
	        				headCircumference:"",
	        				hips:"",
	        				waist:"",
	        				bust:"",
	        				footLength:"",
	        				neck:"",
	        				plantarCircumference:""
	        			},  // 身体数据
	        			sysUserInfo:{} // 个人信息
        			}
        		]
        	}
        },
        mounted(){
        	this.alrCheckedList = JSON.parse(this.$route.query.alrCheckedList);
        	this.init();
        },
        methods:{
        	init(){
        	 	this.$ajax.get(this.$URL + '/xf-unit/user/personnelComparison', {
        	 		params: {
        	 		 	oneUserId: this.alrCheckedList[0].id,
    					twoUserId: this.alrCheckedList[1].id
        	 		}
        		}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.getData = data.data;
        				
    					if(!this.getData[0].sysUserPhysicalData){
        					this.getData[0].sysUserPhysicalData = {};
        				}
        				if(!this.getData[1].sysUserPhysicalData){
        					this.getData[1].sysUserPhysicalData = {};
        				}

        				if(!this.getData[0].sysUserInfo){
        					this.getData[0].sysUserInfo = {};
        				}
        				if(!this.getData[1].sysUserInfo){
        					this.getData[1].sysUserInfo = {};
        				}
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	goBack(){
	        	this.$router.go(-1);
	        }
        }
    }
</script>


