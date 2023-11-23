import React from 'react';
import * as icons from '@ant-design/icons';

import GPTicon from '@/iconsHero/GPTicon';

const Icon = (props) => {
    console.log(props);
    const { icon: IconText } = props;
    const antIcons = icons;

    if (IconText == 'GPTicon') {
        return <GPTicon />;
    } else {
        return React.createElement(antIcons[IconText]);
    }
};
export default Icon;
