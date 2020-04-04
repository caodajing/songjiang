<!--基层干部对比-->
<template>
	<div class="container-wrap">
		<div class="grassRootsCompare-wrap">
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
		    					<span class="name">{{getData[1].sysUser.realName}}</span>
		    					<div class="info">
		    						<span class="sex">{{getData[1].sysUser.sex == 0 ? '男' : '女'}}</span>
		    						<i></i>
		    						<span class="age" v-if="getData[1].sysUserInfo">{{getData[1].sysUserInfo.age}}岁</span>
		    						<i v-if="getData[1].sysUserInfo"></i>
		    						<span class="state">{{getData[1].sysUser.type == 1 ? '基层干部' : getData[1].sysUser.type == 2 ? '政府专职消防员' : '现役消防士'}}</span>
		    						<i></i>
		    					</div>
		    				</div>
		    				<p class="belong">所属中队  {{getData[1].sysUser.groupName}}</p>
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
		    	<div class="common-box">
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
		    				</thead>
		    				<tbody>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.nationality}}</td>
		    						<td style="width:244px;">籍贯</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.nationality}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfEnlistment}}</td>
		    						<td style="width:244px;">入伍年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfEnlistment}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfVocation}}</td>
		    						<td style="width:244px;">任职年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfVocation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfVocationGrade}}</td>
		    						<td style="width:244px;">职级年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfVocationGrade}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfTechnical}}</td>
		    						<td style="width:244px;">技职年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfTechnical}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfTechnicalGrade}}</td>
		    						<td style="width:244px;">技级年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfTechnicalGrade}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.militaryLevel}}</td>
		    						<td style="width:244px;">警衔等级</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.militaryLevel}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.graduateFrom}}</td>
		    						<td style="width:244px;">毕业院校</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.graduateFrom}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.degree}}</td>
		    						<td style="width:244px;">学位</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.degree}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.nation}}</td>
		    						<td style="width:244px;">民族</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.nation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfWork}}</td>
		    						<td style="width:244px;">工作年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfWork}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfManager}}</td>
		    						<td style="width:244px;">提干年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfManager}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.background}}</td>
		    						<td style="width:244px;">家庭出身</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.background}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.politicalAffiliation}}</td>
		    						<td style="width:244px;">政治面貌</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.politicalAffiliation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.caucusTime}}</td>
		    						<td style="width:244px;">党团年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.caucusTime}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.degreeOfEducation}}</td>
		    						<td style="width:244px;">文化程度</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.degreeOfEducation}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.birthday}}</td>
		    						<td style="width:244px;">出生日期</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.birthday}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUser.croleName}}</td>
		    						<td style="width:244px;">职务</td>
		    						<td style="width:443px;">{{getData[1].sysUser.croleName}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.vocationGrade}}</td>
		    						<td style="width:244px;">职务等级</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.vocationGrade}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.technical}}</td>
		    						<td style="width:244px;">技术职务</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.technical}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.technicalGrade}}</td>
		    						<td style="width:244px;">技术等级</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.technicalGrade}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.education}}</td>
		    						<td style="width:244px;">学历</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.education}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.dateOfMilitary}}</td>
		    						<td style="width:244px;">衔级年月</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.dateOfMilitary}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.professional}}</td>
		    						<td style="width:244px;">专业</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.professional}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.reasonHere}}</td>
		    						<td style="width:244px;">进入本系统原因</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.reasonHere}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.eduBeforeEnlishment}}</td>
		    						<td style="width:244px;">入伍前学历</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.eduBeforeEnlishment}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.placeOfBirth}}</td>
		    						<td style="width:244px;">出生地</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.placeOfBirth}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.placeOfEnlistment}}</td>
		    						<td style="width:244px;">入伍地点</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.placeOfEnlistment}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.periodOfMilitary}}</td>
		    						<td style="width:244px;">军龄</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.periodOfMilitary}}</td>
		    					</tr>
		    					<tr>
		    						<td style="width:443px;">{{getData[0].sysUserInfo.educationType}}</td>
		    						<td style="width:244px;">学历类别</td>
		    						<td style="width:443px;">{{getData[1].sysUserInfo.educationType}}</td>
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
        name: "grassRootsCompare",
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


