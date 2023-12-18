import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout, Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { getTargetMenuKey, findItemByKey } from '@/utils/tools';

const { Header, Sider, Content } = Layout;

const PortalLayout = inject('MenuStore')(
    observer((props) => {
        console.log('PortalLayout>>props: ', props);
        props.MenuStore.setHistory(props.history);

        const params = new URLSearchParams(props.history.location.search);
        // const Mkey = params.get('key');
        // props.MenuStore.setMenuTabItemChildren(Mkey, props.children);

        let goHref = window.location.href;
        let targetMenuKey = getTargetMenuKey(goHref);
        console.log('targetMenuKey: ', targetMenuKey);

        let targetMenu = findItemByKey(props.MenuStore.RoleMenuArray, targetMenuKey);
        // // 点击profile 会找不到 targetMenu
        if (targetMenu) {
            props.MenuStore.setCurrentMenu(targetMenu, 'onPrev');
        }

        window.onload = () => {
            console.log('浏览器刷新');
            let storeageMenu = props.MenuStore.getCurrentMenuKeyFromSessionStorage();
            props.MenuStore.setCurrentMenu(storeageMenu, '浏览器刷新');
        };

        useEffect(() => {
            const asyncFun = async () => {
                await props.MenuStore.getMenuTreeByRoleCode(sessionStorage.getItem('role_code'));
                props.MenuStore.setMenuTabItemChildren(targetMenuKey, props.children);
            };
            asyncFun();
        }, [props.MenuStore, targetMenuKey, props.children]);

        return (
            <Layout key={targetMenuKey} style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Sider collapsed={props.MenuStore.isCollapse}>
                    <LeftMenu style={{ padding: 0, height: '100vh', overflowY: 'scroll' }} width={300} />
                </Sider>
                <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                    <Header>
                        <Navbar history={props.history} bread={props.MenuStore.breadcrumb} />
                    </Header>
                    <Content
                        key={props.MenuStore.randomKey}
                        style={{
                            marginLeft: '4px'
                        }}>
                        <Tabs items={props.MenuStore.MenuTabItems} />
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    })
);

export default PortalLayout;
