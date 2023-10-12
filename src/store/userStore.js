import { observable, action, toJS } from 'mobx';

class userStore {
    contractor() {
        if (!localStorage.getItem('token')) {
            this.getToken();
        }
    }

    @observable userInfo = null;

    @observable token = null;

    @action
    setUserProfile(profile) {
        let userInfo = toJS(profile);

        localStorage.setItem('staff_id', userInfo.staff_id);
        localStorage.setItem('staff_name', userInfo.staff_name);

        this.userInfo = { ...userInfo };
        console.log(467, userInfo);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('user', userInfo.user);
        sessionStorage.setItem('staff_name', userInfo.staff_name);
    }

    @action
    setUserRole(user) {
        localStorage.setItem('role_name', user.role_name);
        sessionStorage.setItem('role_name', user.role_name);
        sessionStorage.setItem('role_code', user.role_code);
    }

    @action
    getUserProfile() {
        return this.userInfo;
    }

    @action setToken(token) {
        localStorage.setItem('token', token); // 防止刷新丢失token
        sessionStorage.setItem('token', token);
        this.token = token;
    }

    @action getToken() {
        return sessionStorage.getItem('token');
    }

    @action clearToken() {
        localStorage.removeItem('token');
        this.token = null;
    }
}

export default new userStore();
