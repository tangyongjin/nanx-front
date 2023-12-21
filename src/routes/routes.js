// import Home from '@/routes/home/containers/home';
// import Login from '@/routes/login/Login';
// import NanxTable from '@/routes/NanxTable/NanxTableCom/NanxTable/';
// import AppBackUp from '@/routes/system/appbackup/'
// const PortalLayout = require('@/layout/PortalLayout/').default;

// const routes = [
//     { path: '/login', component: Login },
//     { path: '/home', component: PortalLayout, childRoutes: [{ path: '/home', component: Home }] },
//     { path: '/sysop', component: PortalLayout, childRoutes: [{ path: '/sysop', component: AppBackUp }] },
//     { path: '/datagrid', component: PortalLayout, childRoutes: [{ path: '/datagrid', component: NanxTable }] }
// ];

// console.log('routes: ', routes);
// export { routes };

import React from 'react';

import Home from '@/routes/home/containers/home';
import Login from '@/routes/login/Login';
// const NanxTable = React.lazy(() => import('@/routes/NanxTable/NanxTableCom/NanxTable/'));
import AppBackUp from '@/routes/system/appbackup/';
const PortalLayout = require('@/layout/PortalLayout/').default;

const routes = [
    { path: '/login', component: Login },
    {
        path: '/home',
        component: PortalLayout,
        childRoutes: [{ path: '/home', component: Home }]
    },
    {
        path: '/sysop',
        component: PortalLayout,
        childRoutes: [{ path: '/sysop', component: AppBackUp }]
    },
    {
        path: '/datagrid',
        component: PortalLayout,
        childRoutes: [
            {
                path: '/datagrid',
                component: React.lazy(() => import('@/routes/NanxTable/NanxTableCom/NanxTable/'))
            }
        ]
    }
];

console.log('routes: ', routes);
export { routes };
