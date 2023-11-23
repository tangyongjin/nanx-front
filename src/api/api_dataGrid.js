import { port, root_url, version } from './api_config/base_config';
import { post } from './axiosInstance';
const api_root = `${root_url}:${port}/${version}`;

export default class dataGrid {
    static apis = {
        getAssociateData: (params) => post(`${api_root}/${params.data.api}`, params),
        getPortalDataGrids: (params) => post(`${api_root}/DataGrid/getPortalDataGrids`, params),
        getColsDbInfo: (params) => post(`${api_root}/DataGrid/getColsDbInfo`, params),
        getAllCategory: (params) => post(`${api_root}/DataGrid/getAllCategory`, params),
        saveTriggerGroup: (params) => post(`${api_root}/DataGrid/saveTriggerGroup`, params),
        getTriggerGroups: (params) => post(`${api_root}/DataGrid/getTriggerGroups`, params),
        deleteTriggerGroup: (params) => post(`${api_root}/DataGrid/deleteTriggerGroup`, params),
        saveFieldCfg: (params) => post(`${api_root}/DataGrid/saveFieldCfg`, params),
        saveActCodeColumnOrder: (params) => post(`${api_root}/DataGrid/saveActCodeColumnOrder`, params),
        saveFixedQueryConfigure: (params) => post(`${api_root}/DataGrid/saveFixedQueryConfigure`, params),
        fetchDataGridCfg: (params) => post(`${api_root}/DataGridCfg/fetchDataGridCfg`, params)

        // const postJwtProfile = (data) => post(url.POST_EDIT_JWT_PROFILE, data);
    };
}
