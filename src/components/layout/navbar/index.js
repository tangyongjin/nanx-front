import { Dropdown, Icon, Menu, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { hashHistory } from 'react-router';
import api from '../../../api/api';
import AuthService from '../../../routes/auth/AuthService';
import EditPassword from '../../antdComponents/editPassword';
import PortalBreadcrumb from './breadcrumb/PortalBreadcrumb';
import Hamburger from './hamburger';

const { confirm } = Modal;

@inject('navigation')
@observer
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imageUrl: null
        };
        this.navigationStore = props.navigation;
        this.AuthService = new AuthService();

        if (sessionStorage.getItem('staff_name') === null) {
            this.AuthService.logout();
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem('staff_name') === null) {
            this.AuthService.logout();
        }
    }

    componentDidMount() {
        this.getprofile();
        let staff_name = sessionStorage.getItem('staff_name');
        this.navigationStore.setBossTitle(staff_name);
        if (staff_name == 'null') {
            hashHistory.push('/login');
        }
    }

    logout = () => {
        this.navigationStore.setBossTitle(null);
        this.AuthService.logout();
    };

    async getprofile() {
        let res = await api.user.profile({ method: 'POST' });
        console.log(res.data.head_portrait);

        if (res.code == '200') {
            this.setState({
                imageUrl: res.data.head_portrait
            });
        }
    }

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
    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    };
    getUserBox = () => {
        return (
            <Menu className="dropdownMenu">
                <Menu.Item key="setting:2" onClick={(event) => hashHistory.push('/profile')}>
                    个人中心
                </Menu.Item>
                <Menu.Item key="setting:1" onClick={(event) => this.showmodal()}>
                    修改密码
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="setting:5" onClick={(event) => this.showConfirm()}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
    };

    switchToWaiting(datagrid_code) {
        if (
            this.navigationStore.currentMenu.datagrid_code === datagrid_code &&
            location.hash.indexOf(this.navigationStore.currentMenu.router) != -1
        ) {
            this.navigationStore.changeUpdateKey();
            return;
        }

        this.navigationStore.switchRouter({ datagrid_code: datagrid_code });
    }
    render() {
        return (
            <div className="hamburger_box">
                <Hamburger className="hamburger-container" />
                <PortalBreadcrumb />
                <Dropdown overlay={this.getUserBox()} trigger={['click']} className="dropdown">
                    <a className="ant-dropdown-link" href="#">
                        <span style={{ paddingRight: '5px', color: '#97a8be', fontSize: '14px' }}>
                            {sessionStorage.getItem('staff_name') + ' / ' + sessionStorage.getItem('role_name')}
                        </span>
                        <img
                            alt="head"
                            style={{ width: '36px', height: '36px', verticalAlign: 'middle' }}
                            src={this.state.imageUrl}
                            className="user-avatar"
                        />

                        <Icon type="down" />
                    </a>
                </Dropdown>
                <div
                    className="dropdown"
                    style={{ marginRight: '15px', color: 'rgb(151, 168, 190)', cursor: 'pointer' }}></div>
                <EditPassword visible={this.state.visible} onchanged={this.handleCancel} />
            </div>
        );
    }
}
