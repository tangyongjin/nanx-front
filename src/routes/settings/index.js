import win_requireAuth from '@/routes/urlProtect';
export default {
    onEnter: win_requireAuth, // add this 判断是否登录
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'settings',
            getComponent(nextState, cb) {
                import('./containers/settings').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
