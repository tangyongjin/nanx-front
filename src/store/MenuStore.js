import { observable, action } from 'mobx';
import api from '../api/api';
import { randomString } from '@/utils/tools';
import { message } from 'antd';

class _MenuStore {
    @observable randomKey = randomString(10);
    @observable isCollapse = false;
    @observable openKeys = [];
    @observable currentMenu = {};
    @observable selectedKeys = [];

    @observable currentRole = {
        role_code: sessionStorage.getItem('role_code'),
        role_name: sessionStorage.getItem('role_name')
    };

    // 系统所有菜单
    @observable AllMenuList = [];
    @observable AllMenuKeys = [];
    @observable breadcrumb = '';
    @observable menuPath = [];

    // 基于角色的菜单
    @observable RoleBasedMenuList = [];
    @observable RoleUsedKeys = [];

    @action setMenuPath = (path) => {
        this.menuPath = path;
        let opkeys = [];
        let bread = '';
        path &&
            path.forEach((menu) => {
                bread += menu.title + '/';
                opkeys.push(menu.key);
            });

        this.breadcrumb = bread.slice(0, -1);
        this.setOpenKeys(opkeys);
    };

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

    @action setAllMenuList = (menus) => {
        this.AllMenuList = menus;
    };

    @action getTreeMenuList = async () => {
        let params = {};

        let res = await api.permission.getTreeMenuList(params);
        if (res.code == 200) {
            this.AllMenuKeys = this.getAllKeys(res.data);
            this.setAllMenuList(res.data);
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
            this.refreshBreadcrumbs();
        }
    }

    @action refreshBreadcrumbs = () => {
        let key = this.getCurrentMenuKeyFromSessionStorage();
        console.log('刷新>>>>>>>>当前菜单集合');
        console.log('this.RoleBasedMenuList: ', this.RoleBasedMenuList);
        console.log('key', key);
        let path = this.findMenuPath(this.RoleBasedMenuList, key);
        this.setMenuPath(path);
    };

    findMenuPath(menu, key) {
        const findPath = (menu, key, path) => {
            for (let i = 0; i < menu.length; i++) {
                const item = menu[i];
                path.push(item);
                if (item.key === key) {
                    return path;
                }
                if (item.children) {
                    const foundPath = findPath(item.children, key, path);
                    if (foundPath) {
                        return foundPath;
                    }
                }
                path.pop();
            }
        };

        const path = [];
        const result = findPath(menu, key, path);
        return result;
    }

    @action getCurrentMenuKeyFromSessionStorage = () => {
        if (sessionStorage.getItem('currentMenu')) {
            let tmp = JSON.parse(sessionStorage.getItem('currentMenu'));
            return tmp.key;
        } else {
            return null;
        }
    };

    @action onOpenChange = (openKeys) => {
        console.log('openKeys>>💥💥💥💥💥💥💥💥>路径 ', openKeys);
        this.openKeys = openKeys;
    };

    @action setOpenKeys = (path) => {
        this.openKeys = path;
    };

    @action clear = () => {
        this.isCollapse = false;
        this.openKeys = [];
        this.currentMenu = {};
        this.selectedKeys = [];
        sessionStorage.clear();
    };

    @action freshCurrentMenuItem = () => {
        setTimeout(() => {
            this.randomKey = randomString(10);
        }, 0);
    };

    @action toggleCollapse = () => {
        console.log('侧边栏收齐/展开');
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

    @action setCurrentMenu = (menu) => {
        console.log('当前菜单', menu);
        // 没有菜单列表时，菜单配置为空处理
        if (menu == [] || menu == undefined) {
            return;
        }
        this.setSelectedKeys([menu.key]);
        this.currentMenu = menu;
        sessionStorage.setItem('currentMenu', JSON.stringify(menu));
    };
}

const MenuStore = new _MenuStore();
export default MenuStore;
