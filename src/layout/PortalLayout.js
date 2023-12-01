import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { getTargetMenuKey, findItemByKey } from '@/utils/tools';

const { Header, Sider, Content } = Layout;

const PortalLayout = inject('MenuStore')(
    observer((props) => {
        window.onload = () => {
            console.log('浏览器刷新');
            let storeageMenu = props.MenuStore.getCurrentMenuKeyFromSessionStorage();
            props.MenuStore.setCurrentMenu(storeageMenu, '浏览器刷新');
        };

        useEffect(() => {
            const onPrev = () => {
                let goHref = window.location.href;
                let targetMenuKey = getTargetMenuKey(goHref);
                let targetMenu = findItemByKey(props.MenuStore.RoleMenuArray, targetMenuKey);
                // 点击profile 会找不到 targetMenu
                if (targetMenu) {
                    props.MenuStore.setCurrentMenu(targetMenu, 'onPrev');
                }
            };

            const asyncFun = async () => {
                await props.MenuStore.getMenuTreeByRoleCode(sessionStorage.getItem('role_code'));
                window.addEventListener('popstate', onPrev, false);
                return () => {
                    window.removeEventListener('popstate');
                };
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
