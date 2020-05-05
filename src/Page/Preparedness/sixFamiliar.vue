<!--战备工作-->
<template>
  <div class="container-wrap">
    <leftNav />
    <div class="personSetIndex-wrap">
      <div class="head-box">
        <i class="iconfont icon-shouye-copy icon"></i>
        <span>当前位置：战备工作 > 六熟悉</span>
      </div>
      <div class="list-box">
        <div class="util-box clearfix">
          <div class="inp-box clearfix">
            <span>地点：</span>
            <input
              style="width:300px"
              v-model="form.address"
              type="text"
              placeholder="请输入"
              class="inp"
            />
          </div>
          <div class="search-btn" style="cursor:pointer" @click="getData">查询</div>
          <div class="add-person-btn common" style="cursor:pointer" @click="openDialog">
            <i class="iconfont icon-add"></i>
            <span>添加</span>
          </div>
        </div>

        <el-table
          style="margin-top:10px"
          border
          stripe
          height="calc(100vh - 320px)"
          v-loading="loading"
          :data="list"
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="inspectionTime" align="center" label="检查时间" width="160">
            <template v-slot="scope">{{getTime(scope.row.inspectionTime,'MM-dd hh:mm')}}</template>
          </el-table-column>
          <el-table-column prop="addressName" align="center" label="地址" width="150"></el-table-column>
          <el-table-column prop="checkTeamName" align="center" label="检查中队" width="200"></el-table-column>
          <el-table-column prop="commanderName" align="center" label="指挥员" width="200"></el-table-column>
          <el-table-column prop="keyUnit" align="center" label="重点单位" width="150"></el-table-column>
          <el-table-column prop="keyPosition" align="center" label="重点部位" width="150"></el-table-column>
          <el-table-column prop="facilitiesSituation" align="center" label="内部设施使用情况" width="150"></el-table-column>
          <el-table-column prop="pile" align="center" label="堆砌物" width="150"></el-table-column>
          <el-table-column prop="entranceExit" align="center" label="出入口" width="200"></el-table-column>
          <el-table-column prop="fireEngineAccess" align="center" label="消防通道" width="100"></el-table-column>
          <el-table-column align="center" label="其他资料" width="100">
            <template slot-scope="scope">
              <template v-if="!scope.row.attachment">
                <el-button class="spe_color" type="text">查看</el-button>
              </template>
              <el-dropdown v-else trigger="click" placement="bottom">
                <el-button class="spe_color" type="text">查看</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    class="alink_dropdown"
                    v-for="(item,index) in scope.row.attachment.split(',')"
                    :key="index"
                  >
                    <a :href="$dataSetUrl+'/'+item" :download="item" target="_blank">附件{{index+1}}</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="updateUserId" align="center" label="录入人" width="200"></el-table-column>
          <el-table-column prop="updateTime" align="center" label="录入时间" width="100">
            <template v-slot="scope">{{getTime(scope.row.updateTime,'MM-dd hh:mm')}}</template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="110">
            <template slot-scope="scope">
              <el-button class="spe_color" type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button class="spe_color" type="text" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination :pageNum="total" @changePage="getData($event)"></pagination>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
      <el-form :model="dialogForm" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="检查时间" prop="inspectionTime">
          <el-date-picker
            class="form_item"
            v-model="dialogForm.inspectionTime"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="检查中队" prop="checkTeam">
          <el-select class="form_item" v-model="dialogForm.checkTeam" placeholder="请选择">
            <el-option
              v-for="item in teamList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指挥员" prop="commander">

            <el-select class="form_item" v-model="dialogForm.commander" filterable placeholder="请选择">
              <el-option
                v-for="item in commanderList"
                :key="item.id"
                :label="item.realName"
                :value="item.id">
              </el-option>
            </el-select>

        </el-form-item>
        <el-form-item label="地点" prop="address" >
          <el-input class="form_item" v-model="dialogForm.address" placeholder="请输入" @input="locationPlace"/>
          <i class="location-icon" @click="mapFn"></i>
        </el-form-item>
        <div class="map-box" v-show="mapShow">
            <div id="r-result">
                <input type="text" id="suggestId" size="20" value="百度" style="width:150px;" placeholder="请输入..." />
                <!-- <el-button type="text" disabled>搜索</el-button> -->
                <el-button type="primary" @click="mapSelectPlace">确定</el-button>
            </div>
            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
            <div id="l-map"></div>
        </div>


        <el-form-item label="重点单位" prop="keyUnit">
          <el-input class="form_item" v-model="dialogForm.keyUnit" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="重点部位" prop="keyPosition">
          <el-input class="form_item" v-model="dialogForm.keyPosition" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内部设施情况" prop="facilitiesSituation">
          <el-input class="form_item" v-model="dialogForm.facilitiesSituation" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="堆砌物" prop="pile">
          <el-input class="form_item" v-model="dialogForm.pile" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="出入口" prop="entranceExit">
          <el-input class="form_item" v-model="dialogForm.entranceExit" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="消防通道" prop="fireEngineAccess">
          <el-input class="form_item" v-model="dialogForm.fireEngineAccess" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="其他资料" prop="attachment">
          <el-upload
            action="http://shcloud2.wmtechzone.club:50001/apis/sixfamiliarity/uploadattachment"
            multiple
            name="file1"
            :on-success="handleUpload"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">添加附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div style="text-align:center;border-top:1px solid #e0e0e0;padding-top:10px">
          <el-button size="mini" class="cancel_btn" @click="dialogVisible = false">取消</el-button>
          <el-button
            size="mini"
            class="sure_btn"
            :loading="loadingSubmit"
            type="primary"
            @click="submit"
          >发布</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import loadBMap from '../../assets/js/loadBMap.js'
