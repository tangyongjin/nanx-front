import React from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';

const { Header, Sider, Content } = Layout;

@inject('NavigationStore')
@observer
export default class PortalLayout extends React.Component {
    constructor(props) {
        super();
        this.store = props.NavigationStore;
    }

    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider
                    collapsed={this.store.isCollapse}
                    className="portal_menu"
                    style={{ padding: 0, height: '100vh', overflowY: 'scroll' }}
                    width={200}>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header>
                        <Navbar />
                    </Header>
                    <Content
                        key={this.store.updateKey}
                        style={{
                            background: '#fff',
                            minHeight: 280,
                            height: '100vh',
                            overflowY: 'scroll'
                        }}
                        className="portal_content">
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
