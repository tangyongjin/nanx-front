import React from 'react';
import * as icons from '@ant-design/icons';

const Icon = (props) => {
    const { icon } = props;
    const antIcons = icons;
    return React.createElement(antIcons[icon]);
};
export default Icon;
