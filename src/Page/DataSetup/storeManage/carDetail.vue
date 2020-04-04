<template>
    <div class="carDetail-wrap container-wrap" >
        <div class="back-btn flex" @click="goBack">
            <i class="iconfont icon-fanhui"></i>
            <span>返回</span>
        </div>
        <div class="content" id="content">
            <ul class="nav-list" id="nav-list">
                <a href="javascript:;" :class="[item.act ? 'act' : '']" v-for="item,index in navList" @click="navSwitch(index,item.id)">{{item.name}}</a>
            </ul>
            <div class="line"></div>
            <!-- 基础信息 -->
            <a name="baseInfo" id="baseInfo">
                <div class="base-box clearfix">
                    <div class="title-common">
                        <span>基础信息</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="editFlag = true">
                            <i class="iconfont icon-bianji"></i>
                            编辑
                        </div>
                    </div>
                    <div class="box-con">
                        <div class="box clearfix flex">
                            <div class="inp-box clearfix" v-if="editFlag">
                                <div class="each clearfix">
                                    <span class="span">牌照号</span>
                                    <div class="inp">
                                        <el-input v-model="initData.licenseNumber" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">原号牌</span>
                                    <div class="inp">
                                        <el-input v-model="initData.originLicenseNumber" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">车型</span>
                                    <div class="inp">
                                        <el-input v-model="initData.carModel" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">排量</span>
                                    <div class="inp">
                                        <el-input v-model="initData.outputVolume" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">采购价</span>
                                    <div class="inp">
                                        <el-input v-model="initData.price" placeholder="请输入..." @input="validateNumber(initData.price,4)" type="text" maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">装备时间</span>
                                    <div class="inp">
                                        <el-date-picker
                                            v-model="initData.time"
                                            :editable="false"
                                            :clearable="false"
                                            type="date"
                                            placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">车架号</span>
                                    <div class="inp">
                                        <el-input v-model="initData.vinNo" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">发动机号</span>
                                    <div class="inp">
                                        <el-input v-model="initData.engineNo" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">行车记录仪情况</span>
                                    <div class="inp">
                                        <el-input v-model="initData.ConditionTachograph" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">保险情况</span>
                                    <div class="inp">
                                        <el-input v-model="initData.InsuranceSituation" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">车辆状态</span>
                                    <div class="inp">
                                        <el-input v-model="initData.carState" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">资产归属</span>
                                    <div class="inp">
                                        <el-input v-model="initData.attributionAssets" placeholder="请输入..." maxlength="100"></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="inp-box clearfix" v-else>
                                <div class="each clearfix">
                                    <span class="span">牌照号</span>
                                    <div class="inp">{{initDataShow.licenseNumber}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">原号牌</span>
                                    <div class="inp">{{initDataShow.originLicenseNumber}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">车型</span>
                                    <div class="inp">{{initDataShow.carModel}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">排量</span>
                                    <div class="inp">{{initDataShow.outputVolume}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">采购价</span>
                                    <div class="inp">{{initDataShow.price}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">装备时间</span>
                                    <div class="inp">{{initDataShow.time}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">车架号</span>
                                    <div class="inp">{{initDataShow.vinNo}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">发动机号</span>
                                    <div class="inp">{{initDataShow.engineNo}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">行车记录仪情况</span>
                                    <div class="inp">{{initDataShow.ConditionTachograph}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">保险情况</span>
                                    <div class="inp">{{initDataShow.InsuranceSituation}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">车辆状态</span>
                                    <div class="inp">{{initDataShow.carState}}</div>
                                </div>
                                <div class="each clearfix">
                                    <span class="span">资产归属</span>
                                    <div class="inp">{{initDataShow.attributionAssets}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="btn-box-common flex" v-if="editFlag">
                            <div class="cancel-btn" @click="modifyCarCancel">取消</div>
                            <div class="save-btn" @click="modifyCarSave">确定</div>
                        </div>
                    </div>
                </div>
            </a>
            
            <!-- 车厢车顶 -->
            <a name="carTop" id="carTop">
                <div class="carTopBottom-box clearfix">
                    <div class="title-common">
                        <span>车厢车顶</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="enterEquitmentMask = true">
                           <i class="iconfont icon-bianji"></i>
                            新增
                        </div>
                    </div>
                    <div class="box clearfix">
                        <div class="img-box">
                            <img src="../../../assets/images/dataSet/car-left-img.png" alt="">
                        </div>
                        <div class="list-con">
                            <div class="list">
                                <ul class="title-list">
                                    <li>所在位置</li>
                                    <li>装备名</li>
                                    <li>所属分类</li>
                                    <li>品牌</li>
                                    <li>数量</li>
                                    <li>操作</li>
                                </ul>
                                <ul class="con-list">
                                    <li class="each" v-for="item in carLeftList.list">
                                        <span>{{item.truckLocation}}</span>
                                        <span>{{item.equipmentName}}</span>
                                        <span>{{item.relationName}}</span>
                                        <span>{{item.bland}}</span>
                                        <span>{{item.eqCount}}</span>
                                        <span>
                                            <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'',item.truckLocation)">详情</i>
                                            <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'edit',item.truckLocation)">编辑</i>
                                        </span>
                                    </li>
                                </ul>

                            </div>
                            <pagination :pageNum="carLeftList.pages" @changePage="getPageLeftCar($event)"></pagination>
                        </div>
                    </div>
                    <div class="box clearfix">
                        <div class="img-box">
                            <img src="../../../assets/images/dataSet/car-right-img.png" alt="">
                        </div>
                        <div class="list-con">
                            <div class="list">
                                <ul class="title-list">
                                    <li>所在位置</li>
                                    <li>装备名</li>
                                    <li>所属分类</li>
                                    <li>品牌</li>
                                    <li>数量</li>
                                    <li>操作</li>
                                </ul>
                                <ul class="con-list">
                                    <li class="each" v-for="item in carRightList.list">
                                        <span>{{item.truckLocation}}</span>
                                        <span>{{item.equipmentName}}</span>
                                        <span>{{item.relationName}}</span>
                                        <span>{{item.bland}}</span>
                                        <span>{{item.eqCount}}</span>
                                        <span>
                                            <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'',item.truckLocation)">详情</i>
                                            <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'edit',item.truckLocation)">编辑</i>
                                        </span>
                                    </li>
                                </ul>

                            </div>
                            <pagination :pageNum="carRightList.pages" @changePage="getPageRightCar($event)"></pagination>
                        </div>
                    </div>
                    <div class="box clearfix">
                        <div class="img-box">
                            <img src="../../../assets/images/dataSet/car-top-img.png" alt="">
                        </div>
                        <div class="list-con">
                            <div class="list">
                                <ul class="title-list">
                                    <li>所在位置</li>
                                    <li>装备名</li>
                                    <li>所属分类</li>
                                    <li>品牌</li>
                                    <li>数量</li>
                                    <li>操作</li>
                                </ul>
                                <ul class="con-list">
                                    <li class="each" v-for="item in carTopList.list">
                                        <span>{{item.truckLocation}}</span>
                                        <span>{{item.equipmentName}}</span>
                                        <span>{{item.relationName}}</span>
                                        <span>{{item.bland}}</span>
                                        <span>{{item.eqCount}}</span>
                                        <span>
                                            <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'',item.truckLocation)">详情</i>
                                            <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'edit',item.truckLocation)">编辑</i>
                                        </span>
                                    </li>
                                </ul>

                            </div>
                            <pagination :pageNum="carTopList.pages" @changePage="getPageTopCar($event)"></pagination>
                        </div>
                    </div>
                </div>
            </a>
            
            <!-- 其他随车装备 -->
            <a name="otherCar" id="otherCar">
                <div class="other-car-box">
                    <div class="title-common">
                        <span>其他随车装备</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="enterEquitmentOtherMask = true">
                            <i class="iconfont icon-bianji"></i>
                            新增
                        </div>
                    </div>
                    <div class="filter-box clearfix">
                        <div class="inp-box">
                            <input type="text" placeholder="请输入关键字搜索" v-model="searchName">
                            <div class="img-box" @click="searchEquipment">
                                <img src="../../../assets/images/dataSet/search-icon.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <ul class="title-list">
                            <li>装备名</li>
                            <li>所属分类</li>
                            <li>品牌</li>
                            <li>数量</li>
                            <li>所在位置</li>
                            <li>录入人</li>
                            <li>录入时间</li>
                            <li>操作</li>
                        </ul>
                        <ul class="con-list">
                            <li class="each" v-for="item in carOtherList.list">
                                <span>{{item.equipmentName}}</span>
                                <span>{{item.relationName}}</span>
                                <span>{{item.bland}}</span>
                                <span>{{item.eqCount}}</span>
                                <span>{{item.truckLocation}}</span>
                                <span>{{item.editUserId}}</span>
                                <span>{{item.storegeTime}}</span>
                                <span>
                                    <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'',item.truckLocation)">详情</i>
                                    <i @click="goEquitDetail(item.storehouseId,item.equipmentTypeId,'edit',item.truckLocation)">编辑</i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <pagination :pageNum="carOtherList.pages" @changePage="getPageOtherCar($event)"></pagination>
                </div>
            </a>
            
            <!-- 检查记录 -->
            <a name="checkRecord" id="checkRecord">
                <div class="check-record-box">
                    <div class="title-common">
                        <span>检查记录</span>
                        <div class="line"></div>
                        <div class="edit-btn flex" @click="addCheckRecordEvent">
                            <i class="iconfont icon-bianji"></i>
                            新增
                        </div>
                    </div>
                    <div class="filter-box clearfix">
                        <div class="inp-box">
                            <input type="text" placeholder="请输入关键字搜索" v-model="checkRecordSearchName">
                            <div class="img-box" @click="searchCheckRecord">
                                <img src="../../../assets/images/dataSet/search-icon.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="list">
                        <ul class="title-list">
                            <li>检查时间</li>
                            <li>检查内容</li>
                            <li>备注</li>
                            <li>检查人</li>
                            <li>录入时间</li>
                            <li>操作</li>
                        </ul>
                        <ul class="con-list">
                            <li class="each" v-for="item in checkRecordList">
                                <span>{{item.checkTime}}</span>
                                <span>{{item.checkContent}}</span>
                                <span>{{item.remark}}</span>
                                <span>{{item.editUserName}}</span>
                                <span>{{item.createTime}}</span>
                                <span>
                                    <!-- <i>详情</i> -->
                                    <i @click="editCheckRecordEvent(item.id)">编辑</i>
                                </span>
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
                            <li>录入时间</li>
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
                                <span>{{item.createTime}}</span>
                                <span>
                                    <!-- <i>详情</i> -->
                                    <i  @click='editRepairRecordEvent(item.id)'>编辑</i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
            
        </div>
        <!-- 录入装备 mask -->
        <div class="mask enterEquitment-mask" v-if="enterEquitmentMask">
            <div class="main">
                <div class="title-box clearfix">
                    <p>录入装备</p>
                </div>
                <div class="box">
                    <div class="each clearfix">
                        <span class="span">装备名</span>
                        <div class="inp">
                            <el-input v-model="enterEquitment.name" placeholder="请输入" @change="enterEquitmentInput(1)" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix type">
                        <span class="span">所属分类</span>
                        <div class="inp">
                            <el-select v-model="equipmentValFirst" placeholder="一级分类" @change="equipmentTypeSelect($event,2,1)">
                                <el-option
                                  v-for="item in equipmentTypeFirst"
                                  :key="item.id"
                                  :label="item.equipmentTypeName"
                                  :value="item.id"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-select v-model="equipmentValTwo" placeholder="二级分类" @change="equipmentTypeSelect($event,3,1)">
                                <el-option
                                  v-for="item in equipmentTypeTwo"
                                  :key="item.id"
                                  :label="item.equipmentTypeName"
                                  :value="item.id"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-select v-model="equipmentValThree" placeholder="三级分类" @change="equipmentTypeSelect($event,4,1)">
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
                            <el-input v-model="enterEquitment.number" placeholder="请输入" type="text" @input="validateNumber(enterEquitment.number,1)" maxlength="5"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">所在位置</span>
                        <div class="inp">
                            <el-select v-model="enterEquitment.position" placeholder="请选择">
                                <el-option
                                  v-for="item in positionList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex">
                    <div class="save" @click="equitmentSave(1)">保存</div>
                    <div class="cancel" @click="equitmentCancel(1)">取消</div>
                </div>
            </div>
        </div>
        <!-- 录入其他随车装备 mask -->
        <div class="mask enterEquitment-mask" v-if="enterEquitmentOtherMask">
            <div class="main">
                <div class="title-box clearfix">
                    <p>录入其他随车装备</p>
                </div>
                <div class="box">
                    <div class="each clearfix">
                        <span class="span">装备名</span>
                        <div class="inp">
                            <el-input v-model="enterEquitmentOther.name" placeholder="请输入" @change="enterEquitmentInput(2)" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix type">
                        <span class="span">所属分类</span>
                        <div class="inp">
                            <el-select v-model="equipmentOtherValFirst" placeholder="一级分类" @change="equipmentTypeSelect($event,2,2)">
                                <el-option
                                  v-for="item in equipmentTypeOtherFirst"
                                  :key="item.id"
                                  :label="item.equipmentTypeName"
                                  :value="item.id"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-select v-model="equipmentOtherValTwo" placeholder="二级分类" @change="equipmentTypeSelect($event,3,2)">
                                <el-option
                                  v-for="item in equipmentTypeOtherTwo"
                                  :key="item.id"
                                  :label="item.equipmentTypeName"
                                  :value="item.id"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                            <el-select v-model="equipmentOtherValThree" placeholder="三级分类" @change="equipmentTypeSelect($event,4,2)">
                                <el-option
                                  v-for="item in equipmentTypeOtherThree"
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
                            <el-input v-model="enterEquitmentOther.brand" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">数量</span>
                        <div class="inp">
                            <el-input v-model="enterEquitmentOther.number" placeholder="请输入" type="text" @input="validateNumber(enterEquitmentOther.number,2)" maxlength="5"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">所在位置</span>
                        <div class="inp">
                            <el-select v-model="enterEquitmentOther.position" placeholder="请选择">
                                <el-option
                                  v-for="item in positionOtherList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                  :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex">
                    <div class="save" @click="equitmentSave(2)">保存</div>
                    <div class="cancel" @click="equitmentCancel(2)">取消</div>
                </div>
            </div>
        </div>
        <!-- 新增检查记录mask -->
        <div class="mask add-check-record-mask" v-if="addCheckRecordMask">
            <div class="main">
                <div class="title-box">
                    <p>{{checkRecordText}}</p>
                </div>
                <div class="box">
                    <div class="each clearfix">
                        <span class="span">检查时间</span>
                        <div class="inp">
                            <el-date-picker
                                v-model="addCheckData.checkTime"
                                :editable="false"
                                :clearable="false"
                                type="date"
                                placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">检查内容</span>
                        <div class="inp">
                            <el-input v-model="addCheckData.checkContent" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                    <div class="each clearfix">
                        <span class="span">备注</span>
                        <div class="inp">
                            <el-input v-model="addCheckData.remark" placeholder="请输入" maxlength="100"></el-input>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex">
                    <div class="save" @click="addCheckRecord">保存</div>
                    <div class="cancel" @click="addCheckRecordMask = false">取消</div>
                </div>
            </div>
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
                            <el-select v-model="addRepairData.repairStyle" placeholder="请选择" @change="getRepairStyleId($event)">
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
                            <el-input v-model="addRepairData.repairMoney" placeholder="请输入" type="text" @input="validateNumber(addRepairData.repairMoney,3)" maxlength="10"></el-input>
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
        <div class="go-top-box" @click="goTop"></div>
    </div>
</template>

<script>
import {setCookie, getCookie} from '../../../assets/js/cookie.js'
import pagination from './pagination'
export default {
    name: 'storeManageCarDetail',
    data () {
        return {
            navList:[
                {
                    name:'基础信息',
                    id: 'baseInfo',
                    act:true
                },
                {
                    name:'车厢车顶',
                    id: 'carTop',
                    act:false
                },
                {
                    name:'其他随车装备',
                    id: 'otherCar',
                    act:false
                },
                {
                    name:'检查记录',
                    id: 'checkRecord',
                    act:false
                },
                {
                    name:'维修记录',
                    id: 'repairRecord',
                    act:false
                },
            ],
            enterEquitmentMask:false, // 录入装备
            enterEquitmentOtherMask:false, // 录入其他随车装备
            addCheckRecordMask:false, // 新增检查记录 mask
            addRepairMask:false, // 新增维修记录mask
            editFlag:false, // 基础信息是否在 编辑 状态
            initData:{
                licenseNumber:"",  // 车牌号
                originLicenseNumber:"", // 预原牌号
                carModel:"", //  车型
                outputVolume:"", // 排量
                price:"",  // 采购价
                time:"",  // 装备时间
                vinNo:"", // 车架号
                engineNo:"",  // 发动机号
                ConditionTachograph:"",  // 行车记录仪情况
                InsuranceSituation:"",  // 保险情况
                carState:"",  // 车辆状态
                attributionAssets:"",  // 资产归属
            },
            repairStyleList:[
                {
                    value: '1',
                    label: '上门维修'
                }, {
                    value: '2',
                    label: '送修'
                },
            ],
            initDataShow:{
                licenseNumber:"暂无内容",  // 车牌号 ---- 以下是非编辑状态显示
                originLicenseNumber:"暂无内容", // 预原牌号
                carModel:"暂无内容", //  车型
                outputVolume:"暂无内容", // 排量
                price:"暂无内容",  // 采购价
                time:"暂无内容",  // 装备时间
                vinNo:"暂无内容", // 车架号
                engineNo:"暂无内容",  // 发动机号
                ConditionTachograph:"暂无内容",  // 行车记录仪情况
                InsuranceSituation:"暂无内容",  // 保险情况
                carState:"暂无内容",  // 车辆状态
                attributionAssets:"暂无内容",  // 资产归属
            },
            checkRecordList:[],
            repairRecordList:[], // 维修记录列表
            equipmentTypeFirst:[], // 装备分类一级
            equipmentTypeTwo:[], // 装备分类二级
            equipmentTypeThree:[], // 装备分类三级
            equipmentTypeFour:[], // 装备分类四级
            equipmentTypeOtherFirst:[], // 装备分类一级
            equipmentTypeOtherTwo:[], // 装备分类二级
            equipmentTypeOtherThree:[], // 装备分类三级
            equipmentTypeOtherFour:[], // 装备分类四级
            enterEquitment:{  // 录入装备弹窗
                name:"" , // 装备名
                brand:"",
                number:"",
                position:""
            },
            enterEquitmentOther:{  // 录入其他随车装备
                name:"" , // 装备名
                brand:"",
                number:"",
                position:""
            },
            addCheckData:{  // 新增检查记录 mask
                checkTime:"",
                checkContent:"",
                remark:"",
                id:'',
                add:true, // true:新增  false:编辑
            },
            addRepairData:{ // 新增维修记录 mask
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
            storehouseName:"", // 车辆仓库名字
            deptCode:"", // 部门码
            initCarInfo:null, // 初始化的车辆信息
            equipmentValFirst:'',// 装备一级分类值
            equipmentValTwo:'',// 装备二级分类值
            equipmentValThree:'',// 装备三级分类值
            equipmentIdThree:'', // 装备三级分类id
            equipmentOtherValFirst:'',// 其他装备一级分类值
            equipmentOtherValTwo:'',// 其他装备二级分类值
            equipmentOtherValThree:'',// 其他装备三级分类值
            equipmentOtherIdThree:'', // 其他装备三级分类id
            carLeftList:[], // 左车厢 装备列表
            carRightList:[], // 右车厢 装备列表
            carTopList:[], // 上车厢 装备列表
            carOtherList:[], // 其他装备 列表
            positionList:[
                {
                    value:"左一",
                    label:""
                },
                {
                    value:"左二",
                    label:""
                },
                {
                    value:"左三",
                    label:""
                },
                {
                    value:"右一",
                    label:""
                },
                {
                    value:"右二",
                    label:""
                },
                {
                    value:"右三",
                    label:""
                },
                {
                    value:"车顶",
                    label:""
                }
            ],
            positionOtherList:[
                {
                    value:"其他",
                    label:"其他"
                }
            ],
            userInfo:null,
            page_left:1,
            page_right:1,
            page_top:1,
            page_other:1,
            page_other:1,
            storehouseId:"",
            repairRecordSearchName:"", // 搜索维修记录
            checkRecordSearchName:"", // 搜索检查记录
            searchName:"",
            checkRecordText:"新增检查记录",
            repairRecordText:"新增维修记录"
        }
    },
    components:{
        pagination
    },
    computed:{

    },
    created(){

    },
    mounted(){
        this.storehouseName = this.$route.query.storehouseName;
        this.deptCode = this.$route.query.deptCode;
        this.storehouseId = this.$route.query.storehouseId;
        this.userInfo = JSON.parse(getCookie("userInfo"));
        this.init();
        this.getEquipmentType(-1,1,'',1);
        this.getEquipmentType(-1,1,'',2);
        this.getEquipmentList('左',this.page_left);
        this.getEquipmentList('右',this.page_right);
        this.getEquipmentList('车顶',this.page_top);
        this.getEquipmentList('其他',this.page_other);
        // $(window).scroll(function() {
        //     //为了保证兼容性，这里取两个值，哪个有值取哪一个
            
        //     var eleNav = $("#nav-list");
        //     var eleContent = $("#content");
        //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //     console.log("滚动距离" + scrollTop);
        //     if(scrollTop > 100){
        //         eleNav.css({"position": "fixed","top": '0',"zIndex": '99999',"left": '257px',"width": eleContent.width()})
        //         $('#baseInfo .base-box').css({"marginTop":"0"})
        //     }else{
        //         eleNav.css({"position": "absolute","top": '244px',"zIndex": '99999',"left": '257px',"width": eleContent.width()})
        //         $('#baseInfo .base-box').css({"marginTop":"80px"})
        //     }
            
            
        // })

    },
    methods:{
        init(){ // 初始化车辆信息
            let vm = this;
            let initDataShow = vm.initDataShow;
            let initData = vm.initData;
            tool.getdata(apiPath.getCarInfo,'get',{
                number: vm.storehouseName
            },function(data){
                if(data.status == 200){
                    let _data = data.data;
                    if(_data == null){
                        vm.dataInit();
                    }else{
                        vm.initCarInfo = _data;
                        initDataShow.licenseNumber = _data.number;
                        initDataShow.originLicenseNumber = _data.lastNumber;
                        initDataShow.carModel = _data.truckType;
                        initDataShow.outputVolume = _data.displacement;
                        initDataShow.price = _data.purchasePrice;
                        initDataShow.time = _data.purchasedate;
                        initDataShow.vinNo = _data.frameNumber;
                        initDataShow.engineNo = _data.engineNumber;
                        initDataShow.ConditionTachograph = _data.tachographSituation;
                        initDataShow.InsuranceSituation = _data.insuranceSituation;
                        initDataShow.carState = _data.turckStatus;
                        initDataShow.attributionAssets = _data.belongTo;

                        initData.licenseNumber = _data.number;
                        initData.originLicenseNumber = _data.lastNumber;
                        initData.carModel = _data.truckType;
                        initData.outputVolume = _data.displacement;
                        initData.price = _data.purchasePrice;
                        initData.time = _data.purchasedate;
                        initData.vinNo = _data.frameNumber;
                        initData.engineNo = _data.engineNumber;
                        initData.ConditionTachograph = _data.tachographSituation;
                        initData.InsuranceSituation = _data.insuranceSituation;
                        initData.carState = _data.turckStatus;
                        initData.attributionAssets = _data.belongTo;
                        
                        vm.getRepairRecordList('');
                        vm.getCheckRecordList('');
                    }
                }else{
                    vm.dataInit();
                }
            },false)
        },
        getCheckRecordList(searchSpace){ // 获取检查记录列表
            let vm = this;
            tool.getdata(apiPath.getTruckCheckRecordList,'get',{
                truckId: vm.initCarInfo.id, // 车辆id
                searchSpace:searchSpace , // 搜索框值
            },function(data){
                if(data.status == 200){
                    vm.checkRecordList = data.data;
                }else{
                    vm.checkRecordList = [];
                }
            },false)
        }, 

        addCheckRecordEvent(){ // 新增检查记录 按钮弹层
            this.checkRecordText = "新增检查记录";
            this.addCheckRecordMask = true;
            this.addCheckData.add = true;
            this.addCheckData = {  // 新增检查记录 mask
                checkTime:"",
                checkContent:"",
                remark:"",
                id:'',
                add:true, // true:新增  false:编辑
            }
        },
        editCheckRecordEvent(id){ // 编辑检查记录 按钮弹层
            this.checkRecordText = "编辑检查记录";
            this.addCheckData.id = id;
            this.addCheckRecordMask = true;
            this.addCheckData.add = false;
            this.checkRecordList.map((val,i) => {
                if(val.id == id){
                    this.addCheckData.checkTime = val.checkTime;
                    this.addCheckData.checkContent = val.checkContent;
                    this.addCheckData.remark = val.remark;
                }
            })
        },
        addCheckRecord(){ // 新增检查记录 || 编辑检查记录
            let vm = this;
            if(vm.addCheckData.add == true){ // 新增
                if(vm.addCheckData.checkTime == ''){
                    tool.toast('请选择检查时间');
                }else if(vm.addCheckData.checkContent == ''){
                     tool.toast('请填写检查内容');
                }else{
                    if(vm.addCheckData.checkTime == null || vm.addCheckData.checkTime == ''){
                        tool.toast('请选择检查时间');
                    }else{
                        tool.getdata(apiPath.addTruckCheckRecord,'post',{
                            truckId: vm.initCarInfo.id, // 车辆id
                            checkTime: vm.addCheckData.checkTime  + ' ' + '00:00:00',
                            checkContent: vm.addCheckData.checkContent,
                            remark: vm.addCheckData.remark,
                            editUserId: vm.userInfo.id
                        },function(data){
                            if(data.status == 200){
                                vm.addCheckRecordMask = false;
                                vm.getCheckRecordList('');
                                tool.toast('新增成功');
                            }
                        },true)
                    }
                    
                }
            }else{ // 编辑
                if(vm.addCheckData.checkTime == ''){
                    tool.toast('请选择检查时间');
                }else if(vm.addCheckData.checkContent == ''){
                     tool.toast('请填写检查内容');
                }else{
                    if(vm.addCheckData.checkTime == null || vm.addCheckData.checkTime == ''){
                        tool.toast('请选择检查时间');
                    }else{
                        tool.getdata(apiPath.updateTruckCheckRecord,'post',{
                            id:vm.addCheckData.id,
                            checkTime: vm.addCheckData.checkTime + ' ' + '00:00:00',
                            checkContent: vm.addCheckData.checkContent,
                            remark: vm.addCheckData.remark,
                            editUserId: vm.userInfo.id
                        },function(data){
                            if(data.status == 200){
                                vm.addCheckRecordMask = false;
                                vm.getCheckRecordList('');
                                tool.toast('修改成功');
                            }
                        },true)
                    }
                    
                }
                
            }
            
        },
        searchCheckRecord(){
            this.getCheckRecordList(this.checkRecordSearchName);
        },
        getRepairRecordList(searchSpace){ // 获取维修记录列表
            let vm = this;
            tool.getdata(apiPath.getTruckRepairRecordList,'get',{
                truckId: vm.initCarInfo.id, // 车辆id
                searchSpace:searchSpace , // 搜索框值
            },function(data){
                if(data.status == 200){
                    vm.repairRecordList = data.data;
                }else{
                    vm.repairRecordList = [];
                }
            },false)
        }, 
        addRepairRecordEvent(){ // 新增维修记录 按钮弹层
            this.repairRecordText = "新增维修记录";
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
            this.repairRecordText = "编辑维修记录";
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
                            tool.getdata(apiPath.addTruckRepairRecord,'post',{
                                truckId: vm.initCarInfo.id, // 车辆id
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
                                    vm.addRepairMask = false;
                                    vm.getRepairRecordList('');
                                    tool.toast('新增成功');
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
                            tool.getdata(apiPath.updateTruckRepairRecord,'post',{
                                id:vm.addRepairData.id,
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
        searchRepairRecord(){
            this.getRepairRecordList(this.repairRecordSearchName);
        },
        getRepairStyleId(event){ // 获取维修方式id
            this.addRepairData.repairStyleId = event;
        },
        getEquipmentList(truckLocation,pageNum){ // 获取装备列表
            let vm = this;
            if(truckLocation != '其他'){
                vm.searchName = '';
            }
            tool.getdata(apiPath.equipmentList,'get',{
                storehouseName: vm.storehouseName , // 仓库名
                truckLocation: truckLocation, // 位置,仓库为车时必传可传：左、右、车顶
                deptCode: vm.deptCode, 
                pageNum:pageNum,
                pageSize:2,
                searchSpace: vm.searchName,
            },function(data){
                if(data.status == 200){
                    if(truckLocation == '左'){
                        vm.carLeftList = data.data;
                        vm.page_left = pageNum;
                    }else if(truckLocation == '右'){
                        vm.carRightList = data.data;
                        vm.page_right = pageNum;
                    }else if(truckLocation == '车顶'){
                        vm.carTopList = data.data;
                        vm.page_top = pageNum;
                    }else if(truckLocation == '其他'){
                        vm.carOtherList = data.data;
                        vm.page_other = pageNum;
                    }
                }else{
                    if(truckLocation == '左'){
                        vm.carLeftList = [];
                        vm.page_left = pageNum;
                    }else if(truckLocation == '右'){
                        vm.carRightList = [];
                        vm.page_right = pageNum;
                    }else if(truckLocation == '车顶'){
                        vm.carTopList = [];
                        vm.page_top = pageNum;
                    }else if(truckLocation == '其他'){
                        vm.carOtherList = [];
                        vm.page_other = pageNum;
                    }
                }
            },false)

        },
        modifyCarSave(){ // 修改车辆信息
            let vm = this;
            let initData = vm.initData; // 编辑的车辆信息
            tool.getdata(apiPath.modifyCarInfo,'post',{
                truckId: vm.initCarInfo.id,
                storehouseId: vm.storehouseId,
                number: initData.licenseNumber,
                lastNumber: initData.originLicenseNumber,
                truckType: initData.carModel,
                displacement: initData.outputVolume,
                purchasePrice:initData.price,
                purchasedate: initData.time + ' ' + '00:00:00',
                frameNumber: initData.vinNo,
                engineNumber: initData.engineNo,
                tachographSituation: initData.ConditionTachograph,
                insuranceSituation: initData.InsuranceSituation,
                turckStatus: initData.carState,
                belongTo: initData.attributionAssets
            },function(data){
                if(data.status == 200){
                    vm.storehouseName = data.data.number;
                    vm.init();
                    vm.editFlag = false;
                    tool.toast('保存成功');
                    vm.$emit("storehouseName",vm.storehouseName);
                    vm.$emit("id",data.data.id);
                    vm.$router.replace({path:'/storeManage/carDetail',query:{"storehouseName":vm.storehouseName,deptCode:vm.deptCode,storehouseId:vm.storehouseId}});
                }
            },true)
        },
        getEquipmentType(equipmentTypePId,layer,equipmentTypeName,type){ // 获取装备分类
            let vm = this;
            tool.getdata(apiPath.equipmentType,'get',{
                equipmentTypePId: equipmentTypePId, // 母类型id第一层传-1
                layer: layer,  // 层级第一层就传1
                equipmentTypeName: equipmentTypeName, // 模糊查找类型名称
            },function(data){
                if(data.status == 200){

                    if(type == 1){ // 录入装备
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
                    }else{ // 录入其他装备
                        if(layer == 1){ // 一级
                            vm.equipmentTypeOtherFirst = data.data;

                            let list = [];
                            vm.equipmentTypeOtherFirst.map(function(val,i) {
                                if(val.equipmentTypeName == vm.equipmentOtherValFirst){
                                    list.push(val);
                                }
                            });
                            if(list.length == 0){
                                vm.equipmentOtherValFirst = '';
                            }
                        }else if(layer == 2){ // 二级
                            vm.equipmentTypeOtherTwo = data.data;

                            let list = [];
                            vm.equipmentTypeOtherTwo.map(function(val,i) {
                                if(val.equipmentTypeName == vm.equipmentOtherValTwo){
                                    list.push(val);
                                }
                            });
                            if(list.length == 0){
                                vm.equipmentOtherValTwo = '';
                                vm.equipmentOtherValThree = '';
                            }
                        }else if(layer == 3){ // 三级
                            vm.equipmentTypeOtherThree = data.data;

                            let list = [];
                            vm.equipmentTypeOtherThree.map(function(val,i) {
                                if(val.equipmentTypeName == vm.equipmentOtherValThree){
                                    list.push(val);
                                }
                            });
                            if(list.length == 0){
                                vm.equipmentOtherValThree = '';
                            }
                        }else if(layer == 4){ // 四级 即 装备名
                            vm.equipmentTypeOtherFour = data.data;
                        }
                    }
                    
                }
            },false)
        },
        equitmentSave(type){ // 录入装备 保存弹窗
            let vm = this;
            let position = vm.enterEquitment.position; 
            if(type == 1){
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
                }else if(vm.enterEquitment.position == ''){
                    tool.toast("请选择所在位置");
                }else{
                    if(vm.enterEquitment.number>10000){
                        tool.toast('数量不能超过10000');
                    }else{
                        tool.getdata(apiPath.addEquipment,'post',{
                            pid: vm.equipmentIdThree, // 第三级类型的id
                            equipmentName: vm.enterEquitment.name, // 装备名称
                            deptCode: vm.deptCode, // 部门
                            eqCount: vm.enterEquitment.number, // 数量
                            storehouseName: vm.storehouseName, // 仓库名
                            truckLocation: vm.enterEquitment.position, // 位置,仓库为车时必传
                            bland: vm.enterEquitment.brand, // 品牌
                            userId: vm.userInfo.id, // 登录人id
                        },function(data){
                            if(data.status == 200){
                                vm.enterEquitment = {  // 录入装备弹窗
                                    name:"" , // 装备名
                                    brand:"",
                                    number:"",
                                    position:""
                                }
                                vm.equipmentValFirst = '';// 装备一级分类值
                                vm.equipmentValTwo = '';// 装备二级分类值
                                vm.equipmentValThree = '';// 装备三级分类值
                                vm.equipmentIdThree = ''; // 装备三级分类id
                                vm.enterEquitmentMask = false;
                                console.log(position.split(""))
                                if(position.split("")[0] == '左'){
                                    vm.getEquipmentList('左',vm.page_left);
                                }else if(position.split("")[0] == '右'){
                                    vm.getEquipmentList('右',vm.page_right);
                                }else if(position.split("")[0] == '车'){
                                    vm.getEquipmentList('车顶',vm.page_top);
                                }
                                tool.toast('录入成功');
                            }
                        },true)
                    }
                    
                }
                
            }else{
                console.log(vm.enterEquitmentOther.position)
                if(vm.enterEquitmentOther.name == ''){
                    tool.toast("请填写装备名");
                }else if(vm.equipmentOtherValFirst == ''){
                    tool.toast("请选择一级分类");
                }else if(vm.equipmentOtherValTwo == ''){
                    tool.toast("请选择二级分类");
                }else if(vm.equipmentOtherValThree == ''){
                    tool.toast("请选择三级分类");
                }else if(vm.enterEquitmentOther.brand == ''){
                    tool.toast("请填写品牌名");
                }else if(vm.enterEquitmentOther.number == ''){
                    tool.toast("请填写数量");
                }else if(vm.enterEquitmentOther.position == ''){
                    tool.toast("请选择所在位置");
                }else{
                    if(vm.enterEquitmentOther.number>10000){
                        tool.toast('数量不能超过10000');
                    }else{
                        tool.getdata(apiPath.addEquipment,'post',{
                            pid: vm.equipmentOtherIdThree, // 第三级类型的id
                            equipmentName: vm.enterEquitmentOther.name, // 装备名称
                            deptCode: vm.deptCode, // 部门
                            eqCount: vm.enterEquitmentOther.number, // 数量
                            storehouseName: vm.storehouseName, // 仓库名
                            truckLocation: vm.enterEquitmentOther.position, // 位置,仓库为车时必传
                            bland: vm.enterEquitmentOther.brand, // 品牌
                            userId: vm.userInfo.id, // 登录人id
                        },function(data){
                            if(data.status == 200){
                                vm.enterEquitmentOther = {  // 录入其他随车装备
                                    name:"" , // 装备名
                                    brand:"",
                                    number:"",
                                    position:""
                                }
                                vm.equipmentOtherValFirst = '';// 其他装备一级分类值
                                vm.equipmentOtherValTwo = '';// 其他装备二级分类值
                                vm.equipmentOtherValThree = '';// 其他装备三级分类值
                                vm.equipmentOtherIdThree = ''; // 其他装备三级分类id
                                vm.enterEquitmentOtherMask = false;
                                vm.getEquipmentList('其他',vm.page_other);
                                tool.toast('录入成功');
                            }
                        },true)
                    }
                    
                }
                
            }
            
            
        },
        equitmentCancel(type){ // 录入装备 取消弹窗
            if(type == 1){ // 录入装备
                this.enterEquitmentMask = false;
            }else{  // 录入其他装备
                this.enterEquitmentOtherMask = false;
            }
        },
        equipmentTypeSelect(event,layer,type){ // 选择装备类型下拉
            if(layer == 4){ // 获取三级的选中id 用于模糊查询
                if(type == 1){
                    this.equipmentIdThree = event;
                }else{
                    this.equipmentOtherIdThree = event;
                }
            }
            this.getEquipmentType(event,layer,'',type);
        },
        enterEquitmentInput(type){ // 手动输入装备名 模糊 查询  layer传4 pid就是传第三级的id
            if(type == 1){
                this.getEquipmentType(this.equipmentIdThree,4,this.enterEquitment.name,1);
            }else{
                this.getEquipmentType(this.equipmentOtherIdThree,4,this.enterEquitmentOther.name,2);
            }
        },
        getPageLeftCar(val){ // 左车厢分页
            this.getEquipmentList('左',val);
        },
        getPageRightCar(val){ // 右车厢分页
            this.getEquipmentList('右',val);
        },
        getPageTopCar(val){ // 车顶车厢分页
            this.getEquipmentList('车顶',val);
        },
        getPageOtherCar(val){ // 其他车厢分页
            this.getEquipmentList('其他',val);
        },
        modifyCarCancel(){ // 取消
            console.log(this.initDataShow);
            this.editFlag = false;
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
        searchEquipment(){
            this.page_other = 1;
            this.getEquipmentList('其他',this.page_other,this.searchName);
        },
        dataInit(){ // 以免路由不变，不更新数据
            this.enterEquitmentMask = false; // 录入装备
            this.enterEquitmentOtherMask = false; // 录入其他随车装备
            this.addCheckRecordMask = false; // 新增检查记录 mask
            this.addRepairMask = false;// 新增维修记录mask
            this.editFlag = false; // 基础信息是否在 编辑 状态
            this.initData = {
                licenseNumber:"",  // 车牌号
                originLicenseNumber:"", // 预原牌号
                carModel:"", //  车型
                outputVolume:"", // 排量
                price:"",  // 采购价
                time:"",  // 装备时间
                vinNo:"", // 车架号
                engineNo:"",  // 发动机号
                ConditionTachograph:"",  // 行车记录仪情况
                InsuranceSituation:"",  // 保险情况
                carState:"",  // 车辆状态
                attributionAssets:"",  // 资产归属
            },
            this.initDataShow = {
                licenseNumber:"暂无内容",  // 车牌号 ---- 以下是非编辑状态显示
                originLicenseNumber:"暂无内容", // 预原牌号
                carModel:"暂无内容", //  车型
                outputVolume:"暂无内容", // 排量
                price:"暂无内容",  // 采购价
                time:"暂无内容",  // 装备时间
                vinNo:"暂无内容", // 车架号
                engineNo:"暂无内容",  // 发动机号
                ConditionTachograph:"暂无内容",  // 行车记录仪情况
                InsuranceSituation:"暂无内容",  // 保险情况
                carState:"暂无内容",  // 车辆状态
                attributionAssets:"暂无内容",  // 资产归属
            }
            this.equipmentTypeFirst = []; // 装备分类一级
            this.equipmentTypeTwo = []; // 装备分类二级
            this.equipmentTypeThree = []; // 装备分类三级
            this.equipmentTypeFour = []; // 装备分类四级
            this.equipmentTypeOtherFirst = []; // 装备分类一级
            this.equipmentTypeOtherTwo = []; // 装备分类二级
            this.equipmentTypeOtherThree = []; // 装备分类三级
            this.equipmentTypeOtherFour = []; // 装备分类四级
            this.enterEquitment = {  // 录入装备弹窗
                name:"" , // 装备名
                brand:"",
                number:"",
                position:""
            },
            this.enterEquitmentOther = {  // 录入其他随车装备
                name:"" , // 装备名
                brand:"",
                number:"",
                position:""
            },
            this.addCheckData = {  // 新增检查记录 mask
                checkTime:"",
                checkContent:"",
                remark:""
            },
            this.addRepairData = { // 新增维修记录 mask
                repairNumber:"", // 维修单号
                repairContent:"",  // 维修内容
                repairStyle:"", // 维修方式
                repairMoney:"",
                repairSettleStyle:"", // 维修结算方式
                repairDepartment:"" ,
                repairTime: '',
            },
            this.storehouseName = ""; // 车辆仓库名字
            this.deptCode = ""; // 部门码
            this.initCarInfo = null; // 初始化的车辆信息
            this.equipmentValFirst = '';// 装备一级分类值
            this.equipmentValTwo = '';// 装备二级分类值
            this.equipmentValThree = '';// 装备三级分类值
            this.equipmentIdThree = ''; // 装备三级分类id
            this.equipmentOtherValFirst = '';// 其他装备一级分类值
            this.equipmentOtherValTwo = '';// 其他装备二级分类值
            this.equipmentOtherValThree = '';// 其他装备三级分类值
            this.equipmentOtherIdThree = ''; // 其他装备三级分类id
            this.carLeftList = []; // 左车厢 装备列表
            this.carRightList = []; // 右车厢 装备列表
            this.carTopList = []; // 上车厢 装备列表
            this.carOtherList = []; // 其他装备 列表
            this.userInfo = null;
            this.page_left = 1;
            this.page_right = 1;
            this.page_top = 1;
            this.page_other = 1;
            this.page_other = 1;
            this.storehouseId = "";
            this.repairRecordSearchName = ""; // 搜索维修记录
            this.checkRecordSearchName = ""; // 搜索检查记录
            this.searchName = '';
        },
        goEquitDetail(storehouseId,equipmentTypeId,type,truckLocation){ // 跳转 装备详情
            this.$router.push({path:'/storeManage/storeDetail',query:{storehouseId:storehouseId,deptCode:this.deptCode,equipmentTypeId:equipmentTypeId,storehouseName:this.storehouseName,type:type,origin:'carDetail',truckLocation:truckLocation}})
        },
        goBack(){
            // this.$emit("storeIndex",-1); // 通知父组件 导航栏高亮
            this.$router.push({path:'/storeManage/index',query:{deptCode:this.deptCode}});
        },
        validateNumber(val,type) {
            if(type == 1){
                this.enterEquitment.number = val.replace(/[^\d]/g, "");
            }else if(type == 2){
                this.enterEquitmentOther.number = val.replace(/[^\d]/g, "");
            }else if(type == 3){
                this.addRepairData.repairMoney = val.replace(/[^\d.]/g, "");
            }else if(type == 4){
                this.initData.price = val.replace(/[^\d.]/g, "");
            }
        },
        goTop(){
            window.scrollTo(0, 0); 
        }
    },

    watch:{
        '$route':function(newVal,oldVal){
            if(newVal.query.storehouseName){
                this.dataInit();
                this.storehouseName = this.$route.query.storehouseName;
                this.deptCode = this.$route.query.deptCode;
                this.storehouseId = this.$route.query.storehouseId;
                this.userInfo = JSON.parse(getCookie("userInfo"));
                this.init();
                this.getEquipmentType(-1,1,'',1);
                this.getEquipmentType(-1,1,'',2);
                this.getEquipmentList('左',this.page_left);
                this.getEquipmentList('右',this.page_right);
                this.getEquipmentList('车顶',this.page_top);
                this.getEquipmentList('其他',this.page_other);
            }
        }
    }
}
</script>

