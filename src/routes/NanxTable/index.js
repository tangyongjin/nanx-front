import UrlProtect from '@/routes/urlProtect';
export default {
    onEnter: UrlProtect,
    childRoutes: [
        {
            path: 'datagrid',
            getComponent(nextState, cb) {
                import('./NanxTableRoute').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
