import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';
import { findItemByKey } from '@/utils/tools';
const LeftMenu = inject('MenuStore')(
    observer((props) => {
        console.log('props菜单渲染: ', props);

        const handleMenuClick = (item) => {
            console.log(props.MenuStore);

            const menuClicked = findItemByKey(props.MenuStore.RoleMenuArray, item.key);
            if (item.key == props.MenuStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
                console.log('点击相同菜单');
                props.MenuStore.freshRandomKey();
                return;
            }

            props.MenuStore.setCurrentMenu(menuClicked, 'handleMenuClick');

            hashHistory.push({
                pathname: menuClicked.router,
                state: {
                    datagrid_code: menuClicked?.datagrid_code,
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
                        selectedKeys={props.MenuStore.selectedKeys}
                        onClick={handleMenuClick}
                        items={props.MenuStore.RoleMenuArray}></Menu>
                </div>
            </div>
        );
    })
);

export default LeftMenu;
