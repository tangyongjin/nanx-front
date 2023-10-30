import { root_url, port, version_2 } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version_2}`;

export default class processmanager {
    static apis = {
        getAllBiztable: (params) => post(`${api_root}/Rdbms/getAllBiztable`, params),
        getAllPlugins: (params) => post(`${api_root}/Rdbms/getAllPlugins`, params),
        getTableCols: (params) => post(`${api_root}/Rdbms/getTableCols`, params)
    };
}
