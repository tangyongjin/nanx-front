import { observable, action, set, computed } from 'mobx';
import React from 'react';
import api from '@/api/api';
import IconWrapper from '@/utils/IconWrapper';
import { randomString, getAllKeys, findMenuPath, menuTransformer } from '@/utils/tools';
import { message } from 'antd';
import { findItemByKey } from '@/utils/tools';
import { getDefaultMenuItem } from '@/utils/tools';

class _MenuStore {
    @observable randomKey = randomString(10);
    @observable isCollapse = false;
    @observable currentMenu = {};
    @observable selectedKeys = [];

    // 系统所有菜单
    @observable AllMenuList = [];
    @observable AllMenuKeys = [];
    @observable menuPath = [];

    // 基于当前登录的角色的菜单
    @observable RoleBasedMenuList = [];
    @observable RoleUsedKeys = [];
    @observable RoleMenuArray = [];

    @action setRoleMenuArray = (arr) => {
        this.RoleMenuArray = arr;
    };

    // 要设置的角色的信息
    @observable TargetRoleBasedMenuList = [];
    @observable TargetRoleUsedKeys = [];

    // 菜单对应的 Tabs
    @observable MenuTabItems = [];

    @action setMenuTabItems = (tabs) => {
        this.MenuTabItems = tabs;
    };

    @observable activeTabKey = null;

    @action setActiveTabKey = (key) => {
        this.activeTabKey = key;
    };

    @observable history = null;

    @action setHistory = (his) => {
        this.history = his;
    };

    @observable currentRole = {
        role_code: sessionStorage.getItem('role_code'),
        role_name: sessionStorage.getItem('role_name')
    };

    @action setRoleBasedMenuList = (para) => {
        this.RoleBasedMenuList = para;
    };

    @computed
    get breadcrumb() {
        if (!this.currentMenu) {
            return '';
        }

        let currentMenyKey = this.currentMenu.key;
        let _path = findMenuPath(this.RoleBasedMenuList, currentMenyKey);
        let bread = '';
        _path &&
            _path.forEach((menu) => {
                bread += menu.title + '/';
            });
        return bread.slice(0, -1);
    }

