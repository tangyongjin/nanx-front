import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class permission {
    static apis = {
        getRoleMenuList: (params) => http(params, `${api_root}/Permission/getRoleMenuList`),
        getTreeMenuList: (params) => http(params, `${api_root}/Permission/getTreeMenuList`),
        saveMenuPermission: (params) => http(params, `${api_root}/Permission/saveMenuPermission`),
        getRoleList: (params) => http(params, `${api_root}/Permission/getRoleList`),
        addRole: (params) => http(params, `${api_root}/Permission/addRole`),
        updateRole: (params) => http(params, `${api_root}/Permission/updateRole`),
        getUsersByMenuId: (params) => http(params, `${api_root}/Permission/getUsersByMenuId`),
        getMenuTreeByRoleCode: (params) => http(params, `${api_root}/Permission/getMenuTreeByRoleCode`),
        getRolesByMenuId: (params) => http(params, `${api_root}/Permission/getRolesByMenuId`)
    };
}
