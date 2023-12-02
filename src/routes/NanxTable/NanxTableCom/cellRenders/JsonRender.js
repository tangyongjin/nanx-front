import React from 'react';
import { Button, Popover } from 'antd';
import showJsonTree from '@/component/jsonTree.js';

const JsonRender = (text) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }

    return (
        <div>
            <Popover content={showJsonTree(text)} title="JSON配置" trigger="hover">
                <div style={{ display: 'flex', alignItems: 'top' }}>
                    <Button style={{ marginRight: '4px' }}>JSON</Button> <span className="truncate">{text}</span>
                </div>
            </Popover>
        </div>
    );
};
export default JsonRender;
