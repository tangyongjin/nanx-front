import React from 'react';
import { Input } from 'antd';
import { randomString } from '@/utils/tools';
import LoginService from '../LoginService';
import { inject, observer } from 'mobx-react';
import { LoadingOutlined } from '@ant-design/icons';
import '@/styles/login.css';

@inject('NavigationStore')
@observer
export default class Login extends React.Component {
    constructor(props) {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmitMobile = this.handleFormSubmitMobile.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.Auth = new LoginService();
        this.NavigationStore = props.NavigationStore;
    }

    componentDidMount() {
        let transaction_id = randomString(20);
        this.setState({ transaction_id });
        sessionStorage.setItem('session_id', transaction_id);
        this.NavigationStore.setBossTitle(null);
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

    changeValue(a, b) {
        console.log(b.props.value, b.props.children);
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
                                    Login/登录
                                </button>
                            </div>
                        </form>
                        <LoadingOutlined
                            id="login_loading"
                            style={{ display: 'none', fontSize: '30px', color: '#225e04' }}
                        />
                        <div id="login_msg" style={{ color: '#225e04', marginTop: '4px', display: 'none' }}>
                            登陆失败，请检查手机号和密码
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
