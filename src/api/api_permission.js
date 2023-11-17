import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class permission {
    static apis = {
        getAllTreeMenuList: (params) => post(`${api_root}/Permission/getAllTreeMenuList`, params),
        saveMenuPermission: (params) => post(`${api_root}/Permission/saveMenuPermission`, params),
        deleteMenuPermission: (params) => post(`${api_root}/Permission/deleteMenuPermission`, params),
        getUsersByMenuId: (params) => post(`${api_root}/Permission/getUsersByMenuId`, params),
        getMenuTreeByRoleCode: (params) => post(`${api_root}/Permission/getMenuTreeByRoleCode`, params),
        getRolesByMenuId: (params) => post(`${api_root}/Permission/getRolesByMenuId`, params),
        getAllRoles: (params) => post(`${api_root}/Permission/getAllRoles`, params),
        assignUserRole: (params) => post(`${api_root}/Permission/assignUserRole`, params),
        deleteUserRole: (params) => post(`${api_root}/Permission/deleteUserRole`, params),
        getUserRole: (params) => post(`${api_root}/Permission/getUserRole`, params)
    };
}
