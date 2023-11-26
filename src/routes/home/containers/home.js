import React from 'react';
import { Input, Select, Button, Popover } from 'antd';

import '@/UFormPlugin';
import 'antd/dist/reset.css';
import CellsRenderHandlers from '@/routes/NanxTable/NanxTableCom/cellRenders/cellsRenderHandlers';

const Home = () => {
    console.log('CellsRenderHandlers: ', CellsRenderHandlers);

    for (let key in CellsRenderHandlers) {
        console.log('key: ', key);
    }

    return <div style={{ marginLeft: '40px' }}>欢迎页面</div>;
};

export default Home;
