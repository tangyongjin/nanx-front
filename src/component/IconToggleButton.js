import { Button } from 'antd';
import React from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const IconToggleButton = (props) => {
    if (props.ifShowList) {
        return (
            <Button onClick={props.toggleShow} style={{ marginLeft: '5px' }}>
                <UpOutlined />
            </Button>
        );
    } else {
        return (
            <Button onClick={props.toggleShow} style={{ marginLeft: '5px' }}>
                <DownOutlined />
            </Button>
        );
    }
};

export default IconToggleButton;
