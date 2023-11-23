import { port, root_url, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

export default class file {
    static apis = {
        uploadAvatar: `${api_root}/File/uploadAvatar`,
        uploadFile: `${api_root}/File/uploadFile`,
        addFiles: (params) => post(`${api_root}/File/upload`, params),
        deleteFiles: (params) => post(`${api_root}/File/deleteFile`, params),
        uploadAvatar2: (params) => post(`${api_root}/File/uploadAvatar`, params)
    };
}
