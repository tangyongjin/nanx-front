import { Form } from 'antd';
import React from 'react';
import FileUploder from '@/component/fileUploder';
import api from '@/api/api';

const AvatarUpload = () => {
    return (
        <div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 4 }}>
                <Form.Item label="上传头像">
                    <FileUploder fileType="img" showProgress={true} apiEndpoint={api.file.uploadAvatar2} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default AvatarUpload;
