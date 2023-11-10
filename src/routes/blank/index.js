import UrlProtect from '@/routes/urlProtect';

export default {
    onEnter: UrlProtect,
    path: 'blank',
    component: require('@/components/layout/PortalLayout').default,
    childRoutes: [
        {
            path: 'blank',
            getComponent(nextState, cb) {
                import('./containers/blank').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