import leftNav from "./leftNav";
import pagination from "../../components/pagination";
import { setCookie, getCookie } from "../../assets/js/cookie.js";
export default {
    name: "SixFamiliar",
        components: {
        leftNav,
        pagination
    },
    data() {
        const validateInspectionTime = (rule, value, callback) => {
          if (!value) return callback(new Error("检查时间不能为空"));
          if (+value < +new Date())
            return callback(new Error("检查时间不能小于当前时间"));
          callback();
        };
        return {
          //loading
          loading: false,
          loadingSubmit: false,

          userId: "",
          form: {
            address: "",
            pageNum: 1,
            rowLength: 20
          },
          list: [],
          total: 0,

          //编辑新增任务
          title: "",
          dialogVisible: false,
          commander: "", //指挥员
          dialogForm: {
            id: "",
            inspectionTime: "",
            checkTeam: "",
            commander: "",
            address: "",
            keyUnit: "",
            keyPosition: "",
            facilitiesSituation: "",
            pile: "",
            entranceExit: "",
            fireEngineAccess: "",
            attachment: ""
          },
          rules: {
            inspectionTime: [
              {
                required: true,
                validator: validateInspectionTime,
                trigger: "change"
              }
            ],
            checkTeam: [
              { required: true, message: "请选择检查中队", trigger: "change" }
            ],
            commander: [
              { required: true, message: "请输入指挥员", trigger: "change" }
            ],
            address: [{ required: true, message: "请填写地点", trigger: "blur" }],
            keyUnit: [
              { required: true, message: "请填写重点单位", trigger: "blur" }
            ]
          },
          fileList: [],

          teamList: [],
          commanderList:[],
          map:null,
          point:{
            lng:"",
            lat:""
          },
          mapShow:false,
          editFlag:false, // 是否是编辑
        };
    },
    created() {
        this.userId = JSON.parse(getCookie("userInfo")).id;
        this.getTeam();
        this.getCommander();
        this.getData();
    },
    methods: {
        mapFn(){
            this.mapShow = !this.mapShow;
            if(!this.editFlag){
                this.mapInit('',this.dialogForm.address);
            }else{
                this.mapInit('edit',this.dialogForm.address);
            }
            
        },
        locationPlace(){
            let vm = this;
            console.log(this.dialogForm.address)
            // 上海市松江区松江南站
            // lng: 121.23673685832692
            // lat: 30.989168824307786
           
            vm.map.centerAndZoom(vm.dialogForm.address, 12);
            var localSearch = new BMap.LocalSearch(vm.map);
            function searchByStationName() {
            　　localSearch.setSearchCompleteCallback(function (searchResult) {
                　　　　 var poi = searchResult.getPoi(0);
                        vm.point.lng = poi.point.lng;
                        vm.point.lat = poi.point.lat;
            　　});
            　　localSearch.search(vm.dialogForm.address);
            }
            console.log(vm.point)
            vm.map.addOverlay(new BMap.Marker(vm.point));    //添加标注
            searchByStationName();
        },
        mapSelectPlace(){ // 地图选点
            this.dialogForm.address = $("#suggestId").val();
        },
        mapInit(type,addr){
            loadBMap('isZkHarwgZspmmnDOBpTGgGDpoMKRBAx').then(() => {
                // 百度地图API功能
                function G(id) {
                    return document.getElementById(id);
                }
                this.map = new BMap.Map('l-map');
                if(addr == ''){
                  this.map.centerAndZoom("上海",12);  
                }else{
                  this.map.centerAndZoom(addr,12);  
                  this.map.addOverlay(new BMap.Marker(this.point));    //添加标注
                }
                
                this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放                 // 初始化地图,设置城市和地图级别。
                var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                    {"input" : "suggestId"
                    ,"location" : this.map
                });

                ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                    var str = "";
                    var _value = e.fromitem.value;
                    var value = "";
                    if (e.fromitem.index > -1) {
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }    
                    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
                    
                    value = "";
                    if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }    
                    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                    G("searchResultPanel").innerHTML = str;
                });

                var myValue;
                ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                var _value = e.item.value;
                    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
                    
                    setPlace();
                });
                let vm = this;
                function setPlace(){
                    vm.map.clearOverlays();    //清除地图上所有覆盖物
                    function myFun(){
                        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                        vm.map.centerAndZoom(pp, 18);
                        console.log(pp)
                        vm.map.addOverlay(new BMap.Marker(pp));    //添加标注
                    }
                    var local = new BMap.LocalSearch(vm.map, { //智能搜索
                      onSearchComplete: myFun
                    });
                    local.search(myValue);
                }

                       
                //单击获取点击的经纬度
                this.map.addEventListener("click",function(e){
                    console.log(e.point.lng + "," + e.point.lat);

                    var gc = new BMap.Geocoder();
                    var new_point= new BMap.Point(e.point.lng,e.point.lat);
                    gc.getLocation(new_point, function(rs){
                        var addComp = rs.addressComponents;
                        //获取详细的地址，精确到街道的名称
                        vm.dialogForm.address = addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                    })
                    vm.point.lng = e.point.lng;
                    vm.point.lat = e.point.lat;
                });

                if(type == 'edit'){
                   
                    this.map.centerAndZoom(this.dialogForm.address, 12);

                    var localSearch = new BMap.LocalSearch(this.map);
                    localSearch.search(this.dialogForm.address);
                    console.log(this.point)
                    this.map.addOverlay(new BMap.Marker(this.point));    //添加标注
                }
                
            })
            .catch(err => {
                console.log('地图加载失败')
            })           
        },
        getData(e) {
          if (e && !isNaN(e)) this.form.pageNum = e;
          this.loading = true;
          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$sixfamiliarity + "/getdata",
            data: qs.stringify({
              address: this.form.address,
              rowLength: this.form.rowLength,
              pageNum: this.form.pageNum
            })
          })
            .then(res => {
              try {
                this.list = res.data.data[0].dataList;
                this.list.map(item => {
                    item.addressName = item.address.split(",")[0];
                })
                this.total = Number(res.data.data[0].totalPages);
              } catch (error) {
                this.list = [];
              }
            })
            .catch(err => {})
            .finally(_ => {
              this.loading = false;
            });
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

        openDialog() {
            this.editFlag = false;
            this.mapShow = false;
            this.title = "新增记录";
            this.dialogVisible = true;
            this.$nextTick(_ => {
                this.$refs.form.resetFields();
                this.commander = "";
                this.fileList = [];
                this.dialogForm.id = "";
            });
            this.mapInit('',this.dialogForm.address);
        },

        getCommander(){
          this.$ajax({
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
              this.commanderList = res.data.data[0].dataList
            })
            .catch(err => {});
        },

        //搜索指挥员
        querySearchAsync(query, callback) {
          if (!query) return callback([]);
          let arr = [];

          this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/userbasic/getdata",
            data: qs.stringify({
              realName: query,
              rowLength: 500,
              pageNum: 1
            })
          })
            .then(res => {
              try {
                arr = res.data.data[0].dataList.map(item => {
                  return {
                    id: item.id,
                    value: item.realName
                  };
                });
              } catch (error) {
                arr = [];
              }
              callback(arr);
            })
            .catch(err => {});
        },

        handleSelectCommander(e) {
          this.dialogForm.commander = e.id;
        },

        handleRemove(file, fileList) {
          this.fileList = fileList;
        },

        handleUpload(res) {
          this.fileList.push({ name: res.data[0].filename });
        },

        edit(e) {
            this.editFlag = true;
            this.mapShow = false;
            this.title = "编辑记录";
            this.dialogForm.id = e.id;
            this.dialogForm.inspectionTime = e.inspectionTime;
            this.dialogForm.checkTeam = e.checkTeam;
            this.commander = e.commanderName;
            this.dialogForm.commander = e.commander;
            this.dialogForm.address = e.addressName;
            this.dialogForm.keyUnit = e.keyUnit;
            this.dialogForm.keyPosition = e.keyPosition;
            this.dialogForm.facilitiesSituation = e.facilitiesSituation;
            this.dialogForm.pile = e.pile;
            this.dialogForm.entranceExit = e.entranceExit;
            this.dialogForm.fireEngineAccess = e.fireEngineAccess;
            if (!e.attachment) {
                this.fileList = [];
            } else {
                this.fileList = e.attachment.split(",").map(item => {
                    return {
                        name: item
                    };
                });
            }

            this.point.lng = e.address.split(',')[1];
            this.point.lat = e.address.split(',')[2];
            this.dialogForm.attachment = e.attachment;
            this.dialogVisible = true;
            this.mapInit('edit',this.dialogForm.address);
        },

        //删除
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
                url: this.$sixfamiliarity + "/deldata",
                data: qs.stringify({
                  id: e.id
                })
              })
                .then(res => {
                  if (res.data.code === "200") {
                    this.$message.success("删除成功");
                    this.getData();
                  }
                })
                .catch(err => {});
            })
            .catch(() => {});
        },

        remoteMethod(e){
          if(!e) return this.commanderList=[]
           this.$ajax({
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.$dataSetUrl + "/apis/userbasic/getdata",
            data: qs.stringify({
              realName: e,
              rowLength: 500,
              pageNum: 1
            })
          })
            .then(res => {
              try {
                this.commanderList = res.data.data[0].dataList.map(item => {
                  return {
                    id: item.id,
                    value: item.realName
                  };
                });
              } catch (error) {
                this.commanderList = [];
              }
            })
            .catch(err => {});
        },

        submit() {
          this.$refs.form.validate(valid => {
            if (!valid) return;

            let params = {
              inspectionTime: this.getTime(this.dialogForm.inspectionTime),
              checkTeam: this.dialogForm.checkTeam,
              commander: this.dialogForm.commander,
              address: this.dialogForm.address + ',' + this.point.lng + ',' + this.point.lat,
              keyUnit: this.dialogForm.keyUnit,
              keyPosition: this.dialogForm.keyPosition,
              facilitiesSituation: this.dialogForm.facilitiesSituation,
              pile: this.dialogForm.pile,
              entranceExit: this.dialogForm.entranceExit,
              fireEngineAccess: this.dialogForm.fireEngineAccess,
              attachment: this.fileList.map(item => item.name).join(","),
              createUserId: this.userId,
              updateUserId: this.userId
            };
            let url = "";
            if (this.title === "编辑记录") {
              params.id = this.dialogForm.id;
              url = this.$sixfamiliarity + "/updatedata";
            } else if (this.title === "新增记录") {
              url = this.$sixfamiliarity + "/setdata";
            }
            this.loadingSubmit = true;
            this.$ajax({
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: url,
              data: qs.stringify(params)
            })
              .then(res => {
                if (res.data.code === "200") {
                  this.$message.success("操作成功");
                  this.getData();
                  this.dialogVisible = false;
                }
              })
              .catch(err => {})
              .finally(_ => {
                this.loadingSubmit = false;
              });
          });
        },

        getTime(time, fmt = "yyyy-MM-dd") {
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
        }
    }
};
</script>
<style scoped lang="less">
    .el-dialog{
        position:relative;
        .location-icon{
            width: 20px;
            height: 20px;
            display: inline-block;
            background:url(../../assets/images/location-icon.png) no-repeat;
            background-size:100% 100%;
            vertical-align: middle;
            margin-left: 10px;
        }
        .map-box{
            position:absolute;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 502px;
            top: 0;
            background: #fff;
            #l-map{height:300px;width:100%;}
            #r-result{
                width:100%;
                padding-top:26px;
                margin-bottom: 13px;
                #suggestId{
                    width: 288.31px!important;
                    height: 30.03px;
                    border-radius: 4px;
                    background-color: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(210, 213, 224, 1);
                    margin:0 12px 0 34px;
                    font-size: 14px;
                    text-indent: 12px;
                }
                .el-button--primary{
                    width: 80px;
                    height: 32px;
                    line-height: 32px;
                    padding:0;
                    background:#496DFF;
                    font-size: 14px;
                }
                .el-button--text{
                    font-size: 14px;
                    color: #333;
                }
            }
        }
    }

</style>
<style>
.el-table__header th {
  background: #f8f8f9;
  color: #333333;
}
.alink_dropdown {
  padding: 0;
}
.alink_dropdown a {
  display: block;
  padding: 0 15px;
}
</style>
<style scoped>
.form_item {
  width: 300px !important;
}
.form_item /deep/ .el-input__inner {
  text-align: left;
}

.spe_color {
  color: #486dff;
}
.sure_btn {
  background: #486dff;
  border-color: #486dff;
}
</style>
