import React from 'react';

const ImgRender = (url) => {
    if (url == '' || url == null || url == undefined) {
        return '';
    }
    return (
        <div>
            <img
                style={{ borderRadius: '5px', marginLeft: '30px', width: '30px', height: '30px' }}
                alt="useravatar"
                src={url}
            />
        </div>
    );
};
export default ImgRender;
