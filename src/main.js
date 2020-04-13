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
window.$ = $;
window.tool = tool;


Vue.config.productionTip = false;
Vue.prototype.$URL = 'http://shcloud.wmtechzone.club:12007';//瞿健接口
Vue.prototype.$URLSpare = 'http://shcloud2.wmtechzone.club:50001';//德哥接口

Vue.prototype.$dataSetUrl = 'http://shcloud2.wmtechzone.club:50001';// 数据设置接口---ader
Vue.prototype.$dataSetUrlY = 'http://shcloud.wmtechzone.club:12007';// 数据设置接口---严
Vue.prototype.$dataSetUrlQ = 'http://shcloud.wmtechzone.club:12007/xf-unit';// 数据设置接口---瞿健

Vue.prototype.$combatUrl = 'http://shcloud.wmtechzone.club:12007/xf-unit'
Vue.prototype.$sixfamiliarity = 'http://shcloud2.wmtechzone.club:50001/apis/sixfamiliarity'

// 静安
var apiPath = {
	login: Vue.prototype.$dataSetUrlY + '/xf-unit/login', //登录
	getDept: Vue.prototype.$dataSetUrlY + '/xf-unit/selectDept', // 获取部门
	getStore: Vue.prototype.$dataSetUrlY + '/xf-unit/getStorehouseList', // 获取仓库
	addStore: Vue.prototype.$dataSetUrlY + '/xf-unit/addStorehouse', // 添加仓库
	getCarInfo: Vue.prototype.$dataSetUrlY + '/xf-unit/getTruckInfo', // 获取车辆信息
	modifyCarInfo: Vue.prototype.$dataSetUrlY + '/xf-unit/updateTruckByNumber', // 修改车辆信息
	equipmentType: Vue.prototype.$dataSetUrlY + '/xf-unit/childEquipmentType', // 装备分类
	equipmentList: Vue.prototype.$dataSetUrlY + '/xf-unit/getEquipmentList', // 装备列表
	addEquipment: Vue.prototype.$dataSetUrlY + '/xf-unit/addEquipment', // 录入列表
	equipmentDetail: Vue.prototype.$dataSetUrlY + '/xf-unit/getEquipmentDetail', // 装备详情
	editeEquipmentDetail: Vue.prototype.$dataSetUrlY + '/xf-unit/updateEquipmentDetail', // 修改装备详情
	uploadEquipmentImg: Vue.prototype.$dataSetUrlY + '/xf-unit/uploadEquipmentImg', // 装备上传图片
	uploadEquipmentRepairVedio: Vue.prototype.$dataSetUrlY + '/xf-unit/uploadEquipmentRepairVedio', // 装备上传维修视频
	uploadEquipmentUseVedio: Vue.prototype.$dataSetUrlY + '/xf-unit/uploadEquipmentUseVedio', // 装备上传使用视频
	deleteEquipmentVedio: Vue.prototype.$dataSetUrlY + '/xf-unit/deleteEquipmentVedio', // 删除视频
	getEquipmentRepairRecordList: Vue.prototype.$dataSetUrlY + '/xf-unit/getEquipmentRepairRecordList', // 装备维修记录
	addEquipmentRepairRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/addEquipmentRepairRecord', // 装备维修记录新增
	updateEquipmentRepairRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/updateEquipmentRepairRecord', // 装备维修记录编辑
	getEquipmentUseRecordList: Vue.prototype.$dataSetUrlY + '/xf-unit/getEquipmentUseRecordList', // 装备使用记录
	addEquipmentUseRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/addEquipmentUseRecord', // 装备使用记录新增
	updateEquipmentUseRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/updateEquipmentUseRecord', // 装备使用记录编辑
	getTruckRepairRecordList: Vue.prototype.$dataSetUrlY + '/xf-unit/getTruckRepairRecordList', // 车辆维修记录
	addTruckRepairRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/addTruckRepairRecord', // 车辆维修记录新增
	updateTruckRepairRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/updateTruckRepairRecord', // 车辆维修记录编辑
	getTruckCheckRecordList: Vue.prototype.$dataSetUrlY + '/xf-unit/getTruckCheckRecordList', // 车辆检查记录
	addTruckCheckRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/addTruckCheckRecord', // 车辆检查记录新增
	updateTruckCheckRecord: Vue.prototype.$dataSetUrlY + '/xf-unit/updateTruckCheckRecord', // 车辆检查记录编辑
}
window.apiPath = apiPath
Vue.prototype.$publicFn = '';

