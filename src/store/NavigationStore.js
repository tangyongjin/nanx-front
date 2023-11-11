import { observable, action } from 'mobx';
import { randomString } from '@/utils/tools';

class NavigationStore {
    @observable updateKey = randomString(5);
    @observable breadcrumb = [];
    @observable isCollapse = false;
    @observable openKeys = [];
    @observable selectedKeys = [];
    @observable currentMenu = {};
    @observable badge_sum = 0;
    @observable address_count = 0;
    @observable message_count = 0;
    @observable affair_count = 0;

    @action clear = () => {
        this.currentMenu = {};
        this.breadcrumb = [];
        sessionStorage.clear();
        this.selectedKeys = [];
        this.openKeys = [];
    };

    @action changeUpdateKey = () => {
        setTimeout(() => {
            let _randKey = randomString(10);
            console.log('_randKey: ', _randKey);
            this.updateKey = _randKey;
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

    @action setCurrentMenu = (nav_row) => {
        // 没有菜单列表时，菜单配置为空处理
        if (nav_row == undefined) {
            return;
        }
        this.setSelectedKeys([nav_row.key]);
        this.currentMenu = nav_row;
    };

    @action setSelectedKeys = (selectedKeys) => (this.selectedKeys = selectedKeys);

    @action saveSessionBadge = (data) => {
        sessionStorage.setItem('badge', JSON.stringify(data));
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
