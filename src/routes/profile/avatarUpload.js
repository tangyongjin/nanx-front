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

    const [progress, setProgress] = useState(0);

    const handleChange = (info) => {
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

    const uploadImage = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data', Authorization: sessionStorage.getItem('token') },
            onUploadProgress: (event) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append('image', file);
        try {
            // const res2 = await axios.post('http://127.0.0.1:9009/v2/File/uploadAvatar', fmData, config);
            // const res = await api.file.uploadAvatar2(fmData, config);

            let params = { data: fmData };
            let res = await api.file.uploadAvatar2(params, config);

            onSuccess('Ok');
        } catch (err) {
            const error = new Error('Some error');
            onError({ err });
        }
    };

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
                customRequest={uploadImage}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action={api.file.uploadAvatar}
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
                            width: '100px',
                            height: 'auto',
                            maxHeight: '246px'
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
