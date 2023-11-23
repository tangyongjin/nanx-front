import UrlProtect from '@/routes/urlProtect';

export default {
    onEnter: UrlProtect, // add this 判断是否登录
    childRoutes: [
        {
            path: 'gpt',
            getComponent(nextState, cb) {
                import('./containers/gpt').then((m) => {
                    cb(null, m.default);
                });
            }
        }
    ]
};
