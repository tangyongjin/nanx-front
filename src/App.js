import React from 'react';
import { Provider as MobxStoreProvider } from 'mobx-react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

import RootStore from './store';
import { ConfigProvider } from 'antd';
import themeJson from '@/styles/theme';
import zhCN from 'antd/es/locale/zh_CN';
import { routes } from './routes/routes.js';
import '@/styles/index.scss';

export default class App extends React.Component {
    renderRoute = (route, index) => {
        console.log(route);
        return (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                search={route?.datagrid_code}
                render={(props) => {
                    console.log('Route>>路由属性: ', props);
                    return (
                        <Suspense fallback={<div>Loading...</div>}>
                            <route.component {...props} extraProp={props.location.state && props.location.state.key}>
                                {route.childRoutes && route.childRoutes.map(this.renderRoute)}
                            </route.component>
                        </Suspense>
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
                        <Switch>{routes.map(this.renderRoute)}</Switch>
                    </HashRouter>
                </MobxStoreProvider>
            </ConfigProvider>
        );
    }
}
