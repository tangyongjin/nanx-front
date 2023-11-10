import React from 'react';
import LeftMenu from './leftMenu/leftMenu';
import Navbar from './navbar//Navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
const { Header, Sider, Content } = Layout;

@inject('NavigationStore')
@observer
export default class PortalLayout extends React.Component {
    constructor(props) {
        super();
        this.NavigationStore = props.NavigationStore;
        this.NavigationStore.getMenuTreeByRoleCode();
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                <Sider collapsed={this.NavigationStore.isCollapse}>
                    <LeftMenu
                        collapsed={this.NavigationStore.isCollapse}
                        className="portal_menu"
                        menuList={this.NavigationStore.menuList}
                        style={{ padding: 0, height: '100vh', overflowY: 'scroll' }}
                        width={300}
                    />
                </Sider>
                <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
                    <Header>
                        <Navbar />
                    </Header>
                    <Content
                        key={this.NavigationStore.updateKey}
                        style={{
                            marginLeft: '4px'
                        }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
