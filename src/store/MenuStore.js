import { observable, action, computed } from 'mobx';
import api from '../api/api';
import IconWrapper from '@/utils/IconWrapper';
import { hashHistory } from 'react-router';

import { randomString, getAllKeys } from '@/utils/tools';
import { message } from 'antd';

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

    // 给 Menu 的数组
    // @observable RoleMenuArray = [];

    // 要设置的角色的信息
    @observable TargetRoleBasedMenuList = [];
    @observable TargetRoleUsedKeys = [];

    @observable currentRole = {
        role_code: sessionStorage.getItem('role_code'),
        role_name: sessionStorage.getItem('role_name')
    };

    @observable name = 'alex';

    @action setRoleBasedMenuList = (para) => {
        this.RoleBasedMenuList = para;
    };

    // 计算面包屑
    // @observable breadcrumb = '';

    @computed
    get breadcrumb() {
        function findMenuPath(RoleBasedMenuList, currentMenukey) {
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

            let path = [];

            const result = findPath(RoleBasedMenuList, currentMenukey, path);
            console.log('设置路???result', result);
            if (typeof result === 'undefined') {
                return [];
                // this.setMenuPath([]);
            } else {
                // this.setMenuPath(result);
                return result;
            }
        }

        let sk = null;
        if (sessionStorage.getItem('currentMenu')) {
            let tmp = JSON.parse(sessionStorage.getItem('currentMenu'));
            sk = tmp.key;
        }

        console.log('sk: ', sk);
        console.log(this.currentMenu);
        let _path = findMenuPath(this.RoleBasedMenuList, sk);
        console.log('计算面包屑>>>>>>>>>>>>> ', _path);

        let bread = '';
        _path &&
            _path.forEach((menu) => {
                bread += menu.title + '/';
            });

        return bread.slice(0, -1);
        // return 'BRE';
    }

    @computed
    get RoleMenuArray() {
        function transformMenuArray(menuArray, handler) {
            return menuArray.map((item) => {
                const { key, children, title, menu, router, datagrid_code } = item;
                const icon = IconWrapper(item.icon);
                const transformedItem = {
                    key,
                    icon,
                    ...(children && children.length > 0 && { children: transformMenuArray(children, handler) }),
                    label: title,
                    menu,
                    router,
                    datagrid_code,
                    type: null
                    // onClick: (event) => handler(item, event)
                };
                return transformedItem;
            });
        }

        let _mit = transformMenuArray(this.RoleBasedMenuList, this.menuclickHandler);
        return _mit;
    }

    @action setMenuPath = (path) => {
        this.menuPath = path;
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
    @action.bound
    menuclickHandler = async (menuItem, event) => {
        console.log('event: ', event);
        console.log('menuItem: ', menuItem);

        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();

        let menuClicked = menuItem;

        console.log('点击的key:', menuClicked.key);
        await this.setCurrentMenu(menuClicked);

        // 重复点击相同菜单,刷新内容

        if (event.key == this.currentMenu.key && window.location.href.includes(menuClicked.router)) {
            this.freshCurrentMenuItem();
            return;
        }

        hashHistory.push({
            pathname: menuClicked.router,
            state: {
                datagrid_code: menuClicked?.datagrid_code,
                menu: menuClicked.menu,
                key: menuClicked.key
            }
        });
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
            // this.RoleMenuArray = this.transformMenuArray(res.data.menuList);
            this.RoleUsedKeys = getAllKeys(res.data.menuList);
            // this.refreshBreadcrumbs();
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

    @action refreshBreadcrumbs = async () => {
        // let path = await this.findMenuPath();
        // this.setMenuPath(path);
    };

    @action getCurrentMenuKeyFromSessionStorage = () => {
        if (sessionStorage.getItem('currentMenu')) {
            let tmp = JSON.parse(sessionStorage.getItem('currentMenu'));
            return tmp.key;
        } else {
            return null;
        }
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
        console.log(JSON.stringify(menu));
        this.setSelectedKeys([menu.key]);
        this.currentMenu = menu;
        sessionStorage.setItem('currentMenu', JSON.stringify(menu));
    };
}

const MenuStore = new _MenuStore();
export default MenuStore;
