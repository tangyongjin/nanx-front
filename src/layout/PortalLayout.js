import React, { useEffect } from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import MenuTabs from './MenuTabs';
import { useStore } from '@/store/StoreHelpers';

const { Header, Sider, Content } = Layout;

const PortalLayout = observer((props) => {
    const { MenuStore } = useStore();
    console.log('PortalLayout>>props: ', props);
    MenuStore.setHistory(props.history);

    window.onload = () => {
        MenuStore.afterLogin(MenuStore.history);
    };

    useEffect(() => {
        console.log('🤡🤡Portal_Layout useEffect  🤡🤡🤡');
        const asyncFun = async () => {
            const params = new URLSearchParams(props.history.location.search);
            const usedChild = React.Children.toArray(props.children).find(
                (child) => child.props.path === props.history.location.pathname
            );

            const Mkey = params.get('key');
            MenuStore.setMenuTabItemChildren(Mkey, usedChild);
        };
        asyncFun();
    }, [props.children]);

    return (
        <Layout key={1} style={{ minHeight: '100vh', minWidth: '100vh' }}>
            <Sider collapsed={MenuStore.isCollapse}>
                <LeftMenu style={{ padding: 0, height: '100vh', overflowY: 'scroll' }} width={300} />
            </Sider>
            <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Header>
                    <Navbar />
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
});

export default PortalLayout;
