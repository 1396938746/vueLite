import request from '../../utils/request';

// 获取菜单列表
export function menuList(data) { return request({ url: '/menu/index', method: 'get', params: data })}
// 获取菜单列表 带层级
export function menuPre(data) { return request({ url: '/menu/menuPre', method: 'get', params: data })}

// 获取树形菜单
export function menuTree(data) { return request({ url: '/menu/index', method: 'get', params: data })}

// 添加菜单
export function createMenu(data) { return request({ url: '/menu/save', method: 'post', data })}

// 编辑菜单
export function editMenu(data) { return request({ url: '/menu/edit', method: 'put', data })}

// 快捷修改菜单
export function quickEditMenu(data) { return request({ url: '/menu/quickStatus', method: 'patch', data })}

// 删除菜单
export function delMenu(data) { return request({ url: '/menu/del', method: 'delete', data })}

// 获取对应权限的菜单列表
export function menuRead(data) { return request({ url: '/menu/read', method: 'get', params: data })}


// 一键crud
export function menuCrud(data) { return request({ url: '/menu/menuCrud', method: 'post', data })}