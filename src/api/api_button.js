import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class button {
    static apis = {
        insertButton: (params) => http(params, `${api_root}/Button/insertButton`),
        deleteButton: (params) => http(params, `${api_root}/Button/deleteButtonById`),
        updateButton: (params) => http(params, `${api_root}/Button/updateButtonById`),
        getButtonList: (params) => http(params, `${api_root}/Button/getButtonListLikeNameOrButtonCodeMethod`),
        getAllButtons: (params) => http(params, `${api_root}/Button/getAllButtons`),
        addmenuButton: (params) => http(params, `${api_root}/Button/addButtonAndActionCodeConnect`)
    };
}