Vue.prototype.$conversionTime = (data) => {
	let time = '';
	if (data) {
		let year = data.getFullYear();
		let month = (data.getMonth() + 1) > 9 ? (data.getMonth() + 1) : ('0' + (data.getMonth() + 1));
		let date = data.getDate() > 9 ? data.getDate() : ('0' + data.getDate());
		let hours = data.getHours() > 9 ? data.getHours() : ('0' + data.getHours());
		let minutes = data.getMinutes() > 9 ? data.getMinutes() : ('0' + data.getMinutes());
		let seconds = data.getSeconds() > 9 ? data.getSeconds() : ('0' + data.getSeconds());
		time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
	}
	return time;
};
// 百度地图样式定制start
Vue.prototype.$MapStyle= [
	{
		"featureType": "land",
		"elementType": "geometry",
		"stylers": {
			"color": "#f5f6f7ff"
		}
	}, {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": {
			"color": "#c4d7f5ff"
		}
	}, {
		"featureType": "green",
		"elementType": "geometry",
		"stylers": {
			"color": "#dcf2d5ff"
		}
	}, {
		"featureType": "highway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffe59eff"
		}
	}, {
		"featureType": "highway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#f5d48cff"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#fff6ccff"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#fff6ccff"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#fff6ccff"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#fff6ccff"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#f2dc9dff"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#f2dc9dff"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#f2dc9dff"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#f2dc9dff"
		}
	}, {
		"featureType": "building",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#e6ebf0ff"
		}
	}, {
		"featureType": "building",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#d8e2ebff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#dfe4ebff"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#dfe4ebff"
		}
	}, {
		"featureType": "local",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "local",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#dfe4ebff"
		}
	}, {
		"featureType": "scenicspotsway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "scenicspotsway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#dfe4ebff"
		}
	}, {
		"featureType": "universityway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#dfe4ebff"
		}
	}, {
		"featureType": "universityway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "vacationway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#dfe4ebff"
		}
	}, {
		"featureType": "vacationway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "town",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "18"
		}
	}, {
		"featureType": "town",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "town",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "highway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "highway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff60"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "arterial",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "arterial",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "arterial",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "highway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "local",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "local",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "local",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "manmade",
		"elementType": "geometry",
		"stylers": {
			"color": "#f5f6f7ff"
		}
	}, {
		"featureType": "subway",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subway",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subwaylabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-13"
		}
	}, {
		"featureType": "subwaylabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-13"
		}
	}, {
		"featureType": "subwaylabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-13"
		}
	}, {
		"featureType": "railway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "10",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "10",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "10",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "district",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "district",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "city",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "city",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "city",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "country",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "country",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "continent",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#a77726ff"
		}
	}, {
		"featureType": "continent",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "18",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "18",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "18",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "hotellabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"level": "14",
			"fontsize": "22",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"level": "15",
			"fontsize": "22",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"level": "16",
			"fontsize": "22",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "airportlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffffff"
		}
	}, {
		"featureType": "manmade",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "manmade",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "education",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "transportationlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "manmade",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "scenicspots",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#ab76b6ff"
		}
	}, {
		"featureType": "scenicspots",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "medical",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "transportation",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}
	];

