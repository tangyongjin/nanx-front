import decode from 'jwt-decode';
import api from '@/api/api';
import MenuStore from '@/store/MenuStore';
import UserStore from '@/store/UserStore';
import { message } from 'antd';

class LoginService {
    constructor() {
        this.loginMobile = this.loginMobile.bind(this);
    }

    async loginMobile(mobile, password, transaction_id) {
        document.getElementById('loadingSpin').style.display = 'block';
        document.getElementById('login_msg').style.display = 'none';
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id }
        };

        try {
            let loginResult = await api.user.loginMobile(params);
            // loginResult 现在是已经解析的对象
            console.log(loginResult);
            // 在这里可以对 loginResult 进行处理
            // ...

            return loginResult;
        } catch (error) {
            console.error('登录失败', error);
            throw error; // 你可以选择处理错误或将其传递给调用者
        }
    }

    loggedIn() {
        let token = UserStore.getToken(); //

        if (token === null) {
            message.info('请重新登录', 2.5);
            return false;
        }

        if (this.isTokenExpired(token)) {
            message.info('登陆过期,请重新登录', 2.5);
            return false;
        }
        return true;
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                // Checking if token is expired. N
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async logout() {
        await UserStore.clearToken();
        await sessionStorage.clear();
        await MenuStore.clear();
    }
}

export default LoginService;
