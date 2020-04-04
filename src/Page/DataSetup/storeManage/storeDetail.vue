<template>
    <div class="storeDetail-wrap container-wrap" >
        <div class="back-btn flex" @click="goBack">
            <i class="iconfont icon-fanhui"></i>
            <span>返回</span>
        </div>
        <div class="content">
            <ul class="nav-list">
                <a href="javascript:;" :class="[item.act ? 'act' : '']" v-for="item,index in navList" @click="navSwitch(index,item.id)">{{item.name}}</a>
            </ul>
            <div class="line"></div>
            <!-- 性能 -->
            <a name="function" id="function">
                <div class="function-box clearfix">
                    <div class="title-common">
                        <span>性能参数</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="editFlag = true">
                            <i class="iconfont icon-bianji"></i>
                            编辑
                        </div>
                    </div>
                    <div class="box-con">
                        <div class="box clearfix flex">
                            <div class="img-box flex">
                                <img :src="picUrl" alt="">
                                <input type="file" accept="image/*" @change="picUpload">
                            </div>
                            <div class="inp-box clearfix" v-if="editFlag">
                                <div class="each clearfix">
                                    <span class="span">装备名</span>
                                    <div class="inp">
                                        <el-input v-model="initData.equitmentName" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">所属部门</span>
                                    <div class="inp">
                                        <el-select v-model="initData.department" placeholder="请选择" disabled>
                                            <el-option
                                              v-for="item in options"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value"
                                              :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">数量</span>
                                    <div class="inp">
                                        <el-input v-model="initData.number" placeholder="请输入..." maxlength="5"></el-input>
                                    </div>
                                </div>   
                                <div class="each clearfix">
                                    <span class="span">货架号</span>
                                    <div class="inp">
                                        <el-input v-model="initData.shelfNumber" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">品牌</span>
                                    <div class="inp">
                                        <el-input v-model="initData.brand" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">型号</span>
                                    <div class="inp">
                                        <el-input v-model="initData.model" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">备注</span>
                                    <div class="inp">
                                        <el-input v-model="initData.remark" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>

                            </div>
                            <div class="inp-box clearfix" v-else>
                                <div class="each clearfix">
                                    <span class="span">装备名</span>
                                    <div class="inp">{{initDataShow.equitmentName}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">所属部门</span>
                                    <div class="inp">{{initDataShow.department}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">数量</span>
                                    <div class="inp">{{initDataShow.number}}</div>
                                </div>   
                                <div class="each clearfix">
                                    <span class="span">货架号</span>
                                    <div class="inp">{{initDataShow.shelfNumber}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">品牌</span>
                                    <div class="inp">{{initDataShow.brand}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">型号</span>
                                    <div class="inp">{{initDataShow.model}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">备注</span>
                                    <div class="inp">{{initDataShow.remark}}</div>
                                </div>

                            </div>
                        </div>
                        <div class="btn-box-common flex" v-if="editFlag">
                            <div class="cancel-btn" @click="editFlag = false">取消</div>
                            <div class="save-btn" @click="editEquitment">确定</div>
                        </div>
                    </div>
                    
                </div>
            </a>
            <!-- 操作视频 -->
            <a name="operationVideo" id="operationVideo">
                <div class="operation-video-box">
                    <div class="title-common">
                        <span>操作视频</span>
                        <div class="line"></div>
                        <div class="edit-btn flex">
                            <i class="iconfont icon-bianji"></i>
                            <div class="file-btn">
                                点击上传
                                <input type="file" accept="video/*" @change="uploadOperationVideo">
                            </div>
                        </div>
                    </div>
                    <div class="video-box">
                        <p class="title">视频文件 （{{operationVideoList.length}}）</p>
                        <ul class="list">
                            <li class="clearfix" v-for="item in operationVideoList">
                                <img src="../../../assets/images/dataSet/video-icon.png" alt="">
                                <div class="text">
                                    <h3>操作视频.mp4</h3>
                                    <!-- <p class="p1">张三  上传于2020-02-10 10:30</p> -->
                                    <!-- <p class="p2">视频ID：</p> -->
                                </div>
                                <div class="btn-box">
                                    <div class="play-btn" @click="videoPlay(item)">播放</div>
                                    <div class="del-btn" @click="videoDel(item,1)">删除</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
            
            <!-- 维保视频 -->
            <a name="repairVideo" id="repairVideo">
                <div class="operation-video-box">
                    <div class="title-common">
                        <span>维保视频</span>
                        <div class="line"></div>
                        <div class="edit-btn flex">
                            <i class="iconfont icon-bianji"></i>
                            <div class="file-btn">
                                点击上传
                                <input type="file" accept="video/*" @change="uploadRepairVideo">
                            </div>
                        </div>
                    </div>
                    <div class="video-box">
                        <p class="title">视频文件 （{{repairVideoList.length}}）</p>
                        <ul class="list">
                            <li class="clearfix" v-for="item in repairVideoList" > 
                                <img src="../../../assets/images/dataSet/video-icon.png" alt="">
                                <div class="text">
                                    <h3>维保视频.mp4</h3>
                                </div>
                                <div class="btn-box">
                                   <div class="play-btn" @click="videoPlay(item)">播放</div>
                                    <div class="del-btn" @click="videoDel(item,2)">删除</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
            
            <!-- 维修记录 -->
            <a name="repairRecord" id="repairRecord">
                <div class="repair-record-box">
                    <div class="title-common">
                        <span>维修记录</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="addRepairRecordEvent">
                            <i class="iconfont icon-bianji"></i>
                            新增
                        </div>
                    </div>

                    <div class="filter-box clearfix">
                        <div class="inp-box">
                            <input type="text" placeholder="请输入关键字搜索" v-model="repairRecordSearchName">
                            <div class="img-box" @click="searchRepairRecord">
                                <img src="../../../assets/images/dataSet/search-icon.png" alt="">
                            </div>
                        </div>
                       <!--  <div class="filter-btn">
                            <img src="../../assets/images/filter-icon.png" alt="">
                            <span>筛选/排序</span>
                        </div> -->
                    </div>
                    <div class="list">
                        <ul class="title-list">
                            <li>维修单号</li>
                            <li>维修时间</li>
                            <li>维修内容</li>
                            <li>维修方式</li>
                            <li>费用</li>
                            <li>结算方式</li>
                            <li>维修单位</li>
                            <li>录入人</li>
                            <li>操作</li>
                        </ul>
                        <ul class="con-list">
                            <li class="each" v-for="item in repairRecordList">
                                <span>{{item.repairSn}}</span>
                                <span>{{item.repairTime}}</span>
                                <span>{{item.repairContent}}</span>
                                <span>{{item.repairType == 1 ? '上门维修' : '送修'}}</span>
                                <span>{{item.price}}</span>
                                <span>{{item.payWay}}</span>
                                <span>{{item.repairCompany}}</span>
                                <span>{{item.editUserName}}</span>
                                <span>
                                    <!-- <i>详情</i> -->
                                    <i @click='editRepairRecordEvent(item.id)'>编辑</i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
            
            <!-- 使用记录 -->
            <a name="useRecord" id="useRecord">
                <div class="repair-record-box use-record-box">
                    <div class="title-common">
                        <span>使用记录</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="addUseRecordEvent">
                            <i class="iconfont icon-bianji"></i>
                            新增
                        </div>
                    </div>
                    <div class="list">
                        <ul class="title-list">
                            <li>使用时间</li>
                            <li>使用人</li>
                            <li>出警类型</li>
                            <li>出警地址</li>
                            <li>录入人</li>
                            <li>操作</li>
                        </ul>
                        <ul class="con-list">
                            <li class="each" v-for="item in useRecordList">
                                <span>{{item.useTime}}</span>
                                <span>{{item.userId}}</span>
                                <span>{{item.useType}}</span>
                                <span>{{item.useAddress}}</span>
                                <span>{{item.editUserName}}</span>
                                <span>
                                    <!-- <i>详情</i> -->
                                    <i @click="editUseRecordEvent(item.id)">编辑</i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
            
        </div>
        <!-- 新增维修记录mask -->
        <div class="mask add-repair-mask" v-if="addRepairMask">
            <div class="main">
                <div class="title-box">
                    <p>{{repairRecordText}}</p>
                </div>
                <div class="box">
                    <div class="each clearfix">
                        <span class="span">维修单号</span>
                        <div class="inp">
                            <el-input v-model="addRepairData.repairNumber" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">维修时间</span>
                        <div class="inp">
                            <el-date-picker
                                v-model="addRepairData.repairTime"
                                type="date"
                                :editable="false"
                                :clearable="false"
                                placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">维修内容</span>
                        <div class="inp">
                            <el-input v-model="addRepairData.repairContent" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">维修方式</span>
                        <div class="inp">
                            <el-select v-model="addRepairData.repairStyle"  placeholder="一级分类" @change="getRepairStyleId($event)">
                                <el-option
                                  v-for="item in repairStyleList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">维修费用</span>
                        <div class="inp">
                            <el-input v-model="addRepairData.repairMoney" placeholder="请输入" @input="validateNumber(addRepairData.repairMoney)" type="text" maxlength="10"></el-input>
                        </div>  
                    </div>
                    <div class="each clearfix">
                        <span class="span">结算方式</span>
                        <div class="inp">
                            <el-input v-model="addRepairData.repairSettleStyle" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">维修单位</span>
                        <div class="inp">
                            <el-input v-model="addRepairData.repairDepartment" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                </div>   
                <div class="btn-box flex">
                    <div class="save" @click="addRepairRecord">保存</div>
                    <div class="cancel" @click="addRepairMask = false">取消</div>
                </div>
            </div>
        </div>
        <!-- 新增使用记录mask -->
        <div class="mask add-use-mask" v-if="addUseMask">
            <div class="main">
                <div class="title-box">
                    <p>{{useRecordText}}</p>
                </div>
                <div class="box">
                    <div class="each clearfix">
                        <span class="span">使用时间</span>
                        <div class="inp">
                            <el-date-picker
                                v-model="addUseData.useTime"
                                type="date"
                                :editable="false"
                                :clearable="false"
                                placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">使用人</span>
                        <div class="inp">
                            <el-input v-model="addUseData.usePerson" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">出警类型</span>
                        <div class="inp">
                            <el-input v-model="addUseData.policeType" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">出警地址</span>
                        <div class="inp">
                            <el-input v-model="addUseData.policeAddr" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                </div>   
                <div class="btn-box flex">
                    <div class="save" @click="addUseRecord">保存</div>
                    <div class="cancel" @click="addUseMask = false">取消</div>
                </div>
            </div>
        </div>
        <div class="mask video-mask" v-if="videoMask">
            <div class="main">
                <a href="javascript:;" class="close" @click="videoClose"></a>
                <video :src="videoUrl" controls="controls"></video>
            </div>
        </div>
        <div class="go-top-box" @click="goTop"></div>
    </div>
</template>

<script>
import {setCookie, getCookie} from '../../../assets/js/cookie.js'
export default {
    name: 'equipmentSetDetail',
    data () {
        return {
            navList:[
                {
                    name:'性能参数',
                    id: 'function',
                    act:true
                },
                {
                    name:'操作视频',
                    id: 'operationVideo',
                    act:false
                },
                {
                    name:'维保视频',
                    id: 'repairVideo',
                    act:false
                },
                {
                    name:'维修记录',
                    id: 'repairRecord',
                    act:false
                },
                {
                    name:'使用记录',
                    id: 'useRecord',
                    act:false
                },
            ],
            editFlag:false, // 性能参数是否在 编辑 状态
            addRepairMask:false,
            addUseMask:false,
            videoMask:false, // 视频播放弹层
            options: [],
            repairRecordList:[], // 维修记录
            useRecordList:[], // 使用记录
            repairStyleList:[
                {
                    value: '1',
                    label: '上门维修'
                }, {
                    value: '2',
                    label: '送修'
                },
            ],
            picUrl:require('../../../assets/images/dataSet/file-img.png'),
            picUrlTem:require('../../../assets/images/dataSet/file-img.png'), // 上传临时展示
            initData:{
                department:"", // 所属部门
                equitmentName:"", // 装备名
                number:"",
                shelfNumber:"",
                brand:"",
                model:"",
                remark:"",
            },
            initDataShow:{
                department:"暂无内容", // 所属部门
                equitmentName:"暂无内容",  // 非编辑状态展示
                number:"暂无内容",
                shelfNumber:"暂无内容",
                brand:"暂无内容",
                model:"暂无内容",
                remark:"暂无内容",
            },
            addRepairData:{
                repairNumber:"", // 维修单号
                repairContent:"",  // 维修内容
                repairStyle:"", // 维修方式
                repairMoney:"",
                repairSettleStyle:"", // 维修结算方式
                repairDepartment:"" ,
                repairTime: '',
                repairStyleId:1,//维修方式id
                id:'',
                add:true, // true:新增  false:编辑
            },
            addUseData:{ // 新增使用记录
                useTime:"" , // 新增使用记录 --- 使用时间
                usePerson:"", // 新增使用记录 --- 使用人
                policeAddr:"", // 新增使用记录 --- 出警地址
                policeType:"", // 新增使用记录 --- 出警类型
                id:"",
                add:true, // true:新增  false:编辑
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            storehouseId:"", // 仓库id
            deptCode:"", // 部门码
            deptName:"", // 部门名
            storehouseName:"", // 仓库名字
            equipmentTypeId:"", // 装备id
            deptList:[], // 部门列表
            operationVideoList:[], // 操作视频
            repairVideoList:[], // 维保视频
            initEquitmentInfo:null , // 初始化装备信息
            userInfo:null,
            file:null,
            videoUrl:"", // 视频播放地址
            type:"", // 是查看详情还是编辑详情
            origin:"", // 来源
            truckLocation:"",
            repairRecordSearchName:"", // 搜索维修记录
            currentTime:"",
            repairRecordText:'新增维修记录',
            useRecordText:"新增使用记录",
            departmentList:[], // 所属单位
        }
    },
    components:{

    },
    computed:{

    },
    created(){
            
    },
    mounted(){
        this.departmentList = JSON.parse(window.localStorage.getItem("departmentList"));
        this.storehouseId = this.$route.query.storehouseId;
        this.deptCode = this.$route.query.deptCode;
        this.storehouseName = this.$route.query.storehouseName;
        this.equipmentTypeId = this.$route.query.equipmentTypeId;
        this.type = this.$route.query.type;
        this.origin = this.$route.query.origin;
        this.truckLocation = this.$route.query.truckLocation;
        if(this.type == 'edit'){
            this.editFlag = true;
        }else{
            this.editFlag = false;
        }
        this.userInfo = JSON.parse(getCookie("userInfo"));
        this.init();
        
    },
    methods:{
        init(){ // 初始化仓库信息
            let vm = this;
            let initDataShow = vm.initDataShow;
            let initData = vm.initData;
            vm.repairVideoList = [];
            vm.operationVideoList = [];
            tool.getdata(apiPath.equipmentDetail,'get',{
                storehouseId: vm.storehouseId,
                deptCode: vm.deptCode,
                equipmentTypeId: vm.equipmentTypeId
            },function(data){
                if(data.status == 200){
                    let _data = data.data;

                    vm.initEquitmentInfo = _data;
                    initDataShow.department = vm.deptName;
                    initDataShow.equitmentName = _data.equipmentName;
                    initDataShow.number = _data.eqCount;
                    initDataShow.shelfNumber = _data.shelvescode;
                    initDataShow.brand = _data.bland;
                    initDataShow.model = _data.model;
                    initDataShow.remark = _data.remark;

                    initData.department = vm.deptName;
                    initData.equitmentName = _data.equipmentName;
                    initData.number = _data.eqCount;
                    initData.shelfNumber = _data.shelvescode;
                    initData.brand = _data.bland;
                    initData.model = _data.model;
                    initData.remark = _data.remark;
                    if(_data.imgUrl != ''){
                        vm.picUrl =  vm.$dataSetUrlY  + _data.imgUrl.split(';')[0];
                    }
                    let list = _data.useVedioUrl.split(";");
                    list.map((val,i) => {
                        if(val != ''){
                            vm.operationVideoList.push(val);
                        }
                    })
                    let list1 =  _data.repairVedioUrl.split(";");
                    list1.map((val,i) => {
                        if(val != ''){
                            vm.repairVideoList.push(val);
                        }
                    })


                    vm.getRepairRecordList('');
                    vm.getDept();
                    vm.getUseRecordList();
                }
            },false)
        },
        addRepairRecordEvent(){ // 新增维修记录 按钮弹层
            this.repairRecordText = '新增维修记录';
            this.addRepairMask = true;
            this.addRepairData.add = true;
            this.addRepairData = {
                repairNumber:"", // 维修单号
                repairContent:"",  // 维修内容
                repairStyle:"", // 维修方式
                repairMoney:"",
                repairSettleStyle:"", // 维修结算方式
                repairDepartment:"" ,
                repairTime: '',
                repairStyleId:1,//维修方式id
                id:'',
                add:true, // true:新增  false:编辑
            }
        },
        editRepairRecordEvent(id){ // 编辑维修记录 按钮弹层
            this.repairRecordText = '编辑维修记录';
            this.addRepairData.id = id;
            this.addRepairMask = true;
            this.addRepairData.add = false;
            this.repairRecordList.map((val,i) => {
                if(val.id == id){
                    this.addRepairData.repairNumber = val.repairSn;
                    this.addRepairData.repairTime = val.repairTime;
                    this.addRepairData.repairContent = val.repairContent;
                    if(val.repairType == 1){
                        this.addRepairData.repairStyle = '上门维修';
                    }else{
                        this.addRepairData.repairStyle = '送修';
                    }
                    this.addRepairData.repairMoney = val.price;
                    this.addRepairData.repairSettleStyle = val.payWay;
                    this.addRepairData.repairDepartment = val.repairCompany;
                }
            })
            
        },
        addRepairRecord(){ // 新增维修记录 || 编辑维修记录
            let vm = this;
            if(vm.addRepairData.add == true){ // 新增
                if(vm.addRepairData.repairNumber == ''){
                    tool.toast('请填写维修单号');
                }else if(vm.addRepairData.repairTime == ''){
                     tool.toast('请选择维修时间');
                }else if(vm.addRepairData.repairContent == ''){
                     tool.toast('请填写维修内容');
                }else if(vm.addRepairData.repairStyle == ''){
                     tool.toast('请选择维修方式');
                }else if(vm.addRepairData.repairMoney == ''){
                     tool.toast('请填写维修费用');
                }else if(vm.addRepairData.repairSettleStyle == ''){
                     tool.toast('请填写结算方式');
                }else if(vm.addRepairData.repairDepartment == ''){
                     tool.toast('请填写维修单位');
                }else{
                    if(vm.addRepairData.repairDepartment.length > 50){
                        tool.toast('维修单位输入的字符不能超过50位，请重新输入');
                    }else{
                        if(vm.addRepairData.repairTime == '' || vm.addRepairData.repairTime == null){
                            tool.toast('请选择维修时间');
                        }else{
                            tool.getdata(apiPath.addEquipmentRepairRecord,'post',{
                                storehouseId: vm.initEquitmentInfo.storehouseId,
                                deptCode: vm.initEquitmentInfo.deptCode,
                                equipmentTypeId: vm.initEquitmentInfo.id,
                                repairSn: vm.addRepairData.repairNumber,
                                repairTime: vm.addRepairData.repairTime + ' ' + '00:00:00',
                                repairContent: vm.addRepairData.repairContent,
                                repairType: vm.addRepairData.repairStyleId,
                                price: vm.addRepairData.repairMoney,
                                payWay: vm.addRepairData.repairSettleStyle,
                                repairCompany: vm.addRepairData.repairDepartment,
                                editUserId: vm.userInfo.id
                            },function(data){
                                if(data.status == 200){
                                    tool.toast('新增成功');
                                    vm.addRepairMask = false;
                                    vm.getRepairRecordList('');
                                }
                            },true)
                        }
                    }
                    
                }
            }else{ // 编辑
                if(vm.addRepairData.repairNumber == ''){
                    tool.toast('请填写维修单号');
                }else if(vm.addRepairData.repairTime == ''){
                     tool.toast('请选择维修时间');
                }else if(vm.addRepairData.repairContent == ''){
                     tool.toast('请填写维修内容');
                }else if(vm.addRepairData.repairStyle == ''){
                     tool.toast('请选择维修方式');
                }else if(vm.addRepairData.repairMoney == ''){
                     tool.toast('请填写维修费用');
                }else if(vm.addRepairData.repairSettleStyle == ''){
                     tool.toast('请填写结算方式');
                }else if(vm.addRepairData.repairDepartment == ''){
                     tool.toast('请填写维修单位');
                }else{
                    if(vm.addRepairData.repairDepartment.length > 50){
                        tool.toast('维修单位输入的字符不能超过50位，请重新输入');
                    }else{
                        if(vm.addRepairData.repairTime == '' || vm.addRepairData.repairTime == null){
                            tool.toast('请选择维修时间');
                        }else{
                            tool.getdata(apiPath.updateEquipmentRepairRecord,'post',{
                                id:vm.addRepairData.id,
                                repairSn: vm.addRepairData.repairNumber,
                                repairTime: vm.addRepairData.repairTime ,
                                repairContent: vm.addRepairData.repairContent,
                                repairType: vm.addRepairData.repairStyleId,
                                price: vm.addRepairData.repairMoney,
                                payWay: vm.addRepairData.repairSettleStyle,
                                repairCompany: vm.addRepairData.repairDepartment,
                                editUserId: vm.userInfo.id
                            },function(data){
                                if(data.status == 200){
                                    vm.addRepairMask = false;
                                    vm.getRepairRecordList('');
                                    tool.toast('修改成功');
                                }
                            },true)
                        }
                        
                    }   
                }
            }
            
        },
        getRepairRecordList(searchSpace){ // 获取维修记录列表
            let vm = this;
            tool.getdata(apiPath.getEquipmentRepairRecordList,'get',{
                storehouseId: vm.initEquitmentInfo.storehouseId,
                deptCode: vm.initEquitmentInfo.deptCode,
                equipmentTypeId: vm.initEquitmentInfo.id,
                searchSpace:searchSpace , // 搜索框值
            },function(data){
                if(data.status == 200){
                    vm.repairRecordList = data.data;
                }else{
                    vm.repairRecordList = [];
                }
            },false)
        }, 
        getUseRecordList(){ // 获取使用记录列表
            let vm = this;
            tool.getdata(apiPath.getEquipmentUseRecordList,'get',{
                storehouseId: vm.initEquitmentInfo.storehouseId,
                deptCode: vm.initEquitmentInfo.deptCode,
                equipmentTypeId: vm.initEquitmentInfo.id,
            },function(data){
                if(data.status == 200){
                    vm.useRecordList = data.data;
                }
            },false)
        }, 
        addUseRecordEvent(){ // 新增维修记录 按钮弹层
            this.useRecordText = "新增使用记录";
            this.addUseMask = true;
            this.addUseData.add = true;
            this.addUseData = { // 新增使用记录
                useTime:"" , // 新增使用记录 --- 使用时间
                usePerson:"", // 新增使用记录 --- 使用人
                policeAddr:"", // 新增使用记录 --- 出警地址
                policeType:"", // 新增使用记录 --- 出警类型
                id:"",
                add:true, // true:新增  false:编辑
            }
        },
        editUseRecordEvent(id){ // 编辑使用记录 按钮弹层
            this.useRecordText = "编辑使用记录";
            this.addUseData.id = id;
            this.addUseMask = true;
            this.addUseData.add = false;
            this.useRecordList.map((val,i) => {
                if(val.id == id){
                    this.addUseData.useTime = val.useTime;
                    this.addUseData.usePerson = val.userId;
                    this.addUseData.policeAddr = val.useAddress;
                    this.addUseData.policeType = val.useType;
                }
            })
        },
        addUseRecord(){ // 新增使用记录 || 编辑
            let vm = this;
            if(vm.addUseData.add == true){ // 新增
                if(vm.addUseData.useTime == ''){
                    tool.toast('请选择使用时间');
                }else if(vm.addUseData.usePerson == ''){
                     tool.toast('请填写使用人');
                }else if(vm.addUseData.policeType == ''){
                     tool.toast('请选择出警类型');
                }else if(vm.addUseData.policeAddr == ''){
                     tool.toast('请填写出警地址');
                }else{
                    if(vm.addUseData.useTime == '' || vm.addUseData.useTime == null){
                        tool.toast('请选择使用时间');
                    }else{
                        tool.getdata(apiPath.addEquipmentUseRecord,'post',{
                            storehouseId: vm.initEquitmentInfo.storehouseId,
                            deptCode: vm.initEquitmentInfo.deptCode,
                            equipmentTypeId: vm.initEquitmentInfo.id,
                            userId:vm.addUseData.usePerson,
                            useTime: vm.addUseData.useTime + ' ' + '00:00:00',
                            useAddress: vm.addUseData.policeAddr,
                            useType: vm.addUseData.policeType,
                            editUserId: vm.userInfo.id
                        },function(data){
                            if(data.status == 200){
                                vm.addUseMask = false;
                                vm.getUseRecordList();
                                tool.toast('新增成功');
                            }
                        },true)
                    }
                    
                }
            }else{ // 编辑
                if(vm.addUseData.useTime == ''){
                    tool.toast('请选择使用时间');
                }else if(vm.addUseData.usePerson == ''){
                     tool.toast('请填写使用人');
                }else if(vm.addUseData.policeType == ''){
                     tool.toast('请选择出警类型');
                }else if(vm.addUseData.policeAddr == ''){
                     tool.toast('请填写出警地址');
                }else{
                    if(vm.addUseData.useTime == '' || vm.addUseData.useTime == null){
                        tool.toast('请选择使用时间');
                    }else{
                        tool.getdata(apiPath.updateEquipmentUseRecord,'post',{
                            id: vm.addUseData.id,
                            userId:vm.addUseData.usePerson,
                            useTime: vm.addUseData.useTime,
                            useAddress: vm.addUseData.policeAddr,
                            useType: vm.addUseData.policeType,
                            editUserId: vm.userInfo.id
                        },function(data){
                            if(data.status == 200){
                                vm.addUseMask = false;
                                vm.getUseRecordList();
                                tool.toast('编辑成功');
                            }
                        },true)
                    }
                    
                }
                
            }
            
        },
        uploadEquipmentImg(){ // 上传装备图片
            let vm = this;
            let formdata = new FormData();
            formdata.append('storehouseId',vm.initEquitmentInfo.storehouseId);
            formdata.append('deptCode',vm.initEquitmentInfo.deptCode);
            formdata.append('equipmentTypeId',vm.initEquitmentInfo.id);
            formdata.append('file1',vm.file);
            tool.getdata(apiPath.uploadEquipmentImg,'post',formdata,function(data){
                if(data.status == 200){
                    vm.init();
                    tool.toast('上传成功');
                }
            },true,false,false)
        },      
        editEquitment(){ // 编辑装备
            let vm = this;
            let initData = vm.initData; 
            if(vm.initData.number == ''){
                tool.toast('数量不能为空');
            }else{
                if(vm.initData.number > 10000){
                    tool.toast('数量不能超过10000');
                }else{
                    tool.getdata(apiPath.editeEquipmentDetail,'post',{
                        thirdTypeId: vm.initEquitmentInfo.thirdTypeId,
                        storehouseId: vm.initEquitmentInfo.storehouseId,
                        deptCode: vm.initEquitmentInfo.deptCode,
                        eqCount: initData.number,
                        equipmentTypeId: vm.initEquitmentInfo.id,
                        equipmentName: initData.equitmentName,
                        bland: initData.brand,
                        userId: vm.userInfo.id,
                        model: initData.model,
                        shelvesCode: initData.shelfNumber,
                        remark: initData.remark,
                        truckLocation:vm.truckLocation
                    },function(data){
                        if(data.status == 200){
                            vm.equipmentTypeId = data.data.equipmentTypeId;
                            vm.storehouseId = data.data.storehouseId;
                            vm.init();
                            vm.editFlag = false;
                            tool.toast('保存成功');
                            vm.$router.replace({path:'/storeManage/storeDetail',query:{storehouseId:vm.storehouseId,deptCode:vm.deptCode,equipmentTypeId:vm.equipmentTypeId,storehouseName:vm.storehouseName,type:vm.type,origin:vm.origin,truckLocation:vm.truckLocation}});
                        }
                    },true)
                }
            }
        },
        picUpload(event){   //上传图片
            this.file = event.target.files[0]; // (利用console.log输出看file文件对象)
            console.log(this.file);
            const windowURL = window.URL || window.webkitURL;
            if(this.file) {
                 this.picUrlTem = windowURL.createObjectURL(this.file);
             }
             this.uploadEquipmentImg();
        },
        uploadRepairVideo(event){ // 上传维修视频
            let vm = this;
            vm.file = event.target.files[0]; // (利用console.log输出看file文件对象)
            let formdata = new FormData();
            formdata.append('storehouseId',vm.initEquitmentInfo.storehouseId);
            formdata.append('deptCode',vm.initEquitmentInfo.deptCode);
            formdata.append('equipmentTypeId',vm.initEquitmentInfo.id);
            formdata.append('file1',vm.file);
            if(vm.file.size > 102400000){
                tool.toast('视频过大~')
            }else{
                tool.getdata(apiPath.uploadEquipmentRepairVedio,'post',formdata,function(data){
                    if(data.status == 200){
                        vm.init();
                        tool.toast('上传成功');
                    }
                },true,false,false)
            }
        },
        uploadOperationVideo(){ // 上传操作视频
            let vm = this;
            vm.file = event.target.files[0]; // (利用console.log输出看file文件对象)
            let formdata = new FormData();
            formdata.append('storehouseId',vm.initEquitmentInfo.storehouseId);
            formdata.append('deptCode',vm.initEquitmentInfo.deptCode);
            formdata.append('equipmentTypeId',vm.initEquitmentInfo.id);
            formdata.append('file1',vm.file);
            if(vm.file.size > 102400000){
                tool.toast('视频过大~')
            }else{
                tool.getdata(apiPath.uploadEquipmentUseVedio,'post',formdata,function(data){
                    if(data.status == 200){
                        vm.init();
                        tool.toast('上传成功');
                    }
                },true,false,false)
            }
        },
        getDept(){ // 获取部门  
            let vm = this;
            vm.departmentList.map((val,i) => {
                if(val.groupId == vm.deptCode){
                    vm.deptName = val.groupName;
                    vm.initDataShow.department = vm.deptName;
                    vm.initData.department = vm.deptName;
                }
            })
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
            this.currentTime = hour + ':' + minute + second; 
        },
        searchRepairRecord(){
            this.getRepairRecordList(this.repairRecordSearchName);
        },
        videoPlay(url){
            this.videoUrl = this.$dataSetUrlY + url;
            this.videoMask = true;
            this.$nextTick(function(){
                $(".video-mask video")[0].play();
            })
        },
        videoDel(url,type){ // 视频删除
            let vm = this;
            tool.getdata(apiPath.deleteEquipmentVedio,'post',{
                path: url,
                type: type, // 1--操作视频  2--维保视频
                storehouseId: vm.initEquitmentInfo.storehouseId,
                deptCode: vm.initEquitmentInfo.deptCode,
                equipmentTypeId: vm.initEquitmentInfo.id
            },function(data){
                if(data.status == 200){
                    tool.toast('删除成功');
                    vm.init();
                }
            },true)
        },
        videoClose(){
            this.videoMask = false;
        },
        getRepairStyleId(event){ // 获取维修方式id
            this.addRepairData.repairStyleId = event;
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
            if(this.origin == undefined){
                this.$router.push({path:'/storeManage/detail',query:{storehouseName:this.storehouseName,deptCode:this.deptCode,storehouseId:this.storehouseId}});
            }else{
                this.$router.push({path:'/storeManage/carDetail',query:{"storehouseName":this.storehouseName,deptCode:this.deptCode,storehouseId:this.storehouseId}})
            }
            
        },
        validateNumber(val) {
            this.addRepairData.repairMoney = val.replace(/[^\d.]/g, "");
        },
        goTop(){
            window.scrollTo(0, 0); 
        }
    }
}
</script>

