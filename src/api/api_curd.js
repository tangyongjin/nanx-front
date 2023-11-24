import { port, root_url, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class curd {
    static apis = {
        listData: (params, config) => post(`${api_root}/${params.geturl}`, params, config),
        exportExcel: (params, config) => post(`${api_root}/Curd/exportExcel`, params, config),
        deleteData: (params, config) => post(`${api_root}/${params.delurl}`, params, config),
        updateData: (params, config) => post(`${api_root}/${params.updateurl}`, params, config),
        addData: (params, config) => post(`${api_root}/${params.addurl}`, params, config),
        getTableData: (params, config) => post(`${api_root}/Curd/getTableData`, params, config),
        remoteCommonFetch: (params, config) => post(`${api_root}/Curd/remoteCommonFetch`, params, config)
    };
}
