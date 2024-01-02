import React from 'react';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import { findItemByKey } from '@/utils/tools';
import { useStore } from '@/store/StoreHelpers';

const LeftMenu = observer(() => {
    const { MenuStore } = useStore();
    console.log('菜单渲染 ');
    const handleMenuClick = async (item) => {
        const menuClicked = findItemByKey(MenuStore.RoleBasedMenuList, item.key);
        MenuStore.setActiveTabKey(item.key);
        MenuStore.setCurrentMenu(menuClicked, 'handleMenuClick');
        let pushObj = await MenuStore.getPushObj(item.key);
        MenuStore.addMenuTabItem(menuClicked.key, menuClicked.title, menuClicked.icon, pushObj);
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
                [Nanx+] {MenuStore.upperCaseName}
            </div>
            <div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={MenuStore.selectedKeys}
                    onClick={handleMenuClick}
                    items={MenuStore.RoleMenuArray}></Menu>
            </div>
        </div>
    );
});

export default LeftMenu;
