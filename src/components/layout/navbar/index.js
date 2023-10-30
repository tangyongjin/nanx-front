import { Dropdown, Icon, Menu, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';
import LoginService from '@/routes/login/LoginService';
import EditPassword from '@/routes/login/containers/editPassword';
import PortalBreadcrumb from './breadcrumb/PortalBreadcrumb';
import Hamburger from './hamburger';
import LoadingGif from './loading.gif';

const { confirm } = Modal;

@inject('NavigationStore')
@observer
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.NavigationStore = props.NavigationStore;
        this.LoginService = new LoginService();
    }

    logout = () => {
        this.NavigationStore.setBossTitle(null);
        this.LoginService.logout();
    };

    showConfirm() {
        confirm({
            content: <h4>您确定要退出系统么？</h4>,
            onOk: () => this.logout(),
            cancelText: '取消',
            okText: '确定',
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    showmodal() {
        this.setState({
            visible: true
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    getUserBox = () => {
        return (
            <Menu className="dropdownMenu">
                <Menu.Item key="setting:2" onClick={() => hashHistory.push('/profile')}>
                    个人中心
                </Menu.Item>
                <Menu.Item key="setting:1" onClick={() => this.showmodal()}>
                    修改密码
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:5" onClick={() => this.showConfirm()}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
    };

    render() {
        return (
            <div className="hamburger_box">
                <Hamburger className="hamburger-container" />
                <PortalBreadcrumb />
                <div id="preloader" style={{ marginLeft: '30%', width: '125px', display: 'none' }}>
                    <img style={{ marginLeft: '30%', width: '125px' }} src={LoadingGif} alt="loading" />
                </div>
                <Dropdown overlay={this.getUserBox()} trigger={['click']} className="dropdown">
                    <div className="ant-dropdown-link" href="#">
                        <span style={{ paddingRight: '5px', color: '#97a8be', fontSize: '14px' }}>
                            {sessionStorage.getItem('staff_name') + ' / ' + sessionStorage.getItem('role_name')}
                        </span>
                        <img
                            alt="head"
                            style={{ width: '36px', height: '36px', verticalAlign: 'middle' }}
                            src={JSON.parse(sessionStorage.getItem('userInfo')).head_portrait}
                            className="user-avatar"
                        />
                        <Icon type="down" />
                    </div>
                </Dropdown>
                <div
                    className="dropdown"
                    style={{ marginRight: '15px', color: 'rgb(151, 168, 190)', cursor: 'pointer' }}></div>
                <EditPassword visible={this.state.visible} onchanged={this.handleCancel} />
            </div>
        );
    }
}
