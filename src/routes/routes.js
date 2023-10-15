const routes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => replace('/home') },
    childRoutes: [
        require('./home').default,
        require('./auth').default,
        require('./NanxTable').default,
        require('./datagridmnt').default,
        require('./settings').default,
        require('./profile').default,
        require('./system').default,
        require('./applog').default
    ]
};

export { routes };
