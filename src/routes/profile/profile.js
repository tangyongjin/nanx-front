import React from 'react';
import EditPassword from './editPassword';
import AvatarUpload from './avatarUpload';
import { Form } from 'antd';

export default class Profile extends React.Component {
    render() {
        return (
            <div style={{ paddingTop: '20px' }}>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 4 }}>
                    <Form.Item label="角色Code">{JSON.parse(sessionStorage.getItem('userInfo')).role_code}</Form.Item>
                    <Form.Item label="角色名称" hasFeedback>
                        {JSON.parse(sessionStorage.getItem('userInfo')).role_name}
                    </Form.Item>
                    <Form.Item label="手机号" hasFeedback>
                        {JSON.parse(sessionStorage.getItem('userInfo')).mobile}
                    </Form.Item>
                </Form>

                <EditPassword />
                <AvatarUpload />
            </div>
        );
    }
}
