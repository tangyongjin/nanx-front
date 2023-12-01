import { BsCloudUploadFill } from 'react-icons/bs';
import { message, Upload, Button, Progress } from 'antd';
import React, { useState } from 'react';

/**
 * 通用文件上传组件,上传完成后
 * 利用 callbackRender 进行后续处理,
 * 如;
 * 渲染,
 * 回填字段
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

function checkDocuTypeAnd10mSize(file) {
    const allowedMimeTypes = {
        pdf: 'application/pdf',
        word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        excel: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        powerpoint: [
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ],
        openDocumentText: 'application/vnd.oasis.opendocument.text',
        openDocumentSpreadsheet: 'application/vnd.oasis.opendocument.spreadsheet',
        openDocumentPresentation: 'application/vnd.oasis.opendocument.presentation',
        rtf: ['application/rtf', 'text/rtf'],
        csv: 'text/csv',
        keynote: 'application/vnd.apple.keynote'
    };

    let goodFileType = false;

    for (const key of Object.keys(allowedMimeTypes)) {
        const mimeTypes = Array.isArray(allowedMimeTypes[key]) ? allowedMimeTypes[key] : [allowedMimeTypes[key]];

        if (mimeTypes.includes(file.type)) {
            goodFileType = true; // Valid MIME type found
        }
    }

    if (!goodFileType) {
        message.error('只能上出word,pdf,excel,docx格式文件');
    }

    const isLessThen10m = file.size / 1024 / 1024 < 10;
    if (!isLessThen10m) {
        message.error('文件不能大于10M');
    }
    return goodFileType && isLessThen10m;
}

const FileUploder = (props) => {
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(0);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
        }
    };

    const onUploadProgress = (event, onProgress) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setPercent(percent);
        if (percent === 100) {
            setTimeout(() => {
                setLoading(false);
                setPercent(0);
                // 上传完成后,修改对应的组件的渲染值
                console.log('// 上传完成后,修改对应的组件的渲染值: ');
                console.log(props);
            }, 800);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
    };

    const uploadHandler = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const config = { onUploadProgress: (event) => onUploadProgress(event, onProgress) };
        fmData.append('fileContent', file);

        try {
            let params = { data: fmData };
            let res = await props.apiEndpoint(params, config);
            onSuccess('Ok');
            console.log('server res: ', res);
            // 上传成功后, 给 callbackRender 回传上传结果
            props.callbackRender && props.callbackRender(res.data);
        } catch (err) {
            console.log('Error: ', err);
            onError({ err });
        }
        onSuccess('Ok');
    };

    console.log(props);
    const buttonwidth = props?.buttonWidth ? props.buttonWidth : 'auto';
    console.log('buttonwidth: ', buttonwidth);

    return (
        <span>
            <Upload
                customRequest={uploadHandler}
                name="avatar"
                showUploadList={false}
                beforeUpload={props.fileType == 'img' ? checkImageTypeAnd2mSize : checkDocuTypeAnd10mSize}
                onChange={handleChange}>
                <Button style={{ width: buttonwidth }}>
                    <BsCloudUploadFill style={{ verticalAlign: '-2px' }} />
                </Button>
            </Upload>
            {props.showProgress && loading ? <Progress percent={percent} /> : null}
        </span>
    );
};

export default FileUploder;
