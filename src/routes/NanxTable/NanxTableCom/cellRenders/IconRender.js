import React from 'react';
import IconWrapper from '@/utils/IconWrapper';

const IconRender = (text ) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }
    return <span>{IconWrapper(text)}</span>;
};

export default IconRender;
