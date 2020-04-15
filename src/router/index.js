import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

import homePage from '@/Page/HomePage/homePage'

import dutySquadron from '@/Page/Squadron/dutySquadron'

import assistMakePolicy from '@/Page/Auxiliary/assistMakePolicy'

import dutyDynamics from '@/Page/beOnDuty/dutyDynamics'

import combatTraning from '@/Page/Preparedness/training'
import combatTraningIndex from '@/Page/Preparedness/traningIndex'
import combatTraningDetail from '@/Page/Preparedness/traningDetail'
import sixFamiliar from '@/Page/Preparedness/sixFamiliar'

import summingUp from '@/Page/SumUp/summingUp'

// 数据设置  

// 人员设置
import personSetIndex from '@/Page/DataSetup/personSet/index'
import grassRootsDetail from '@/Page/DataSetup/personSet/grassRootsDetail' // 基层干部详情
import governmentDetail from '@/Page/DataSetup/personSet/governmentDetail' // 政府专职消防员详情
import activeDetail from '@/Page/DataSetup/personSet/activeDetail' // 现役消防员详情
import grassRootsCompare from '@/Page/DataSetup/personSet/grassRootsCompare' // 基层干部对比
import governmentCompare from '@/Page/DataSetup/personSet/governmentCompare' // 政府专职对比
import activeCompare from '@/Page/DataSetup/personSet/activeCompare' // 现役对比
// 仓库管理  
import storeManageIndex from '@/Page/DataSetup/storeManage/index'
import storeManageStoreDetail from '@/Page/DataSetup/storeManage/storeDetail'
import storeManageCarDetail from '@/Page/DataSetup/storeManage/carDetail'
import storeManageDetail from '@/Page/DataSetup/storeManage/detail'
// 车辆设置  
import carSetIndex from '@/Page/DataSetup/carSet/index'
// 装备设置   
import equipmentSetIndex from '@/Page/DataSetup/equipmentSet/index'
import equipmentSetDetail from '@/Page/DataSetup/equipmentSet/detail'

// 水源  
import waterSourceIndex from '@/Page/DataSetup/waterSource/index'
// 接警信息 
import alarmInfoIndex from '@/Page/DataSetup/alarmInfo/index'
// 战时快报  
import newsIndex from '@/Page/DataSetup/news/index'
import newsDetail from '@/Page/DataSetup/news/detail'
// 训练类型 
import trainTypeIndex from '@/Page/DataSetup/trainType/index'
// 火患分析 
import fireIndex from '@/Page/DataSetup/fire/index'
import fireDetail from '@/Page/DataSetup/fire/detail'









import bigScreenHome from '@/Page/LargeScreen/bigScreenHome'
import bigScreenSquadron from '@/Page/LargeScreen/bigScreenSquadron'
import bigScreenAuxiliary from '@/Page/LargeScreen/bigScreenAuxiliary'
import bigScreenMode from '@/Page/LargeScreen/bigScreenMode'

import versionIteration from '@/components/versionIteration'


