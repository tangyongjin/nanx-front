import React from 'react';
import {} from 'antd';
import { message, Upload } from 'antd';

import api from '@/api/api';

export default class Profile extends React.Component {
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.response.code != 200) {
            message.error(info.file.response.message);
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                imageUrl: info.file.response.data[0].url
            });
        }
    };

    render() {
        return (
            <div>
                <Upload
                    data={{ source: 'avatar' }}
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={api.file.upload}
                    headers={{ Authorization: sessionStorage.getItem('token') }}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}>
                    AAA
                </Upload>
            </div>
        );
    }
}
