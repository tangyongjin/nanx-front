import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
const { Header, Sider, Content } = Layout;

const PortalLayout = inject('NavigationStore')(
    observer((props) => {
        console.log('props: ', props);

        useEffect(() => {
            props.NavigationStore.getMenuTreeByRoleCode();
        }, [props.NavigationStore]);

        return (
            <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Sider collapsed={props.NavigationStore.isCollapse}>
                    <LeftMenu
                        collapsed={props.NavigationStore.isCollapse}
                        className="portal_menu"
                        menuList={props.NavigationStore.menuList}
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
