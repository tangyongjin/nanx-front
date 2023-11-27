import React from 'react';
import { Button, Popover } from 'antd';

import showJsonTree from '@/component/jsonTree.js';

const JsonRender = (text) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }

    return (
        <div>
            <span>{text}</span>
            <Popover className="help-tip" content={showJsonTree(text)} title="JSON配置" trigger="hover">
                <Button>JSON</Button>
            </Popover>
        </div>
    );
};
export default JsonRender;
