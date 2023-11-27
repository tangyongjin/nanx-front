import React from 'react';
import * as VscIcons from 'react-icons/vsc';

const VscIconWrapper = (IconText) => {
    if (IconText == '' || IconText == null || IconText == undefined) {
        return null;
    }

    const IconItem = React.createElement(VscIcons[IconText]);
    return IconItem;
};

export default VscIconWrapper;
