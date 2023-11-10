import '@/styles/reset.scss';
import UrlProtect from '@/routes/urlProtect';

export default {
    onEnter: UrlProtect, // add this 判断是否登录
    path: 'system',
    component: require('@/components/layout/PortalLayout').default,
    childRoutes: [
        {
            path: 'departmentManage',
            getComponent(nextState, cb) {
                import('./containers/departmentManage').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'userManage',
            getComponent(nextState, cb) {
                import('./containers/userManage').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
