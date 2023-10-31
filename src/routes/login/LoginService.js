import decode from 'jwt-decode';
import { hashHistory } from 'react-router';
import api from '../../api/api';
import NavigationStore from '@/store/NavigationStore';
import UserStore from '@/store/UserStore';
import { message } from 'antd';

export default class LoginService {
    constructor() {
        this.loginMobile = this.loginMobile.bind(this);
    }

    async loginMobile(mobile, password, transaction_id) {
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id },
            method: 'POST'
        };

        let res = await api.user.loginMobile(params);
        console.log('res: ', res);

        if (res.code == 401) {
            message.error('登陆失败，请检查手机号和密码！', 2.5);
            return;
        }

        if (res.code == 200) {
            await UserStore.setToken(res.token);
            await NavigationStore.saveSessionBadge(res.info);
            await NavigationStore.setBadge(res.info);
            await UserStore.setUserProfile(res.profile);
            await this.afterLoginSuccess(res);
        }
    }

    afterLoginSuccess = async () => {
        message.loading('登录成功,准备工作环境 ', 1.1, async () => {
            hashHistory.push('/home');
        });
    };

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

    logout() {
        UserStore.clearToken();
        sessionStorage.clear();
        NavigationStore.clear();
        hashHistory.push('/login');
    }
}
