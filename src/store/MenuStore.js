import { observable, action } from 'mobx';
import api from '../api/api';
import { message } from 'antd';

class MenuStore {
    @observable selectButtonkeys = [];
    @observable menuList = [];
    @observable currentRole = {
        role_code: sessionStorage.getItem('role_code'),
        role_name: sessionStorage.getItem('role_name')
    };

    @observable selectMenukeys = [];
    @observable selectTartgetMenukeys = [];
    @observable treeMenuList = [];

    @action saveMenuPermission = async (nextTargetKeys, direction, moveKeys) => {
        let params = {
            data: {
                role_code: this.currentRole.role_code,
                menu_id_list: moveKeys,
                state: direction == 'right' ? 'insert' : 'delete'
            }
        };
        let res = await api.permission.saveMenuPermission(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys = nextTargetKeys;
            message.success('菜单分配成功！');
            await this.getRoleMenuList();
            return;
        }
    };

    @action getRoleMenuList = async () => {
        let params = { data: { role_code: this.currentRole.role_code } };
        let res = await api.permission.getRoleMenuList(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys = res.data.map((item) => item.key);
            return;
        }
    };

    @action getTreeMenuList = async () => {
        let params = {};

        let res = await api.permission.getTreeMenuList(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys.map((key) => {
                res.data.filter((item) => item.key == key);
            });

            this.treeMenuList = res.data;
            return;
        }
    };

    @action menuSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.selectMenukeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    };
}

export default new MenuStore();
