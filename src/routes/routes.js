const routes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => replace('/home') },
    childRoutes: [
        require('./home').default,
        require('./login').default,
        require('./NanxTable').default,
        require('./settings').default,
        require('./profile').default,
        require('./system').default,
        require('./applog').default
    ]
};

export { routes };
