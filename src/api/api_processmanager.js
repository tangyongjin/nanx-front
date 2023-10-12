import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class processmanager {
    static apis = {
        getAllBiztable: (params) => http(params, `${api_root}/Rdbms/getAllBiztable`),
        getAllPlugins: (params) => http(params, `${api_root}/Rdbms/getAllPlugins`),
        getTableCols: (params) => http(params, `${api_root}/Rdbms/getTableCols`)
    };
}
