import React from 'react';
import IconChooser from '@/utils/IconChooser';

const IconRender = (text, style) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }
    // antdesign自带图标或者 iconfont图标
    return <IconChooser style={style} icon={text} />;
};
export default IconRender;
