import React from 'react';
import { root_url, port } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/`;
function startsWithHttp(urlString) {
    return urlString.startsWith('http://');
}

const OfficeDocuRender = (url) => {
    if (url == '' || url == null || url == undefined) {
        return '';
    }
    let _download = '';
    if (startsWithHttp(url)) {
        _download = url;
    } else {
        _download = api_root + '/' + url;
    }

    const segments = _download.split('/');

    // 获取数组的最后一个元素
    const lastSegment = segments[segments.length - 1];

    const truncatedLastSegment =
        lastSegment.length > 20 ? `${lastSegment.slice(0, 17)}...${lastSegment.slice(-3)}` : lastSegment;

    return (
        <a href={_download}>
            <div>
                {truncatedLastSegment}
                <svg style={{ fontSize: '24px', color: 'black' }} className="icon" aria-hidden="true">
                    <use href="#icon-PDF"></use>
                </svg>
            </div>
        </a>
    );
};
export default OfficeDocuRender;
