import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            meta: {title: '登录'},
            component: () => import('../views/common/Login.vue'),
        },
        {
            path: '/403',
            meta: {title: '403'},
            component: () => import('../views/common/403.vue'),
        },
        {
            path: '/',
            redirect: '/login',
            component: () => import('../views/common/Home.vue'),
            children: [
                {
                    path: '/dashboard',
                    meta: {title: '系统首页'},
                    component: () => import('../views/common/Dashboard.vue'),
                },
				{
				    path: '/admin',
				    meta: {title: '管理员管理'},
				    component: () => import('../views/admin/Index.vue'),
				},
				
                {
                    path: '/menus',
                    meta: {title: '菜单管理'},
                    component: () => import('../views/menu/Index.vue'),
                },
				{
				    path: '/role',
				    meta: {title: '菜单管理'},
				    component: () => import('../views/role/Index.vue'),
				},
				
				{
				    path: '/base',
				    meta: {title: '基本版'},
				    component: () => import('../views/base/Index.vue'),
				},

            ]
        }
    ]
});