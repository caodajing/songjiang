<!--现役消防员详情-->
<template>
	<div class="container-wrap">
		<div class="grassRootsDetail-wrap governmentDetail-wrap">
	    	<div class="content-box">
	    		<div class="back-btn flex" @click="goBack">
	    			<i class="iconfont icon-fanhui"></i>
	    			<span>返回</span>
	    		</div>
	    		<div class="top-fixed-box-wrap">
	    			<div class="top-fixed-box">
			    		<div class="user-info-box">
			    			<div class="head-img">
			    				<img :src=" $dataSetUrl + '/' + detailbaseInfo.photo" alt="" class="icon-touxiang iconfont" v-if="detailbaseInfo.photo">
			    				<img src="" alt="" class="icon-touxiang iconfont" v-else>
	                            <input type="file" accept="image/*" @change="picUpload">
			    			</div>
			    			<div class="info-box">
			    				<div class="name-box clearfix" >
			    					<span class="name" >{{detailbaseInfo.realName}}</span>
			    					<div class="info">
			    						<span class="sex" >{{detailbaseInfo.sex == 0 ? '男' : '女'}}</span>
			    						<i></i>
			    						<span class="age" >{{detailUserInfo.age}}岁</span>
			    						<i></i>
			    						<span class="state" >{{detailbaseInfo.type == 1 ? '基层干部' : detailbaseInfo.type == 2 ? '政府专职消防员' : '现役消防士'}}</span>
			    						<i></i>
			    					</div>
			    				</div>
			    				<p class="belong" >所属中队  {{detailbaseInfo.groupName}}</p>
			    				<div class="speciality-tag flex">
			    					<span>+</span>	
			    					特长标签
			    				</div>
			    			</div>
			    		</div>
			    		<div class="nav-list clearfix flex" id="nav-list">
			    			<a href="javascript:;" :class="[item.act ? 'act' : '']" v-for="item,index in navList" @click="navSwitch(index,item.id)">{{item.name}}</a>
			    		</div>
			    		<div class="line"></div>
			    	</div>
	    		</div>
	    		
		    	<!--  基本信息 -->
		    	<div class="base-info-box common-box" id="baseInfo">
		    		<div class="title-common">
		    			<span>基本信息</span>
		    			<div class="line"></div>
		    			<div class="edit-btn flex" @click="editFlag.baseInfoFlag = true">
		    				<i class="iconfont icon-bianji"></i>
		    				编辑
		    			</div>
		    		</div>
		    		<div class="box clearfix">
						<div class="inp-box flex">
							<span class="span">账号</span>
							<el-input v-model="detailbaseInfo.username" placeholder="命名规则：姓名拼音+手机号" :disabled="!editFlag.baseInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">密码</span>
							<el-input v-model="detailbaseInfo.password" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">姓名</span>
							<el-input v-model="detailbaseInfo.realName" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">性别</span>
							<div class="radio-box">
								<el-radio v-model="detailbaseInfo.sex" label="0" :disabled="!editFlag.baseInfoFlag">男</el-radio>
  								<el-radio v-model="detailbaseInfo.sex" label="1" :disabled="!editFlag.baseInfoFlag">女</el-radio>
							</div>
						</div>
						<div class="inp-box flex">
							<span class="span">所属单位/部门</span>
							<el-select v-model="detailbaseInfo.groupId" placeholder="请选择" :disabled="!editFlag.baseInfoFlag">
							    <el-option
							      v-for="item in departmentList"
							      :key="item.value"ji
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">职务</span>
							<el-select v-model="detailbaseInfo.roleId" placeholder="请选择" :disabled="!editFlag.baseInfoFlag">
							    <el-option
							      v-for="item in roleList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">人员类型</span>
							<el-select v-model="detailbaseInfo.type" placeholder="请选择" :disabled="!editFlag.baseInfoFlag">
							    <el-option
							      v-for="item in personTypeList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">手机号</span>
							<el-input v-model="detailbaseInfo.phone" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag" type="tel" maxlength="11" @input="validateNumber(detailbaseInfo.phone,1)"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">家属姓名</span>
							<el-input v-model="detailbaseInfo.familyName" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">家属关系</span>
							<el-input v-model="detailbaseInfo.familyKinship" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">家属手机号</span>
							<el-input v-model="detailbaseInfo.familyPhone" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag" type="tel" maxlength="11" @input="validateNumber(detailbaseInfo.familyPhone,2)"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">家庭住址</span>
							<el-input v-model="detailbaseInfo.homeAddress" placeholder="请输入…" :disabled="!editFlag.baseInfoFlag"></el-input>
						</div>
						<div class="btn-box flex" v-if="editFlag.baseInfoFlag">
							<div class="cancel-btn" @click="updateBaseInfoCancel">取消</div>
							<div class="save-btn" @click="updateBaseInfoSave">确定</div>

						</div>
					</div>
		    	</div>
		    	<!-- 身体数据 -->
		    	<div class="common-box" id="bodyData">
		    		<div class="title-common">
		    			<span>身体数据</span>
		    			<div class="line"></div>
		    			<div class="edit-btn flex" @click="editFlag.bodyDataFlag = true">
		    				<i class="iconfont icon-bianji"></i>
		    				编辑
		    			</div>
		    		</div>  
		    		<div class="box clearfix">
		    			<div class="inp-box flex">
							<span class="span">身高</span>
							<el-input v-model="detailBodyData.height" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">头围</span>
							<el-input v-model="detailBodyData.headCircumference" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">臀围</span>
							<el-input v-model="detailBodyData.hips" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">腰围</span>
							<el-input v-model="detailBodyData.waist" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">胸围</span>
							<el-input v-model="detailBodyData.bust" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">脚长</span>
							<el-input v-model="detailBodyData.footLength" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">领围</span>
							<el-input v-model="detailBodyData.neck" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">跖围</span>
							<el-input v-model="detailBodyData.plantarCircumference" placeholder="请输入…" :disabled="!editFlag.bodyDataFlag"></el-input>
						</div>
						<div class="btn-box flex" v-if="editFlag.bodyDataFlag">
							<div class="cancel-btn" @click="updateBodyDataCancel">取消</div>
							<div class="save-btn" @click="updateBodyDataSave">确定</div>
						</div>
		    		</div>
		    	</div>
		    	<!-- 个人信息 -->
		    	<div class="common-box" id="userInfo">
		    		<div class="title-common">
		    			<span>个人信息</span>
		    			<div class="line"></div>
		    			<div class="edit-btn flex" @click="editFlag.userInfoFlag = true">
		    				<i class="iconfont icon-bianji"></i>
		    				编辑
		    			</div>
		    		</div>  
		    		<div class="box clearfix">
						<!-- <div class="inp-box flex">
							<span class="span">支队</span>
							<el-input v-model="detailbaseInfo.groupName" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div> -->
						<div class="inp-box flex">
							<span class="span">身份证号</span>
							<el-input v-model="detailUserInfo.idCard" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">出生日期</span>
							<el-date-picker
						      	v-model="detailUserInfo.birthday"
						      	:editable="false"
						      	:clearable="false"
						      	:disabled="!editFlag.userInfoFlag"
						      	type="date"
						      	placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span">民族</span>
							<el-input v-model="detailUserInfo.nation" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">消防救援衔</span>
							<el-input v-model="detailUserInfo.fireRescueRank" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">工作时间</span>
							<el-date-picker
						      	v-model="detailUserInfo.dateOfWork"
						      	:editable="false"
						      	:clearable="false"
						      	:disabled="!editFlag.userInfoFlag"
						      	type="date"
						      	placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span">专业岗位</span>
							<el-input v-model="detailUserInfo.professionalPost" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">是否大学生士兵</span>
							<el-select  placeholder="请选择" v-model="detailUserInfo.collegeStudent" :disabled="!editFlag.userInfoFlag">
							    <el-option
							      v-for="item in collegeList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">入伍前户籍所在地</span>
							<el-input v-model="detailUserInfo.placeOfBeforeEnlishment" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">入伍地</span>
							<el-input v-model="detailUserInfo.placeOfEnlistment" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">文化程度</span>
							<el-select v-model="detailUserInfo.degreeOfEducation" placeholder="请选择" :disabled="!editFlag.userInfoFlag">
							    <el-option
							      v-for="item in eduBeforeEnlishmentList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">政治面貌</span>
							<el-input v-model="detailUserInfo.politicalAffiliation" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">婚姻状况</span>
							<el-select v-model="detailUserInfo.mritalStatus" placeholder="请选择">
							    <el-option
							      v-for="item in maritalStatusList"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							 </el-select>
						</div>
						<div class="inp-box flex">
							<span class="span">结婚时间</span>
							<el-date-picker
						      	v-model="detailUserInfo.marriageTime"
						      	:disabled="!editFlag.userInfoFlag"
						      	:editable="false"
						      	:clearable="false"
						      	type="date"
						      	placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span">配偶户籍</span>
							<el-input v-model="detailUserInfo.spouseRegistration" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">生育情况</span>
							<el-input v-model="detailUserInfo.fertilitySituation" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">技术等级</span>
							<el-input v-model="detailUserInfo.technicalGrade" placeholder="请输入…" :disabled="!editFlag.userInfoFlag"></el-input>
						</div>
						<div class="btn-box flex" v-if="editFlag.userInfoFlag">
							<div class="cancel-btn" @click="updateUserInfoCancel">取消</div>
							<div class="save-btn" @click="updateUserInfoSave">确定</div>
						</div>
		    		</div>
		    	</div>
		    	<!-- 培训编辑记录 -->
		    	<div class="common-box" id="PXRecord">
		    		<div class="title-common">
		    			<span>培训记录</span>
		    			<div class="line"></div>
		    			<div class="edit-btn flex" @click="editFlag.PXRecordFlag = true">
		    				<i class="iconfont icon-bianji"></i>
		    				编辑
		    			</div>
		    		</div>
		    		<div class="box clearfix">
						<div class="inp-box flex">
							<span class="span">培训时间</span>
							<el-date-picker
						      	v-model="detailPXEditData.trainingDate"
						      	:disabled="!editFlag.PXRecordFlag"
						      	type="date"
						      	:editable="false"
						      	:clearable="false"
						      	placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
						    </el-date-picker>
						</div>
						<div class="inp-box flex">
							<span class="span">培训地点</span>
							<el-input v-model="detailPXEditData.place" placeholder="请输入…" :disabled="!editFlag.PXRecordFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">培训项目</span>
							<el-input v-model="detailPXEditData.item" placeholder="请输入…" :disabled="!editFlag.PXRecordFlag"></el-input>
						</div>
						<div class="inp-box flex">
							<span class="span">培训成绩</span>
							<el-input v-model="detailPXEditData.grade" placeholder="请输入…" :disabled="!editFlag.PXRecordFlag"></el-input>
						</div>
						<div class="btn-box flex" v-if="editFlag.PXRecordFlag">
							<div class="cancel-btn" @click="AddPXRecordCancel">取消</div>
							<div class="save-btn" @click="AddPXRecordSave">新增</div>
						</div>
		    		</div>  
		    	</div>
		    	<!-- 培训记录列表 -->
		    	<div class="train-box" id="PXRecord">
		    		<p class="title">培训记录</p>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th>培训时间</th>
		    					<th>培训地点</th>
		    					<th>培训项目</th>
		    					<th>培训成绩</th>
		    				</thead>
		    				<tbody id="PX-box">
		    					<tr v-for="each in detailPXRecord">
		    						<td>{{each.trainingDate}}</td>
		    						<td>{{each.place}}</td>
		    						<td>{{each.item}}</td>
		    						<td>{{each.grade}}</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
		    	<!-- 训练记录 -->
		    	<div class="train-box" id="trainRecord">
		    		<p class="title">训练记录</p>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th>训练时间</th>
		    					<th>训练项目</th>
		    					<th>训练成绩</th>
		    				</thead>
		    				<tbody>
		    					<tr v-for="item in detailTrainRecord">
		    						<td>{{item.trainTime}}</td>
		    						<td>{{item.projectName}}</td>
		    						<td>{{item.achievement}}</td>
		    					</tr>
		    				</tbody>
		    			</table>
		    		</div>
		    	</div>
		    	<!-- 处警记录 -->
		    	<div class="train-box" id="policeRecord">
		    		<p class="title">处警记录</p>
		    		<div class="list">
		    			<table>
		    				<thead>
		    					<th>处警时间</th>
		    					<th>处警类型</th>
		    					<th>处警地点</th>
		    					<th>随行车辆</th>
		    					<th>处警表现</th>
		    				</thead>
		    				<tbody>
		    					<tr v-for="item in detailPoliceRecord">
		    						<td>{{item.issueTime}}</td>
		    						<td>{{item.alarmModeVal}}</td>
		    						<td>{{item.addressOfFireUnit}}</td>
		    						<td>{{item.carName}}</td>
		    						<td>{{item.other}}</td>
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
	import {setCookie, getCookie} from '../../../assets/js/cookie.js'
    export default {
        name: "activeDetail",
        data(){
        	return{
        		userInfo:null,
        		birthDate:"",
        		navList:[
	                {
	                    name:'基本信息',
	                    id: 'baseInfo',
	                    act:true
	                },
	                {
	                    name:'身体数据',
	                    id: 'bodyData',
	                    act:false
	                },
	                {
	                    name:'个人信息',
	                    id: 'userInfo',
	                    act:false
	                },
	                // {
	                //     name:'任职记录',
	                //     id: 'positionRecord',
	                //     act:false
	                // },
	                {
	                    name:'培训记录',
	                    id: 'PXRecord',
	                    act:false
	                },
	                {
	                    name:'处警记录',
	                    id: 'policeRecord',
	                    act:false
	                },
	                {
	                    name:'训练记录',
	                    id: 'trainRecord',
	                    act:false
	                },
	            ],
	            trainPlaceVal:"",
        		trainPlaceList:[
        			{
			          	value: '培训地点1',
			          	label: '培训地点1'
			        }, 
			        {
			          	value: '培训地点2',
			          	label: '培训地点2'
			        }
        		],
        		trainProjectVal:"",
        		trainProjectList:[  // 培训项目
        			{
			          	value: '培训项目1',
			          	label: '培训项目1'
			        }, 
			        {
			          	value: '培训项目2',
			          	label: '培训项目2'
			        }
        		],
        		trainGradeList:[ // 培训成绩
        			{
			          	value: '培训成绩1',
			          	label: '培训成绩1'
			        }, 
			        {
			          	value: '培训成绩2',
			          	label: '培训成绩2'
			        }
        		],
        		trainGradeVal:"",
        		collegeList:[ // 是否大学生士兵
        			{
			          	value: '1',
			          	label: '是'
			        }, 
			        {
			          	value: '0',
			          	label: '否'
			        }
        		],  
        		collegeVal:"",
        		educationLevelList:[ // 文化程度
        			{
			          	value: '文化程度1',
			          	label: '文化程度1'
			        }, 
			        {
			          	value: '文化程度2',
			          	label: '文化程度2'
			        }
        		],
        		educationLevelVal:"",   
        		
        		maritalStatusList:[ // 婚姻状况
        			{
			          	value: '1',
			          	label: '已婚'
			        }, 
			        {
			          	value: '0',
			          	label: '未婚'
			        }
        		],
        		maritalStatusVal:"",
        		checked:true,
        		sexRadio:"1",
        		eduBeforeEnlishmentList:[ // 文化程度
        			{
			          	value: '高中',
			          	label: '高中'
			        }, 
			        {
			          	value: '大专',
			          	label: '大专'
			        },
			        {
			          	value: '本科',
			          	label: '本科'
			        },
			        {
			          	value: '硕士',
			          	label: '硕士'
			        },
			        {
			          	value: '博士',
			          	label: '博士'
			        }
        		],
        		departmentList:[],
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
        		editFlag:{
    				baseInfoFlag:false,
    				bodyDataFlag:false,
    				userInfoFlag:false,
    				PXRecordFlag:false,
    				policeRecord:false
    			},
    			userId:"",
    			roleList:[],
    			currentTime:"",
    			detailUserInfo:{}, // 详情信息----个人信息
    			detailTrainRecord:{}, // 详情信息----训练记录
    			detailPXRecord:[], // 详情信息----培训记录
    			detailPoliceRecord:[], // 详情信息----处警记录
    			detailPXEditData:{ // 培训记录编辑
    				trainingDate:"",
    				place:"",
    				item:"",
    				grade:"",
    			},
    			detailbaseInfo:{ // 详情信息----基本信息
    				groupName: ''
    			}, 
    			detailBodyData:{}, // 详情信息----身体数据
    			PXPage:1,
    			PXTotalPage:1,
    			file:null,
            	picUrlTem:'', // 上传临时展示
        	}
        },
        mounted(){
        	this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        	this.roleList = JSON.parse(window.localStorage.getItem("roleList"));
        	this.userInfo = JSON.parse(getCookie("userInfo"));
        	this.userId = this.$route.query.userId;
        	this.getDetailBaseInfo();
        	
        	window.scrollTo(0, 0); 
	        $(window).scroll(function() {
	            //为了保证兼容性，这里取两个值，哪个有值取哪一个
	            
	            var eleNav = $(".top-fixed-box-wrap");
	            var eleContent = $("#content");
	            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	            console.log("滚动距离" + scrollTop);
	            if(scrollTop > 0){
	                eleNav.css({"position": "fixed","top": '0',"zIndex": '99',"left": '0',"width": '100%'})
	                $('#baseInfo').css({"marginTop":"230px"})
	            }else{
	                eleNav.css({"position": "fixed","top": '100px',"zIndex": '99',"left": '0',"width": '100%'})
	                $('#baseInfo').css({"marginTop":"327px"})
	            }
	            
	            
	        })
        	
        },
        methods:{
        	AddPXRecordSave(){ // 新增培训记录
        		let info = this.detailPXEditData;
        		if(info.trainingDate == ''){
        			this.$message('请选择培训时间');
        		}else if(info.place == ''){
        			this.$message('请填写培训地点');
        		}else if(info.item == ''){
        			this.$message('请填写培训项目');
        		}else if(info.grade == ''){
        			this.$message('请填写培训成绩');
        		}else{
        			this.getCurrentTime();
        			this.$ajax.post(this.$dataSetUrl + '/apis/usertraining/setdata', qs.stringify({
						userId: this.detailbaseInfo.id,
		    			trainingDate: info.trainingDate,
		    			place: info.place,
		    			item: info.item,
		    			grade: info.grade,
		    			createTime: this.currentTime
		    		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		    			let data = res.data;
		    			if(data.code == 200){
		    				this.editFlag.PXRecordFlag = false;
		    				this.$message({
					          	message: '新增成功',
					          	type: 'success'
					        });
					        this.detailPXEditData = { // 培训记录编辑
			    				trainingDate:"",
			    				place:"",
			    				item:"",
			    				grade:"",
			    			}
			    			this.PXPage = 1;
			    			this.detailPXRecord = [];
					        this.getDetailPXRecord();
					        
		    			}
				    }).catch(function (error) {
				        console.log(error);
				    })
        		}
        	},
        	AddPXRecordCancel(){
        		this.editFlag.PXRecordFlag = false;
        		this.detailPXEditData = { // 培训记录编辑
    				trainingDate:"",
    				place:"",
    				item:"",
    				grade:"",
    			}
        	},
        	updateUserInfoSave(){ // 修改个人信息
        		let info = this.detailUserInfo; 
        		this.getCurrentTime();
        		if(!info.birthday || info.birthday == ''){
        			this.$message('请选择出生日期');
        		}else{
        			this.$ajax.post(this.$dataSetUrl + '/apis/userinfo/setdata', qs.stringify({
						userId: this.detailbaseInfo.id,
		    			nationality:'',
		    			birthday: info.birthday,
		    			dateOfEnlistment: this.currentTime,
		    			dateOfVocation: this.currentTime,
		    			vocationGrade: '',
		    			dateOfVocationGrade: this.currentTime,
		    			technical: info.technical,
		    			dateOfTechnical: info.dateOfTechnical,
		    			technicalGrade: info.technicalGrade,
		    			dateOfTechnicalGrade: info.dateOfTechnicalGrade,
		    			education: info.education,
		    			militaryLevel: info.militaryLevel,
		    			dateOfMilitary: info.dateOfMilitary,
		    			graduateFrom:info.graduateFrom,
		    			professional: info.professional,
		    			degree: info.degree,
		    			eduBeforeEnlishment: info.eduBeforeEnlishment,
		    			reasonHere: info.reasonHere,
		    			nation: info.nation,
		    			dateOfWork: info.dateOfWork,
		    			placeOfBirth: info.placeOfBirth,
		    			dateOfManager: info.dateOfManager,
		    			placeOfEnlistment: info.placeOfEnlistment,
		    			background: info.background,
		    			politicalAffiliation: info.politicalAffiliation,
		    			age: info.age,
		    			caucusTime: info.caucusTime,
		    			periodOfMilitary: info.periodOfMilitary,
		    			degreeOfEducation: info.degreeOfEducation,
		    			educationType: info.educationType,
		    			idCard: info.idCard,
		    			permanentAddress: info.permanentAddress,
		    			districtsAndCounties: info.districtsAndCounties,
		    			subordinateStreets: info.subordinateStreets,
		    			residentialDistrictsAndCounties: info.residentialDistrictsAndCounties,
		    			professionalPost: info.professionalPost,
		    			hiringTime: info.hiringTime,
		    			vocationalSkills: info.vocationalSkills,
		    			fireRescueRank: info.fireRescueRank,
		    			collegeStudent: info.collegeStudent,
		    			placeOfBeforeEnlishment: info.placeOfBeforeEnlishment,
		    			mritalStatus: info.mritalStatus,
		    			marriageTime: info.marriageTime,
		    			spouseRegistration: info.spouseRegistration,
		    			fertilitySituation: info.fertilitySituation,
		    			createUserId: this.userInfo.id,
		    			updateUserId: this.userInfo.id,	
		    		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
		    			let data = res.data;
		    			if(data.code == 200){
		    				this.editFlag.userInfoFlag = false;
		    				this.$message({
					          	message: '修改成功',
					          	type: 'success'
					        });
					        this.getDetailUserInfo();
					        
		    			}
				    }).catch(function (error) {
				        console.log(error);
				    })
        		}
        	},
        	updateUserInfoCancel(){
        		this.detailUserInfo = JSON.parse(window.sessionStorage.getItem("detailUserInfoTem"));
        		this.editFlag.userInfoFlag = false;
        	},
        	updateBodyDataSave(){ // 修改身体数据
        		let info = this.detailBodyData; 
        		this.getCurrentTime();
        		this.$ajax.post(this.$dataSetUrl + '/apis/userphysical/setdata', qs.stringify({
					userId: this.detailbaseInfo.id,
	    			height: info.height,
	    			headCircumference: info.headCircumference,
	    			hips: info.hips,
	    			waist: info.waist,
	    			bust: info.bust,
	    			footLength: info.footLength,
	    			neck: info.neck,
	    			plantarCircumference: info.plantarCircumference,
	    			createUserId: this.userInfo.id,
	    			updateUserId: this.userInfo.id,
	    			createTime: this.currentTime,
	    			updateTime: this.currentTime,
	    		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
	    			let data = res.data;
	    			if(data.code == 200){
	    				this.editFlag.bodyDataFlag = false;
	    				this.$message({
				          	message: '修改成功',
				          	type: 'success'
				        });
				        this.getDetailBodyData();
				        
	    			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	updateBodyDataCancel(){
        		this.detailBodyData = JSON.parse(window.sessionStorage.getItem("detailBodyDataTem"));
        		this.editFlag.bodyDataFlag = false;
        	},
        	updateBaseInfoSave(){ // 修改基本信息
        		let info = this.detailbaseInfo;
        		if(info.username == ''){
        			this.$message('请填写账号');
        		}else if(!info.password){
        			this.$message('请填写密码');
        		}else if(info.realName == ''){
        			this.$message('请填写姓名');
        		}else if(info.groupId == ''){
        			this.$message('请选择所属单位/部门');
        		}else if(info.roleId == ''){
        			this.$message('请选择职务');
        		}else if(info.type == ''){
        			this.$message('请选择人员类型');
        		}else{
        			if(this.telValidate(info.phone)){
        				let vm = this;
        				function ajaxCommon(){
        					vm.$ajax.post(vm.$dataSetUrl + '/apis/userbasic/updatedata', qs.stringify({
        						id: info.id,
			        			realName: info.realName,
			        			username: info.username,
			        			password: info.password,
			        			type: info.type,
			        			roleId: info.roleId,
			        			groupId: info.groupId,
			        			sex: info.sex,
			        			homeAddress: info.homeAddress,
			        			familyName: info.familyName,
			        			familyKinship: info.familyKinship,
			        			familyPhone: info.familyPhone,
			        			phone: info.phone,
			        			createUserId: vm.userInfo.id,
			        			updateUserId: vm.userInfo.id,
			        			delFlag: info.delFlag, // 是否停用(0可用;1停用)
			        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
			        			let data = res.data;
			        			if(data.code == 200){
			        				vm.editFlag.baseInfoFlag = false;
			        				vm.$message({
							          	message: '修改成功',
							          	type: 'success'
							        });
							        this.getDetailBaseInfo();
			        			}
						    }).catch(function (error) {
						        console.log(error);
						    })
        				}
        				if(info.familyPhone != ''){
        					if(this.telValidate(info.familyPhone)){
        						ajaxCommon();
        					}
        				}else{
        					ajaxCommon();
        				}
        			}
        		}
        	},
        	updateBaseInfoCancel(){
        		this.detailbaseInfo = JSON.parse(window.sessionStorage.getItem("detailbaseInfoTem"));
        		this.editFlag.baseInfoFlag = false;
        	},
        	getDetailBaseInfo(){ // 获取详情----基本信息
        		this.$ajax.post(this.$dataSetUrl + '/apis/userbasic/getdata', qs.stringify({
        			groupId:'',
        			userId: this.userId,
        			realName:'',
        			rowLength:10,
        			pageNum:1
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
        					this.roleList.map((val,i) =>{
        						if(item.roleId == val.id){
        							item.roleName = val.label;
        						}
        					})
        				})
        				this.detailbaseInfo = this.list.dataList[0];
        				this.getDetailUserInfo();
        				this.getDetailBodyData();
        				this.getDetailTrainRecord();
        				this.getDetailPXRecord();
        				this.getDetailPoliceRecord();
			        	let vm = this;
			        	this.$nextTick(() => {
			        		vm.paged(document.getElementById("PX-box"),vm.PXPage,function(){
				                vm.PXPage ++;
				                vm.getDetailPXRecord();
				            })
			        	})
        				window.sessionStorage.setItem("detailbaseInfoTem",JSON.stringify(this.detailbaseInfo));
        			}else{
        				this.list = [];
        			}
        			console.log(this.list);
			    }).catch(function (error) {c
			        console.log(error);
			    })
        	},
        	getDetailBodyData(){  // 获取详情----身体数据
        		this.$ajax.post(this.$dataSetUrl + '/apis/userphysical/getdata', qs.stringify({
        			userId: this.detailbaseInfo.id
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.detailBodyData = data.data[0][0];
        				window.sessionStorage.setItem("detailBodyDataTem",JSON.stringify(data.data[0][0]));
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getDetailUserInfo(){  // 获取详情----个人信息
        		this.$ajax.post(this.$dataSetUrl + '/apis/userinfo/getdata', qs.stringify({
        			userId: this.detailbaseInfo.id
        		}) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.detailUserInfo = data.data[0][0];
        				window.sessionStorage.setItem("detailUserInfoTem",JSON.stringify(data.data[0][0]));
        			}else{
        				window.sessionStorage.setItem("detailUserInfoTem",JSON.stringify({}));
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getDetailTrainRecord(){  // 获取详情----训练记录
        		this.$ajax.get(this.$dataSetUrlQ + '/xf-unit/user/getTrainRecord',{
                    params: {
                        userId: this.detailbaseInfo.id
                    }
                }).then((res) => {
        			let data = res.data;
        			console.log(data);
        			if(data.code == 200){
        				this.detailTrainRecord = data.data;
        			}else{
        				this.detailTrainRecord = [];
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getDetailPXRecord(){  // 获取详情----培训记录
        		this.$ajax.post(this.$dataSetUrl + '/apis/usertraining/getdata',qs.stringify({
        			userId: this.detailbaseInfo.id,
        			rowLength: 10,
        			pageNum: this.PXPage,
        		}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.detailPXRecord = this.detailPXRecord.concat(data.data[0].dataList);
        				this.PXTotalPage = data.data[0].totalPages;
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	getDetailPoliceRecord(){  // 获取详情----处警记录
        		this.$ajax.get(this.$dataSetUrlQ + '/xf-unit/user/getPoliceRecord',{
        			params:{
        				userId: this.detailbaseInfo.id
        			}
        		},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.detailPoliceRecord = data.data;
        				this.detailPoliceRecord.map((val,i) => {
        					if(val.alarmMode == 1){
        						val.alarmModeVal = '火警扑救';
        					}else if(val.alarmMode == 2){
        						val.alarmModeVal = '社会救助';
        					}else if(val.alarmMode == 3){
        						val.alarmModeVal = '抢险救援';
        					}else if(val.alarmMode == 4){
        						val.alarmModeVal = '反恐排爆';
        					}else{
        						val.alarmModeVal = '其他';
        					}
        				})
        			}else{
        				this.detailPoliceRecord = [];
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
        	},
        	picUpload(event){   //上传头像
	            this.file = event.target.files[0]; // (利用console.log输出看file文件对象)
	            const windowURL = window.URL || window.webkitURL;
	            if(this.file) {
	                 this.picUrlTem = windowURL.createObjectURL(this.file);
	            }
	            this.uploadHeaderImg();
	        },
	        uploadHeaderImg(){ // 上传头像
	        	let formdata = new FormData();
	            formdata.append('userId',this.userId);
	            formdata.append('photo',this.file);
	            this.$ajax.post(this.$dataSetUrl + '/apis/userinfo/uploadattachment', formdata ,{headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
        			let data = res.data;
        			if(data.code == 200){
        				this.$message("上传成功");
        				this.getDetailBaseInfo();
        			}else{
        				this.$message("上传失败");
        			}
			    }).catch(function (error) {
			        console.log(error);
			    })
	        }, 
        	paged(obj,page,callback){
        		let vm = this;
			    obj.onscroll = function(e){ 
			        var sum = this.scrollHeight; 
			        if (sum <= this.scrollTop + this.offsetHeight) {  
			        	console.log(page)
			        	console.log(vm.PXTotalPage)
			        	if(vm.PXPage <= vm.PXTotalPage){
			        		callback && callback(page);
			        	}
			        }  
			    }; 
			},
        	//前端验证手机号
			telValidate(phone){
			    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
			    if(phone==''){
			    	this.$message('手机号不能为空');
			        return false;
			    }else if( !myreg.test(phone) ){
			    	this.$message('请输入有效的手机号码');
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
	        },
        	navSwitch(index,_id){
	            // let id = '#' + _id;
	            // document.querySelector(id).scrollIntoView(true);
	            if(index == 0){
	            	window.scrollTo(0,0); 
	            }else if(index == 1){
	            	window.scrollTo(0,400); 
	            }else if(index == 2){
	            	window.scrollTo(0,700);
	            }else if(index == 3){
	            	window.scrollTo(0,1377);
	            }else if(index == 4){
	            	window.scrollTo(0,2103);
	            }else if(index == 5){
	            	window.scrollTo(0,1743);
	            }
	            this.navList.map((val,i) => {
	                if(i == index){
	                    val.act = true;
	                }else{
	                    val.act = false;
	                }
	            })
	        },
	        validateNumber(val,type) {
				if(type == 1){
					this.detailbaseInfo.phone = val.replace(/[^\d]/g, "");
				}else{
					this.detailbaseInfo.familyPhone = val.replace(/[^\d]/g, "");
				}
	        },
	        goBack(){
	        	this.$router.go(-1);
	        }
        }
    }
</script>