    @action
    saveMenuPermission = async (rolecode, menu_level, menuid, parentid) => {
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

    @action setAllMenuList = (menus) => {
        this.AllMenuList = menus;
    };

    @action getAllTreeMenuList = async () => {
        let res = await api.permission.getAllTreeMenuList();
        if (res.code == 200) {
            this.AllMenuKeys = getAllKeys(res.data);
            this.setAllMenuList(res.data);
        }
    };

    @action
    async getMenuTreeByRoleCode(roleCode) {
        let params = {
            data: {
                role_code: roleCode
            }
        };
        let res = await api.permission.getMenuTreeByRoleCode(params);
        if (res.code == 200) {
            this.setRoleBasedMenuList(res.data.menuList);

            let tmpArr = menuTransformer(res.data.menuList);
            this.setRoleMenuArray(tmpArr);
            this.RoleUsedKeys = getAllKeys(res.data.menuList);
        }
    }

    @action
    async getMenuTreeByTargetRoleCode(roleCode) {
        let params = {
            data: {
                role_code: roleCode
            }
        };
        let res = await api.permission.getMenuTreeByRoleCode(params);
        if (res.code == 200) {
            this.TargetRoleBasedMenuList = res.data.menuList;
            this.TargetRoleUsedKeys = getAllKeys(res.data.menuList);
        }
    }

    @action getCurrentMenuKeyFromSessionStorage = () => {
        if (sessionStorage.getItem('currentMenu')) {
            let tmp = JSON.parse(sessionStorage.getItem('currentMenu'));
            return tmp;
        } else {
            return null;
        }
    };

    @action clear = () => {
        this.isCollapse = false;
        this.openKeys = [];
        this.currentMenu = {};
        this.selectedKeys = [];
        this.setMenuTabItems([]);
        sessionStorage.clear();
    };

    @action freshRandomKey = () => {
        setTimeout(() => {
            this.randomKey = randomString(10);
        }, 0);
    };

    @action toggleCollapse = () => {
        this.isCollapse = !this.isCollapse;

        let ele = document.getElementById('logo');
        ele.style['font-size'] = '16px';

        if (this.isCollapse) {
            ele.innerHTML = 'Nanx+';
        } else {
            ele.innerHTML = '[Nanx+]';
            ele.style['font-size'] = '21px';
        }
    };

    @action setBossTitle = (staff_name) => {
        let ele = document.getElementById('bossTitle');
        if (staff_name) {
            ele.innerHTML = 'NaNX/' + staff_name;
            return;
        }
        ele.innerHTML = 'NaNX';
    };

    @action setSelectedKeys = (key) => {
        this.selectedKeys = key;
    };

    @action.bound
    setCurrentMenu = (menu) => {
        console.log('当前菜单项', menu);

        this.currentMenu = menu;
        if (menu) {
            this.setSelectedKeys([menu.key]);
        }
        sessionStorage.setItem('currentMenu', JSON.stringify(menu));
    };

    @action addMenuTabItem = async (key, label, icon, pushObj) => {
        let keyAlreadyExists = this.MenuTabItems.some((item) => item.key === key);
        console.log(IconWrapper(icon));
        const Xlabel = (
            <div className="menu-tab-title">
                {IconWrapper(icon)} {label}
            </div>
        );

        if (!keyAlreadyExists) {
            let _tmpTab = {
                key: key,
                label: Xlabel,
                children: null,
                closable: true,
                pushObj: pushObj
            };

            this.MenuTabItems.push(_tmpTab);
            this.setActiveTabKey(key);
            this.history.push(pushObj);
        } else {
        }
    };

    @action removeMenuTabItem = (mkey) => {
        /* 如果 MenuTabItems 只有一个元素,直接返回,否则
        删除 mkey对应的item, 并且把后面一个item设为active,
        如果没有后面的 item,则把第一个作为 active
         */
        const deleted = this.MenuTabItems.filter((item) => parseInt(item.key) !== parseInt(mkey));
        this.setMenuTabItems(deleted);

        if (deleted.length > 0) {
            const activeItem = deleted.find((item) => item.key === this.activeTabKey);
            if (!activeItem) {
                this.setActiveTabKey(deleted[0].key);
                let curMenuItem = findItemByKey(this.RoleBasedMenuList, deleted[0].key);
                this.setCurrentMenu(curMenuItem);
                this.history.replace(deleted[0].pushObj);
            }
        }
    };

    @action setMenuTabItemChildren = (key, children) => {
        const updatedMenuTabItems = this.MenuTabItems.map((element) => {
            if (element.key === key && element.children == null) {
                // Use mobx.set to update the observable property
                set(element, 'children', children);
            }
            return element;
        });

        this.setActiveTabKey(key);
        this.setMenuTabItems(updatedMenuTabItems);
    };

    @action setExecutedStatusForKey = (key) => {
        const currentItem = this.MenuTabItems.find((item) => item.key === key);
        if (currentItem) {
            currentItem.pushObj.executed = true;
        }
    };

    @action afterLogin = async (history) => {
        this.setHistory(history);
        await this.getMenuTreeByRoleCode(sessionStorage.getItem('role_code'));
        let defaultMenuItem = getDefaultMenuItem(this.RoleMenuArray);
        this.setCurrentMenu(defaultMenuItem, 'afterLoginSuccess');

        let searchStr;
        if (defaultMenuItem.router == '/datagrid') {
            searchStr = `?datagrid_code=${defaultMenuItem.datagrid_code}&key=${defaultMenuItem.key}`;
        } else {
            searchStr = `?key=${defaultMenuItem.key}`;
        }

        const pushObj = {
            executed: false,
            pathname: defaultMenuItem.router,
            search: searchStr,
            state: {
                datagrid_code: defaultMenuItem?.datagrid_code,
                key: defaultMenuItem.key
            }
        };

        this.history.push(pushObj);
    };
}

const MenuStore = new _MenuStore();
export default MenuStore;
