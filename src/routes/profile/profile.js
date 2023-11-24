import React from 'react';
import EditPassword from './editPassword';
import AvatarUpload from './avatarUpload';
import { Form } from 'antd';
import { port, root_url } from '@/api/api_config/base_config';
const avatarRoot = `${root_url}:${port}/`;
export default class Profile extends React.Component {
    render() {
        return (
            <div style={{ paddingTop: '20px' }}>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 4 }}>
                    <Form.Item colon={false} label=" ">
                        <img
                            alt="head"
                            style={{
                                maxWidth: '120px',
                                borderRadius: '5px',
                                height: 'autho'
                            }}
                            src={avatarRoot + JSON.parse(sessionStorage.getItem('userInfo')).head_portrait}
                        />
                    </Form.Item>
                    <Form.Item label="用户">{JSON.parse(sessionStorage.getItem('userInfo')).staff_name}</Form.Item>

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
