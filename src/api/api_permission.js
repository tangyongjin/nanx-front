import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class permission {
    static apis = {
        getAllTreeMenuList: (params, config) => post(`${api_root}/Permission/getAllTreeMenuList`, params, config),
        saveMenuPermission: (params, config) => post(`${api_root}/Permission/saveMenuPermission`, params, config),
        deleteMenuPermission: (params, config) => post(`${api_root}/Permission/deleteMenuPermission`, params, config),
        getUsersByMenuId: (params, config) => post(`${api_root}/Permission/getUsersByMenuId`, params, config),
        getMenuTreeByRoleCode: (params, config) => post(`${api_root}/Permission/getMenuTreeByRoleCode`, params, config),
        getRolesByMenuId: (params, config) => post(`${api_root}/Permission/getRolesByMenuId`, params, config),
        getAllRoles: (params, config) => post(`${api_root}/Permission/getAllRoles`, params, config),
        assignUserRole: (params, config) => post(`${api_root}/Permission/assignUserRole`, params, config),
        deleteUserRole: (params, config) => post(`${api_root}/Permission/deleteUserRole`, params, config),
        getUserRole: (params, config) => post(`${api_root}/Permission/getUserRole`, params, config)
    };
}
