import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class organization {
    static apis = {
        orgTree: (params, config) => post(`${api_root}/Organization/orgTree`, params, config),
        getDeptMembers: (params, config) => post(`${api_root}/Organization/getDeptMembers`, params, config)
    };
}
