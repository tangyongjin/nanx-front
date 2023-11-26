import React from 'react';
import MenuIconChooser from './MenuIconChooser';

const MenuIconRender = (text, style) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }
    // antdesign自带图标或者 iconfont图标
    return <MenuIconChooser style={style} icon={text} />;
};
export default MenuIconRender;
