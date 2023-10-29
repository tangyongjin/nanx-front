import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import api from '@/api/api';
export default class EditPassword extends React.Component {
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
        } else if (this.state.new_pwd.length <= 4) {
            message.error('请输入大于4位的密码');
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
    render() {
        return (
            <Modal
                title="修改密码"
                onOk={this.handleOk}
                onCancel={this.props.onchanged}
                okText="确认"
                cancelText="取消"
                width="400px"
                visible={this.props.visible}>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                    <Form.Item label="新密码：">
                        <Input type="password" onChange={(e) => this.txtChanged(e)} />
                    </Form.Item>
                    <Form.Item label="确认密码：" hasFeedback>
                        <Input type="password" onChange={(e) => this.contxtChanged(e)} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
