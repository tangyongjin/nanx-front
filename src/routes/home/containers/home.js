import React from 'react';
import '@/UFormPlugin';
import 'antd/dist/reset.css';

const Home = () => {
    return (
        <div style={{ marginLeft: '40px' }}>
            欢迎页面
            <svg class="icon" aria-hidden="true">
                <use href="#icon-PDF1"></use>
            </svg>
        </div>
    );
};

export default Home;
