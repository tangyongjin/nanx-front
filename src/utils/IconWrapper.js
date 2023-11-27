import React from 'react';
import BsIconWrapper from './BsIconWrapper';
import VscIconWrapper from './VscIconWrapper';

const IconWrapper = (IconText) => {
    if (IconText == '' || IconText == null || IconText == undefined) {
        return null;
    }

    let iconSetName = IconText.split(':')[0];

    // visual code icons
    if (iconSetName == 'Vsc') {
        return VscIconWrapper(IconText.split(':')[1]);
    }

    // bootstrap icons
    if (iconSetName == 'Bs') {
        return BsIconWrapper(IconText.split(':')[1]);
    }

    return <span style={{ width: '30px' }}>{IconText}</span>;
};

export default IconWrapper;
