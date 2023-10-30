import { port, root_url, version_2 } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version_2}`;

export default class filehandler {
    static apis = {
        uploadFile: `${api_root}/File/uploadFile`,
        upload: `${api_root}/File/upload`,
        addFiles: (params) => post(`${api_root}/File/upload`, params),
        deleteFiles: (params) => post(`${api_root}/File/deleteFile`, params)
    };
}
