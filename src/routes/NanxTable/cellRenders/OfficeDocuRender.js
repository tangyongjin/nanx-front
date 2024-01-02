import React from 'react';
import { root_url, port } from '@/api/api_config/base_config';
import { BsFilePdf, BsFillFileExcelFill, BsFileEarmark, BsFileZip, BsFileEarmarkWord } from 'react-icons/bs';

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
    const short = lastSegment.length > 20 ? `${lastSegment.slice(-20)}` : lastSegment;

    const getFileExtension = (filename) => {
        const parts = filename.split('.');
        return parts[parts.length - 1];
    };

    const getDocumentType = (filename) => {
        const extension = getFileExtension(filename).toLowerCase();
        switch (extension) {
            case 'pdf':
                return <BsFilePdf style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            case 'doc':
                return <BsFileEarmarkWord style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            case 'docx':
                return <BsFileEarmarkWord style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            case 'xlsx':
                return <BsFillFileExcelFill style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            case 'csv':
                return <BsFillFileExcelFill style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            case 'xls':
                return <BsFillFileExcelFill style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            case 'pptx':
                return 'icon-PPT';
            case 'zip':
                return <BsFileZip style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
            default:
                return <BsFileEarmark style={{ color: 'green', marginRight: '4px', fontSize: '18px' }} />;
        }
    };

    let docuIcon = getDocumentType(short);
    return (
        <>
            <a style={{ color: 'black' }} href={_download}>
                <span className="office-docu-title">
                    {docuIcon}
                    {short}
                </span>
            </a>
        </>
    );
};
export default OfficeDocuRender;
