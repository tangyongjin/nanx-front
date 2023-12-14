const PortalLayout = require('@/layout/PortalLayout/').default;

const routes = {
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => {
            console.log('进入首页');
            replace('/home');
        }
    },

    childRoutes: [
        require('./login').default,
        {
            ...require('./home').default,
            component: PortalLayout
        },
        {
            ...require('./NanxTable').default,
            component: PortalLayout
        },
        {
            ...require('./profile').default,
            component: PortalLayout
        },
        {
            ...require('./system').default,
            component: PortalLayout
        },
        {
            ...require('./gpt').default,
            component: PortalLayout
        }
    ]
};

console.log('routes: ', routes);
export { routes };
