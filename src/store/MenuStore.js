import { observable, action } from 'mobx';
import api from '../api/api';
import { message } from 'antd';

class MenuStore {
    @observable currentRole = {
        role_code: sessionStorage.getItem('role_code'),
        role_name: sessionStorage.getItem('role_name')
    };

    // 系统所有菜单
    @observable AllMenuList = [];
    @observable AllMenuKeys = [];

    // 基于角色的菜单
    @observable RoleBasedMenuList = [];
    @observable RoleUsedKeys = [];

    @observable selectMenukeys = [];
    @observable selectTartgetMenukeys = [];

    @action saveMenuPermission = async (rolecode, menu_level, menuid, parentid) => {
        let params = {
            data: {
                rolecode: rolecode,
                menu_level: menu_level,
                menuid: menuid,
                parentid: parentid
            }
        };
        let res = await api.permission.saveMenuPermission(params);
        if (res.code == 200) {
            message.success('菜单分配成功！');
            return;
        }
    };

    @action deleteMenuPermission = async (rolecode, menu_level, menuid, parentid) => {
        let params = {
            data: {
                rolecode: rolecode,
                menu_level: menu_level,
                menuid: menuid,
                parentid: parentid
            }
        };
        let res = await api.permission.deleteMenuPermission(params);
        if (res.code == 200) {
            message.success('菜单分配成功！');
            return;
        }
    };

    getAllKeys(menuData) {
        let keys = [];

        function extractKeys(menuItem) {
            if (menuItem.children && menuItem.children.length == 0) {
                keys.push(menuItem.key);
            }

            if (!menuItem.children) {
                keys.push(menuItem.key);
            }

            if (menuItem.children && menuItem.children.length > 0) {
                menuItem.children.forEach((child) => {
                    extractKeys(child);
                });
            }
        }

        menuData.forEach((item) => {
            extractKeys(item);
        });

        return keys;
    }

    @action getTreeMenuList = async () => {
        let params = {};

        let res = await api.permission.getTreeMenuList(params);
        if (res.code == 200) {
            this.AllMenuKeys = this.getAllKeys(res.data);
            this.AllMenuList = res.data;
        }
    };

    @action
    async getMenuTreeByRoleCode() {
        let params = {
            data: {
                role_code: sessionStorage.getItem('role_code')
            }
        };
        let res = await api.permission.getMenuTreeByRoleCode(params);
        if (res.code == 200) {
            this.RoleBasedMenuList = res.data.menuList;
            this.RoleUsedKeys = this.getAllKeys(res.data.menuList);
        }
    }

    @action menuSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.selectMenukeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    };
}

export default new MenuStore();
