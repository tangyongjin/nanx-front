import axios from 'axios';
import { message } from 'antd';
// import { hashHistory } from 'react-router';
import AuthStore from '@/store/AuthStore';
import { nowString } from '@/utils/tools';

const { v4: uuidv4 } = require('uuid');

const axiosInstance = axios.create({
    method: 'post',
    headers: {
        'Content-Type': 'text/plain'
    }
});

const abortHandler = new AbortController();

axiosInstance.interceptors.request.use(
    function (config) {
        // console.log('axiosInstance配置: ', config);

        const requestId = uuidv4();
        config.requestId = requestId + config.url;
        AuthStore.setLoading(true);
        AuthStore.setTimeStamp(nowString());
        AuthStore.addRunnitem(config.requestId);
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        AuthStore.delRunnitem(error.config.requestId);
        return Promise.reject(error);
    }
);

const responseSuccess = (response) => {
    // console.log('response: ', response);
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    AuthStore.setLoading(false);
    AuthStore.delRunnitem(response.config.requestId);

    if (response && response.data && response.data.code === 200 && response.data.message) {
        message.success(response.data.message);
    }

    if (response && response.data && response.data.code === 500 && response.data.message) {
        message.error(response.data.message);
    }

    return response;
};

const responseFailed = (error) => {
    AuthStore.delRunnitem(error.config.requestId);
    AuthStore.setLoading(false);

    // abortHandler.abort();

    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
        // 根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = '错误请求';
                break;
            case 401:
                error.message = '未授权，请重新登录';
                if (error.config.url.indexOf('loginMobile') > -1) {
                    // 当前为登录界面.
                    console.error('401错误,登录引起', error.response);
                } else {
                    console.error('401:token过期等', error);
                    // hashHistory.push('/login');
                }
                break;
            case 403:
                error.message = '拒绝访问';
                break;
            case 404:
                error.message = '请求错误,未找到该资源';
                window.location.href = '/NotFound';
                break;
            case 405:
                error.message = '请求方法未允许';
                break;
            case 408:
                error.message = '请求超时';
                break;
            case 500:
                error.message = '服务器端出错';
                break;
            case 501:
                error.message = '网络未实现';
                break;
            case 502:
                error.message = '网络错误';
                break;
            case 503:
                error.message = '服务不可用';
                break;
            case 504:
                error.message = '网络超时';
                break;
            case 505:
                error.message = 'http版本不支持该请求';
                break;
            default:
                error.message = `连接错误${error.response.status}`;
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            // console.error('服务器响应超时，请刷新当前页');
        }
        error.message = '连接服务器失败';
    }
    return error.response;
};

export function post(url, params, config) {
    axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
    if (!config) {
        config = {};
    }

    config.signal = abortHandler.signal;

    return new Promise((resolve, reject) => {
        axiosInstance
            .post(url, params?.data || {}, { ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export { abortHandler };

axiosInstance.interceptors.response.use(responseSuccess, responseFailed);
