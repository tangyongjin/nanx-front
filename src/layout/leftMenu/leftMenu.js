import { Menu } from 'antd';
import IconWrapper from '@/utils/IconWrapper';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';
import { findMenuPath } from '@/utils/tools';

@inject('MenuStore')
@observer
export default class LeftMenu extends React.Component {
    constructor(props) {
        super();
        this.MenuStore = props.MenuStore;
    }

    async menuclickHandler(menuItem, event) {
        event.domEvent.preventDefault();
        event.domEvent.stopPropagation();
        let menuClicked = toJS(menuItem);

        // 重复点击相同菜单,刷新内容

        if (event.key == this.MenuStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
            this.MenuStore.freshCurrentMenuItem();
            return;
        }

        await this.MenuStore.setCurrentMenu(menuClicked);
        await this.MenuStore.setSelectedKeys(menuClicked.key);
        let path = findMenuPath(this.MenuStore.RoleBasedMenuList, menuClicked.key);
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

    transformMenuArray(menuArray) {
        return menuArray.map((item) => {
            const { key, children, title, menu, router, datagrid_code } = item;
            const icon = IconWrapper(item.icon);

            const transformedItem = {
                key,
                icon,
                ...(children && children.length > 0 && { children: this.transformMenuArray(children) }),
                label: title,
                menu,
                router,
                datagrid_code,
                type: null,
                onClick: (event) => this.menuclickHandler(item, event)
            };

            return transformedItem;
        });
    }

    render() {
        const menuItems = this.transformMenuArray(toJS(this.props.menuList));

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
                    <Menu
                        mode="inline"
                        openKeys={this.MenuStore.openKeys}
                        theme="dark"
                        onOpenChange={(openKeys) => this.MenuStore.onOpenChange(openKeys)}
                        selectedKeys={this.MenuStore.selectedKeys}
                        items={menuItems}></Menu>
                </div>
            </div>
        );
    }
}
