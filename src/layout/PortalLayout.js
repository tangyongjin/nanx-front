import React, { useEffect, useState } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import IconWrapper from '@/utils/IconWrapper';
import { hashHistory } from 'react-router';

import { inject, observer } from 'mobx-react';
// import { getTargetMenuKey } from '@/utils/tools';

const { Header, Sider, Content } = Layout;

const PortalLayout = inject('MenuStore')(
    observer((props) => {
        const [menuItems, setMenuItems] = useState([]);
        const menuclickHandler = async (menuItem, event) => {
            console.log('event: ', event);
            console.log('menuItem: ', menuItem);
            event.domEvent.preventDefault();
            event.domEvent.stopPropagation();
            let menuClicked = menuItem;

            // 重复点击相同菜单,刷新内容

            if (event.key == props.MenuStore.currentMenu.key && window.location.href.includes(menuClicked.router)) {
                props.MenuStore.freshCurrentMenuItem();
                return;
            }

            await props.MenuStore.setCurrentMenu(menuClicked);
            await props.MenuStore.setSelectedKeys(menuClicked.key);
            let path = findMenuPath(props.MenuStore.RoleBasedMenuList, menuClicked.key);
            console.log('path: ', path);

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

        const transformMenuArray = (menuArray) => {
            return menuArray.map((item) => {
                const { key, children, title, menu, router, datagrid_code } = item;
                const icon = IconWrapper(item.icon);

                const transformedItem = {
                    key,
                    icon,
                    ...(children && children.length > 0 && { children: transformMenuArray(children) }),
                    label: title,
                    menu,
                    router,
                    datagrid_code,
                    type: null,
                    onClick: (event) => menuclickHandler(item, event)
                };

                return transformedItem;
            });
        };

        useEffect(() => {
            // const onPrev = () => {
            //     // let goHref = window.location.href;
            //     // let targetMenuKey = getTargetMenuKey(goHref);
            //     // props.MenuStore.findMenuPath();
            // };

            const asyncFun = async () => {
                await props.MenuStore.getMenuTreeByRoleCode(sessionStorage.getItem('role_code'));
                // window.addEventListener('popstate', onPrev, false);

                // return () => {
                //     window.removeEventListener('popstate');
                // };
            };
            asyncFun();
        }, [props.MenuStore]);

        return (
            <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Sider collapsed={props.MenuStore.isCollapse}>
                    <LeftMenu
                        className="portal_menu"
                        style={{ padding: 0, height: '100vh', overflowY: 'scroll' }}
                        width={300}
                    />
                </Sider>
                <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                    <Header>
                        <Navbar bread={props.MenuStore.breadcrumb} />
                    </Header>
                    <Content
                        key={props.MenuStore.randomKey}
                        style={{
                            marginLeft: '4px'
                        }}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    })
);

export default PortalLayout;
