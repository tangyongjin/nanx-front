import { Button } from 'antd';
import React from 'react';
import IconRender from '@/routes/NanxTable/NanxTableCom/cellRenders/IconRender';

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
        if (item.ui_type == 'danger') {
            return (
                <Button
                    danger
                    key={index}
                    htmlType="button"
                    icon={IconRender(item.icon)}
                    onClick={(event) => getButtonHandler(event, item, tableStore)}
                    className="round-button"
                    style={{ margin: 8 }}>
                    {item.title}
                </Button>
            );
        } else {
            return (
                <Button
                    key={index}
                    type={item.ui_type}
                    htmlType="button"
                    icon={IconRender(item.icon)}
                    onClick={(event) => getButtonHandler(event, item, tableStore)}
                    className="round-button"
                    style={{ margin: 8 }}>
                    {item.title}
                </Button>
            );
        }
    });
};

export default renderButtons;
