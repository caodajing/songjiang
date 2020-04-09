<!--战评总结-->
<template>
  <div class="container-wrap">
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
          height="calc(100vh - 250px)"
          v-loading="loading"
          border
          :data="list"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="issueTime" align="center" label="日期" width="140">
            <template v-slot="scope">{{getTime(scope.row.issueTime)}}</template>
          </el-table-column>
          <el-table-column prop="alarmMode" align="center" label="接警方式" width="100"></el-table-column>
          <el-table-column prop="processUnit" align="center" label="处警单位" width="100"></el-table-column>
          <el-table-column align="center" label="处警车辆" width="200">
            <template
              v-slot="scope"
            >{{scope.row.processInfo.map(item=>item.process_car_name).join(' , ')}}</template>
          </el-table-column>
          <el-table-column prop="dispatchTime" align="center" label="出动时间"></el-table-column>
          <el-table-column prop="carFollowingLeader" align="center" label="跟车领导"></el-table-column>
          <el-table-column prop="processType" align="center" label="处警类型"></el-table-column>
          <el-table-column prop="attachement" align="center" label="详细文件" width="100"></el-table-column>
          <el-table-column prop="createUserName" align="center" label="录入人"></el-table-column>
          <el-table-column prop="createTime" align="center" label="录入时间" width="120">
            <template v-slot="scope">{{getTime(scope.row.createTime,'MM-dd hh:mm')}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="140">
            <template v-slot="scope">
              <el-button
                type="text"
                style="color:#496dff"
                :loading="scope.row.loadingEdit"
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button type="text" style="color:#496dff" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
          <el-form ref="form" :model="fullForm" :rules="fullRules" label-width="110px">
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
                <el-form-item label="出动时间" required>
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
                  <el-input class="form_item" v-model="fullForm.buildingArea" placeholder="请输入...">
                    <template slot="append">㎡</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="毗邻情况" prop="adjacentCondition">
                  <el-input placeholder="请输入" v-model="fullForm.adjacentCondition" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中队到场燃烧面积" prop="fireAreaInplace">
                  <el-input
                    class="form_item"
                    v-model="fullForm.fireAreaInplace"
                    placeholder="请输入..."
                  >
                    <template slot="append">㎡</template>
                  </el-input>
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
                  <el-input class="form_item" placeholder="请输入" v-model="fullForm.fireDistance">
                    <template slot="append">Km</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出动车辆数" prop="numberOfCarDispatched">
                  <el-input-number
                    class="form_item"
                    :controls="false"
                    placeholder="请输入"
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
                      <el-input class="form_item" v-model="item.trunk_line" placeholder="请输入...">
                        <template slot="append">条</template>
                      </el-input>
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
                      <el-input
                        class="form_item"
                        v-model="item.number_of_water_gun"
                        placeholder="请输入..."
                      >
                        <template slot="append">支</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="任务">
                      <el-input v-model="item.task" placeholder="请输入..."></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
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
                    v-model="fullForm.situationOfWaterSource"
                    placeholder="请输入..."
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="灭火用水主要道路地下水管口径" prop="pipeCaliber">
                  <el-input class="form_item" v-model="fullForm.pipeCaliber" placeholder="请输入..." />
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
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="19mm" prop="numberOfNineteenMm">
                  <el-input
                    class="form_item"
                    v-model="fullForm.numberOfNineteenMm"
                    placeholder="请输入..."
                  >
                    <template slot="append">支</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="洪水" prop="numberOfFlooding">
                  <el-input
                    class="form_item"
                    v-model="fullForm.numberOfFlooding"
                    placeholder="请输入..."
                  >
                    <template slot="append">支</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="泡沫管枪" prop="numberOfFoam">
                  <el-input class="form_item" v-model="fullForm.numberOfFoam" placeholder="请输入...">
                    <template slot="append">支</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="钩管" prop="hookPipe">
                  <el-input class="form_item" v-model="fullForm.hookPipe" placeholder="请输入...">
                    <template slot="append">支</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="移动泡" prop="mobileGun">
                  <el-input class="form_item" v-model="fullForm.mobileGun" placeholder="请输入...">
                    <template slot="append">支</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总流量" prop="totalDischarge">
                  <el-input
                    class="form_item"
                    v-model="fullForm.totalDischarge"
                    placeholder="请输入..."
                  >
                    <template slot="append">1/s</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="疏散人数" prop="numberOfEvacuation">
                  <el-input-number
                    class="form_item"
                    :controls="false"
                    v-model="fullForm.numberOfEvacuation"
                    placeholder="请输入..."
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保护价值" prop="protectionValue">
                  <el-input
                    class="form_item"
                    v-model="fullForm.protectionValue"
                    placeholder="请输入..."
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受灾总面积" prop="totalAffectedArea">
                  <el-input
                    class="form_item"
                    v-model="fullForm.totalAffectedArea"
                    placeholder="请输入..."
                  >
                    <template slot="append">㎡</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="过火面积" prop="fireArea">
                  <el-input class="form_item" v-model="fullForm.fireArea" placeholder="请输入...">
                    <template slot="append">㎡</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="遇险人员死亡人数" prop="depthNumber">
                  <el-input-number
                    class="form_item"
                    :controls="false"
                    v-model="fullForm.depthNumber"
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
                <el-form-item label="附件" prop="attachement">
                  <el-upload
                    action="http://shcloud2.wmtechzone.club:50001/apis/summaryoffacts/uploadattachment"
                    multiple
                    name="file1"
                    :on-success="handleUpload"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                  >
                    <el-button style="background:#496dff;border-color:#496dff" size="small" type="primary">添加附件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="footer">
          <el-button size="small" @click="closeFullscreen" style="padding-left: 25px;padding-right:25px">取消</el-button>
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
  </div>
</template>

<script>
import leftNav from "./leftNav";
import timeCmp from "./timeComp";
import { setCookie, getCookie } from "../../assets/js/cookie.js";

export default {
  name: "summingUp",
  components: {
    leftNav,
    timeCmp
  },
  data() {
    return {
      //loading
      loading: false,
      lodingSave: false,

      userId: "",

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
        processCar: ""
      },
      list: [],
      teamList: [], //处警单位
      carsList: [],
      personList: [],
      warInfoList: [],
      fileList: [],

      //fullscreen
      showFullscreen: false,
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
        updateUserId: ""
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
      }
    };
  },
  created() {
    this.userId = JSON.parse(getCookie("userInfo")).id;
    this.getTeam();
    this.getPage();
  },
  methods: {
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
            this.teamList = res.data.data[0].dataList;
          } catch (error) {
            this.teamList = [];
          }
        })
        .catch(err => {});
    },
    getPage() {
      let params = {
        rowLength: 500,
        pageNum: 1,
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
          console.log(JSON.parse(JSON.stringify(this.list)), "list");
        })
        .catch(err => {
          this.list = [];
        })
        .finally(_ => {
          this.loading = false;
        });
    },

    async edit(e) {
      this.$set(e, "loadingEdit", true);
      try {
        await this.getCars();
        await this.getPersons();
        await this.getWarInfo();
        console.log(this.$c(e), "e");
        this.fullType = "edit";
        this.showFullscreen = true;

        this.fullForm.id = e.id;

        this.fullForm.issueTime = e.issueTime;
        this.fullForm.alarmMode = e.alarmMode;
        this.fullForm.processUnit = e.processUnit;
        this.fullForm.dispatchTime = e.dispatchTime;
        this.fullForm.carFollowingLeader = e.carFollowingLeader;
        this.fullForm.processType = e.processType;

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
        console.log(this.fileList, "this.fileList");
      } catch (error) {
      } finally {
        this.$set(e, "loadingEdit", false);
      }
    },

    del(e) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {});
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
      this.getCars();
      this.getPersons();
      this.getWarInfo();
      this.showFullscreen = true;
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
            console.log(this.$c(this.warInfoList), "warInfoList");
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
        let attachment = [];
        this.fileList.forEach(item => {
          attachment.push(item.name);
        });
        console.log(attachment, "attachment");
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

          createUserId: this.userId,
          updateUserId: this.userId
        };
        console.log(this.$c(params), "params");
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
              this.showFullscreen = false;
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
<style >
.el-form-item {
  height: 40px;
}
.el-table {
  color: #333333;
}
.el-table__header th {
  background: #f8f8f9;
  color: #333333;
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
  z-index: 100;
  background: #ffffff;
  overflow: auto;
}
.summaryFullscreen .header {
  padding: 20px 200px 0;
}
.summaryFullscreen .back_btn {
  background: #f3f6fb;
  color: #2385d7;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.summaryFullscreen .content {
  padding: 20px 300px 0;
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
</style>
