import { observable, action } from 'mobx';
import { randomString } from '@/utils/tools';

class NavigationStore {
    @observable updateKey = randomString(5);
    @observable breadcrumb = [];
    @observable isCollapse = false;
    @observable openKeys = [];
    @observable currentMenu = {};

    @action clear = () => {
        this.breadcrumb = [];
        this.isCollapse = false;
        this.openKeys = [];
        this.currentMenu = {};
        sessionStorage.clear();
    };

    @action freshCurrentMenuItem = () => {
        setTimeout(() => {
            this.updateKey = randomString(10);
        }, 0);
    };

    @action toggleCollapse = () => {
        console.log('侧边栏收齐/展开');
        this.isCollapse = !this.isCollapse;

        // set id =logo text :
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

    @action setCurrentMenu = (menu) => {
        // 没有菜单列表时，菜单配置为空处理
        if (menu == undefined) {
            return;
        }
        this.currentMenu = menu;
    };

    @action setOpenKeys = (openKeys) => (this.openKeys = openKeys);

    @action setComputedOpenKeys = () => {
        let openKeys = this.breadcrumb.map((item) => {
            if (item.children) {
                return item.key;
            }
        });
        this.setOpenKeys(openKeys);
    };

    @action getBreadcrumbSessionStorage = () => {
        if (sessionStorage.getItem('breadcrumb')) {
            this.breadcrumb = JSON.parse(sessionStorage.getItem('breadcrumb'));
            this.setComputedOpenKeys();
            return;
        }
    };

    xloop(menu, pid, breadcrumbs) {
        menu.forEach((k) => {
            if (k.key == pid) {
                breadcrumbs.push(k);
                return k;
            } else {
                if (k.children) {
                    this.xloop(k.children, pid, breadcrumbs);
                }
            }
        });
    }
}

export default new NavigationStore();
