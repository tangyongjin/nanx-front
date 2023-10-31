import { observable, action, toJS } from 'mobx';

class UserStore {
    @observable userInfo = null;
    @observable token = null;

    @action
    setUserProfile(profile) {
        let userInfo = toJS(profile);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('user', userInfo.user);
        sessionStorage.setItem('role_code', userInfo.role_code);
        sessionStorage.setItem('role_name', userInfo.role_name);
        sessionStorage.setItem('staff_name', userInfo.staff_name);
    }

    @action
    getUserProfile() {
        return this.userInfo;
    }

    @action setToken(token) {
        sessionStorage.setItem('token', token);
        this.token = token;
    }

    @action getToken() {
        return sessionStorage.getItem('token');
    }

    @action clearToken() {
        sessionStorage.removeItem('token');
        this.token = null;
    }
}

export default new UserStore();
