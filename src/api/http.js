import request from 'then-request';
import React from 'react';
import ReactDOM from 'react-dom';

import UserStore from '@/store/UserStore';
import NavigationStore from '@/store/NavigationStore';
import { hashHistory } from 'react-router';
import { message, Alert } from 'antd';

message.config({ top: 20, maxCount: 100 });

const setHeader = () => {
    const token_from_UserStore = UserStore.getToken();
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token_from_UserStore
    };
    return headers;
};

const getUrl = (url, params) => {
    const data = params ? params.data : '';
    if (data === '') {
        return url;
    }
    let fixed_url = url + '/?';

    const paramsArray = [];
    // 拼接参数
    Object.keys(data).forEach((key) => paramsArray.push(key + '=' + data[key]));
    fixed_url += paramsArray.join('&');
    return fixed_url;
};

const resKey = 'reponse';
const http = (params, url) => {
    const headers = setHeader();
    const options = {
        mode: 'cors',
        json: params ? params.data : ''
    };
    const method = params && params.method ? params.method : 'GET';

    let fixed_url = '';
    if (method === 'GET' || method === 'get') {
        fixed_url = getUrl(url, params);
    } else {
        fixed_url = url;
    }

    return new Promise((resolve, reject) => {
        message.loading({ content: '处理中...', duration: 0 });
        const hideloading = () => {
            message.destroy();
        };

        request(method, fixed_url, {
            headers,
            ...options
        })
            .then((res) => {
                if (res.statusCode === 401) {
                    hashHistory.push('/login');
                    hideloading();
                    message.error(JSON.parse(res.body).message, 3);
                    UserStore.clearToken();
                    sessionStorage.clear();
                    NavigationStore.clear();
                    NavigationStore.setBossTitle(null);
                    return;
                }

                let data = {};

                if (res) {
                    try {
                        data = JSON.parse(res.body);
                    } catch (e) {
                        hideloading();
                        const alert_key = Math.random().toString(36).substring(7);

                        // return <div style={{padding: '10px'}} dangerouslySetInnerHTML={{ __html: this.state.xinfo}}></div>
                        console.log(res.body);
                        const alertmsg = (
                            <div>
                                无法解析后台返回的数据:
                                <div
                                    style={{ padding: '10px' }}
                                    dangerouslySetInnerHTML={{
                                        __html: res.body
                                    }}></div>
                            </div>
                        );
                        ReactDOM.render(
                            <Alert
                                message=""
                                key={alert_key}
                                closable
                                description={alertmsg}
                                type="info"
                                closeText="关闭警告"
                            />,
                            document.getElementById('app_global_err')
                        );

                        return;
                    }
                }

                if (data.msg) {
                    data.message = data.msg;
                }

                if (data.code === 200) {
                    hideloading();

                    if (!Reflect.ownKeys(data).indexOf('hidemessage') >= 0) {
                        if (data.message) {
                            message.success({
                                content: data.message,
                                key: resKey,
                                duration: 2
                            });
                        }
                    }
                    resolve(data);
                } else if (data.code === 401) {
                    hideloading();
                    message.success({
                        content: data.message ? data.message : '您没有权限操作！',
                        key: resKey,
                        duration: 2
                    });
                    resolve(data);
                } else if (data.code === 500) {
                    hideloading();
                    message.error({
                        content: data.message ? data.message : '请求出错',
                        key: resKey,
                        duration: 2
                    });
                    resolve(data);
                } else {
                    hideloading();

                    if (data.message) {
                        message.error({
                            content: data.message,
                            key: resKey,
                            duration: 2
                        });
                    }
                    resolve(data);
                }
            })
            .catch((error) => {
                console.log(error);
                hideloading();
                message.error({
                    content: 'Request Failer,Try later',
                    key: 'errorKey',
                    duration: 10
                });
                reject(error);
            });
    });
};

export default http;
