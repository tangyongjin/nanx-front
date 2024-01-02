import React from 'react';
import { Tabs } from 'antd';
import { inject, observer } from 'mobx-react';

const MenuTabs = inject('MenuStore')(
    observer((props) => {
        const onChange = (key) => {
            props.MenuStore.switchTab(key);
        };

        const onEdit = (targetKey, action) => {
            if (action === 'remove') {
                props.MenuStore.removeMenuTabItem(targetKey);
            }
        };

        // destroyInactiveTabPane={true} 必须是 false
        return (
            <div style={{ paddingLeft: '4px' }}>
                <Tabs
                    hideAdd={true}
                    destroyInactiveTabPane={false}
                    size={'middle'}
                    type="editable-card"
                    key={props.MenuStore.randomKey}
                    activeKey={props.MenuStore.activeTabKey}
                    items={props.MenuStore.MenuTabItems}
                    onEdit={onEdit}
                    onChange={onChange}
                />
            </div>
        );
    })
);

export default MenuTabs;
