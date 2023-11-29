import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';
import { randomString } from '@/utils/tools';

// import { findMenuPath } from '@/utils/tools';

const LeftMenu = inject('MenuStore')(
    observer((props) => {
        console.log('props菜单渲染: ', props);

        function findItemByKey(menuArray, key) {
            for (const item of menuArray) {
                if (item.key === key) {
                    return item; // 返回找到的项
                }

                // 如果有子项，递归查找
                if (item.children && item.children.length > 0) {
                    const foundInChildren = findItemByKey(item.children, key);
                    if (foundInChildren) {
                        return foundInChildren; // 返回找到的子项
                    }
                }
            }

            // 如果未找到匹配项，返回 null 或适当的值
            return null;
        }

        const handleMenuClick = (item) => {
            const menuClicked = findItemByKey(props.MenuStore.RoleMenuArray, item.key);
            if (item.key == props.MenuStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
                console.log('点击相同菜单');
                props.MenuStore.freshRandomKey();
                return;
            }

            props.MenuStore.setCurrentMenu(menuClicked);

            hashHistory.push({
                pathname: menuClicked.router,
                state: {
                    datagrid_code: menuClicked?.datagrid_code,
                    menu: menuClicked.menu,
                    key: menuClicked.key
                }
            });
        };

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
                        onClick={handleMenuClick}
                        items={props.MenuStore.RoleMenuArray}></Menu>
                </div>
            </div>
        );
    })
);

export default LeftMenu;
