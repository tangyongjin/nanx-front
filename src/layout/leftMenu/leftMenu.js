import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { findItemByKey } from '@/utils/tools';
import { getDefaultMenuItem } from '@/utils/tools';

const LeftMenu = inject('MenuStore')(
    observer((props) => {
        const handleMenuClick = async (item) => {
            const menuClicked = findItemByKey(props.MenuStore.RoleBasedMenuList, item.key);
            props.MenuStore.setCurrentMenu(menuClicked, 'handleMenuClick');
            let searchStr;
            if (menuClicked.router == '/datagrid') {
                searchStr = `?datagrid_code=${menuClicked.datagrid_code}&key=${menuClicked.key}`;
            } else {
                searchStr = `?key=${menuClicked.key}`;
            }

            const pushObj = {
                executed: false,
                pathname: menuClicked.router,
                search: searchStr,
                state: {
                    datagrid_code: menuClicked?.datagrid_code,
                    key: menuClicked.key
                }
            };

            props.MenuStore.addMenuTabItem(menuClicked.key, menuClicked.title, menuClicked.icon, pushObj);
            props.MenuStore.history.push(pushObj);
        };

        useEffect(() => {
            // 模拟点击默认菜单项
            const defaultMenuItem = getDefaultMenuItem(props.MenuStore.RoleMenuArray);
            if (defaultMenuItem) {
                console.log('模拟点击默认菜单项 ', defaultMenuItem);
                handleMenuClick(defaultMenuItem);
            }
        }, []); // 依赖数组为空，表示只在组件加载时执行一次

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
                    [Nanx+] {props.MenuStore.upperCaseName}
                </div>
                <div>
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={props.MenuStore.selectedKeys}
                        onClick={handleMenuClick}
                        items={props.MenuStore.RoleMenuArray}></Menu>
                </div>
            </div>
        );
    })
);

export default LeftMenu;
