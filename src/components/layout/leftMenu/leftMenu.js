import { Menu } from 'antd';
import Icon from '@/utils/icon';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';

@inject('NavigationStore')
@observer
export default class LeftMenu extends React.Component {
    constructor(props) {
        super();
        this.state = {
            menulist: []
        };
        this.NavigationStore = props.NavigationStore;
    }

    async componentDidMount() {
        await this.NavigationStore.getMenuTreeByRoleCode();
        let { menuList } = this.NavigationStore;
        this.setState({ menulist: menuList });
    }

    menuclickHandler(menuItem, item) {
        item.domEvent.preventDefault();
        item.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem);

        // 点击菜单刷新右侧功能
        if (
            JSON.stringify(menuClicked) == JSON.stringify(this.NavigationStore.currentMenu) &&
            window.location.href.indexOf(menuClicked.router) != -1
        ) {
            this.NavigationStore.changeUpdateKey();
            return;
        }

        this.NavigationStore.setCurrentMenu(menuClicked);
        this.NavigationStore.setSelectedKeys(menuClicked.key);
        hashHistory.push({
            pathname: menuClicked.router,
            state: {
                datagrid_code: menuClicked.datagrid_code,
                menu_code: menuClicked.menu
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
                <span id={one.menu_uuid}>{one.text}</span>
            </Menu.Item>
        ) : (
            <Menu.SubMenu
                key={menuitem.key}
                title={
                    <span>
                        {one.icon ? <Icon icon={one.icon} /> : null}
                        <span id={one.menu_uuid}>{one.text}</span>
                    </span>
                }>
                {one.children.map((xitem, itemIndex) => this.getChildren(xitem, itemIndex))}
            </Menu.SubMenu>
        );
    }

    onOpenChange(openKeys) {
        this.NavigationStore.setOpenKeys(openKeys);
    }

    render() {
        const defaultProps = this.NavigationStore.isCollapse ? {} : { openKeys: this.NavigationStore.openKeys };

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
                    {this.state.menulist ? (
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={this.NavigationStore.selectedKeys}
                            onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
                            {...defaultProps}>
                            {this.state.menulist.map((menuitem, index) => this.getChildren(menuitem, index))}
                        </Menu>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        );
    }
}
