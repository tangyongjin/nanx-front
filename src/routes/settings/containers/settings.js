import React from 'react';

import { message, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import api from '../../../api/api';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_pwd: '',
            confirm_pwd: ''
        };
        this.handleOk = this.handleOk.bind(this);
    }

    async handleOk() {
        if (this.state.new_pwd == '' || this.state.confirm_pwd == '') {
            message.error('密码不能为空');
        } else if (this.state.new_pwd != this.state.confirm_pwd) {
            message.error('两次输入密码不同');
        } else {
            let params = { method: 'POST', data: { new_pwd: this.state.new_pwd } };
            let res = await api.user.edit_password(params);
            console.log(res);
            if (res.code == '200') {
                message.success('修改密码成功');
                this.props.onchanged();
            }
        }
    }
    txtChanged = (e) => {
        this.setState({
            new_pwd: e.target.value
        });
    };
    contxtChanged = (e) => {
        this.setState({
            confirm_pwd: e.target.value
        });
    };
    check = () => {
        this.props.form.validateFields((err) => {
            if (!err) {
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            // <div>settings</div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <Form.Item label="新密码：">
                    {getFieldDecorator('inputContent', {
                        rules: [
                            {
                                required: true,
                                message: '请输入内容!'
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="确认密码：" hasFeedback>
                    <Input type="password" onChange={(e) => this.contxtChanged(e)} />
                </Form.Item>
                <Form.Item label="" hasFeedback>
                    <button type="primary" onClick={this.check}>
                        提交
                    </button>
                </Form.Item>
            </Form>
        );
    }
}
const Settings1 = Form.create({})(Settings);
export default Settings1;
