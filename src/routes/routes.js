import Home from '@/routes/home/containers/home';
import Login from '@/routes/login/Login';
import NanxTable from '@/routes/NanxTable/NanxTableCom/NanxTable/';
import AppBackUp from '@/routes/system/appbackup/';
import Layout from '@/layout/PortalLayout/';
import Profile from '@/routes/profile/profile';

const routes = [
    { path: '/login', component: Login },
    {
        path: '/',
        component: Layout,
        childRoutes: [
            { path: '/home', component: Home },
            { path: '/profile', component: Profile },
            { path: '/sysop', component: AppBackUp },
            { path: '/datagrid', component: NanxTable }
        ]
    }
];

console.log('routes: ', routes);
export { routes };
