import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
const { Header, Sider, Content } = Layout;

const PortalLayout = inject(
    'NavigationStore',
    'MenuStore'
)(
    observer((props) => {
        console.log('props: ', props);

        window.addEventListener(
            'popstate',
            async () => {
                props.NavigationStore.getBreadcrumbSessionStorage();
                let url = window.location.href;
                let actionIndex = url.indexOf('_k');
                let end_string = url.slice(actionIndex + 3);
                let sessionKey = '@@History/' + end_string;
                let actionMsg = JSON.parse(sessionStorage.getItem(sessionKey));

                if (actionMsg && actionMsg.menu_code) {
                    let next_menu_cfg = props.NavigationStore.deepQuery(
                        actionMsg.menu_code,
                        props.MenuStore.RoleBasedMenuList,
                        'menu'
                    );
                    props.NavigationStore.setCurrentMenu(next_menu_cfg);
                }
            },
            false
        );

        window.onload = () => {
            console.log('刷新>>>>>>>>>>>');
            props.NavigationStore.getBreadcrumbSessionStorage();
            props.NavigationStore.setCurrentMenu(
                props.NavigationStore.breadcrumb[props.NavigationStore.breadcrumb.length - 1]
            );
        };

        useEffect(() => {
            props.MenuStore.getMenuTreeByRoleCode();

            if (!sessionStorage.getItem('breadcrumb')) {
                props.NavigationStore.setCurrentMenu(props.MenuStore.RoleBasedMenuList[0]);
            }
        }, [props.MenuStore, props.NavigationStore]);

        return (
            <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Sider collapsed={props.NavigationStore.isCollapse}>
                    <LeftMenu
                        collapsed={props.NavigationStore.isCollapse}
                        className="portal_menu"
                        menuList={props.MenuStore.RoleBasedMenuList}
                        style={{ padding: 0, height: '100vh', overflowY: 'scroll' }}
                        width={300}
                    />
                </Sider>
                <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                    <Header>
                        <Navbar />
                    </Header>
                    <Content
                        key={props.NavigationStore.updateKey}
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
