import React from 'react';
import { root_url, port } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/`;
function startsWithHttp(urlString) {
    return urlString.startsWith('http://');
}

const ImgRender = (url) => {
    if (url == '' || url == null || url == undefined) {
        return '';
    }
    let _imgUrl = '';
    if (startsWithHttp(url)) {
        _imgUrl = url;
    } else {
        _imgUrl = api_root + '/' + url;
    }

    return (
        <div>
            <img
                style={{ borderRadius: '5px', marginLeft: '30px', width: '30px', height: '30px' }}
                alt="img"
                src={_imgUrl}
            />
        </div>
    );
};
export default ImgRender;
