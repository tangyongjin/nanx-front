// buttonRender.js
import { Button } from 'antd';
import React from 'react';

const getButtonHandler = async (event, item, store) => {
    let tmp = require(`../../../buttons/${item.file_path}`).default;
    // console.log('从文件来的组件', tmp);
    await store.setButtonUsedCom(tmp);
    store.lazyButtonUsedCom['init']();
};

const renderButtons = (tableStore) => {
    if (!tableStore.tableButtons) {
        return null;
    }
    return tableStore.tableButtons.map((item, index) => {
        return (
            <Button
                key={index}
                type={item.ui_type}
                htmlType="button"
                onClick={(event) => getButtonHandler(event, item, tableStore)}
                size="small"
                className="round-button"
                style={{ margin: 8 }}>
                {item.title}
            </Button>
        );
    });
};

export default renderButtons;
