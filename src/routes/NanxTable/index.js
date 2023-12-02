import UrlProtect from '@/routes/urlProtect';
export default {
    onEnter: UrlProtect,
    path: 'table',
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
