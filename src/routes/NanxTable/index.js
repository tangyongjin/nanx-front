import win_requireAuth from '@/routes/urlProtect';
export default {
    onEnter: win_requireAuth, // add this
    path: 'table',
    component: require('../../components/layout').default,
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
