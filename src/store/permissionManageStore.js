import { observable, action } from 'mobx';
import api from '../api/api';
import { message } from 'antd';

class permissionManageStore {
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
            },
            method: 'POST'
        };
        let res = await api.permission.saveMenuPermission(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys = nextTargetKeys;
            message.success('菜单分配成功！');
            await this.getRoleMenuList();
            return;
        }
        message.success('菜单分配失败！');
    };

    @action getRoleMenuList = async () => {
        let params = {
            data: {
                role_code: this.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getRoleMenuList(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys = res.data.map((item) => item.key);
            return;
        }
        message.success('获取角色已分配的菜单失败');
    };

    @action getTreeMenuList = async () => {
        let params = {
            data: {},
            method: 'POST'
        };

        let res = await api.permission.getTreeMenuList(params);

        if (res.code == 200) {
            this.selectTartgetMenukeys.map((key) => {
                res.data.filter((item) => item.key == key);
            });

            this.treeMenuList = res.data;
            return;
        }
        message.success('获取菜单失败');
    };

    @action menuSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log(sourceSelectedKeys, targetSelectedKeys);
        this.selectMenukeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    };
}

export default new permissionManageStore();
