import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class user {
    static apis = {
        // 根据关键字（用户名）获取所有用户

        login_mobile: (params) => http(params, `${api_root}/Auth/login_mobile`),
        login_qrscan: (params) => http(params, `${api_root}/Auth/login_qrscan`),
        saveRoleAsign: (params) => http(params, `${api_root}/User/saveRoleAsign`),
        profile: (params) => http(params, `${api_root}/Auth/profile`),
        edit_password: (params) => http(params, `${api_root}/Auth/changepwd`),
        getUserRoles: (params) => http(params, `${api_root}/Auth/getUserRolesById`),
        updateUserInformation: (params) => http(params, `${api_root}/User/updateUserInformation`)
    };
}
