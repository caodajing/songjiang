// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import tool from './assets/js/Tool.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/iconFont/iconfont.css'
import './assets/dataSetIconFont/iconfont.css'

Vue.use(ElementUI);

Vue.prototype.$ajax = axios;
import qs from 'qs';
window.qs = qs;
window.$=$;
window.tool = tool;


Vue.config.productionTip = false;
Vue.prototype.$URL='http://shcloud.wmtechzone.club:12007';//瞿健接口
Vue.prototype.$URLSpare='';//德哥接口

Vue.prototype.$dataSetUrl='http://shcloud2.wmtechzone.club:50001';// 数据设置接口---ader
Vue.prototype.$dataSetUrlY='http://183.131.85.218:12007';// 数据设置接口---严
Vue.prototype.$dataSetUrlQ='http://x3xspf.natappfree.cc';// 数据设置接口---瞿健

// 静安
var apiPath = {  
	login: Vue.prototype.$dataSetUrlY + '/songjiangxn/login', //登录
	getDept: Vue.prototype.$dataSetUrlY + '/songjiangxn/selectDept' , // 获取部门
	getStore: Vue.prototype.$dataSetUrlY + '/songjiangxn/getStorehouseList' , // 获取仓库
	addStore: Vue.prototype.$dataSetUrlY + '/songjiangxn/addStorehouse' , // 添加仓库
	getCarInfo: Vue.prototype.$dataSetUrlY + '/songjiangxn/getTruckInfo' , // 获取车辆信息
	modifyCarInfo: Vue.prototype.$dataSetUrlY + '/songjiangxn/updateTruckByNumber' , // 修改车辆信息
	equipmentType: Vue.prototype.$dataSetUrlY + '/songjiangxn/childEquipmentType' , // 装备分类
	equipmentList: Vue.prototype.$dataSetUrlY + '/songjiangxn/getEquipmentList' , // 装备列表
	addEquipment: Vue.prototype.$dataSetUrlY + '/songjiangxn/addEquipment' , // 录入列表
	equipmentDetail: Vue.prototype.$dataSetUrlY + '/songjiangxn/getEquipmentDetail' , // 装备详情
	editeEquipmentDetail: Vue.prototype.$dataSetUrlY + '/songjiangxn/updateEquipmentDetail' , // 修改装备详情
	uploadEquipmentImg: Vue.prototype.$dataSetUrlY + '/songjiangxn/uploadEquipmentImg' , // 装备上传图片
	uploadEquipmentRepairVedio: Vue.prototype.$dataSetUrlY + '/songjiangxn/uploadEquipmentRepairVedio' , // 装备上传维修视频
	uploadEquipmentUseVedio: Vue.prototype.$dataSetUrlY + '/songjiangxn/uploadEquipmentUseVedio' , // 装备上传使用视频
	deleteEquipmentVedio: Vue.prototype.$dataSetUrlY + '/songjiangxn/deleteEquipmentVedio' , // 删除视频
	getEquipmentRepairRecordList: Vue.prototype.$dataSetUrlY + '/songjiangxn/getEquipmentRepairRecordList' , // 装备维修记录
	addEquipmentRepairRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/addEquipmentRepairRecord' , // 装备维修记录新增
	updateEquipmentRepairRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/updateEquipmentRepairRecord' , // 装备维修记录编辑
	getEquipmentUseRecordList: Vue.prototype.$dataSetUrlY + '/songjiangxn/getEquipmentUseRecordList' , // 装备使用记录
	addEquipmentUseRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/addEquipmentUseRecord' , // 装备使用记录新增
	updateEquipmentUseRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/updateEquipmentUseRecord' , // 装备使用记录编辑
	getTruckRepairRecordList: Vue.prototype.$dataSetUrlY + '/songjiangxn/getTruckRepairRecordList' , // 车辆维修记录
	addTruckRepairRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/addTruckRepairRecord' , // 车辆维修记录新增
	updateTruckRepairRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/updateTruckRepairRecord' , // 车辆维修记录编辑
	getTruckCheckRecordList: Vue.prototype.$dataSetUrlY + '/songjiangxn/getTruckCheckRecordList' , // 车辆检查记录
	addTruckCheckRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/addTruckCheckRecord' , // 车辆检查记录新增
	updateTruckCheckRecord: Vue.prototype.$dataSetUrlY + '/songjiangxn/updateTruckCheckRecord' , // 车辆检查记录编辑
}
window.apiPath = apiPath
Vue.prototype.$publicFn='';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

