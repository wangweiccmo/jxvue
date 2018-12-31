import Vue from "vue";
import Router from "vue-router";

import Login from './views/Login/Login.vue';
import Reg from './views/Reg/Reg.vue';
// 异步路由
const Enrollment = () => import(/* webpackChunkName: "group-enrollment" */ './views/Enrollment/Enrollment.vue');

// 首页
import Home from './views/Home/Home.vue';
// 首页-首页
const HomeIndex = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/HomeIndex.vue');
// 首页-校园基础应用
const HomeBase = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/HomeBase.vue');
// 首页-校园基础应用-首页
const HomeBaseHome = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/HomeBase/Home.vue');
// 首页-校园基础应用-学生注册
const HomeBaseStudentReg = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/HomeBase/StudentReg.vue');
// 首页-校园基础应用-学生报道
const HomeBaseStudentReport = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/HomeBase/StudentReport.vue');

// 首页-资源管理
const HomeResource = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/HomeResource.vue');

// 首页-数据中心
const DataCenter = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/DataCenter.vue');
// 首页-数据中心-首页
const DataCenterHome = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/DataCenter/Home.vue');
// 首页-数据中心-分类结构
const DataCenterDCTree = () => import(/* webpackChunkName: "group-enrollment" */ './views/Home/page/DataCenter/DCTree.vue');

Vue.use(Router);
export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "首页",
            component: Home,
            children: [
                {path: '', name: [{name: '首页', path: '/'}], component: HomeIndex},
                {path: 'resource', name: [{name: '教学资源', path: '/resource'}], component: HomeResource},
                {
                    path: 'base',
                    name: [{name: '基础应用', path: '/base'}],
                    component: HomeBase,
                    children: [
                        {
                            path: '',
                            name: [{name: '基础应用', path: '/base'}, {name: '首页', path: '/base'}],
                            component: HomeBaseHome
                        },
                        {
                            path: 'student-reg',
                            name: [{name: '基础应用', path: '/base'}, {name: '学生注册', path: '/base/student-reg'}],
                            component: HomeBaseStudentReg
                        },
                        {
                            path: 'student-report',
                            name: [{name: '基础应用', path: '/base'}, {name: '学生报道', path: '/base/student-report'}],
                            component: HomeBaseStudentReport
                        }
                    ]
                },
                {
                    path: 'dataCenter',
                    name: [{name: '数据中心', path: '/dataCenter'}],
                    component: DataCenter,
                    children: [
                        {
                            path: '',
                            name: [{name: '数据中心', path: '/dataCenter'}, {name: '首页', path: '/dataCenter'}],
                            component: DataCenterHome
                        },
                        {
                            path: 'dcTree',
                            name: [{name: '数据中心', path: '/dataCenter'}, {name: '分类结构', path: '/dataCenter/dcTree'}],
                            component: DataCenterDCTree
                        }
                    ]
                },
            ]
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/reg",
            name: "reg",
            component: Reg
        },
        {
            path: "/enrollment",
            name: "enrollment",
            component: Enrollment
        }
    ]
});
