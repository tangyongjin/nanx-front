import win_requireAuth from '@/routes/urlProtect';

export default {
    onEnter: win_requireAuth, // add this 判断是否登录
    component: require('../../components/layout').default,
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
