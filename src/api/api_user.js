import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class user {
    static apis = {
        loginMobile: (params, config) => post(`${api_root}/Auth/loginMobile`, params, config),
        profile: (params, config) => post(`${api_root}/Auth/profile`, params, config),
        edit_password: (params, config) => post(`${api_root}/Auth/changepwd`, params, config),
        resetPassword: (params, config) => post(`${api_root}/Auth/resetPassword`, params, config),
        updateUserInformation: (params, config) => post(`${api_root}/User/updateUserInformation`, params, config)
    };
}
