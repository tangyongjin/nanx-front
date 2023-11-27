import React from 'react';
import IconWrapper from '@/utils/IconWrapper';

const IconRender = (text, style) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }
    //     {VscIconWrapper(IconText)}
    // antdesign自带图标或者 iconfont图标
    return <span>{IconWrapper(text)}</span>;
};

export default IconRender;
