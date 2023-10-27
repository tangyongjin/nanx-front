import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class user {
    static apis = {
        loginMobile: (params) => http(params, `${api_root}/Auth/loginMobile`),
        profile: (params) => http(params, `${api_root}/Auth/profile`),
        edit_password: (params) => http(params, `${api_root}/Auth/changepwd`),
        updateUserInformation: (params) => http(params, `${api_root}/User/updateUserInformation`)
    };
}
