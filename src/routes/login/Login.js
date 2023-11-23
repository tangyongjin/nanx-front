import React from 'react';
import { Input } from 'antd';
import { randomString } from '@/utils/tools';
import LoginService from './LoginService';
import { inject, observer } from 'mobx-react';
import { LoadingOutlined } from '@ant-design/icons';
import '@/styles/login.css';

@inject('MenuStore')
@observer
export default class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmitMobile = this.handleFormSubmitMobile.bind(this);
        this.Auth = new LoginService();
        this.MenuStore = props.MenuStore;
    }

    componentDidMount() {
        let transaction_id = randomString(20);
        this.setState({ transaction_id });
        sessionStorage.setItem('session_id', transaction_id);
        this.MenuStore.setBossTitle(null);
    }

    handleFormSubmitMobile(e) {
        e.preventDefault();
        this.Auth.loginMobile(this.state.mobile, this.state.password, this.state.transaction_id);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="auth-bg">
                <div className="w3layouts-two-grids2">
                    <div id="sys-hero1">
                        <h2>[Nanx+] AWS Management System</h2>
                        <h3>数据库:NANX(12345678/12345678)</h3>
                    </div>
                    <div className="text-left-side">
                        <form action="#" method="post">
                            <div className="form-left-to-w3l">
                                <div className="clear">用户名</div>
                                <Input
                                    style={{ width: '252px', height: '40px' }}
                                    id="mobile"
                                    name="mobile"
                                    onChange={this.handleChange}
                                    placeholder="手机号"
                                />
                            </div>

                            <div className="form-left-to-w3l">
                                <div className="clear">密码</div>
                                <Input
                                    style={{ width: '252px', height: '40px' }}
                                    id="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    name="password"
                                    placeholder="密码"
                                />
                            </div>

                            <div className="loginbtn">
                                <button id="loginbtn" onClick={this.handleFormSubmitMobile} type="submit">
                                    <div className="loginBtnContainer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5">
                                            <path
                                                fillRule="evenodd"
                                                d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Login/登录
                                    </div>
                                </button>
                            </div>
                        </form>
                        <LoadingOutlined
                            id="login_loading"
                            style={{ display: 'none', fontSize: '30px', color: '#225e04' }}
                        />
                        <div id="login_msg" style={{ color: '#225e04', marginTop: '4px', display: 'none' }}>
                            登陆失败,请检查手机号和密码/角色
                        </div>
                    </div>

                    <div id="sys-hero2">
                        <h3>Low Code App Builder</h3>
                    </div>
                </div>
            </div>
        );
    }
}
