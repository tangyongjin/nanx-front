import { port, root_url, version } from './api_config/base_config';
import { post } from './axiosInstance';
const api_root = `${root_url}:${port}/${version}`;

export default class dataGrid {
    static apis = {
        getAssociateData: (params, config) => post(`${api_root}/${params.data.api}`, params, config),
        getPortalDataGrids: (params, config) => post(`${api_root}/DataGrid/getPortalDataGrids`, params, config),
        getColsDbInfo: (params, config) => post(`${api_root}/DataGrid/getColsDbInfo`, params, config),
        getAllCategory: (params, config) => post(`${api_root}/DataGrid/getAllCategory`, params, config),
        saveTriggerGroup: (params, config) => post(`${api_root}/DataGrid/saveTriggerGroup`, params, config),
        getTriggerGroups: (params, config) => post(`${api_root}/DataGrid/getTriggerGroups`, params, config),
        deleteTriggerGroup: (params, config) => post(`${api_root}/DataGrid/deleteTriggerGroup`, params, config),
        saveFieldCfg: (params, config) => post(`${api_root}/DataGrid/saveFieldCfg`, params, config),
        saveActCodeColumnOrder: (params, config) => post(`${api_root}/DataGrid/saveActCodeColumnOrder`, params, config),
        saveFixedQueryConfigure: (params, config) =>
            post(`${api_root}/DataGrid/saveFixedQueryConfigure`, params, config),
        fetchDataGridCfg: (params, config) => post(`${api_root}/DataGridCfg/fetchDataGridCfg`, params, config)

        // const postJwtProfile = (data) => post(url.POST_EDIT_JWT_PROFILE, data);
    };
}
