import { observable, action } from 'mobx';
import { randomString } from '@/utils/tools';

class _NavigationStore {
    @observable randomKey = randomString(10);
    @observable isCollapse = false;
    @observable openKeys = [];
    @observable currentMenu = {};
    @observable selectedKeys = [];

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

const NavigationStore = new _NavigationStore();
export default NavigationStore;
