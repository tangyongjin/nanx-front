export default {
    onEnter: win_requireAuth, // add this
    path: 'system',
    component: require('../../components/layout').default,
    childRoutes: [
        {
            path: 'roleManage',
            getComponent(nextState, cb) {
                import('./containers/roleManage').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'permissionDetail',
            getComponent(nextState, cb) {
                import('./containers/permissionDetail').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'allocationMenu',
            getComponent(nextState, cb) {
                import('./containers/allocationMenu').then((m) => {
                    cb(null, m.default);
                });
            }
        },

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
        },
        {
            path: 'lookUserByRole',
            getComponent(nextState, cb) {
                import('./containers/lookUserByRole').then((m) => {
                    cb(null, m.default);
                });
            }
        },
        {
            path: 'dev2online',
            getComponent(nextState, cb) {
                import('./containers/dev2online').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
