import win_requireAuth from '@/routes/urlProtect';

export default {
    onEnter: win_requireAuth, // add this 判断是否登录
    component: require('../../components/layout').default,
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

// import AuthService from '../login/AuthService';
// window.win_requireAuth = function (nextState, replace, callback) {
//     // 判断是否登录
//     alert(' 判断是否登录 home/index');
//     this.Auth = new AuthService();
//     if (!this.Auth.loggedIn()) {
//         console.log('not login');
//         replace('/login'); // 如果没有登录就跳转到登录路由
//     }
//     return callback();
// };

// export default {
//     onEnter: win_requireAuth, // add this 判断是否登录
//     component: require('../../components/layout').default,
//     childRoutes: [
//         {
//             path: 'home',
//             getComponent(nextState, cb) {
//                 import('./containers/home').then((m) => {
//                     cb(null, m.default);
//                 });
//             }
//         }
//     ]
// };
