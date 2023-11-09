//

import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const Home = () => (
    <Space direction="vertical" size={12}>
        <DatePicker defaultValue={dayjs('2015-12-12', dateFormat)} format={dateFormat} />
        <DatePicker defaultValue={null} format={dateFormat} />
    </Space>
);

export default Home;
