import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class organization {
    static apis = {
        orgTree: (params) => http(params, `${api_root}/Organization/orgTree`),
        getDeptMembers: (params) => http(params, `${api_root}/Organization/getDeptMembers`)
    };
}
