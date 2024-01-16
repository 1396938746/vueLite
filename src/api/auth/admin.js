import request from '../../utils/request';

// 管理员列表
export function adminList(data) { return request({ url: '/admin/index', method: 'get', params: data })}

// 添加管理员
export function createAdmin(data) { return request({ url: '/admin/save', method: 'post', data })}

// 编辑管理员
export function editAdmin(data) { return request({ url: '/admin/edit', method: 'put', data })}

// 快捷修改管理员状态
export function quickEditAdmin(data) { return request({ url: '/admin/quickStatus', method: 'patch', data })}

// 删除管理员
export function delAdmin(data) { return request({ url: '/admin/del', method: 'delete', data })}

// 角色组
export function roleGroup(data) { return request({ url: '/role/read', method: 'get', params: data })}
