import win_requireAuth from '@/routes/urlProtect';

export default {
    onEnter: win_requireAuth, // add this 判断是否登录
    path: 'system',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'departmentManage',
            getComponent(nextState, cb) {
                import('./containers/departmentManage').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'userManage',
            getComponent(nextState, cb) {
                import('./containers/userManage').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
