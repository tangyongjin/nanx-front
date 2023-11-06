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
        document.getElementById('login_loading').style.display = 'block';

        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id },
            method: 'POST'
        };

        // let res = await api.user.loginMobile(params);
        // .then(res => {
        //     console.log(res)
        //   }).catch(err => {
        //     console.log(err)
        //   });

        await api.user
            .loginMobile(params)
            .then(async (res) => {
                console.log(res);

                if (res.code == 401) {
                    document.getElementById('login_loading').style.display = 'none';
                    message.error('登陆失败，请检查手机号和密码！', 2.5);
                    return;
                }

                if (res.code == 200) {
                    await UserStore.setToken(res.token);
                    await NavigationStore.saveSessionBadge(res.info);
                    await UserStore.setUserProfile(res.profile);
                    await this.afterLoginSuccess(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // console.log('登录返回: ', res);
    }

    afterLoginSuccess = async () => {
        document.getElementById('login_loading').style.display = 'none';
        hashHistory.push('/home');
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
