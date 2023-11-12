import { observable, action } from 'mobx';
import { randomString } from '@/utils/tools';

class NavigationStore {
    @observable randomKey = randomString(10);
    @observable isCollapse = false;
    @observable openKeys = [];
    @observable currentMenu = {};
    @observable selectedKeys = [];
    @observable menuPath = [];

    @action clear = () => {
        this.isCollapse = false;
        this.openKeys = [];
        this.currentMenu = {};
        this.selectedKeys = [];
        this.menuPath = []; // 面包屑用
        sessionStorage.clear();
    };

    @action setMenuPath = (path) => {
        this.menuPath = path;
    };

    @action buildBreadcrumb = () => {};

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
        // 保存当前菜单到 sessionStorage
        sessionStorage.setItem('currentMenu', JSON.stringify(menu));
    };

    @action onOpenChange = (openKeys) => {
        console.log('openKeys>>💥💥💥💥💥💥💥💥>路径 ', openKeys);
        // this.openKeys = openKeys;
    };

    @action setOpenKeys = (path) => {
        this.openKeys = path;
    };

    @action getBreadcrumbSessionStorage = () => {
        if (sessionStorage.getItem('currentMenu')) {
            this.currentMenu = JSON.parse(sessionStorage.getItem('currentMenu'));
            return;
        }
    };

    findMenuPath(menu, key) {
        console.log('👹👹👹👹👹menu: ', menu);
        console.log('👹👹👹key: ', key);

        const findPath = (menu, key, path) => {
            for (let i = 0; i < menu.length; i++) {
                const item = menu[i];
                path.push({ key: item.key, title: item.title });
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
}

export default new NavigationStore();
