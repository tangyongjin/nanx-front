import { Form } from 'antd';
import React from 'react';
import FileUploder from '@/component/fileUploder';
import api from '@/api/api';
import { useState } from 'react';
import { port, root_url } from '@/api/api_config/base_config';
const fileRoot = `${root_url}:${port}/`;

const AvatarUpload = () => {
    const [imageUrl, setimageUrl] = useState(null);

    const ImgRender = (props) => {
        return (
            <div style={{ marginTop: 10 }}>
                {props.imageUrl ? (
                    <img
                        src={props.imageUrl}
                        alt="avatar"
                        style={{
                            width: '100px',
                            height: 'auto',
                            maxHeight: '246px'
                        }}
                    />
                ) : null}
            </div>
        );
    };

    const uploadCallbackRender = (uploadResultData) => {
        console.log('uploadResultData: ', uploadResultData);
        let tarGetValue = uploadResultData[0]['url'];
        setimageUrl(fileRoot + tarGetValue);
    };

    return (
        <div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 4 }}>
                <Form.Item label="上传头像">
                    <FileUploder
                        buttonWidth="70px"
                        callbackRender={uploadCallbackRender}
                        fileType="img"
                        showProgress={true}
                        apiEndpoint={api.file.uploadAvatar}
                    />
                    {imageUrl ? <ImgRender imageUrl={imageUrl} /> : null}
                </Form.Item>
            </Form>
        </div>
    );
};

export default AvatarUpload;
