export default {
    childRoutes: [
        {
            path: 'login',
            getComponent(nextState, cb) {
                import('./Login').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
