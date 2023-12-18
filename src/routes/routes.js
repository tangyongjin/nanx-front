// import React from 'react';
// import { Router } from 'react-router';
// import { BrowserRouter as Router, HashRouter } from 'react-router-dom';

import Home from '@/routes/home/containers/home';
import Login from '@/routes/login/Login';
import Welcome from '@/routes/welcome/';
import NanxTable from '@/routes/NanxTable/NanxTableCom/NanxTable/';

const PortalLayout = require('@/layout/PortalLayout/').default;

const routes = [
    { path: '/login', component: Login },
    { path: '/home', component: PortalLayout, childRoutes: [{ path: '/home', component: Home }] },
    { path: '/welcome', component: PortalLayout, childRoutes: [{ path: '/welcome', component: Welcome }] },
    { path: '/datagrid', component: PortalLayout, childRoutes: [{ path: '/datagrid', component: NanxTable }] }
];

console.log('routes: ', routes);
export { routes };
