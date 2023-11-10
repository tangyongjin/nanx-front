import React from 'react';
import Icon from '@/utils/icon';

const IconRender = (text) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }
    return <Icon icon={text} />;
};
export default IconRender;
