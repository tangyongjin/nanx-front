import { root_url, port, version_2 } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version_2}`;

export default class organization {
    static apis = {
        orgTree: (params) => post(`${api_root}/Organization/orgTree`, params),
        getDeptMembers: (params) => post(`${api_root}/Organization/getDeptMembers`, params)
    };
}
