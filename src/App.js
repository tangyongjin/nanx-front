import React from 'react';
import { HashRouter } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import RootStore from './store';
import { ConfigProvider } from 'antd';
import themeJson from '@/styles/theme';
import zhCN from 'antd/es/locale/zh_CN';
import { routes } from './routes/routes.js';
import '@/styles/index.scss';
import { StoreProvider } from '@/store/StoreHelpers';

export default class App extends React.Component {
    requireAuth = (nextState, replace, callback) => {
        console.log('💚replace: ', replace);
        console.log('💚nextState: ', nextState);
    };

    renderRoute = (route, index) => {
        return (
            <CacheRoute
                key={index}
                path={route.path}
                exact={false}
                render={(props) => {
                    this.requireAuth(props.location, props.history, null);
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
                <StoreProvider {...RootStore}>
                    <HashRouter>
                        <CacheSwitch>{routes.map(this.renderRoute)}</CacheSwitch>
                    </HashRouter>
                </StoreProvider>
            </ConfigProvider>
        );
    }
}
