import axios from 'axios';
import moment from 'moment';
import AuthStore from '@/storeMobx/AuthStore';

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

axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

function nowString() {
    const now = moment();
    const timeString = now.format('HH:mm:ss');
    console.log(timeString);
    return timeString;
}

axiosInstance.interceptors.request.use(
    function (config) {
        const requestId = uuidv4();
        console.log('Request ID:', requestId);
        config.requestId = requestId + config.url;

        console.log('Axios拦截>>🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩>>>>>>' + config.url);
        AuthStore.setLoading(true);
        AuthStore.setValue(1997);
        AuthStore.setTimeStamp(nowString());
        AuthStore.addRunnitem(config.requestId);
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        AuthStore.delRunnitem(error.config.requestId);
        console.log(error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // 打印响应日志
        console.log('Response ID:', response.config.requestId);
        AuthStore.setLoading(false);
        AuthStore.delRunnitem(response.config.requestId);
        console.log(response);
        return response;
    },
    (error) => {
        console.log('Error:', error);
        AuthStore.delRunnitem(error.config.requestId);
        AuthStore.setLoading(false);
        return Promise.reject(error);
    }
);

// this is good
export async function post(url, data, config) {
    try {
        const response = await axiosInstance.post(url, { ...data }, { ...config });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function get(url, para, config = {}) {
    return axiosInstance.get(url, { ...para }, { ...config }).then((response) => {
        console.log(response); // Add this line to log the response
        return response.data;
    });
}

export async function put(url, para, config = {}) {
    return axiosInstance.put(url, { ...para }, { ...config }).then((response) => response.data);
}

export async function del(url, config = {}) {
    return await axiosInstance.delete(url, { ...config }).then((response) => response.data);
}
