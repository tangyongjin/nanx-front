import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { getTargetMenuKey } from '@/utils/tools';
import { toJS } from 'mobx';
const { Header, Sider, Content } = Layout;

const PortalLayout = inject(
    'NavigationStore',
    'MenuStore'
)(
    observer((props) => {
        useEffect(() => {
            const onPrev = (ev) => {
                console.log('ev: ', ev);
                let goHref = window.location.href;
                console.log('即将跳转目标路径为：', goHref);
                let targetMenuKey = getTargetMenuKey(goHref);
                console.log('Key ', targetMenuKey);
                console.log('后退:当前菜单集合');
                console.log(toJS(props.MenuStore.RoleBasedMenuList));
                let path = props.NavigationStore.findMenuPath(props.MenuStore.RoleBasedMenuList, targetMenuKey);
                props.NavigationStore.setMenuPath(path);
            };

            const onReload = () => {
                console.log('刷新');
                let key = props.NavigationStore.getCurrentMenuKeyFromSessionStorage();
                console.log('刷新>>>>>>>>当前菜单集合');
                console.log('key', key);
                console.log(toJS(props.MenuStore.RoleBasedMenuList));
                let path = props.NavigationStore.findMenuPath(props.MenuStore.RoleBasedMenuList, key);
                props.NavigationStore.setMenuPath(path);
            };

            const asyncFun = async () => {
                await props.MenuStore.getMenuTreeByRoleCode();
                window.addEventListener('popstate', onPrev, false);
                window.onbeforeunload = onReload;
                return () => {
                    window.removeEventListener('popstate');
                    window.onbeforeunload = null;
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
                        <Navbar />
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
