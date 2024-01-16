import Vue from 'vue';
import axios from 'axios';
import router from '../router';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
});
// 请求拦截器
service.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('token');
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // 拦截登录失效、无权限操作
            if (response.data.code === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('permission');
                localStorage.removeItem('auth');
                Vue.prototype.$alert(response.data.msg, {
                    confirmButtonText: '确定',
                    showClose: false,
                    callback: action => {
                        router.push('/login');
                    }
                });
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;