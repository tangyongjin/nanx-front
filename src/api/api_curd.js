import { port, root_url, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class curd {
    static apis = {
        listData: (params) => http(params, `${api_root}/${params.geturl}`),
        deleteData: (params) => http(params, `${api_root}/${params.delurl}`),
        updateData: (params) => http(params, `${api_root}/${params.updateurl}`),
        addData: (params) => http(params, `${api_root}/${params.addurl}`),
        batchUpdate: (params) => http(params, `${api_root}/Curd/batchData`),
        getProcessMaintableList: (params) => http(params, `${api_root}/Curd/getProcessMaintableList`),
        getTableData: (params) => http(params, `${api_root}/Curd/getTableData`),
        //获取部门
        getDept: (params) => http(params, `${api_root}/Curd/listData`)
    };
}
