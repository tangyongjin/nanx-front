const PortalLayout = require('@/components/layout/PortalLayout/').default;

const routes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => replace('/home') },
    childRoutes: [
        {
            ...require('./home').default,
            component: PortalLayout
        },
        require('./login').default,
        require('./NanxTable').default,
        require('./profile').default,
        require('./system').default,
        require('./applog').default
    ]
};

export { routes };
