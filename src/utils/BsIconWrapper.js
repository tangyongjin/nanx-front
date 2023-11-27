import React from 'react';
import * as BootStrapIcons from 'react-icons/bs';

const BsIconWrapper = (IconText) => {
    if (IconText == '' || IconText == null || IconText == undefined) {
        return null;
    }

    const IconItem = React.createElement(BootStrapIcons[IconText]);
    return IconItem;
};

export default BsIconWrapper;
