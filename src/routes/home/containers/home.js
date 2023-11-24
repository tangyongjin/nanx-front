import React from 'react';
import '@/UFormPlugin';
import 'antd/dist/reset.css';

const Home = () => {
    return (
        <div style={{ marginLeft: '40px' }}>
            欢迎页面
            <i className="iconfont icon-chatgpticon"></i>
            <svg style={{ color: 'red' }} className="icon" aria-hidden="true">
                <use href="#icon-zip"></use>
            </svg>
        </div>
    );
};

export default Home;
