import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
// import { getTargetMenuKey } from '@/utils/tools';

const { Header, Sider, Content } = Layout;

const PortalLayout = inject('MenuStore')(
    observer((props) => {
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
