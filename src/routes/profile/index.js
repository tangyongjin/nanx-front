import UrlProtect from '@/routes/urlProtect';
export default {
    onEnter: UrlProtect, // add this 判断是否登录
    childRoutes: [
        {
            path: 'profile',
            getComponent(nextState, cb) {
                import('./profile').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
