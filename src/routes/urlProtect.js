import LoginService from './login/LoginService';

function UrlProtect(nextState, replace, callback) {
    // 判断是否登录
    const Auth = new LoginService();
    if (!Auth.loggedIn()) {
        replace('/login'); // 如果没有登录就跳转到登录路由
    }

    // console.log('abortHandler: ', abortHandler);
    // abortHandler.abort();

    return callback();
}

export default UrlProtect;
