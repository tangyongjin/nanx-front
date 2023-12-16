import { Button } from 'antd';
import React from 'react';
import IconWrapper from '@/utils/IconWrapper';

const getButtonHandler = async (event, item, store) => {
    let tmp = require(`../../../buttons/${item.file_path}`).default;
    console.log('tmp: ', tmp);
    await store.setButtonUsedCom(tmp);
    console.log('👹👹👹👹👹👹👹👹👹👹 CAN INIT', item.file_path, store.lazyButtonUsedCom);
    store.lazyButtonUsedCom['init'](item);
};

const renderButtons = (tableStore) => {
    if (!tableStore.tableButtons) {
        return null;
    }
    return tableStore.tableButtons.map((item, index) => {
        return (
            <Button
                danger
                key={index}
                type="primary"
                icon={IconWrapper(item.icon)}
                onClick={(event) => getButtonHandler(event, item, tableStore)}
                className="table-button"
                style={{ margin: 5 }}>
                {item.title}
            </Button>
        );
    });
};

export default renderButtons;
