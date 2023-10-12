import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class permission {
    static apis = {
        getRoleMenuList: (params) => http(params, `${api_root}/Permission/getRoleMenuList`),
        getUserByRole: (params) => http(params, `${api_root}/Permission/getUserByRole`),
        getAllMenuList: (params) => http(params, `${api_root}/Permission/getAllMenuList`),
        getTreeMenuList: (params) => http(params, `${api_root}/Permission/getTreeMenuList`),
        saveMenuPermission: (params) => http(params, `${api_root}/Permission/saveMenuPermissions`),
        getRoleButtonList: (params) => http(params, `${api_root}/Permission/getRoleButtonList`),
        getSecondMenuList: (params) => http(params, `${api_root}/Permission/getSecondMenuList`),
        getFirstMenuList: (params) => http(params, `${api_root}/Permission/getFirstMenuList`),
        getRoleList: (params) => http(params, `${api_root}/Permission/getRoleList`),
        addRole: (params) => http(params, `${api_root}/Permission/addRole`),
        updateRole: (params) => http(params, `${api_root}/Permission/updateRole`),
        deleteRoleRow: (params) => http(params, `${api_root}/Permission/deleteRole`),
        getMenuList: (params) => http(params, `${api_root}/Permission/getMenuList`),
        addMenu: (params) => http(params, `${api_root}/Permission/addMenu`),
        updateMenu: (params) => http(params, `${api_root}/Permission/updateMenu`),
        deleteMenuRow: (params) => http(params, `${api_root}/Permission/deleteMenu`),
        getMenuIdAssosiedUsers: (params) => http(params, `${api_root}/Permission/getMenuIdAssosiedUsers`),
        getRoleByMenuId: (params) => http(params, `${api_root}/Permission/getRoleByMenuId`)
    };
}
