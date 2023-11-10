import UrlProtect from '@/routes/urlProtect';

export default {
    onEnter: UrlProtect, // add this 判断是否登录
    childRoutes: [
        {
            path: 'home',
            getComponent(nextState, cb) {
                import('./containers/home').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
