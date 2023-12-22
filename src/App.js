import React from 'react';
import { Provider as MobxStoreProvider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import RootStore from './store';
import { ConfigProvider } from 'antd';
import themeJson from '@/styles/theme';
import zhCN from 'antd/es/locale/zh_CN';
import { routes } from './routes/routes.js';
import '@/styles/index.scss';

export default class App extends React.Component {
    renderRoute = (route, index) => {
        return (
            <CacheRoute
                key={index}
                path={route.path}
                exact={false}
                render={(props) => {
                    return (
                        <route.component {...props}>
                            {route.childRoutes && route.childRoutes.map(this.renderRoute)}
                        </route.component>
                    );
                }}
            />
        );
    };

    render() {
        return (
            <ConfigProvider locale={zhCN} theme={themeJson}>
                <MobxStoreProvider {...RootStore}>
                    <HashRouter>
                        <CacheSwitch>{routes.map(this.renderRoute)}</CacheSwitch>
                    </HashRouter>
                </MobxStoreProvider>
            </ConfigProvider>
        );
    }
}
