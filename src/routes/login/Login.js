import '@/styles/login.css';
import { BsFingerprint } from 'react-icons/bs';
import { getDefaultMenuItem } from '@/utils/tools';
import { inject, observer } from 'mobx-react';
import { Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { randomString } from '@/utils/tools';
import { Spin } from 'antd';
import LoginService from './LoginService';
import React from 'react';

@inject('MenuStore', 'UserStore')
@observer
export default class Login extends React.Component {
    constructor(props) {
        console.log('Login>props: ', props);
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmitMobile = this.handleFormSubmitMobile.bind(this);
        this.Auth = new LoginService();
        this.MenuStore = props.MenuStore;
        this.UserStore = props.UserStore;
    }

    componentDidMount() {
        let transaction_id = randomString(20);
        this.setState({ transaction_id });
        sessionStorage.setItem('session_id', transaction_id);
        this.MenuStore.setBossTitle(null);
    }

    handleFormSubmitMobile = async (e) => {
        e.preventDefault();
        let res = await this.Auth.loginMobile(this.state.mobile, this.state.password, this.state.transaction_id);
        console.log('logResult: ', res);

        if (res.code == 401) {
            document.getElementById('loadingSpin').style.display = 'none';
            document.getElementById('login_msg').style.display = 'block';
            return;
        }

        if (res.code == 500) {
            document.getElementById('loadingSpin').style.display = 'none';
            document.getElementById('login_msg').style.display = 'block';
            return;
        }

        if (res.code == 200) {
            await this.UserStore.setToken(res.token);
            await this.UserStore.setUserProfile(res.profile);
            await this.afterLoginSuccess(res);
        }
    };

    afterLoginSuccess = async () => {
        await this.MenuStore.getMenuTreeByRoleCode(sessionStorage.getItem('role_code'));

        // let defaultMenuItem = getDefaultMenuItem(this.MenuStore.RoleMenuArray);
        // console.log('defaultMenuItem: ', defaultMenuItem);
        // this.MenuStore.setCurrentMenu(defaultMenuItem, 'afterLoginSuccess');

        this.props.history.push({
            pathname: '/welcome',
            state: { key: -1989 }
        });
    };

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
                                    <div
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        className="loginBtnContainer">
                                        <BsFingerprint
                                            style={{
                                                marginRight: '12px',
                                                fontSize: '30px',
                                                color: '#225e04'
                                            }}
                                        />
                                        Login/登录
                                        <Spin
                                            indicator={
                                                <LoadingOutlined
                                                    id="loadingSpin"
                                                    style={{
                                                        display: 'none',
                                                        marginLeft: '20px',
                                                        color: 'white',
                                                        fontSize: 18
                                                    }}
                                                    spin
                                                />
                                            }
                                        />
                                    </div>
                                </button>
                            </div>
                        </form>

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
