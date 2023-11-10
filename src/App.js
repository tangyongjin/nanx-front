import React from 'react';
import { Provider } from 'mobx-react';
import { Router, hashHistory } from 'react-router';
import store from './store';
import { ConfigProvider } from 'antd';
import themeJson from '@/styles/theme';
import zhCN from 'antd/es/locale/zh_CN';
import { routes } from './routes/routes.js';
import '@/styles/index.scss';

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
