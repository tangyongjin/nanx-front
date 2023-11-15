import UrlProtect from '@/routes/urlProtect';
export default {
    onEnter: UrlProtect, // add this
    path: 'table',
    component: require('@/layout/PortalLayout').default,
    childRoutes: [
        {
            path: 'commonXTable',
            getComponent(nextState, cb) {
                import('./NanxTableRoute').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