import { getCookie } from '../assets/js/cookie.js'

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: '/xf_efficiency_evaluation/',
  routes: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
      children: [
        {
          path: '/bigScreenHome',
          name: 'bigScreenHome',
          meta: {
            requireAuth: true,
          },
          component: bigScreenHome,
        },
        {
          path: '/bigScreenSquadron',
          name: 'bigScreenSquadron',
          meta: {
            requireAuth: true,
          },
          component: bigScreenSquadron,
        },
        {
          path: '/bigScreenAuxiliary',
          name: 'bigScreenAuxiliary',
          meta: {
            requireAuth: true,
          },
          component: bigScreenAuxiliary,
        },
        {
          path: '/homePage',
          name: 'homePage',
          meta: {
            requireAuth: true,
          },
          component: homePage,
        },
        {
          path: '/dutySquadron',
          name: 'dutySquadron',
          meta: {
            requireAuth: true,
          },
          component: dutySquadron,
        },
        {
          path: '/assistMakePolicy',
          name: 'assistMakePolicy',
          meta: {
            requireAuth: true,
          },
          component: assistMakePolicy,
        },
        {
          path: '/dutyDynamics',
          name: 'dutyDynamics',
          meta: {
            requireAuth: true,
          },
          component: dutyDynamics,
        },
        /**战备工作路由 */
        {
          path: '/training',
          name: 'traning',
          component: combatTraning,
          redirect: '/traning/index',
          children: [
            {
              path: 'index',
              name: 'Training Index',
              component: combatTraningIndex
            },
            {
              path: 'detail',
              name: 'Training Detail',
              component: combatTraningDetail
            }
          ],
        },
        {
          path: '/sixFamiliar/index',
          name: 'sixFamiliar',
          component: sixFamiliar
        },

        {
          path: '/summingUp',
          name: 'summingUp',
          meta: {
            requireAuth: true,
          },
          component: summingUp,

        },
        {
          path: '/personSet/index',
          name: 'personSetIndex',
          component: personSetIndex,
        },
        {
          path: '/personSet/grassRootsDetail',
          name: 'grassRootsDetail',
          component: grassRootsDetail,
        },
        {
          path: '/personSet/governmentDetail',
          name: 'governmentDetail',
          component: governmentDetail,
        },
        {
          path: '/personSet/activeDetail',
          name: 'activeDetail',
          component: activeDetail,
        },
        {
          path: '/personSet/grassRootsCompare',
          name: 'grassRootsCompare',
          component: grassRootsCompare,
        },
        {
          path: '/personSet/governmentCompare',
          name: 'governmentCompare',
          component: governmentCompare,
        },
        {
          path: '/personSet/activeCompare',
          name: 'activeCompare',
          component: activeCompare,
        },
        {
          path: '/storeManage/index',
          name: 'storeManageIndex',
          component: storeManageIndex,
        },
        {
          path: '/storeManage/storeDetail',
          name: 'storeManageStoreDetail',
          component: storeManageStoreDetail,
        },
        {
          path: '/storeManage/carDetail',
          name: 'storeManageCarDetail',
          component: storeManageCarDetail,
        },
        {
          path: '/storeManage/detail',
          name: 'storeManageDetail',
          component: storeManageDetail,
        },
        {
          path: '/carSet/index',
          name: 'carSetIndex',
          component: carSetIndex,
        },
        {
          path: '/equipmentSet/index',
          name: 'equipmentSetIndex',
          component: equipmentSetIndex,
        },
        {
          path: '/equipmentSet/detail',
          name: 'equipmentSetDetail',
          component: equipmentSetDetail,
        },
        {
          path: '/waterSource/index',
          name: 'waterSourceIndex',
          component: waterSourceIndex,
        },
        {
          path: '/alarmInfo/index',
          name: 'alarmInfoIndex',
          component: alarmInfoIndex,
        },
        {
          path: '/news/index',
          name: 'newsIndex',
          component: newsIndex,
        },
        {
          path: '/news/detail',
          name: 'newsDetail',
          component: newsDetail,
        },
        {
          path: '/trainType/index',
          name: 'trainTypeIndex',
          component: trainTypeIndex,
        },
        {
          path: '/fire/index',
          name: 'fireIndex',
          component: fireIndex,
        },
        {
          path: '/fire/detail',
          name: 'fireDetail',
          component: fireDetail,
        },
        {
          path: '/bigScreenMode',
          name: 'bigScreenMode',
          meta: {
            requireAuth: true,
          },
          component: bigScreenMode,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/versionIteration',
      name: 'versionIteration',
      component: versionIteration
    },
    {
      path: "*",
      redirect: "/homePage"
    }
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
      if (getCookie('token')) {// 判断是否登录
        next()
      } else {// 没登录则跳转到登录界面
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  });
export default router
