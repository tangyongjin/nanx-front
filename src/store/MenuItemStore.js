import { observable, action } from 'mobx';
import { port, root_url } from '@/api/api_config/base_config';
const avatarRoot = `${root_url}:${port}/`;

class _MenuRelatedStore {
    @observable userList = [];
    @observable roleList = [];
    @observable combinedArray = [];
    @action clearUser = () => (this.userList = []);
    @action clearRole = () => (this.roleList = []);
    @action setRoleList = (data) => (this.roleList = data);
    @action setUserList = (data) => (this.userList = data);
    @action setCombinedArray = (data) => (this.combinedArray = data);

    @action getCombinedArray = () => {
        this.setCombinedArray([]);

        let _tmp = [];

        this.roleList.forEach((role) => {
            const tmp = {
                type: '角色',
                name: role.role_name,
                code: role.role_code,
                avatar: ''
            };
            _tmp.push(tmp);
        });

        // 遍历users数组
        this.userList.forEach((user) => {
            const tmp = {
                type: '用户',
                name: user.user,
                code: '',
                avatar: avatarRoot + user.head_portrait
            };
            _tmp.push(tmp);
        });

        this.setCombinedArray(_tmp);
    };
}

const MenuRelatedStore = new _MenuRelatedStore();
export default MenuRelatedStore;
