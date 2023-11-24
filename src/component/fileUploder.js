import { CloudUploadOutlined } from '@ant-design/icons';
import { message, Upload, Button, Progress } from 'antd';
import React, { useState } from 'react';
import { getBase64 } from '@/utils/tools';

/**
 * 通用文件上传组件
 *
 */

const checkImageTypeAnd2mSize = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上出JPG/PNG格式文件');
    }

    const isLessThen2m = file.size / 1024 / 1024 < 2;
    if (!isLessThen2m) {
        message.error('头像文件不能大于2M');
    }
    return isJpgOrPng && isLessThen2m;
};

const checkDocuTypeAnd10mSize = (file) => {
    const isOfficeDocu = file.type === 'application/pdf';
    if (!isOfficeDocu) {
        message.error('只能上传pdf');
    }

    const isLessThen10m = file.size / 1024 / 1024 < 10;
    if (!isLessThen10m) {
        message.error('文件不能大于10M');
    }
    return isOfficeDocu && isLessThen10m;
};

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

const FileUploder = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [percent, setPercent] = useState(0);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadHandler = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const config = {
            onUploadProgress: (event) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setPercent(percent);
                if (percent === 100) {
                    setTimeout(() => {
                        setLoading(false);
                        setPercent(0);
                    }, 999);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };

        fmData.append('fileContent', file);

        try {
            let params = { data: fmData };
            let res = props.apiEndpoint(params, config);

            onSuccess('Ok');
            console.log('server res: ', res);
        } catch (err) {
            console.log('Error: ', err);
            onError({ err });
        }

        onSuccess('Ok');
    };

    return (
        <div>
            <Upload
                customRequest={uploadHandler}
                name="avatar"
                showUploadList={false}
                beforeUpload={props.fileType == 'img' ? checkImageTypeAnd2mSize : checkDocuTypeAnd10mSize}
                onChange={handleChange}>
                <Button>
                    <CloudUploadOutlined />
                </Button>
            </Upload>
            {props.fileType == 'img' ? <ImgRender imageUrl={imageUrl} /> : null}
            {props.showProgress && loading ? <Progress percent={percent} /> : null}
        </div>
    );
};

export default FileUploder;
