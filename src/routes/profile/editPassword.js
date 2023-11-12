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
                    <Form.Item label="新密码：">
                        <Input type="password" onChange={(e) => this.txtChanged(e, 'pwd1')} />
                    </Form.Item>
                    <Form.Item label="确认密码：" hasFeedback>
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
