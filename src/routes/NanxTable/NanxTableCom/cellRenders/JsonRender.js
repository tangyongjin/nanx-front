import React from 'react';
import { Popover } from 'antd';
import showJsonTree from '@/component/jsonTree.js';
import { BsFileEarmarkCodeFill } from 'react-icons/bs';

// Vsc:VscJson

const JsonRender = (text) => {
    if (text == '' || text == null || text == undefined) {
        return '';
    }

    return (
        <div>
            <Popover content={showJsonTree(text)} title="JSON配置" trigger="hover">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsFileEarmarkCodeFill />
                    <span className="truncate">{text}</span>
                </div>
            </Popover>
        </div>
    );
};
export default JsonRender;
