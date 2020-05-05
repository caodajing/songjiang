<!--战评总结-->
<template>
  <div class="container-wrap summing_up">
        <leftNav />
        <div class="personSetIndex-wrap">
            <div class="head-box">
                <i class="iconfont icon-shouye-copy icon"></i>
                <span>当前位置：战评总结</span>
            </div>

            <div class="list-box">
                <div class="util-box clearfix">
                    <div class="inp-box clearfix">
                        <span>处警单位：</span>
                        <el-select clearable v-model="form.processUnitId" placeholder="请选择">
                          <el-option
                            v-for="item in teamList"
                            :key="item.groupId"
                            :label="item.groupName"
                            :value="item.groupId"
                          ></el-option>
                        </el-select>
                    </div>
                    <div class="inp-box clearfix person-inp-box">
                        <span>接警方式：</span>
                        <input v-model="form.alarmMode" type="text" placeholder="请输入" class="inp" />
                    </div>
                    <div class="inp-box clearfix">
                        <span>处警车辆：</span>
                        <input v-model="form.processCar" type="text" placeholder="请输入" class="inp" />
                    </div>
                    <div class="search-btn" style="cursor:pointer" @click="getPage">查询</div>
                    <div class="add-person-btn common" style="cursor:pointer" @click="openFullscreen">
                        <i class="iconfont icon-add"></i>
                        <span>添加</span>
                    </div>
                </div>

                <el-table
                  style="margin-top:10px"
                  stripe
                  height="calc(100vh - 310px)"
                  v-loading="loading"
                  border
                  :data="list"
                >
                    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                    <el-table-column prop="issueTime" align="center" label="日期" width="100">
                        <template v-slot="scope">{{getTime(scope.row.issueTime)}}</template>
                    </el-table-column>
                    <el-table-column prop="alarmMode" align="center" label="接警方式" width="100"></el-table-column>
                    <el-table-column prop="processUnitName" align="center" label="处警单位" width="100"></el-table-column>
                    <el-table-column align="center" label="处警车辆" width="200">
                        <template v-slot="scope"
                        >{{scope.row.processInfo.map(item=>item.process_car_name).join(' , ')}}</template>
                    </el-table-column>
                    <el-table-column prop="expressNewsId" align="center" label="关联战时快报"></el-table-column>
                    <el-table-column prop="dispatchTime" align="center" label="出动时间(单位: S)"></el-table-column>
                    <el-table-column prop="carFollowingLeader" align="center" label="跟车领导"></el-table-column>
                    <el-table-column prop="processType" align="center" label="处警类型"></el-table-column>
                    <el-table-column prop="attachement" align="center" label="详细文件" width="100"></el-table-column>
                    <el-table-column prop="createUserName" align="center" width="90" label="录入人"></el-table-column>
                    <el-table-column prop="createTime" align="center" label="录入时间" width="120">
                        <template v-slot="scope">{{getTime(scope.row.createTime,'MM-dd hh:mm')}}</template>
                     </el-table-column>
                    <el-table-column align="center" label="操作" fixed="right" width="120">
                        <template v-slot="scope">
                            <el-button
                                type="text"
                                style="color:#496dff"
                                :loading="scope.row.loadingEdit"
                                @click="edit(scope.row,'detail')"
                            >详细</el-button>
                            <el-button
                                type="text"
                                style="color:#496dff"
                                :loading="scope.row.loadingGrade"
                                @click="edit(scope.row,'grade')"
                            >评分</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :pageNum="totalPages" @changePage="getPage($event)"></pagination>
            </div>
        </div>

        <div class="summaryFullscreen" v-if="showFullscreen">
            <div class="header">
                <el-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  class="back_btn"
                  @click="closeFullscreen"
                >返回</el-button>
            </div>
          <div class="content">
            <el-divider content-position="left">
                <el-divider direction="vertical"></el-divider>
                <span>基本信息</span>
            </el-divider>
            <div class="inner">
                <el-form ref="form" :model="fullForm" :rules="fullRules" label-width="130px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="日期" prop="issueTime">{{fullForm.issueTime}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="接警方式" prop="alarmMode">{{fullForm.alarmMode}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="处警单位" prop="processUnit">{{fullForm.processUnit}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="出动时间(单位: S)" required>{{fullForm.dispatchTime}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="跟车领导" prop="carFollowingLeader">{{fullForm.carFollowingLeader}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="处警类型" prop="processType">{{fullForm.processType}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            
            <!-- 音视频文件 -->
            <el-divider content-position="left">
                <el-divider direction="vertical"></el-divider>
                <span>音视频文件</span>
            </el-divider>
            <div class="operation-video-box inner">
                <div class="video-box">
                    <ul class="list">
                        <li class="clearfix" v-for="item,index in videoList" > 
                            <img src="../../assets/images/dataSet/video-icon.png" alt="">
                            <div class="text">
                                <h3>操作视频.mp4</h3>
                            </div>
                            <div class="btn-box">
                               <div class="play-btn" @click="videoPlay(item)">播放</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- 详细/评分 -->
            <el-divider content-position="left">
              <el-divider direction="vertical"></el-divider>
              <span>战评总结</span>
            </el-divider>
            <div class="inner">
              <el-form ref="zongjieForm" :model="fullForm" :rules="fullRules" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="天气" prop="weather">{{fullForm.weather}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="风向" prop="windDirection">{{fullForm.windDirection}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="风力" prop="windForce">{{fullForm.windForce}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="温度" prop="temperature">{{fullForm.temperature}}</el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="着火单位地址" prop="addressOfFireUnit">{{fullForm.addressOfFireUnit}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否重点单位" prop="isKeyUnit">{{fullForm.isKeyUnit?'是':'否'}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="灭火作战计划"
                      prop="fireExtinguishPlan"
                    >{{fullForm.fireExtinguishPlan?'有':'无'}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中队接警人" prop="squadronOperator">{{fullForm.squadronOperator}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="接警时间" prop="alarmInterval">{{fullForm.alarmInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="到场时间" prop="inplaceInterval">{{fullForm.inplaceInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="报首次消息时间"
                      prop="foremostMsgInterval"
                    >{{fullForm.foremostMsgInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="出水时间"
                      prop="waterOutputInterval"
                    >{{fullForm.waterOutputInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="续报时间" prop="alarmingInterval">{{fullForm.alarmingInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="控制时间" prop="controlInterval">{{fullForm.controlInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="扑灭时间"
                      prop="extinguishingInterval"
                    >{{fullForm.extinguishingInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="撤离时间" prop="evacuationInterval">{{fullForm.evacuationInterval}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="着火对象" prop="fireObject">{{fullForm.fireObject}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="建筑构造特点"
                      prop="characteristicsOfBuildingStructure"
                    >{{fullForm.characteristicsOfBuildingStructure}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="层次" prop="floor">{{fullForm.floor}}</el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="总、单层建筑面积" prop="buildingArea">{{fullForm.buildingArea}}</el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="毗邻情况" prop="adjacentCondition">{{fullForm.adjacentCondition}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中队到场燃烧面积" prop="fireAreaInplace">{{fullForm.fireAreaInplace}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="着火部位" prop="firePart">{{fullForm.firePart}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="燃烧物质"
                      prop="combustionSubstance"
                    >{{fullForm.combustionSubstance}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="被困人员情况" prop="stuckCondition">{{fullForm.stuckCondition}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中队与火场距离" prop="fireDistance">{{fullForm.fireDistance}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="出动车辆数"
                      prop="numberOfCarDispatched"
                    >{{fullForm.numberOfCarDispatched}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="出水数"
                      prop="numberOfWaterOutput"
                    >{{fullForm.numberOfWaterOutput}}</el-form-item>
                  </el-col>
                </el-row>
                <div class="cars">
                  <div class="cars_title">>>处警车辆信息</div>
                  <el-form
                    label-width="140px"
                    style="border-bottom:1px solid #e0e0e0;margin: 10px 0"
                    v-for="(item,index) in fullForm.processCarInfo"
                    :key="index"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="'车辆'+(index+1)">
                          <el-select
                            class="form_item"
                            disabled
                            v-model="item.process_car_id"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in carsList"
                              :key="item.id"
                              :label="`${item.carName}-${item.carNumber}`"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="指挥员">
                          <el-select
                            class="form_item"
                            v-model="item.car_commander_id"
                            placeholder="请选择"
                            disabled
                          >
                            <el-option
                              v-for="item in personList"
                              :key="item.id"
                              :label="item.realName"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="停靠水源种类、位置">
                          <el-input
                            class="form_item"
                            disabled
                            v-model="item.water_source_position"
                            placeholder="请输入..."
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="铺设干线">
                          <input-number
                            class="form_item"
                            placeholder="请输入..."
                            v-model="item.trunk_line"
                            :min="0"
                            :precision="0"
                            disabled
                          >
                            <template slot="append">条</template>
                          </input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="分水位置">
                          <el-input
                            class="form_item"
                            disabled
                            v-model="item.water_dispatch_position"
                            placeholder="请输入..."
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="水枪支数">
                          <input-number
                            class="form_item"
                            placeholder="请输入..."
                            :min="0"
                            :precision="0"
                            disabled
                            v-model="item.number_of_water_gun"
                          >
                            <template slot="append">支</template>
                          </input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="任务">
                          <el-input disabled v-model="item.task" placeholder="请输入..."></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  <!--   <el-form-item>
                      <el-button type="danger" size="small" @click="delCar(item,index)">删除</el-button>
                    </el-form-item> -->
                  </el-form>
                  <!-- <div class="cars_add_more" style="text-align:center">
                    <p style="display:inline-block;cursor:pointer" @click="addMoreCars">
                      <i style="font-size:20px" class="el-icon-circle-plus-outline" /> 添加更多车辆信息
                    </p>
                  </div> -->
                </div>

                <el-row style="margin-top:20px">
                  <el-col :span="12">
                    <el-form-item
                      label="水源情况"
                      prop="situationOfWaterSource"
                    >{{fullForm.situationOfWaterSource}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      class="form_left_label"
                      label="灭火用水主要道路地下水管口径"
                      prop="pipeCaliber"
                    >{{fullForm.pipeCaliber}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="灭火栓压力" prop="hydrantPressure">{{fullForm.hydrantPressure}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="应援中队" prop="supportTeam">{{fullForm.supportTeam}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="到场车辆总数"
                      prop="numberOfInplaceCar"
                    >{{fullForm.numberOfInplaceCar}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="出水车辆总数"
                      prop="numberOfOutputWaterCar"
                    >{{fullForm.numberOfOutputWaterCar}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="出水水枪总数"
                      prop="numberOfOutputWaterGun"
                    >{{fullForm.numberOfOutputWaterGun}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="19mm" prop="numberOfNineteenMm">{{fullForm.numberOfNineteenMm}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="洪水" prop="numberOfFlooding">{{fullForm.numberOfFlooding}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="泡沫管枪" prop="numberOfFoam">{{fullForm.numberOfFoam}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="钩管" prop="hookPipe">{{fullForm.hookPipe}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="移动泡" prop="mobileGun">{{fullForm.mobileGun}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      class="spe_form_item_liuliang"
                      label="总流量"
                      prop="totalDischarge"
                    >{{fullForm.totalDischarge}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="疏散人数" prop="numberOfEvacuation">{{fullForm.numberOfEvacuation}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保护价值" prop="protectionValue">{{fullForm.protectionValue}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="受灾总面积" prop="totalAffectedArea">{{fullForm.totalAffectedArea}}</el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="过火面积" prop="fireArea">{{fullForm.fireArea}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="遇险人员死亡人数" prop="depthNumber">{{fullForm.depthNumber}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="遇险人员受伤人数" prop="injuredNumber">{{fullForm.injuredNumber}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="灭火人员死亡人数" prop="staffDepthNumber">{{fullForm.staffDepthNumber}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="灭火人员受伤人数"
                      prop="staffInjuredNumber"
                    >{{fullForm.staffInjuredNumber}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="火场安全情况" prop="safetySituation">{{fullForm.safetySituation}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="纪律情况"
                      prop="disciplineSituation"
                    >{{fullForm.disciplineSituation}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="其他" prop="other">{{fullForm.other}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="关联战时快报" prop="expressNewsId">{{fullForm.expressNewsId}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="spe_form_item" label="附件" prop="attachement">
                      <el-upload
                        action="http://shcloud2.wmtechzone.club:50001/apis/summaryoffacts/uploadattachment"
                        multiple
                        disabled
                        name="file1"
                        :on-success="handleUpload"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                      ></el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            
            <el-divider content-position="left">
              <el-divider direction="vertical"></el-divider>
              <span>领导评分</span>
            </el-divider>
            <div class="inner">
                <!-- this.pingfenList -->
                <!-- <div v-for="(item,index) in this.pingfenList" :key="index">
                    <el-row>
                        <el-col :span="12" style="color:#999999">
                            领导{{index+1}}评分:
                            <span style="color:#666666;margin-left:30px">{{item.grade}}</span>
                        </el-col>
                        <el-col :span="12" style="color:#999999">
                            备注:
                            <span style="color:#666666;margin-left:30px">{{item.remark}}</span>
                        </el-col>
                    </el-row>
                </div> -->
                
                <!-- 评分 v-if="isGrade" -->
                <div v-if="isGrade">
                    <el-form
                        :inline="true"
                        style="margin-top:20px"
                        ref="score"
                        :model="scoreForm"
                        :rules="scoreRules"
                        label-width="100px">
                        <el-form-item label="整体评分" prop="wholeGrade">
                            <input-number class="asdfff1 asdfff" v-model="scoreForm.wholeGrade" placeholder="分值0-100" />
                            <span class="grade-tip">您的评分将作为战士整体作战能力、排名依据。</span>
                        </el-form-item>

                        <div class="each-grade-box">
                            <div class="title">
                                <span class="span1">分项评分<i></i></span>
                                <span class="span2">（可供其他领导参考，选填）</span>
                            </div>
                            <el-form-item label="电台值守" prop="" class="labelStyle">
                                <input-number class="asdfff" v-model="scoreForm.childGrade[0]" placeholder="分值0-100" />
                            </el-form-item>
                            <el-form-item label="通讯室值守" prop="" class="labelStyle">
                                <input-number class="asdfff" v-model="scoreForm.childGrade[1]" placeholder="分值0-100" />
                            </el-form-item>
                            <el-form-item label="图像传输" prop="" class="labelStyle">
                                <input-number class="asdfff" v-model="scoreForm.childGrade[2]" placeholder="分值0-100" />
                            </el-form-item>
                            <el-form-item label="微站点名" prop="" class="labelStyle">
                                <input-number class="asdfff" v-model="scoreForm.childGrade[3]" placeholder="分值0-100" />
                            </el-form-item>
                            <el-form-item label="视频督察" prop="" class="labelStyle">
                                <input-number class="asdfff" v-model="scoreForm.childGrade[4]" placeholder="分值0-100" />
                            </el-form-item>
                            <el-form-item label="车辆状态" prop="" class="labelStyle">
                                <input-number class="asdfff" v-model="scoreForm.childGrade[5]" placeholder="分值0-100" />
                            </el-form-item>
                        </div>

                    </el-form>
                </div>
                 <div v-else>
                    <div v-if="pingfenList.length>0">
                        <div v-for="item,index in pingfenList">
                            <el-form
                                :inline="true"
                                style="margin-top:20px"
                                :model="item"
                                label-width="100px">
                                <el-form-item :label="'领导' + parseInt(index+1) + '评分' " prop="grade">
                                    <input-number class="asdfff1 asdfff" v-model="item.grade" placeholder="分值0-100" disabled/>
                                </el-form-item>

                                <div class="each-grade-box">
                                    <div class="title">
                                        <span class="span1">分项评分<i></i></span>
                                    </div>
                                    <el-form-item label="电台值守" prop="" class="labelStyle">
                                        <input-number class="asdfff" v-model="item.childGrade1" placeholder="分值0-100" disabled/>
                                    </el-form-item>
                                    <el-form-item label="通讯室值守" prop="" class="labelStyle">
                                        <input-number class="asdfff" v-model="item.childGrade2" placeholder="分值0-100" disabled/>
                                    </el-form-item>
                                    <el-form-item label="图像传输" prop="" class="labelStyle">
                                        <input-number class="asdfff" v-model="item.childGrade3" placeholder="分值0-100" disabled/>
                                    </el-form-item>
                                    <el-form-item label="微站点名" prop="" class="labelStyle">
                                        <input-number class="asdfff" v-model="item.childGrade4" placeholder="分值0-100" disabled/>
                                    </el-form-item>
                                    <el-form-item label="视频督察" prop="" class="labelStyle">
                                        <input-number class="asdfff" v-model="item.childGrade5" placeholder="分值0-100" disabled/>
                                    </el-form-item>
                                    <el-form-item label="车辆状态" prop="" class="labelStyle">
                                        <input-number class="asdfff" v-model="item.childGrade6" placeholder="分值0-100" disabled/>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </div>
                    <div v-else style="textAlign:center ">暂无评分</div>
                </div>
            </div>

            <div class="footer" v-if="isGrade">
              <el-button
                size="small"
                @click="closeFullscreen"
                style="padding-left: 25px;padding-right:25px"
              >取消</el-button>
              <el-button
                size="small"
                style="background:#496dff;border-color:#496dff;padding-left: 25px;padding-right:25px"
                type="primary"
                :loading="lodingSave"
                @click="submit"
              >保存</el-button>
            </div>
          </div>
        </div>
    
        <!-- 添加 -->
        <div class="summaryFullscreen" v-if="showFullscreenInit">
          <div class="header">
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              class="back_btn"
              @click="showFullscreenInit=false"
            >返回</el-button>
          </div>
          <div class="content">
            <el-divider content-position="left">
              <el-divider direction="vertical"></el-divider>
              <span>基本信息</span>
            </el-divider>
            <div class="inner">
              <el-form ref="form" :model="fullForm" :rules="fullRules" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="日期" prop="issueTime">
                      <el-date-picker
                        class="form_item"
                        v-model="fullForm.issueTime"
                        type="datetime"
                        placeholder="选择日期时间"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="接警方式" prop="alarmMode">
                      <el-input class="form_item" v-model="fullForm.alarmMode" placeholder="请填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处警单位" prop="processUnit">
                      <el-select
                        class="form_item"
                        clearable
                        v-model="fullForm.processUnit"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in teamList"
                          :key="item.groupId"
                          :label="item.groupName"
                          :value="item.groupId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出动时间(单位: S)" required>
                      <time-cmp v-model="fullForm.dispatchTime"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="跟车领导" prop="carFollowingLeader">
                      <el-input
                        class="form_item"
                        v-model="fullForm.carFollowingLeader"
                        placeholder="请填写"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处警类型" prop="processType">
                      <el-select
                        class="form_item"
                        clearable
                        v-model="fullForm.processType"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in processTypeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            
            <!-- 音视频文件 -->
            <el-divider content-position="left">
                <el-divider direction="vertical"></el-divider>
                <span>音视频文件</span>
            </el-divider>
            <div class="operation-video-box inner">
               <div class="file-btn">  
                    点击上传音/视频
                    <input type="file" accept="video/m4v,video/mpg,video/mp4,video/avi,video/mov,video/mk,video/wmv" multiple @change="uploadVideo" >
                </div>
                <div class="video-box">
                    <ul class="list">
                        <li class="clearfix" v-for="item,index in videoList" > 
                            <img src="../../assets/images/dataSet/video-icon.png" alt="">
                            <div class="text">
                                <h3>操作视频.mp4</h3>
                            </div>
                            <div class="btn-box">
                               <div class="play-btn" @click="videoPlay(item)">播放</div>
                                <div class="del-btn" @click="videoDel(item,index)">删除</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <el-divider content-position="left">
              <el-divider direction="vertical"></el-divider>
              <span>战评总结</span>
            </el-divider>
            <div class="inner">
              <el-form ref="zongjieForm" :model="fullForm" :rules="fullRules" label-width="130px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="天气" prop="weather">
                      <el-input class="form_item" v-model="fullForm.weather" placeholder="请输入..."></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="风向" prop="windDirection">
                      <el-input class="form_item" v-model="fullForm.windDirection" placeholder="请输入..."></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="风力" prop="windForce">
                      <el-input class="form_item" v-model="fullForm.windForce" placeholder="请输入..."></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="温度" prop="temperature">
                      <el-input class="form_item" v-model="fullForm.temperature" placeholder="请输入...">
                        <template slot="append">℃</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="着火单位地址" prop="addressOfFireUnit">
                      <el-input
                        class="form_item"
                        v-model="fullForm.addressOfFireUnit"
                        placeholder="请输入..."
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否重点单位" prop="isKeyUnit">
                      <el-select class="form_item" v-model="fullForm.isKeyUnit" placeholder="请选择">
                        <el-option
                          v-for="item in yesOrNoList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="灭火作战计划" prop="fireExtinguishPlan">
                      <el-select
                        class="form_item"
                        v-model="fullForm.fireExtinguishPlan"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in haveOrNoList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中队接警人" prop="squadronOperator">
                      <el-input
                        class="form_item"
                        v-model="fullForm.squadronOperator"
                        placeholder="请输入..."
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="接警时间" prop="alarmInterval">
                      <time-cmp v-model="fullForm.alarmInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="到场时间" prop="inplaceInterval">
                      <time-cmp v-model="fullForm.inplaceInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="报首次消息时间" prop="foremostMsgInterval">
                      <time-cmp v-model="fullForm.foremostMsgInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出水时间" prop="waterOutputInterval">
                      <time-cmp v-model="fullForm.waterOutputInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="续报时间" prop="alarmingInterval">
                      <time-cmp v-model="fullForm.alarmingInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="控制时间" prop="controlInterval">
                      <time-cmp v-model="fullForm.controlInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="扑灭时间" prop="extinguishingInterval">
                      <time-cmp v-model="fullForm.extinguishingInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="撤离时间" prop="evacuationInterval">
                      <time-cmp v-model="fullForm.evacuationInterval"></time-cmp>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="着火对象" prop="fireObject">
                      <el-input class="form_item" v-model="fullForm.fireObject" placeholder="请输入..."></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="建筑构造特点" prop="characteristicsOfBuildingStructure">
                      <el-input
                        class="form_item"
                        v-model="fullForm.characteristicsOfBuildingStructure"
                        placeholder="请输入..."
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="层次" prop="floor">
                      <el-input class="form_item" v-model="fullForm.floor" placeholder="请输入..."></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="总、单层建筑面积" prop="buildingArea">
                      <input-number
                        class="form_item"
                        placeholder="请输入..."
                        :min="0"
                        :precision="2"
                        v-model="fullForm.buildingArea"
                      >
                        <template slot="append">㎡</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="毗邻情况" prop="adjacentCondition">
                      <el-input placeholder="请输入" v-model="fullForm.adjacentCondition" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中队到场燃烧面积" prop="fireAreaInplace">
                      <input-number
                        class="form_item"
                        v-model="fullForm.fireAreaInplace"
                        :min="0"
                        :precision="2"
                        placeholder="请输入..."
                      >
                        <template slot="append">㎡</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="着火部位" prop="firePart">
                      <el-input class="form_item" placeholder="请输入" v-model="fullForm.firePart" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="燃烧物质" prop="combustionSubstance">
                      <el-input
                        class="form_item"
                        placeholder="请输入"
                        v-model="fullForm.combustionSubstance"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="被困人员情况" prop="stuckCondition">
                      <el-input class="form_item" placeholder="请输入" v-model="fullForm.stuckCondition" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中队与火场距离" prop="fireDistance">
                      <input-number
                        class="form_item"
                        placeholder="请输入"
                        :min="0"
                        :precision="2"
                        v-model="fullForm.fireDistance"
                      >
                        <template slot="append">Km</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出动车辆数" prop="numberOfCarDispatched">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        placeholder="请输入"
                        :min="0"
                        :precision="0"
                        v-model="fullForm.numberOfCarDispatched"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出水数" prop="numberOfWaterOutput">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        placeholder="请输入"
                        :min="0"
                        :precision="2"
                        v-model="fullForm.numberOfWaterOutput"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="cars">
                  <div class="cars_title">>>处警车辆信息</div>
                  <el-form
                    label-width="140px"
                    style="border-bottom:1px solid #e0e0e0;margin: 10px 0"
                    v-for="(item,index) in fullForm.processCarInfo"
                    :key="index"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="'车辆'+(index+1)">
                          <el-select class="form_item" v-model="item.process_car_id" placeholder="请选择">
                            <el-option
                              v-for="item in carsList"
                              :key="item.id"
                              :label="`${item.carName}-${item.carNumber}`"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="指挥员">
                          <el-select
                            class="form_item"
                            v-model="item.car_commander_id"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in personList"
                              :key="item.id"
                              :label="item.realName"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="停靠水源种类、位置">
                          <el-input
                            class="form_item"
                            v-model="item.water_source_position"
                            placeholder="请输入..."
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="铺设干线">
                          <input-number
                            class="form_item"
                            placeholder="请输入..."
                            v-model="item.trunk_line"
                            :min="0"
                            :precision="0"
                          >
                            <template slot="append">条</template>
                          </input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="分水位置">
                          <el-input
                            class="form_item"
                            v-model="item.water_dispatch_position"
                            placeholder="请输入..."
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="水枪支数">
                          <input-number
                            class="form_item"
                            placeholder="请输入..."
                            :min="0"
                            :precision="0"
                            v-model="item.number_of_water_gun"
                          >
                            <template slot="append">支</template>
                          </input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="任务">
                          <el-input v-model="item.task" placeholder="请输入..."></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item>
                      <el-button type="danger" size="small" @click="delCar(item,index)">删除</el-button>
                    </el-form-item>
                  </el-form>
                  <div class="cars_add_more" style="text-align:center">
                    <p style="display:inline-block;cursor:pointer" @click="addMoreCars">
                      <i style="font-size:20px" class="el-icon-circle-plus-outline" /> 添加更多车辆信息
                    </p>
                  </div>
                </div>

                <el-row style="margin-top:20px">
                  <el-col :span="12">
                    <el-form-item label="水源情况" prop="situationOfWaterSource">
                      <el-input
                        class="form_item"
                        placeholder="请输入..."
                        v-model="fullForm.situationOfWaterSource"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="form_left_label" label="灭火用水主要道路地下水管口径" prop="pipeCaliber">
                      <input-number
                        class="form_item"
                        placeholder="请输入..."
                        v-model="fullForm.pipeCaliber"
                        :min="0"
                        :precision="2"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="灭火栓压力" prop="hydrantPressure">
                      <el-input
                        class="form_item"
                        v-model="fullForm.hydrantPressure"
                        placeholder="请输入..."
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="应援中队" prop="supportTeam">
                      <el-input class="form_item" v-model="fullForm.supportTeam" placeholder="请输入..." />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="到场车辆总数" prop="numberOfInplaceCar">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.numberOfInplaceCar"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出水车辆总数" prop="numberOfOutputWaterCar">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.numberOfOutputWaterCar"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出水水枪总数" prop="numberOfOutputWaterGun">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.numberOfOutputWaterGun"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="19mm" prop="numberOfNineteenMm">
                      <input-number
                        class="form_item"
                        v-model="fullForm.numberOfNineteenMm"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      >
                        <template slot="append">支</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="洪水" prop="numberOfFlooding">
                      <input-number
                        class="form_item"
                        v-model="fullForm.numberOfFlooding"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      >
                        <template slot="append">支</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="泡沫管枪" prop="numberOfFoam">
                      <input-number
                        class="form_item"
                        :min="0"
                        :precision="0"
                        v-model="fullForm.numberOfFoam"
                        placeholder="请输入..."
                      >
                        <template slot="append">支</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="钩管" prop="hookPipe">
                      <input-number
                        class="form_item"
                        :min="0"
                        :precision="0"
                        v-model="fullForm.hookPipe"
                        placeholder="请输入..."
                      >
                        <template slot="append">支</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="移动泡" prop="mobileGun">
                      <input-number
                        class="form_item"
                        :min="0"
                        :precision="0"
                        v-model="fullForm.mobileGun"
                        placeholder="请输入..."
                      >
                        <template slot="append">支</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="spe_form_item_liuliang" label="总流量" prop="totalDischarge">
                      <input-number
                        class="form_item"
                        placeholder="请输入..."
                        v-model="fullForm.totalDischarge"
                        :min="0"
                        :precision="2"
                      >
                        <template slot="append">1/s</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="疏散人数" prop="numberOfEvacuation">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.numberOfEvacuation"
                        :min="0"
                        :precision="0"
                        placeholder="请输入..."
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="保护价值" prop="protectionValue">
                      <input-number
                        class="form_item"
                        placeholder="请输入..."
                        v-model="fullForm.protectionValue"
                        :min="0"
                        :precision="2"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="受灾总面积" prop="totalAffectedArea">
                      <input-number
                        class="form_item"
                        placeholder="请输入..."
                        :min="0"
                        :precision="2"
                        v-model="fullForm.totalAffectedArea"
                      >
                        <template slot="append">㎡</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="过火面积" prop="fireArea">
                      <input-number
                        class="form_item"
                        placeholder="请输入..."
                        :min="0"
                        :precision="2"
                        v-model="fullForm.fireArea"
                      >
                        <template slot="append">㎡</template>
                      </input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="遇险人员死亡人数" prop="depthNumber">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.depthNumber"
                        :min="0"
                        :precision="0"
                        placeholder="请输入..."
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="遇险人员受伤人数" prop="injuredNumber">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.injuredNumber"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="灭火人员死亡人数" prop="staffDepthNumber">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.staffDepthNumber"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="灭火人员受伤人数" prop="staffInjuredNumber">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.staffInjuredNumber"
                        placeholder="请输入..."
                        :min="0"
                        :precision="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="火场安全情况" prop="safetySituation">
                      <el-input-number
                        class="form_item"
                        :controls="false"
                        v-model="fullForm.safetySituation"
                        placeholder="请输入..."
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纪律情况" prop="disciplineSituation">
                      <el-input
                        class="form_item"
                        v-model="fullForm.disciplineSituation"
                        placeholder="请输入..."
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="其他" prop="other">
                      <el-input class="form_item" v-model="fullForm.other" placeholder="请输入..." />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="关联战时快报" prop="expressNewsId">
                      <el-select
                        class="form_item"
                        filterable
                        v-model="fullForm.expressNewsId"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in warInfoList"
                          :key="item.id"
                          :label="item.id"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="spe_form_item" label="附件" prop="attachement">
                      <el-upload
                        action="http://shcloud2.wmtechzone.club:50001/apis/summaryoffacts/uploadattachment"
                        multiple
                        name="file1"
                        :on-success="handleUpload"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                      >
                        <el-button
                          style="background:#496dff;border-color:#496dff"
                          size="small"
                          type="primary"
                        >添加附件</el-button>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <div class="footer">
              <el-button
                size="small"
                @click="showFullscreenInit=false"
                style="padding-left: 25px;padding-right:25px"
              >取消</el-button>
              <el-button
                size="small"
                style="background:#496dff;border-color:#496dff;padding-left: 25px;padding-right:25px"
                type="primary"
                :loading="lodingSave"
                @click="submitInit"
              >保存</el-button>
            </div>
          </div>
        </div>
        <div class="video-mask" v-if="videoMask">
            <div class="main">
                <a href="javascript:;" class="close" @click="videoClose"></a>
                <video :src="videoUrl" controls="controls"></video>
            </div>
        </div>
    </div>
</template>

<script>
import leftNav from "./leftNav";
import timeCmp from "./timeComp";
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import pagination from "../../components/pagination";
import InputNumber from "./InputNumber";
import ElForm from "./Form";

export default {
    name: "summingDetail",
    components: {
        leftNav,
        timeCmp,
        pagination,
        InputNumber,
        ElForm
    },
    data() {
        return {
            //loading
            loading: false,
            lodingSave: false,

            userId: "",
            realName: "",

            processTypeList: [
                {
                  label: "火灾扑救",
                  value: "1"
                },
                {
                  label: "社会救助",
                  value: "2"
                },
                {
                  label: "抢险救援",
                  value: "3"
                },
                {
                  label: "反恐排爆",
                  value: "4"
                },
                {
                  label: "其他",
                  value: "5"
                }
            ],
            yesOrNoList: [
                {
                  label: "是",
                  value: "1"
                },
                {
                  label: "否",
                  value: "0"
                }
            ],
            haveOrNoList: [
                {
                  label: "有",
                  value: "1"
                },
                {
                  label: "无",
                  value: "0"
                }
            ],
            form: {
                processUnitId: "",
                alarmMode: "",
                processCar: "",
                page: 1
            },
            list: [],
            totalPages: 0,
            teamList: [], //处警单位
            carsList: [],
            personList: [],
            warInfoList: [],
            fileList: [],

            //fullscreen
            showFullscreen: false,
            showFullscreenInit: false,
            fullType: "",
            fullForm: {
                id: "",

                issueTime: "",
                alarmMode: "",
                processUnit: "",
                dispatchTime: "",
                carFollowingLeader: "",
                processType: "",

                weather: "",
                windDirection: "",
                windForce: "",
                temperature: "",
                addressOfFireUnit: "",
                isKeyUnit: "",
                fireExtinguishPlan: "",
                squadronOperator: "",
                alarmInterval: "",
                inplaceInterval: "",
                foremostMsgInterval: "",
                waterOutputInterval: "",
                alarmingInterval: "",
                controlInterval: "",
                extinguishingInterval: "",
                evacuationInterval: "",
                fireObject: "",
                characteristicsOfBuildingStructure: "",
                floor: "",
                buildingArea: "",
                adjacentCondition: "",
                fireAreaInplace: "",
                firePart: "",
                combustionSubstance: "",
                stuckCondition: "",
                fireDistance: "",
                numberOfCarDispatched: null,
                numberOfWaterOutput: null,

                processCarInfo: [], //处警车辆信息

                situationOfWaterSource: "",
                pipeCaliber: "",
                hydrantPressure: "",
                supportTeam: "",
                numberOfInplaceCar: "",
                numberOfOutputWaterCar: "",
                numberOfOutputWaterGun: "",
                numberOfNineteenMm: "",
                numberOfFlooding: "",
                numberOfFoam: "",
                hookPipe: "",
                mobileGun: "",
                totalDischarge: "",
                numberOfEvacuation: "",
                protectionValue: "",
                totalAffectedArea: "",
                fireArea: "",
                depthNumber: "",
                injuredNumber: "",
                staffDepthNumber: "",
                staffInjuredNumber: "",
                safetySituation: "",
                disciplineSituation: "",

                other: "",
                expressNewsId: "",
                attachment: "",

                createUserId: "",
                updateUserId: "",
            },
            fullRules: {
                issueTime: [
                  { required: true, message: "请选择日期", trigger: "change" }
                ],
                alarmMode: [
                  { required: true, message: "请填写接警方式", trigger: "blur" }
                ],
                processUnit: [
                  { required: true, message: "请选择处警单位", trigger: "change" }
                ],
                carFollowingLeader: [
                  { required: true, message: "请填写跟车领导", trigger: "blur" }
                ],
                processType: [
                  { required: true, message: "请选择处警类型", trigger: "change" }
                ]
            },

            scoreForm: {
                summaryOfFactsId: "",
                wholeGrade: 0,
                childGrade:[0,0,0,0,0,0],
                remark: ""
            },
            scoreRules: {
                grade: [{ required: true, message: "请输入评分", trigger: "blur" }]
            },
            pingfenList: [],
            videoMask:false,
            videoList:[], // 视频
            isGrade:false, // true => 领导评分  false => 详细
        };
    },
    created() {
        this.userId = JSON.parse(getCookie("userInfo")).id;
        this.realName = JSON.parse(getCookie("userInfo")).realName;
        this.getTeam();
        this.getPage();
    },
    methods: {
        uploadVideo(event){ // 上传视频
            let vm = this;
            console.log(event.target.files.length,event.target.files[0]);
            let formdata = new FormData();
            for(var i = 0; i < event.target.files.length; i++){
                 formdata.append('file' + (i+1),event.target.files[i]);
            }
            // if(vm.file.size > 102400000){
            //     tool.toast('视频过大~')
            // }
            this.$ajax({
                url: this.$dataSetUrl + "/apis/summaryoffacts/uploadvideoattachment",
                method: "POST",
                headers: {
                    "Content-Type": "Multipart/form-data"
                },
                data: formdata,
            })
            .then(res => {
                console.log(res);
                if(res.data.code == 200){
                    this.videoList = this.videoList.concat(res.data.data[0].filename.split(","));
                    event.target.value='';
                }
            })
            .catch(err => {
                this.videoList = [];
            })
            .finally(_ => {
                this.loading = false;
            });
        },
        videoPlay(url){
            this.videoUrl = this.$dataSetUrl + '/' + url;
            this.videoMask = true;
            this.$nextTick(function(){
                $(".video-mask video")[0].play();
            })
        },
        videoDel(url,index){ // 视频删除
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.videoList.splice(index,1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        videoClose(){
            this.videoMask = false;
        },
        getTeam() {
          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/group/getdata",
            data: qs.stringify({
              rowLength: 500,
              pageNum: 1
            })
          })
            .then(res => {
              try {
                this.teamList = res.data.data[0].dataList.filter(
                  item => item.grade === "3"
                );
              } catch (error) {
                this.teamList = [];
              }
            })
            .catch(err => {});
        },
        getPage(e) {
          if (e && !isNaN(e)) this.form.page = e;
          let params = {
            rowLength: 50,
            pageNum: this.form.page,
            processUnitId: this.form.processUnitId,
            alarmMode: this.form.alarmMode,
            processCar: this.form.processCar
          };
          this.loading = true;
          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/summaryoffacts/getdata",
            data: qs.stringify(params)
          })
            .then(res => {
              this.list = res.data.data[0].dataList;
              this.totalPages = Number(res.data.data[0].totalPages);
            })
            .catch(err => {
              this.list = [];
            })
            .finally(_ => {
              this.loading = false;
            });
        },

        async getPingfen(id) {
          await this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/commentsummaryoffacts/getdata",
            data: qs.stringify({
              summaryOfFactsId: id
            })
          }).then(res => {
            if(res.data.code == 200){
                this.pingfenList = res.data.data[0];
                this.pingfenList.map((val,i) => {
                    let subGrade = val.subGrade.split(",");
                    val.childGrade1 = subGrade[0];
                    val.childGrade2 = subGrade[1];
                    val.childGrade3 = subGrade[2];
                    val.childGrade4 = subGrade[3];
                    val.childGrade5 = subGrade[4];
                    val.childGrade6 = subGrade[5];
                })
                console.log(this.pingfenList)
            }else{
                this.pingfenList = [];
            }
            
            // console.log(this.$c(this.pingfenList), "res");
          });
        },

        async edit(e,type) {
            
            if(type == 'grade'){
                this.$set(e, "loadingGrade", true);
                this.isGrade = true;
                this.scoreForm =  {
                    summaryOfFactsId: "",
                    wholeGrade: 0,
                    childGrade:[0,0,0,0,0,0],
                    remark: ""
                }

            }else{
                this.$set(e, "loadingEdit", true);
                this.isGrade = false;
                await this.getPingfen(e.id);
            }
          
            try {
                await this.getCars();
                await this.getPersons();
                await this.getWarInfo();
                this.fullType = "edit";
                this.showFullscreen = true;

                this.fullForm.id = e.id;

                if(e.videoAttachement && e.videoAttachement != ''){
                    this.videoList = e.videoAttachement.split(",");
                }else{
                    this.videoList = [];
                }

                this.scoreForm.summaryOfFactsId = e.id;

                this.fullForm.issueTime = e.issueTime;
                this.fullForm.alarmMode = e.alarmMode;
                this.fullForm.processUnit = this.teamList.filter(
                  item => item.groupId === e.processUnit
                )[0].groupName;
                this.fullForm.dispatchTime = e.dispatchTime;
                this.fullForm.carFollowingLeader = e.carFollowingLeader;
                console.log(this.$c(this.processTypeList), "processTypeList");
                this.fullForm.processType = this.processTypeList.find(
                  item => item.value === e.processType
                ).label;

                this.fullForm.processCarInfo = e.processInfo; //处警车辆

                this.fullForm.weather = e.weather;
                this.fullForm.windDirection = e.windDirection;
                this.fullForm.windForce = e.windForce;
                this.fullForm.temperature = e.temperature;
                this.fullForm.addressOfFireUnit = e.addressOfFireUnit;
                this.fullForm.isKeyUnit = e.isKeyUnit;
                this.fullForm.fireExtinguishPlan = e.fireExtinguishPlan;
                this.fullForm.squadronOperator = e.squadronOperator;

                //时间
                this.fullForm.alarmInterval = e.alarmInterval;
                this.fullForm.inplaceInterval = e.inplaceInterval;
                this.fullForm.foremostMsgInterval = e.foremostMsgInterval;
                this.fullForm.waterOutputInterval = e.waterOutputInterval;
                this.fullForm.alarmingInterval = e.alarmingInterval;
                this.fullForm.controlInterval = e.controlInterval;
                this.fullForm.extinguishingInterval = e.extinguishingInterval;
                this.fullForm.evacuationInterval = e.evacuationInterval;

                this.fullForm.fireObject = e.fireObject;
                this.fullForm.characteristicsOfBuildingStructure =
                  e.characteristicsOfBuildingStructure;
                this.fullForm.floor = e.floor;
                this.fullForm.buildingArea = e.buildingArea;
                this.fullForm.adjacentCondition = e.adjacentCondition;
                this.fullForm.fireAreaInplace = e.fireAreaInplace;
                this.fullForm.firePart = e.firePart;
                this.fullForm.combustionSubstance = e.combustionSubstance;
                this.fullForm.stuckCondition = e.stuckCondition;
                this.fullForm.fireDistance = e.fireDistance;
                this.fullForm.numberOfCarDispatched = e.numberOfCarDispatched;
                this.fullForm.numberOfWaterOutput = e.numberOfWaterOutput;

                this.fullForm.situationOfWaterSource = e.situationOfWaterSource;
                this.fullForm.pipeCaliber = e.pipeCaliber;
                this.fullForm.hydrantPressure = e.hydrantPressure;
                this.fullForm.supportTeam = e.supportTeam;

                this.fullForm.numberOfInplaceCar = e.numberOfInplaceCar;
                this.fullForm.numberOfOutputWaterCar = e.numberOfOutputWaterCar;
                this.fullForm.numberOfOutputWaterGun = e.numberOfOutputWaterGun;
                this.fullForm.numberOfNineteenMm = e.numberOfNineteenMm;
                this.fullForm.numberOfFlooding = e.numberOfFlooding;
                this.fullForm.numberOfFoam = e.numberOfFoam;
                this.fullForm.hookPipe = e.hookPipe;
                this.fullForm.mobileGun = e.mobileGun;
                this.fullForm.totalDischarge = e.totalDischarge;
                this.fullForm.numberOfEvacuation = e.numberOfEvacuation;

                this.fullForm.protectionValue = e.protectionValue;

                this.fullForm.totalAffectedArea = e.totalAffectedArea;
                this.fullForm.fireArea = e.fireArea;

                this.fullForm.depthNumber = e.depthNumber;
                this.fullForm.injuredNumber = e.injuredNumber;
                this.fullForm.staffDepthNumber = e.staffDepthNumber;
                this.fullForm.staffInjuredNumber = e.staffInjuredNumber;
                this.fullForm.safetySituation = e.safetySituation;
                this.fullForm.disciplineSituation = e.disciplineSituation;
                this.fullForm.other = e.other;
                this.fullForm.expressNewsId = e.expressNewsId;

                this.fullForm.attachment = e.attachement;

                if (!e.attachement) {
                    this.fileList = [];
                } else {
                    this.fileList = e.attachement.split(",").map(item => {
                        return {
                            name: item
                        };
                    });
                }
            } catch (error) {
            } finally {
                if(type == 'grade'){
                    this.$set(e, "loadingGrade", false);
                }else{
                    this.$set(e, "loadingEdit", false);
                }
            }
        },

        detail(e) {
          return console.log(this.$c(e), "e");
          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/summaryoffacts/deldata",
            data: qs.stringify({
              id: e.id
            })
          })
            .then(res => {
              if (res.data.code === "200") {
                this.$message.success("删除成功");
                this.getPage();
              }
            })
            .catch(err => {});
        },

        delCar(val, index) {
          if (this.fullForm.processCarInfo.length <= 1)
            return this.$message.error("至少有一辆处警车辆");
          this.fullForm.processCarInfo.splice(index, 1);
        },

        submitInit() {
          this.$refs.form.validate(valid => {
            if (!valid) return;
            //格式判断
            if (isNaN(Number(this.fullForm.temperature)))
              return this.$message.error("温度格式错误");
            if (isNaN(Number(this.fullForm.buildingArea)))
              return this.$message.error("总、单层建筑面积格式错误");
            if (isNaN(Number(this.fullForm.fireAreaInplace)))
              return this.$message.error("中队到场燃烧面积格式错误");
            if (isNaN(Number(this.fullForm.fireDistance)))
              return this.$message.error("中队与火场距离格式错误");
            if (isNaN(Number(this.fullForm.hydrantPressure)))
              return this.$message.error("灭火栓压力格式错误");
            if (isNaN(Number(this.fullForm.numberOfNineteenMm)))
              return this.$message.error("19mm格式错误");
            if (isNaN(Number(this.fullForm.numberOfFlooding)))
              return this.$message.error("洪水总数格式错误");
            if (isNaN(Number(this.fullForm.numberOfFoam)))
              return this.$message.error("泡沫管抢总数格式错误");
            if (isNaN(Number(this.fullForm.hookPipe)))
              return this.$message.error("钩管格式错误");
            if (isNaN(Number(this.fullForm.mobileGun)))
              return this.$message.error("移动炮格式错误");
            if (isNaN(Number(this.fullForm.totalDischarge)))
              return this.$message.error("总流量格式错误");
            if (isNaN(Number(this.fullForm.totalAffectedArea)))
              return this.$message.error("总受灾面积格式错误");
            if (isNaN(Number(this.fullForm.fireArea)))
              return this.$message.error("过火面积格式错误");
            //汽车列表只需要这些字段，编辑的时候需要重新筛选一下
            console.log(this.fullForm.processCarInfo, "???");
            let processCarInfo = JSON.parse(
              JSON.stringify(this.fullForm.processCarInfo)
            ).map(item => {
              return {
                process_car_id: item.process_car_id,
                car_commander_id: item.car_commander_id,
                water_source_position: item.water_source_position,
                trunk_line: item.trunk_line,
                water_dispatch_position: item.water_dispatch_position,
                number_of_water_gun: item.number_of_water_gun,
                task: item.task
              };
            });
            let carids = processCarInfo.map(item => item.process_car_id);
            if (carids.length === 1 && carids[0] === "")
              return this.$message.error("至少添加一辆处警车辆");
            if (carids.length !== new Set(carids).size)
              return this.$message.error("不能添加相同的处警车辆");
            let attachment = [];
            this.fileList.forEach(item => {
              attachment.push(item.name);
            });
            let params = {
              issueTime: this.getTime(
                this.fullForm.issueTime,
                "yyyy-MM-dd hh:mm:ss"
              ),
              alarmMode: this.fullForm.alarmMode,
              processUnit: this.fullForm.processUnit,
              dispatchTime: String(this.fullForm.dispatchTime),
              carFollowingLeader: this.fullForm.carFollowingLeader,
              processType: this.fullForm.processType,
              //车辆信息
              processCarInfo: JSON.stringify(processCarInfo),

              weather: this.fullForm.weather,
              windDirection: this.fullForm.windDirection,
              windForce: this.fullForm.windForce,
              temperature: parseFloat(this.fullForm.temperature),
              addressOfFireUnit: this.fullForm.addressOfFireUnit,
              isKeyUnit: this.fullForm.isKeyUnit,
              fireExtinguishPlan: this.fullForm.fireExtinguishPlan,
              squadronOperator: this.fullForm.squadronOperator,

              alarmInterval: this.fullForm.alarmInterval,
              inplaceInterval: this.fullForm.inplaceInterval,
              foremostMsgInterval: this.fullForm.foremostMsgInterval,
              waterOutputInterval: this.fullForm.waterOutputInterval,
              alarmingInterval: this.fullForm.alarmingInterval,
              controlInterval: this.fullForm.controlInterval,
              extinguishingInterval: this.fullForm.extinguishingInterval,
              evacuationInterval: this.fullForm.evacuationInterval,

              fireObject: this.fullForm.fireObject,
              characteristicsOfBuildingStructure: this.fullForm
                .characteristicsOfBuildingStructure,
              floor: this.fullForm.floor,
              buildingArea: parseFloat(this.fullForm.buildingArea),
              adjacentCondition: this.fullForm.adjacentCondition,
              fireAreaInplace: parseFloat(this.fullForm.fireAreaInplace),
              firePart: this.fullForm.firePart,
              combustionSubstance: this.fullForm.combustionSubstance,
              stuckCondition: this.fullForm.stuckCondition,
              fireDistance: parseFloat(this.fullForm.fireDistance),
              numberOfCarDispatched: this.fullForm.numberOfCarDispatched,
              numberOfWaterOutput: this.fullForm.numberOfWaterOutput,

              situationOfWaterSource: this.fullForm.situationOfWaterSource,
              pipeCaliber: this.fullForm.pipeCaliber,
              hydrantPressure: parseFloat(this.fullForm.hydrantPressure),
              supportTeam: this.fullForm.supportTeam,

              numberOfInplaceCar: this.fullForm.numberOfInplaceCar,
              numberOfOutputWaterCar: this.fullForm.numberOfOutputWaterCar,
              numberOfOutputWaterGun: this.fullForm.numberOfOutputWaterGun,
              numberOfNineteenMm: parseInt(this.fullForm.numberOfNineteenMm),
              numberOfFlooding: parseInt(this.fullForm.numberOfFlooding),
              numberOfFoam: parseInt(this.fullForm.numberOfFoam),
              hookPipe: parseInt(this.fullForm.hookPipe),
              mobileGun: parseInt(this.fullForm.mobileGun),
              totalDischarge: parseFloat(this.fullForm.totalDischarge),
              numberOfEvacuation: this.fullForm.numberOfEvacuation,

              protectionValue: this.fullForm.protectionValue,

              totalAffectedArea: parseFloat(this.fullForm.totalAffectedArea),
              fireArea: parseFloat(this.fullForm.fireArea),

              depthNumber: this.fullForm.depthNumber,
              injuredNumber: this.fullForm.injuredNumber,
              staffDepthNumber: this.fullForm.staffDepthNumber,
              staffInjuredNumber: this.fullForm.staffInjuredNumber,
              safetySituation: this.fullForm.safetySituation,
              disciplineSituation: this.fullForm.disciplineSituation,
              other: this.fullForm.other,
              expressNewsId: this.fullForm.expressNewsId,

              //附件
              attachement: attachment.length ? attachment.join(",") : "",
                //视频
                videoAttachement: this.videoList.length ? this.videoList.join(",") : "",

              createUserId: this.userId,
              updateUserId: this.userId
            };
            let url = "";
            if (this.fullType === "edit") {
              url = "/apis/summaryoffacts/updatedata";
              params.id = this.fullForm.id;
            } else {
              url = "/apis/summaryoffacts/setdata";
            }
            this.lodingSave = true;
            this.$ajax({
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: this.$dataSetUrl + url,
              data: qs.stringify(params)
            })
              .then(res => {
                if (res.data.code === "200") {
                  this.$message.success("保存成功");
                  this.showFullscreenInit = false;
                  this.getPage();
                } else {
                  this.$message.error("保存失败");
                }
              })
              .catch(err => {})
              .finally(_ => {
                this.lodingSave = false;
              });
          });
        },

        getTime(time, fmt = "yyyy-MM-dd") {
          if (!time) return "";
          let transTime = new Date(time);
          let o = {
            "M+": transTime.getMonth() + 1, //月份
            "d+": transTime.getDate(), //日
            "h+": transTime.getHours(), //小时
            "m+": transTime.getMinutes(), //分
            "s+": transTime.getSeconds(), //秒
            "q+": Math.floor((transTime.getMonth() + 3) / 3), //季度
            S: transTime.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              (transTime.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
          for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                  ? o[k]
                  : ("00" + o[k]).substr(("" + o[k]).length)
              );
          return fmt;
        },

        //全屏
        openFullscreen() {
          this.resetData();
          this.getCars();
          this.getPersons();
          this.getWarInfo();
          this.fullType = "add";
          this.showFullscreenInit = true;
        },
        closeFullscreen() {
          this.showFullscreen = false;
        },

        async getCars() {
          await this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/car/getdata",
            data: qs.stringify({
              rowLength: 500,
              pageNum: 1
            })
          })
            .then(res => {
              try {
                this.carsList = res.data.data[0].dataList;
              } catch (error) {
                this.carsList = [];
              }
            })
            .catch(err => {});
        },
        async getPersons() {
          await this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/userbasic/getdata",
            data: qs.stringify({
              rowLength: 500,
              pageNum: 1
            })
          })
            .then(res => {
              try {
                this.personList = res.data.data[0].dataList;
              } catch (error) {
                this.personList = [];
              }
            })
            .catch(err => {});
        },
        async getWarInfo() {
          await this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/wartimeexpress/getdata",
            data: qs.stringify({
              rowLength: 500,
              pageNum: 1
            })
          })
            .then(res => {
              try {
                this.warInfoList = res.data.data[0].dataList;
              } catch (error) {
                this.warInfoList = [];
              }
            })
            .catch(err => {});
        },

        addMoreCars() {
          this.fullForm.processCarInfo.push({
            process_car_id: "",
            car_commander_id: "",
            water_source_position: "",
            trunk_line: "",
            water_dispatch_position: "",
            number_of_water_gun: "",
            task: ""
          });
        },

        handleRemove(file, fileList) {
          this.fileList = fileList;
        },

        handleUpload(res) {
          this.fileList.push({ name: res.data[0].filename });
        },

        submit() {
          this.$refs.score.validate(valid => {
            if (!valid) return;
            this.lodingSave = true;
            this.$ajax({
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: this.$dataSetUrl + "/apis/commentsummaryoffacts/setdata",
              data: qs.stringify({  
                grade: this.scoreForm.wholeGrade,
                subGrade: this.scoreForm.childGrade.join(','),
                remark: this.scoreForm.remark,
                summaryOfFactsId: this.scoreForm.summaryOfFactsId,
                createUserName: this.realName,
                createUserId: this.userId,
                createTime: this.getTime(new Date())
              })
            })
              .then(res => {
                if (res.data.code === "200") {
                  this.$message.success("操作成功");
                  this.showFullscreen = false;
                  this.getPage();
                }
              })
              .catch(err => {})
              .finally(_ => {
                this.lodingSave = false;
              });
          });
        },

        resetData() {
          this.fullForm.id = "";
          this.videoList = [];
          this.fullForm.issueTime = "";
          this.fullForm.alarmMode = "";
          this.fullForm.processUnit = "";
          this.fullForm.dispatchTime = "";
          this.fullForm.carFollowingLeader = "";
          this.fullForm.processType = "";

          this.fullForm.processCarInfo = [
            {
              process_car_id: "",
              car_commander_id: "",
              water_source_position: "",
              trunk_line: "",
              water_dispatch_position: "",
              number_of_water_gun: "",
              task: ""
            }
          ]; //处警车辆

          this.fullForm.weather = "";
          this.fullForm.windDirection = "";
          this.fullForm.windForce = "";
          this.fullForm.temperature = "";
          this.fullForm.addressOfFireUnit = "";
          this.fullForm.isKeyUnit = "";
          this.fullForm.fireExtinguishPlan = "";
          this.fullForm.squadronOperator = "";

          //时间
          this.fullForm.alarmInterval = "";
          this.fullForm.inplaceInterval = "";
          this.fullForm.foremostMsgInterval = "";
          this.fullForm.waterOutputInterval = "";
          this.fullForm.alarmingInterval = "";
          this.fullForm.controlInterval = "";
          this.fullForm.extinguishingInterval = "";
          this.fullForm.evacuationInterval = "";

          this.fullForm.fireObject = "";
          this.fullForm.characteristicsOfBuildingStructure = "";
          this.fullForm.floor = "";
          this.fullForm.buildingArea = "";
          this.fullForm.adjacentCondition = "";
          this.fullForm.fireAreaInplace = "";
          this.fullForm.firePart = "";
          this.fullForm.combustionSubstance = "";
          this.fullForm.stuckCondition = "";
          this.fullForm.fireDistance = "";
          this.fullForm.numberOfCarDispatched = "";
          this.fullForm.numberOfWaterOutput = "";

          this.fullForm.situationOfWaterSource = "";
          this.fullForm.pipeCaliber = "";
          this.fullForm.hydrantPressure = "";
          this.fullForm.supportTeam = "";

          this.fullForm.numberOfInplaceCar = "";
          this.fullForm.numberOfOutputWaterCar = "";
          this.fullForm.numberOfOutputWaterGun = "";
          this.fullForm.numberOfNineteenMm = "";
          this.fullForm.numberOfFlooding = "";
          this.fullForm.numberOfFoam = "";
          this.fullForm.hookPipe = "";
          this.fullForm.mobileGun = "";
          this.fullForm.totalDischarge = "";
          this.fullForm.numberOfEvacuation = "";

          this.fullForm.protectionValue = "";

          this.fullForm.totalAffectedArea = "";
          this.fullForm.fireArea = "";

          this.fullForm.depthNumber = "";
          this.fullForm.injuredNumber = "";
          this.fullForm.staffDepthNumber = "";
          this.fullForm.staffInjuredNumber = "";
          this.fullForm.safetySituation = "";
          this.fullForm.disciplineSituation = "";
          this.fullForm.other = "";
          this.fullForm.expressNewsId = "";

          this.fullForm.attachment = "";
          this.fileList = [];
        },

        $c(e) {
          try {
            return JSON.parse(JSON.stringify(e));
          } catch (error) {
            return "";
          }
        }
      }
    };
</script>
<style scope lang="less">
    .each-grade-box{
        padding-left:94px;
        box-sizing:border-box;
        .title{
            font-size: 12px;
            margin: 0 0 15px 10px;
            position:relative;
            i{
                width: 10px;
                height: 10px;
                display: block;
                background: url(../../assets/images/xiala.png) no-repeat;
                background-size:100% 100%;
                position:absolute;
                bottom:-4px;
                left: 53px;
            }
            .span1{
                color: #496DFF;
                margin-right: 31px;
            }
            .span2{
                color: #999;
            }
        }
        .labelStyle label{
            color: #333;
            font-weight: bold;
        }
    }
</style>
<style >
.grade-tip{
    font-size: 12px;
    color: #999;
    margin-left: 13px;
}
.asdfff1 {
  width: 300px!important;
}
.asdfff {
  width: 200px;
}
.asdfff input {
  text-align: left !important;
}
.summing_up .el-form-item {
  height: 40px;
}
.summing_up .el-table {
  color: #333333;
}
.summing_up .el-table__header th {
  background: #f8f8f9;
  color: #333333;
}
.spe_form_item_liuliang .el-input-group__append {
  padding: 0 17px;
}
.form_left_label /deep/ label {
  text-align: left;
}
</style>
<style scoped>
.form_item {
  width: 250px;
  height: 39px;
}
.form_item /deep/ .el-input__inner {
  height: 40px;
  line-height: 40px;
  text-align: left;
}
.summaryFullscreen {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  background: #ffffff;
  overflow: auto;
}
.summaryFullscreen .header {
  padding: 20px 150px 0;
}
.summaryFullscreen .back_btn {
  background: #f3f6fb;
  color: #2385d7;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.summaryFullscreen .content {
  padding: 20px 250px 0;
}
.summaryFullscreen .content .el-divider__text {
  padding: 0;
}
.summaryFullscreen .content .el-divider__text.is-left {
  left: 0;
}
.summaryFullscreen .content .el-divider--vertical {
  width: 3px;
  background: #486dff;
}
.summaryFullscreen .content .inner {
  background: #f8f8f9;
  border: 1px dotted #c4c3c4;
  padding: 30px 50px;
}

.cars_title {
  text-align: center;
  margin-bottom: 10px;
}

.footer {
  text-align: center;
  margin: 15px 0;
}

.spe_form_item {
  height: auto !important;
}
</style>
<style scope lang="less">
    .operation-video-box{
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 27px;
        .file-btn{
            width: 140px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            background: #496DFF;
            font-size: 16px;
            color: #fff;
            border-radius: 4px;
            margin: 0 0 21px 0;
            position: relative;
            input{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                cursor: pointer;
            }
        }
        .video-box{
            .title{
                width: 102px;
                height: 25px;
                border-bottom: 2px solid #5A8EE6;
                margin: 27px 0  38px 0;
                font-size: 14px;
                color: #333;
            }
            .list{
                li{
                    width: 784px;
                    height: 133px;
                    border:1px solid #E1E1E1;
                    padding: 30px 39px 0 50px;
                    box-sizing: border-box;
                    margin-bottom: 15px;
                    background:#fff;
                    img{
                        width: 46px;
                        height: 34px;
                        display: block;
                        float: left;
                        margin: 10px 29px 0 0;
                    }
                    .text{
                        float: left;
                        h3{
                            font-size: 18px;
                            color: #333;
                            margin-top: 10px;
                        }
                        p{
                            font-size: 12px;
                            color: #BBB;
                            margin-bottom: 3px;
                        }
                    }
                    .btn-box{
                        float: right;
                        cursor: pointer;
                        >div{
                            width: 110px;
                            height: 42px;
                            line-height: 42px;
                            text-align: center;
                            color: #fff;
                            font-size: 16px;
                            float: left;
                            border-radius: 4px;
                            margin-top: 17px;
                            &.play-btn{
                                background: #496DFF;
                                margin-right: 30px;
                            }
                            &.del-btn{
                                background: #B2C6F8;
                            }
                        }
                    }
                }
            }
        }

    }
    .video-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        background: rgba(0,0,0,.7);
        .main{
            width: 710px;
            height: 623px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin:-311.5px -355px;
            background: #fff;
        }
        .close{
            width: 40px;
            height: 40px;
            position:fixed;
            top: 50px;
            right: 50px;
            background:url(../../assets/images/dataSet/video-close.png) no-repeat;
            background-size:100% 100%;
            cursor: pointer;
            z-index: 999999999;
        }
        video{
            width: 100%;
            height:100%;
        }
    }
</style>
