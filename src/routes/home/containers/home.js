import React from 'react';
import { Input, Select, Button, Popover } from 'antd';

import '@/UFormPlugin';
import 'antd/dist/reset.css';
import IconChooser from '@/utils/IconChooser';
const Home = () => {
    return (
        <div style={{ marginLeft: '40px' }}>
            欢迎页面
            <Button style={{ color: 'white' }}>
                <IconChooser icon={'icon-Icon-fill-question'} />{' '}
            </Button>
            <IconChooser icon={'icon-Icon-fill-question'} />{' '}
            <svg class="icon" aria-hidden="true">
                <use href="#icon-PDF1"></use>
            </svg>
        </div>
    );
};

export default Home;
