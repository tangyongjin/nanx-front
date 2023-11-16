import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class button {
    static apis = {
        getAllButtons: (params) => post(`${api_root}/Button/getAllButtons`, params),
        getGridButtons: (params) => post(`${api_root}/Button/getGridButtons`, params),
        addGridButton: (params) => post(`${api_root}/Button/addGridButton`, params),
        deleteGridButton: (params) => post(`${api_root}/Button/deleteGridButton`, params),
        saveBtnOrder: (params) => post(`${api_root}/Button/saveBtnOrder`, params)
    };
}
