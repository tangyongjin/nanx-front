import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class button {
    static apis = {
        getAllButtons: (params, config) => post(`${api_root}/Button/getAllButtons`, params, config),
        getGridButtons: (params, config) => post(`${api_root}/Button/getGridButtons`, params, config),
        addGridButton: (params, config) => post(`${api_root}/Button/addGridButton`, params, config),
        deleteGridButton: (params, config) => post(`${api_root}/Button/deleteGridButton`, params, config),
        saveBtnOrder: (params, config) => post(`${api_root}/Button/saveBtnOrder`, params, config)
    };
}
