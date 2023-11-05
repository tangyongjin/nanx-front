import axios from 'axios';
import moment from 'moment';
import { hashHistory } from 'react-router';
import AuthStore from '@/store/AuthStore';
import { message } from 'antd';

const { v4: uuidv4 } = require('uuid');

const API_URL = 'http://127.0.0.1:8502/v2';

const axiosInstance = axios.create({
    method: 'post',
    baseURL: API_URL,
    headers: {
        'Content-Type': 'text/plain'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    }
});

let source = axios.CancelToken.source();

function nowString() {
    const now = moment();
    const timeString = now.format('HH:mm:ss');
    console.log(timeString);
    return timeString;
}

axiosInstance.interceptors.request.use(
    function (config) {
        const requestId = uuidv4();
        config.requestId = requestId + config.url;
        AuthStore.setLoading(true);
        AuthStore.setValue(1997);
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

export async function post(url, params, config) {
    if (!params) {
        params = { data: {} };
    }

    try {
        axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        const response = await axiosInstance.post(url, params.data, { ...config });
        if (response.status === 200) {
            if (response.data) {
                if (response.data.message) {
                    message.info(response.data.message);
                }
            }
            return response.data;
        }
    } catch (error) {
        message.error('POST发生错误', error);
        source.cancel('Landing Component got unmounted');
    }
}

axiosInstance.interceptors.response.use(
    (response) => {
        // 打印响应日志
        AuthStore.setLoading(false);
        AuthStore.delRunnitem(response.config.requestId);
        return response;
    },
    (error) => {
        AuthStore.delRunnitem(error.config.requestId);
        AuthStore.setLoading(false);

        if (error.code == 'ERR_NETWORK') {
            message.error('API异常,请检查后台系统');
            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            source.cancel('Landing Component got unmounted');
            hashHistory.push('/login');
        }

        return Promise.reject(error);
    }
);

export async function get(url, para, config = {}) {
    return axiosInstance.get(url, { ...para }, { ...config }).then((response) => {
        console.log(response); // Add this line to log the response
        return response.data;
    });
}
