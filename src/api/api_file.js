import { port, root_url, version } from './api_config/base_config';
import { post } from './axiosInstance';

const api_root = `${root_url}:${port}/${version}`;

// API名称: (params,config) =>  {
//     console.log('Debugging params:', params,config); // 添加这一行用于打印params内容
//     return post(`${api_root}/File/uploadAvatar`, params,config);
// }

export default class file {
    static apis = {
        uploadAvatar: `${api_root}/File/uploadAvatar`,
        uploadFile: `${api_root}/File/uploadFile`,
        addFiles: (params, config) => post(`${api_root}/File/upload`, params, config),
        deleteFiles: (params, config) => post(`${api_root}/File/deleteFile`, params, config),
        uploadAvatar2: (params, config) => {
            console.log('Debugging params:', params, config); // 添加这一行用于打印params内容
            return post(`${api_root}/File/uploadAvatar`, params, config);
        }
    };
}
