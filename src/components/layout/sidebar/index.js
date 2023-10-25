import { Icon, Menu } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';

@inject('navigationStore')
@observer
export default class Sidebar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            menulist: []
        };
        this.store = props.navigationStore;
    }

    async componentDidMount() {
        await this.store.getMenuTreeByRoleCode();
        let { menuList } = this.store;
        this.setState({ menulist: menuList });
    }

    menuclickHandler(menuItem, item) {
        item.domEvent.preventDefault();
        item.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem);

        // 点击菜单刷新右侧功能
        if (
            JSON.stringify(menuClicked) == JSON.stringify(this.store.currentMenu) &&
            window.location.href.indexOf(menuClicked.router) != -1
        ) {
            this.store.changeUpdateKey();
            return;
        }

        this.store.setBreadcrumb(menuClicked);
        this.store.setCurrentMenu(menuClicked);
        this.store.setSelectedKeys(menuClicked.key);
        hashHistory.push({
            pathname: menuClicked.router,
            state: {
                datagrid_code: menuClicked.datagrid_code,
                menu_code: menuClicked.menu
            }
        });
    }

    getChildren(menuitem, index) {
        let one = menuitem;
        if (!one.children) {
            one.children = [];
        }

        return one.children.length === 0 ? (
            <Menu.Item key={menuitem.key} onClick={this.menuclickHandler.bind(this, one)}>
                {one.icon ? <Icon type={one.icon} /> : null}

                <span id={one.menu_uuid}>{one.text}</span>
            </Menu.Item>
        ) : (
            <Menu.SubMenu
                key={menuitem.key}
                title={
                    <span>
                        <Icon type={one.icon} />
                        <span id={one.menu_uuid}>{one.text}</span>
                    </span>
                }>
                {one.children.map((xitem, itemIndex) => this.getChildren(xitem, itemIndex))}
            </Menu.SubMenu>
        );
    }

    onOpenChange(openKeys) {
        this.store.setOpenKeys(openKeys);
    }

    render() {
        const defaultProps = this.store.isCollapse ? {} : { openKeys: this.store.openKeys };
        return (
            <div className="menuWrapper">
                {this.state.menulist ? (
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={this.store.selectedKeys}
                        onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
                        {...defaultProps}>
                        {this.state.menulist.map((menuitem, index) => this.getChildren(menuitem, index))}
                    </Menu>
                ) : (
                    <div>222</div>
                )}
            </div>
        );
    }
}
