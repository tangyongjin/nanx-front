import { port, root_url, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class curd {
    static apis = {
        listData: (params) => post(`${api_root}/${params.geturl}`, params),
        exportExcel: (params) => post(`${api_root}/Curd/exportExcel`, params),
        deleteData: (params) => post(`${api_root}/${params.delurl}`, params),
        updateData: (params) => post(`${api_root}/${params.updateurl}`, params),
        addData: (params) => post(`${api_root}/${params.addurl}`, params),
        getTableData: (params) => post(`${api_root}/Curd/getTableData`, params),
        remoteCommonFetch: (params) => post(`${api_root}/Curd/remoteCommonFetch`, params)
    };
}
