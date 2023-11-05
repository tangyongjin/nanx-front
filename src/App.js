import React from 'react';
import { Provider } from 'mobx-react';
import { Router, hashHistory } from 'react-router';
import store from './store';
import { ConfigProvider, message } from 'antd';
import themeJson from '@/styles/theme';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { routes } from './routes/routes.js';
moment.locale('zh-cn');

//检查网络是否链接
if (navigator.onLine) {
} else {
    message.error('网络链接失败！请检查网络！', 5);
}

export default class App extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zhCN} theme={themeJson}>
                <Provider {...store}>
                    <Router history={hashHistory} routes={routes} />
                </Provider>
            </ConfigProvider>
        );
    }
}
