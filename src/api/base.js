import request from '../utils/request';

// 列表
export function reqList(data) { return request({ url: '/admin/index', method: 'get', params: data })}

// 添加
export function reqCreate(data) { return request({ url: '/admin/save', method: 'post', data })}

// 编辑
export function reqEdit(data) { return request({ url: '/admin/edit', method: 'put', data })}

// 快捷修改状态
export function reqQuickEdit(data) { return request({ url: '/admin/quickStatus', method: 'patch', data })}

// 删除
export function reqDel(data) { return request({ url: '/admin/del', method: 'delete', data })}

