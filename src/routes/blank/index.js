import win_requireAuth from '@/routes/urlProtect';

export default {
    onEnter: win_requireAuth,
    path: 'blank',
    component: require('../../components/layout').default,
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
