import { Menu } from 'antd';
import Icon from '@/utils/icon';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';

@inject('NavigationStore')
@inject('MenuStore')
@observer
export default class LeftMenu extends React.Component {
    constructor(props) {
        super();
        this.NavigationStore = props.NavigationStore;
        this.MenuStore = props.MenuStore;
    }

    async menuclickHandler(menuItem, item) {
        item.domEvent.preventDefault();
        item.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem);
        console.log('menuClicked: ', menuClicked);

        // 重复点击相同菜单,刷新内容

        if (item.key == this.NavigationStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
            console.log('重复点击相同菜单,刷新内容');
            this.NavigationStore.freshCurrentMenuItem();
            return;
        }

        await this.NavigationStore.setCurrentMenu(menuClicked);
        await this.NavigationStore.setSelectedKeys(menuClicked.key);
        let path = this.MenuStore.findMenuPath(this.MenuStore.RoleBasedMenuList, menuClicked.key);
        await this.MenuStore.setMenuPath(path);

        hashHistory.push({
            pathname: menuClicked.router,
            state: {
                datagrid_code: menuClicked?.datagrid_code,
                menu: menuClicked.menu,
                key: menuClicked.key
            }
        });
    }

    getChildren(menuitem) {
        let one = menuitem;
        if (!one.children) {
            one.children = [];
        }

        return one.children.length === 0 ? (
            <Menu.Item key={menuitem.key} onClick={this.menuclickHandler.bind(this, one)}>
                {one.icon ? <Icon icon={one.icon} /> : null}
                <span id={one.menu_uuid}>{one.title}</span>
            </Menu.Item>
        ) : (
            <Menu.SubMenu
                key={menuitem.key}
                title={
                    <span>
                        {one.icon ? <Icon icon={one.icon} /> : null}
                        <span id={one.menu_uuid}>{one.title}</span>
                    </span>
                }>
                {one.children.map((xitem) => this.getChildren(xitem))}
            </Menu.SubMenu>
        );
    }

    render() {
        return (
            <div>
                <div
                    id="logo"
                    style={{
                        display: 'flex',
                        height: '80px',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    [Nanx+]
                </div>
                <div>
                    <Menu mode="inline" theme="dark" selectedKeys={this.NavigationStore.selectedKeys}>
                        {this.props.menuList.map((menuitem, index) => this.getChildren(menuitem, index))}
                    </Menu>
                </div>
            </div>
        );
    }
}
