export default {
    onEnter: win_requireAuth, // add this
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
