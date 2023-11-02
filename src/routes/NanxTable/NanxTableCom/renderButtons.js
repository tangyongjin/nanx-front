import { Button } from 'antd';
import React from 'react';
import Icon from '@/utils/icon';

const getButtonHandler = async (event, item, store) => {
    let tmp = require(`../../../buttons/${item.file_path}`).default;
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
                icon={item.icon ? <Icon icon={item.icon} /> : null}
                onClick={(event) => getButtonHandler(event, item, tableStore)}
                className="round-button"
                style={{ margin: 8 }}>
                {item.title}
            </Button>
        );
    });
};

export default renderButtons;
