import React from 'react';
import * as icons from '@ant-design/icons';

const Icon = (props) => {
    const { icon } = props;
    console.log(icon);
    const antIcons = icons;
    return React.createElement(antIcons[icon]);
};
export default Icon;
