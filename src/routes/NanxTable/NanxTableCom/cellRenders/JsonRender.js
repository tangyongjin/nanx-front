import React from 'react';
import { Button, Popover } from 'antd';
import IconRender from '@/routes/NanxTable/NanxTableCom/cellRenders/IconRender';
import showJsonTree from '@/component/jsonTree.js';

const JsonRender = (text) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }

    return (
        <div>
            <span>{text}</span>
            <Popover className="help-tip" content={showJsonTree(text)} title="JSON配置" trigger="hover">
                <Button>{IconRender('icon-snow')}</Button>
            </Popover>
        </div>
    );
};
export default JsonRender;
