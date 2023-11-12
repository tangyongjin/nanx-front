import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import api from '@/api/api';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上出JPG/PNG格式文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const AvatarUpload = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        console.log(info);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8
                }}>
                Upload
            </div>
        </div>
    );
    return (
        <div
            style={{
                marginLeft: '305px',
                height: '246px',
                width: '246px',
                maxHeight: '246px',
                minHeight: '246px'
            }}>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={api.file.uploadAvatar}
                beforeUpload={beforeUpload}
                headers={{
                    Authorization: sessionStorage.getItem('token')
                }}
                onChange={handleChange}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            marginTop: '132px',
                            width: '200px',
                            maxHeight: '246px',
                            minHeight: '246px'
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </div>
    );
};
export default AvatarUpload;
