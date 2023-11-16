import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class user {
    static apis = {
        loginMobile: (params) => post(`${api_root}/Auth/loginMobile`, params),
        profile: (params) => post(`${api_root}/Auth/profile`, params),
        edit_password: (params) => post(`${api_root}/Auth/changepwd`, params),
        resetPassword: (params) => post(`${api_root}/Auth/resetPassword`, params),
        updateUserInformation: (params) => post(`${api_root}/User/updateUserInformation`, params)
    };
}
