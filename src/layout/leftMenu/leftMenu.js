import React from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { hashHistory } from 'react-router';
import { findItemByKey } from '@/utils/tools';

const LeftMenu = inject(
    'MenuStore',
    'GridConfigStore'
)(
    observer((props) => {
        console.log('props菜单渲染: ', props);

        const handleMenuClick = async (item) => {
            const menuClicked = findItemByKey(props.MenuStore.RoleMenuArray, item.key);
            if (menuClicked.router == '/table/commonXTable') {
                if (menuClicked?.datagrid_code == 'GirdMNT') {
                    console.log('GirdMNT: ', 'GirdMNT');
                }
            }

            props.MenuStore.setCurrentMenu(menuClicked, 'handleMenuClick');
            props.MenuStore.addMenuTabItem(menuClicked.key, menuClicked.label);

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