Vue.prototype.$MapStyleBig= [
	{
		"featureType": "land",
		"elementType": "geometry",
		"stylers": {
			"color": "#113549ff"
		}
	}, {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": {
			"color": "#c4d7f54d"
		}
	}, {
		"featureType": "green",
		"elementType": "geometry",
		"stylers": {
			"color": "#0f1c54ff"
		}
	}, {
		"featureType": "highway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#2a2a54ff"
		}
	}, {
		"featureType": "highway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#2a2a54ff"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#2a2a54ff"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#2a2a54ff"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#2a2a54ff"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#0f1c54ff"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#0f1c54ff"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#0f1c54ff"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#0f1c54ff"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#113549ff"
		}
	}, {
		"featureType": "building",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#113549ff"
		}
	}, {
		"featureType": "building",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#ff00001a"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#4a2a54ff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#4a2a54ff"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#1f1c54ff"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#291c54ff"
		}
	}, {
		"featureType": "local",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#111c54ff"
		}
	}, {
		"featureType": "local",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "scenicspotsway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "scenicspotsway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "universityway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "universityway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "vacationway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "vacationway",
		"elementType": "geometry.fill",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "town",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "18"
		}
	}, {
		"featureType": "town",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#666666ff"
		}
	}, {
		"featureType": "town",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "highway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "highway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff60"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "arterial",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "arterial",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#c0792dff"
		}
	}, {
		"featureType": "arterial",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "cityhighway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "provincialway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "highway",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "tertiaryway",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "fourlevelway",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "local",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "local",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "local",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "lifeservicelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "carservicelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "financelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "manmade",
		"elementType": "geometry",
		"stylers": {
			"color": "#213549ff"
		}
	}, {
		"featureType": "subway",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subway",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "subwaylabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-13"
		}
	}, {
		"featureType": "subwaylabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-13"
		}
	}, {
		"featureType": "subwaylabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-13"
		}
	}, {
		"featureType": "railway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "10",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "10",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "10",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "10-15"
		}
	}, {
		"featureType": "district",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "district",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#333333ff"
		}
	}, {
		"featureType": "city",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "city",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#333333ff"
		}
	}, {
		"featureType": "city",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "country",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "country",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "continent",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#a77726ff"
		}
	}, {
		"featureType": "continent",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#200c54ff"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"stylers": {
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-17"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "estatelabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-16"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"stylers": {
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-17"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"stylers": {
			"level": "18",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "18",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "17",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "18",
			"curZoomRegionId": "0",
			"curZoomRegion": "13-18"
		}
	}, {
		"featureType": "hotellabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"level": "14",
			"fontsize": "22",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"level": "15",
			"fontsize": "22",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"level": "16",
			"fontsize": "22",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "14-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"stylers": {
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "15",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "16",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-16"
		}
	}, {
		"featureType": "shoppinglabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "hotellabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "restaurantlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "governmentlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "companylabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "24"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "medicallabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "scenicspotslabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "airportlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#666666ff"
		}
	}, {
		"featureType": "manmade",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#9ca0a3ff"
		}
	}, {
		"featureType": "manmade",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#ffffff00"
		}
	}, {
		"featureType": "education",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "transportationlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "12-13"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"stylers": {
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "11",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "12",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "13",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "educationlabel",
		"elementType": "labels.icon",
		"stylers": {
			"visibility": "off",
			"level": "14",
			"curZoomRegionId": "0",
			"curZoomRegion": "11-14"
		}
	}, {
		"featureType": "transportationlabel",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "manmade",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "scenicspots",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#ab76b6ff"
		}
	}, {
		"featureType": "scenicspots",
		"elementType": "labels.text",
		"stylers": {
			"fontsize": "23"
		}
	}, {
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "off"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "nationalway",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "arterial",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "medical",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "transportation",
		"elementType": "geometry",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "entertainmentlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}, {
		"featureType": "businesstowerlabel",
		"elementType": "labels",
		"stylers": {
			"visibility": "on"
		}
	}
	];

// 百度地图样式定制end
//全屏方法start
Vue.prototype.$largeScreen=()=>{
	var docElm = document.documentElement;
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen();
	} else if (docElm.mozRequestFullScreen) {
		docElm.mozRequestFullScreen();
	} else if (docElm.webkitRequestFullScreen) {
		docElm.webkitRequestFullScreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	}
};
//全屏方法end

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
});

