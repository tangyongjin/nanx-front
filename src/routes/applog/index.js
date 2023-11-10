import UrlProtect from '@/routes/urlProtect';

export default {
    onEnter: UrlProtect, // add this 判断是否登录
    component: require('@/components/layout/PortalLayout').default,
    childRoutes: [
        {
            path: 'applog',
            getComponent(nextState, cb) {
                import('./containers/applog').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
