import { port, root_url, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class activity {
    static apis = {
        getAssociateData: (params) => http(params, `${api_root}/${params.data.api}`),
        getDataGridCfg: (params) => http(params, `${api_root}/DataGridCfg/fetchDataGridCfg`),
        getPortalDataGrids: (params) => http(params, `${api_root}/DataGrid/getPortalDataGrids`),
        batchSetButtons: (params) => http(params, `${api_root}/DataGrid/batchSetButtons`),
        addDataGridCode: (params) => http(params, `${api_root}/DataGrid/addDataGridCode`),
        deleteGridCode: (params) => http(params, `${api_root}/DataGrid/deleteGridCode`),
        getActCols: (params) => http(params, `${api_root}/DataGrid/getActCols`),
        getAllCategory: (params) => http(params, `${api_root}/DataGrid/getAllCategory`),
        saveTriggerGroup: (params) => http(params, `${api_root}/DataGrid/saveTriggerGroup`),
        getTriggerGroups: (params) => http(params, `${api_root}/DataGrid/getTriggerGroups`),
        deleteTriggerGroup: (params) => http(params, `${api_root}/DataGrid/deleteTriggerGroup`),
        saveFieldCfg: (params) => http(params, `${api_root}/DataGrid/saveFieldCfg`),
        modifyActionCode: (params) => http(params, `${api_root}/DataGrid/modifyActionCode`),
        saveOverrideQueryCfg: (params) => http(params, `${api_root}/DataGrid/saveOverrideQueryCfg`),
        addGridReferCfg: (params) => http(params, `${api_root}/DataGrid/addGridReferCfg`),
        //  基于 commonTable一条记录的数据,获取相关数据.  actionBasedRowPuller
        actionBasedRowPuller: (params) => http(params, `${api_root}/DataGrid/actionBasedRowPuller`),
        exportExcel: (params) => http(params, `${api_root}/DataGrid/exportExcel`),
        batchUpdateFieldCfg: (params) => http(params, `${api_root}/DataGrid/batchUpdateFieldCfg`),
        syncAllconfig: (params) => http(params, `${api_root}/DataGrid/syncAllconfig`),
        //表格排序接口
        saveActCodeColumnOrder: (params) => http(params, `${api_root}/DataGrid/saveActCodeColumnOrder`),
        saveTips: (params) => http(params, `${api_root}/DataGrid/saveTips`)
    };
}
