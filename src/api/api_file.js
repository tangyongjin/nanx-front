import { port, root_url, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class filehandler {
    static apis = {
        uploadFile: `${api_root}/File/uploadFile`,
        upload: `${api_root}/File/upload`,
        addFiles: (params) => http(params, `${api_root}/File/upload`),
        deleteFiles: (params) => http(params, `${api_root}/File/deleteFile`)
    };
}
