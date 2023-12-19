import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import MenuTabs from './MenuTabs';
const { Header, Sider, Content } = Layout;

const PortalLayout = inject('MenuStore')(
    observer((props) => {
        console.log('PortalLayout>>props: ', props);
        props.MenuStore.setHistory(props.history);

     
        // let goHref = window.location.href;
        // let targetMenuKey = getTargetMenuKey(goHref);
        // let targetMenu = findItemByKey(props.MenuStore.RoleMenuArray, targetMenuKey);
        // if (targetMenu) {
        //     props.MenuStore.setCurrentMenu(targetMenu, 'onPrev');
        // }

        // window.onload = () => {
        //     console.log('浏览器刷新');
        //     let storeageMenu = props.MenuStore.getCurrentMenuKeyFromSessionStorage();
        //     props.MenuStore.setCurrentMenu(storeageMenu, '浏览器刷新');
        // };

        useEffect(() => {
            const asyncFun = async () => {
                const params = new URLSearchParams(props.history.location.search);
                const Mkey = params.get('key');
                console.log('添加子组件🤮🤮>>')
                props.MenuStore.setMenuTabItemChildren(Mkey, props.children);
             };
            asyncFun();
        }, [props.children]);

        return (
            <Layout key={ 1} style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Sider collapsed={props.MenuStore.isCollapse}>
                    <LeftMenu style={{ padding: 0, height: '100vh', overflowY: 'scroll' }} width={300} />
                </Sider>
                <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                    <Header>
                        <Navbar history={props.history} bread={props.MenuStore.breadcrumb} />
                    </Header>
                    <Content
                        style={{
                            marginLeft: '4px'
                        }}>
                        <MenuTabs />
                    </Content>
                </Layout>
            </Layout>
        );
    })
);

export default PortalLayout;
