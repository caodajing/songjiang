<!--执勤动态-->
<template>
    <div class="duty-dynamics" :class="{active:largeScreenState}">
        <div class="head-title">
            <span>松一中队消防救援站执勤动态牌</span>
            <el-button v-show="!largeScreenState" type="info" icon="el-icon-plus" @click="openPopup(false)">添加车辆</el-button>
            <el-button v-show="!largeScreenState" type="primary" @click="screenButton">投屏</el-button>
        </div>

        <div class="vehicle-list-box scroll-bar-style">
            <table class="vehicle-list" cellspacing="0">
                <tr v-for="item in tableList">
                    <td class="first-td">
                        <p>{{item.carName+'（待命）'}}</p>
                        <div class="each-vehicle"></div>
                        <span>{{item.carProductionType}}</span>
                    </td>
                    <td v-for="(temp,index) in item.dutyDynamicsItemList">
                        <p>{{tableHead[index]}}</p>
                        <div class="each-people" v-if="temp.userId&&temp.photo" :style="{backgroundImage:picturePathFn(temp)}">
                            <i class="el-icon-delete" @click="deletePersonnel(temp)"></i>
                        </div>
                        <div class="each-people on-photo" v-if="temp.userId&&!temp.photo">
                            <i class="el-icon-delete" @click="deletePersonnel(temp)"></i>
                        </div>
                        <div class="each-people-no" @click="openPopup(temp)" v-if="!temp.userId">
                            <i class="el-icon-circle-plus-outline"></i>
                        </div>
                        <span>{{temp.realName}}</span>
                    </td>
                </tr>
            </table>
        </div>

        <el-dialog
                title="添加/选择执勤车辆"
                :visible.sync="popupSwitch"
                width="30%">
            <div class="popup-box">
                <span>车辆名</span>
                <el-select v-model="dutyVehicle" filterable placeholder="请选择">
                    <el-option
                            v-for="item in dutyVehicleList"
                            :key="item.id"
                            :label="item.productionName"
                            :value="item.id">
                        <span>{{ item.productionName + ' - '}}</span>
                        <span>{{ item.carNumber }}</span>
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="popupSwitch = false">取 消</el-button>
                <el-button type="primary" @click="addDutyVehicle">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="添加/选择执勤人员"
                :visible.sync="popupSwitch1"
                width="30%">
            <div class="popup-box">
                <span>人员名</span>
                <el-select v-model="personnel" filterable placeholder="请选择">
                    <el-option
                            v-for="item in personnelList"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="popupSwitch1=false">取 消</el-button>
                <el-button type="primary" @click="addPersonnel">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "dutyDynamics",
        data() {
            return {
                largeScreenState: false,
                publicData: 1,//公共参数，改变子组件下的方法重新调用

                dutyVehicle: '',
                dutyVehicleList: [],//新增执勤车可选车辆列表

                personnel: '',
                personnelList: [],

                tableHead: ['指挥员', '驾驶员', '通讯员', '一名', '二名', '三名', '四名', '五名', '六名', '七名'],
                tableList: [],

                ajaxState: false,//请求状态
                popupSwitch: false,
                popupSwitch1: false,
                tempData: ''
            }
        },
        created() {
            window.$publicFn2 = this.headSwitch;
        },
        mounted() {
            document.onkeyup = (event) => {
                let e = event || window.event;
                let keyCode = e.keyCode || e.which;
                switch (keyCode) {
                    case 27:
                        this.largeScreenState = false;
                        break;
                    default:
                        break;
                }
            }
        },
        beforeDestroy() {
            document.onkeyup = null;
        },
        methods: {
            getDutyDynamics() {//查询
                this.$ajax.get(this.$URL + '/xf-unit/dutyDynamic/getDutyDynamic', {
                    params: {
                        groupId: this.publicData.groupId
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.tableList = res.data.data;
                    } else {
                        this.tableList=[];
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            addDutyVehicle() {//添加执勤车辆
                let tempData = null;
                this.dutyVehicleList.map((e) => {
                    if (e.id == this.dutyVehicle) {
                        tempData = e;
                    }
                });
                if (!tempData) {
                    this.$message({
                        showClose: true,
                        message: '请选择执勤车辆,谢谢',
                        type: 'error'
                    });
                    return false;
                }
                if (this.ajaxState) {
                    return false;
                }
                let params = new FormData();
                params.append('groupId ', this.publicData.groupId);
                params.append('carName', tempData.carName);
                params.append('carProductionType ', tempData.productionType);
                params.append('carId', tempData.id);
                params.append('carNumber', tempData.carNumber);
                this.ajaxState = true;
                this.$ajax({
                    method: 'post',
                    url: this.$URL + '/xf-unit/dutyDynamic/addDutyDynamic',
                    data: params
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.popupSwitch = false;
                        this.$notify({
                            title: '成功',
                            message: '车辆添加成功',
                            type: 'success'
                        });
                        this.getDutyDynamics();
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    this.ajaxState = false;
                }).catch((error) => {
                    this.ajaxState = false;
                    console.log(error);
                })
            },
            getDutyVehicle() {//获取车辆列表
                this.$ajax.get(this.$URL + '/xf-unit/car/get', {
                    params: {
                        groupId: this.publicData.groupId
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.dutyVehicleList = res.data.data;
                    } else {
                        this.dutyVehicleList = [];
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getDeptPersonnel() {//获取部门人员
                this.$ajax.post(this.$URLSpare + '/apis/userbasic/getdata',
                    'rowLength=10000&pageNum=1&groupId=' + this.publicData.groupId,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.personnelList = res.data.data[0].dataList;
                    } else {
                        this.personnelList = [];
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            addPersonnel() {//添加人员
                let params = new FormData();
                params.append('efDutyDynamicsId ', this.tempData.efDutyDynamicsId);
                params.append('type', this.tempData.type);
                params.append('id', this.tempData.id);
                params.append('userId', this.personnel);//选择的用户的ID
                this.$ajax({
                    method: 'post',
                    url: this.$URL + '/xf-unit/dutyDynamic/addDutyDynamicItem',
                    data: params
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.popupSwitch1 = false;
                        this.$notify({
                            title: '成功',
                            message: '人员添加成功',
                            type: 'success'
                        });
                        this.getDutyDynamics();
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            deletePersonnel(data) {//添加人员
                let params = new FormData();
                params.append('id', data.id);
                this.$ajax({
                    method: 'post',
                    url: this.$URL + '/xf-unit/dutyDynamic/deleteDutyDynamicItem',
                    data: params
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '人员删除成功',
                            type: 'success'
                        });
                        this.getDutyDynamics();
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            openPopup(data) {//开启弹窗
                if (data) {
                    this.tempData = data;
                    this.personnel = '';
                    this.popupSwitch1 = true;
                } else {
                    this.dutyVehicle = '';
                    this.popupSwitch = true
                }
            },
            screenButton() {
                this.largeScreenState = true;
                this.$largeScreen();
            },
            picturePathFn(data) {
                return 'url(' + this.$URLSpare + '/' + data.photo + ')';
            },
            headSwitch(data) {
                this.publicData = data;
                this.getDutyDynamics();
                this.getDutyVehicle();
                this.getDeptPersonnel();
            },
        }
    }
</script>

<style scoped lang="less">
    .duty-dynamics {
        height: 100%;
        background-color: #1b2871;
        color: #fff;

        .head-title {
            padding: 0.4rem;
            text-align: center;

            span {
                margin-right: 2rem;
                font-size: 2rem;
            }

            .el-button {
                font-size: 1.2rem;
                vertical-align: super;
            }
        }

        .vehicle-list-box {
            margin: 0 auto;
            width: 90%;
            max-height: calc(100% - 80px);
            overflow-y: auto;
            float: none;
        }

        .vehicle-list {
            width: 100%;
            text-align: center;

            td {
                position: relative;
                width: calc((100% - 160px) / 9);
                padding: 2.2rem 0;

                > span {
                    position: absolute;
                    left: 0;
                    bottom: 0.5rem;
                    width: 100%;
                    height: 22px;
                    line-height: 22px;
                    background-color: rgba(47, 90, 187, 1);
                }
            }

            .first-td {
                width: 160px;
            }

            p {
                position: absolute;
                top: 0.5rem;
                width: 100%;
                height: 22px;
                line-height: 22px;
                background-color: rgba(47, 90, 187, 1);
            }

            .each-vehicle {
                margin: 0 auto;
                width: 160px;
                height: 104px;
                background-color: #fff;
                background-image: url("../../assets/images/vehicle-bg.png");
                background-repeat: no-repeat;
                background-size: cover;
            }

            .each-people {
                position: absolute;
                right: 0;
                top: 50%;
                width: 80%;
                height: 104px;
                transform: translateY(-50%);
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;

                .el-icon-delete {
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    opacity: 0;
                    background-color:rgba(0,0,0,0.4);
                    transition: all 0.25s ease-in-out;
                    cursor: pointer;
                }

                &.on-photo{
                    background-image: url("../../assets/images/on-photo.png");
                }

                &:hover .el-icon-delete {
                    opacity: 1;
                }
            }

            .each-people-no {
                position: absolute;
                right: 0;
                top: 50%;
                width: 80%;
                height: 104px;
                transform: translateY(-50%);
                background-color: #fff;
                cursor: pointer;

                i {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    color: rgba(73, 109, 255, 1);
                }
            }
        }

        &.active {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1100;
        }
    }

    .popup-box {
        text-align: center;

        > span {
            margin-right: 1rem;
        }
    }
</style>
