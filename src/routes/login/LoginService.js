import decode from 'jwt-decode';
import { hashHistory } from 'react-router';
import api from '@/api/api';
import { getDefaultMenuItem } from '@/utils/tools';
import MenuStore from '@/store/MenuStore';
import UserStore from '@/store/UserStore';
import { message } from 'antd';

export default class LoginService {
    constructor() {
        this.loginMobile = this.loginMobile.bind(this);
    }

    async loginMobile(mobile, password, transaction_id) {
        document.getElementById('login_msg').style.display = 'none';
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id }
        };

        await api.user
            .loginMobile(params)
            .then(async (res) => {
                if (res.code == 401) {
                    document.getElementById('login_msg').style.display = 'block';
                    return;
                }

                if (res.code == 500) {
                    document.getElementById('login_msg').style.display = 'block';
                    return;
                }

                if (res.code == 200) {
                    await UserStore.setToken(res.token);
                    await UserStore.setUserProfile(res.profile);
                    await this.afterLoginSuccess(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    afterLoginSuccess = async () => {
        await MenuStore.getMenuTreeByRoleCode(sessionStorage.getItem('role_code'));
        let defaultMenuItem = getDefaultMenuItem(MenuStore.RoleMenuArray);
        console.log('defaultMenuItem: ', defaultMenuItem);
        MenuStore.setCurrentMenu(defaultMenuItem, 'afterLoginSuccess');

        if (defaultMenuItem.router == '/table/commonXTable') {
            hashHistory.push({
                pathname: defaultMenuItem.router,
                state: { datagrid_code: defaultMenuItem.datagrid_code }
            });
        } else {
            hashHistory.push(defaultMenuItem.router);
        }
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
        MenuStore.clear();
        hashHistory.push('/login');
    }
}
