import React from 'react';
import { root_url, port } from '@/api/api_config/base_config';
import { Space } from 'antd';
import { BsFilePdf } from 'react-icons/bs';

const api_root = `${root_url}:${port}/`;
function startsWithHttp(urlString) {
    return urlString.startsWith('http://');
}

const OfficeDocuRender = (text) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }
    let _download = '';
    if (startsWithHttp(text)) {
        _download = text;
    } else {
        _download = api_root + '/' + text;
    }

    const segments = _download.split('/');
    const lastSegment = segments[segments.length - 1];
    console.log('lastSegment: ', lastSegment);

    const short = lastSegment.length > 20 ? `${lastSegment.slice(-20)}` : lastSegment;
    console.log('short: ', short);

    const getFileExtension = (filename) => {
        const parts = filename.split('.');
        return parts[parts.length - 1];
    };

    const getDocumentType = (filename) => {
        const extension = getFileExtension(filename).toLowerCase();
        switch (extension) {
            case 'pdf':
                // return 'icon-PDF1';
                return <BsFilePdf />;

            case 'doc':
                return 'icon-WORD';
            case 'docx':
                return 'icon-WORD';
            case 'xlsx':
                return 'icon-ECEL';
            case 'csv':
                return 'icon-ECEL';
            case 'xls':
                return 'icon-ECEL';
            case 'pptx':
                return 'icon-PPT';
            case 'zip':
                return 'icon-zip1';
            default:
                return 'FileUnknownOutlined';
        }
    };

    let docuType = getDocumentType(short);
    console.log('docuType: ', docuType);

    return (
        <div>
            <a style={{ color: 'black' }} href={_download}>
                <span>
                    {short}
                    <Space />
                    {docuType}
                </span>
            </a>
        </div>
    );
};
export default OfficeDocuRender;
