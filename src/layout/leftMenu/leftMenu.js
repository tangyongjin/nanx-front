// import { Menu } from 'antd';
// import IconWrapper from '@/utils/IconWrapper';
// import { toJS } from 'mobx';
// import { inject, observer } from 'mobx-react';
// import React from 'react';
// import { hashHistory } from 'react-router';
// import { findMenuPath } from '@/utils/tools';

// @inject('MenuStore')
// @observer
// export default class LeftMenu extends React.Component {
//     constructor(props) {
//         super();
//         props.MenuStore = props.MenuStore;
//     }

//     async menuclickHandler(menuItem, item) {
//         console.log('Clicked: ', menuItem);

//         item.domEvent.preventDefault();
//         item.domEvent.stopPropagation();
//         let menuClicked = toJS(menuItem);

//         // 重复点击相同菜单,刷新内容

//         if (item.key == props.MenuStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
//             props.MenuStore.freshCurrentMenuItem();
//             return;
//         }

//         await props.MenuStore.setCurrentMenu(menuClicked);
//         await props.MenuStore.setSelectedKeys(menuClicked.key);
//         let path = findMenuPath(props.MenuStore.RoleBasedMenuList, menuClicked.key);
//         await props.MenuStore.setMenuPath(path);

//         hashHistory.push({
//             pathname: menuClicked.router,
//             state: {
//                 datagrid_code: menuClicked?.datagrid_code,
//                 menu: menuClicked.menu,
//                 key: menuClicked.key
//             }
//         });
//     }

//     getChildren(menuitem) {
//         let one = menuitem;
//         if (!one.children) {
//             one.children = [];
//         }

//         return one.children.length === 0 ? (
//             <Menu.Item key={menuitem.key} onClick={props.menuclickHandler.bind(this, one)}>
//                 <span>{IconWrapper(one.icon)}</span>
//                 <span id={one.menu_uuid}>{one.title}</span>
//             </Menu.Item>
//         ) : (
//             <Menu.SubMenu
//                 key={menuitem.key}
//                 title={
//                     <span>
//                         <span>{IconWrapper(one.icon)} </span>
//                         <span id={one.menu_uuid}>{one.title}</span>
//                     </span>
//                 }>
//                 {one.children.map((xitem) => props.getChildren(xitem))}
//             </Menu.SubMenu>
//         );
//     }

//     render() {
//         return (
//             <div>
//                 <div
//                     id="logo"
//                     style={{
//                         display: 'flex',
//                         height: '80px',
//                         color: 'white',
//                         fontSize: '18px',
//                         fontWeight: 'bold',
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}>
//                     [Nanx+]
//                 </div>
//                 <div>
//                     <Menu
//                         mode="inline"
//                         openKeys={props.MenuStore.openKeys}
//                         theme="dark"
//                         onOpenChange={(openKeys) => props.MenuStore.onOpenChange(openKeys)}
//                         selectedKeys={props.MenuStore.selectedKeys}>
//                         {props.props.menuList.map((menuitem, index) => props.getChildren(menuitem, index))}
//                     </Menu>
//                 </div>
//             </div>
//         );
//     }
// }

import { Menu } from 'antd';
import IconWrapper from '@/utils/IconWrapper';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';
import { findMenuPath } from '@/utils/tools';
import { useEffect } from 'react';

const LeftMenu = inject('MenuStore')(
    observer((props) => {
        console.log('props: ', props);
        // useEffect(() => {
        //     props.MenuStore.getMenuTreeByRoleCode();
        // }, [props.MenuStore]);

        const menuclickHandler = async (menuItem, item) => {
            console.log('Clicked: ', menuItem);

            item.domEvent.preventDefault();
            item.domEvent.stopPropagation();
            let menuClicked = toJS(menuItem);

            // 重复点击相同菜单,刷新内容

            if (item.key == props.MenuStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
                props.MenuStore.freshCurrentMenuItem();
                return;
            }

            await props.MenuStore.setCurrentMenu(menuClicked);
            await props.MenuStore.setSelectedKeys(menuClicked.key);
            let path = findMenuPath(props.MenuStore.RoleBasedMenuList, menuClicked.key);
            await props.MenuStore.setMenuPath(path);

            hashHistory.push({
                pathname: menuClicked.router,
                state: {
                    datagrid_code: menuClicked?.datagrid_code,
                    menu: menuClicked.menu,
                    key: menuClicked.key
                }
            });
        };

        const getChildren = (menuitem) => {
            let one = menuitem;
            if (!one.children) {
                one.children = [];
            }

            return one.children.length === 0 ? (
                <Menu.Item key={menuitem.key} onClick={menuclickHandler.bind(this, one)}>
                    <span>{IconWrapper(one.icon)}</span>
                    <span id={one.menu_uuid}>{one.title}</span>
                </Menu.Item>
            ) : (
                <Menu.SubMenu
                    key={menuitem.key}
                    title={
                        <span>
                            <span>{IconWrapper(one.icon)} </span>
                            <span id={one.menu_uuid}>{one.title}</span>
                        </span>
                    }>
                    {one.children.map((xitem) => getChildren(xitem))}
                </Menu.SubMenu>
            );
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
                    [Nanx+]
                </div>
                <div>
                    <Menu
                        mode="inline"
                        openKeys={props.MenuStore.openKeys}
                        theme="dark"
                        onOpenChange={(openKeys) => props.MenuStore.onOpenChange(openKeys)}
                        selectedKeys={props.MenuStore.selectedKeys}>
                        {props.MenuStore.RoleBasedMenuList.map((menuitem, index) => getChildren(menuitem, index))}
                    </Menu>
                </div>
            </div>
        );
    })
);

export default LeftMenu;
