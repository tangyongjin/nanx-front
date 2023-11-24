import { root_url, port, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class processmanager {
    static apis = {
        getAllBiztable: (params, config) => post(`${api_root}/Rdbms/getAllBiztable`, params, config),
        getAllPlugins: (params, config) => post(`${api_root}/Rdbms/getAllPlugins`, params, config),
        getTableCols: (params, config) => post(`${api_root}/Rdbms/getTableCols`, params, config)
    };
}
