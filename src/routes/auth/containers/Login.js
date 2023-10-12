import userStore from '@/store/userStore';
import { Form, message, Modal, Select } from 'antd';
import React from 'react';
import { hashHistory } from 'react-router';
import api from '../../../api/api';
import { randomString } from '../../../utils/tools';
import AuthService from '../AuthService';
import WsService from '../WsService';

import './login.css';

export default class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {
            visible: false,
            roles: [],
            rolename: '',
            rolecode: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmitMobile = this.handleFormSubmitMobile.bind(this);
        this.login_mobile = this.login_mobile.bind(this);
        this.afterLogin = this.afterLogin.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.Auth = new AuthService();
        this.WsService = new WsService();
    }

    componentWillMount() {
        let transaction_id = randomString(20);
        this.setState({ transaction_id });
        sessionStorage.setItem('session_id', transaction_id);
    }

    componentDidMount() {
        this.WsService.wsinit(this.state.transaction_id);
    }

    handleFormSubmitMobile(e) {
        e.preventDefault();
        this.login_mobile(this.state.mobile, this.state.password, this.state.transaction_id);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    async login_mobile(mobile, password, transaction_id) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('mobile');
        let params = {
            data: { mobile, password, transaction_id },
            method: 'POST'
        };

        let res = await api.user.login_mobile(params);

        if (res.code == 401) {
            message.error('登陆失败，请检查手机号和密码！', 2.5);
            return;
        }

        if (res.code == 200) {
            this.afterLogin(res);
        }
    }
    afterLogin(res) {
        message.loading('登录成功,准备工作环境', 1.1, () => {
            // navigationStore.saveSessionBadge(res.info);
            // navigationStore.setBadge(res.info);
            userStore.setUserProfile(res.profile);
            userStore.setToken(res.token);
            this.setState({
                roles: res.profile.roles,
                rolename: res.profile.roles[0].role_name,
                rolecode: res.profile.roles[0].role_code
            });
            if (res.profile.roles.length == 1) {
                userStore.setUserRole(res.profile.roles[0]);
                hashHistory.push('/home');
            } else {
                this.setState({
                    visible: true
                });
            }
            console.log(456, this.state.roles);
        });
    }
    handleOk() {
        let obj = {};
        obj.role_name = this.state.rolename;
        obj.role_code = this.state.rolecode;
        userStore.setUserRole(obj);
        hashHistory.push('/home');
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    changeValue(a, b) {
        this.setState({
            rolecode: b.props.value,
            rolename: b.props.children
        });
        console.log(b.props.value, b.props.children);
    }
    render() {
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#ffd700"
                        fillOpacity="1"
                        d="M0,192L48,181.3C96,171,192,149,288,138.7C384,128,480,128,576,144C672,160,768,192,864,192C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>

                <div className="w3layouts-two-grids">
                    <div className="mid-class">
                        <div className="txt-left-side">
                            <h2> Nanx System</h2>

                            <form action="#" method="post">
                                <div className="form-left-to-w3l">
                                    <span className="fa fa-envelope-o" aria-hidden="true"></span>
                                    <input
                                        type="mobile"
                                        id="boss_mobile"
                                        name="mobile"
                                        placeholder="手机号"
                                        onChange={this.handleChange}
                                        required=""
                                    />
                                    <div className="clear"></div>
                                </div>
                                <div className="form-left-to-w3l ">
                                    <span className="fa fa-lock" aria-hidden="true"></span>
                                    <input
                                        type="password"
                                        id="boss_pwd"
                                        name="password"
                                        placeholder="密码"
                                        onChange={this.handleChange}
                                        required=""
                                    />
                                    <div className="clear"></div>
                                </div>

                                <div className="btnn">
                                    <button id="loginbtn" onClick={this.handleFormSubmitMobile} type="submit">
                                        Login/登录
                                    </button>
                                </div>
                            </form>
                            <div className="w3layouts_more-buttn">
                                <h3>
                                    使用过程中需要帮助?
                                    <a href="#/docs">查看文档DOC...</a>
                                </h3>
                            </div>
                        </div>
                        <div className="img-right-side">
                            <h2>Management System</h2>
                            <h2>数据库:NANX(12345678/12345678)</h2>
                            <br />

                            <div style={{ marginLeft: '80px', display: 'flex', width: '100px' }}>
                                <br />
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                    <Modal
                        title="选择角色："
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        okText="确认"
                        cancelText="取消"
                        width="400px"
                        visible={this.state.visible}>
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                            <Form.Item label="选择角色：">
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择角色"
                                    onChange={this.changeValue}
                                    defaultValue={this.state.roles[0] ? this.state.roles[0].role_code : null}>
                                    {this.state.roles.length &&
                                        this.state.roles.map((item, index) => (
                                            <Select.Option key={index} value={item.role_code}>
                                                {item.role_name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        );
    }
}
