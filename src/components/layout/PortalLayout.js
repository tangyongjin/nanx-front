import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { getTargetMenuKey } from '@/utils/tools';
const { Header, Sider, Content } = Layout;

const PortalLayout = inject(
    'NavigationStore',
    'MenuStore'
)(
    observer((props) => {
        useEffect(() => {
            const onPrev = () => {
                let goHref = window.location.href;
                let targetMenuKey = getTargetMenuKey(goHref);
                console.log('Key ', targetMenuKey);
                let path = props.MenuStore.findMenuPath(props.MenuStore.RoleBasedMenuList, targetMenuKey);
                if (path.length > 0) {
                    props.NavigationStore.setCurrentMenu(path[path.length - 1]);
                    props.MenuStore.refreshBreadcrumbs();
                }
            };

            const asyncFun = async () => {
                await props.MenuStore.getMenuTreeByRoleCode();
                window.addEventListener('popstate', onPrev, false);
                return () => {
                    window.removeEventListener('popstate');
                };
            };
            asyncFun();
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
                        <Navbar bread={props.MenuStore.breadcrumb} />
                    </Header>
                    <Content
                        key={props.NavigationStore.randomKey}
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
