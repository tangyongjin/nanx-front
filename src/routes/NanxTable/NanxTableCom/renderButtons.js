// buttonRender.js
import { Button } from 'antd';
import React from 'react';

const getButtonHandler = async (event, item, store) => {
    let tmp = require(`../../../buttons/${item.file_path}`).default;
    // console.log('从文件来的组件', tmp);
    await store.setButtonUsedCom(tmp);
    // console.log(this.commonTableStore.lazyButtonUsedCom);
    store.lazyButtonUsedCom['init']();
};

const renderButtons = (tableStore) => {
    if (!tableStore.TableButtons) {
        return null;
    }
    return tableStore.TableButtons.map((item, index) => {
        return (
            <Button
                key={index}
                type={item.ui_type}
                htmlType="button"
                onClick={(event) => getButtonHandler(event, item, tableStore)}
                size="small"
                style={{ margin: 8 }}>
                {item.title}
            </Button>
        );
    });
};

export default renderButtons;
