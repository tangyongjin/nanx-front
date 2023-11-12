import '@/styles/reset.scss';
import UrlProtect from '@/routes/urlProtect';

export default {
    onEnter: UrlProtect, // add this 判断是否登录
    path: 'system',
    component: require('@/components/layout/PortalLayout').default,
    childRoutes: [
        {
            path: 'orgManage',
            getComponent(nextState, cb) {
                import('./org/orgManage').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'appbackup',
            getComponent(nextState, cb) {
                import('./appbackup/index').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
