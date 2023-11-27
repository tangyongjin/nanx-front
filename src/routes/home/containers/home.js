import React from 'react';
import { Button } from 'antd';
import IconWrapper from '@/utils/IconWrapper';

import '@/UFormPlugin';
import 'antd/dist/reset.css';

const Home = () => {
    // for (let key in BootIcons) {
    //     console.log('key: ', key);
    // }

    const ix = IconWrapper('Bs:BsFileWord');
    console.log('ix: ', ix);

    return (
        <div style={{ marginLeft: '40px' }}>
            欢迎页面
            <i className="bi-alarm"></i>
            <h1>boost</h1>
            <Button icon={ix} htmlType="button">
                ABCD
            </Button>
        </div>
    );
};

export default Home;
