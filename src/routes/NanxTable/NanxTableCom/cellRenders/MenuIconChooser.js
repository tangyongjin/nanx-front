import React from 'react';
import * as antIcons from '@ant-design/icons';
import { fontIcons } from '@/iconsHero/iconColletion';

const MenuIconChooser = (props) => {
    const { icon: IconText } = props;

    if (fontIcons.includes(IconText)) {
        let dashname = `#${IconText}`;
        return (
            <svg style={{ fontSize: '24px', marginRight: '10px' }} className="icon" aria-hidden="true">
                <use href={dashname}></use>
            </svg>
        );
    } else {
        const antdIconItem = React.createElement(antIcons[IconText]);
        return <span className="anticon anticon-tool">{antdIconItem}</span>;
    }
};

export default MenuIconChooser;
