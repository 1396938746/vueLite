import request from '../utils/request';

//用户列表
export function userList(data) {
    return request({url: '/user/index', method: 'get', params: data})
}

//禁用/启用 用户
export function quickEditUser(data) { return request({ url: '/user/quickStatus', method: 'patch', data })}

//给用户强制退出
export function forcefulLogout(data) { return request({ url: '/user/forcefulLogout', method: 'patch', data })}

//充值列表
export function rechargeList(data) {
    return request({url: '/user/racharge', method: 'get', params: data})
}

//提现列表
export function withdrawList(data) {
    return request({url: '/user/withdraw', method: 'get', params: data})
}

//统计
export function getStats() {
    return request({url: '/user/stats', method: 'get'})
}

