import { port, root_url, version_2 } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version_2}`;

export default class file {
    static apis = {
        uploadAvatar: (params) => {
            console.log(params);

            // if (params === null || params === undefined) {
            //     params = { data: { action: 'avatar' } };
            // } else {
            //     params.data = { action: 'avatar' };
            // }

            let uploadcfg = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            return post(`${api_root}/File/uploadAvatar`, params, uploadcfg);
        },
        upload: `${api_root}/File/upload`,
        addFiles: (params) => post(`${api_root}/File/upload`, params),
        deleteFiles: (params) => post(`${api_root}/File/deleteFile`, params)
    };
}
