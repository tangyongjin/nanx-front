import decode from 'jwt-decode';
import { hashHistory } from "react-router";
import api from '../../api/api'
import navigationStore from '@/store/navigationStore'
import userStore from '@/store/userStore'
import {
    message
} from 'antd'



export default class AuthService {
    constructor(domain) {
        this.login_mobile = this.login_mobile.bind(this)
    }


    async login_mobile(mobile, password, transaction_id) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id },
            method: 'POST'
        };

        let res = await api.user.login_mobile(params)


        if (res.code == 401) {
            message.error('登陆失败，请检查手机号和密码！', 2.5)
            return;
        }


        if (res.code == 200) {
            this.afterLogin(res)
        }
    }



    async login_qrscan(transaction_id) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('mobile');
        let params = {
            data: { transaction_id },
            method: 'POST'
        };

        let res = await api.user.login_qrscan(params)
        if (res.code == 401) {
            message.error('登陆失败,请确认您有登录权限！', 2.5)
            return;
        }


        if (res.code == 200) {
            this.afterLogin(res)

        }
    }  


    afterLogin(res) {
        message.loading('登录成功,准备工作环境 ', 1.1, () => {
            navigationStore.saveSessionBadge(res.info);
            navigationStore.setBadge(res.info);
            userStore.setUserProfile(res.profile);
            userStore.setToken(res.token);
            hashHistory.push('/home')
        })





    }



    loggedIn() {

        let token = userStore.getToken() // 

        if (token === null) {
            message.info('登陆过期,请重新登录', 2.5)
            return false;
        }

        if (this.isTokenExpired(token)) {
            message.info('登陆过期,请重新登录', 2.5)
            return false;
        }

        //   alert('true')
        return true;
    }




    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }


    logout() {
        // Clear user token and profile data from localStorage
        userStore.clearToken()
        sessionStorage.clear();
        navigationStore.clear()
        hashHistory.push('/login')
    }



}
