import React from 'react';
import { randomString } from '../../../utils/tools';
import LoginService from '../LoginService';
import NanxArt from './login.jpeg';
import { inject, observer } from 'mobx-react';
import './login.css';

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

    componentWillMount() {
        let transaction_id = randomString(20);
        this.setState({ transaction_id });
        sessionStorage.setItem('session_id', transaction_id);
    }

    componentDidMount() {
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
            <div className="w3layouts-two-grids2">
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
                            <h3>Low Code App Builder</h3>
                        </div>
                    </div>
                    <div className="img-right-side">
                        <h2>Management System</h2>
                        <h2>数据库:NANX(12345678/12345678)</h2>
                        <img style={{ width: '280px' }} src={NanxArt} alt="fireSpot" />
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}
