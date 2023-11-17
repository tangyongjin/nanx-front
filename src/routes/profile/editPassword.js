import { Input, message, Form, Button } from 'antd';
import React from 'react';
import api from '@/api/api';
export default class EditPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_pwd: '',
            confirm_pwd: ''
        };
        this.savePwd = this.savePwd.bind(this);
    }

    async savePwd() {
        if (this.state.new_pwd == '' || this.state.confirm_pwd == '') {
            message.error('密码不能为空');
        } else if (this.state.new_pwd.length <= 4) {
            message.error('请输入大于4位的密码');
        } else if (this.state.new_pwd != this.state.confirm_pwd) {
            message.error('两次输入密码不同');
        } else {
            let params = { data: { new_pwd: this.state.new_pwd } };
            await api.user.edit_password(params);
        }
    }

    txtChanged = (e, pwd_pharse) => {
        if (pwd_pharse == 'pwd1') {
            this.setState({
                new_pwd: e.target.value
            });
        } else {
            this.setState({
                confirm_pwd: e.target.value
            });
        }
    };

    render() {
        return (
            <div>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 4 }}>
                    <Form.Item
                        label={
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5">
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                新密码
                            </div>
                        }>
                        <Input type="password" onChange={(e) => this.txtChanged(e, 'pwd1')} />
                    </Form.Item>
                    <Form.Item
                        label={
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-5 h-5">
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                确认密码
                            </div>
                        }
                        hasFeedback>
                        <Input type="password" onChange={(e) => this.txtChanged(e, 'pwd2')} />
                    </Form.Item>
                    <Form.Item label="确认">
                        <Button onClick={this.savePwd}>保存密码</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
