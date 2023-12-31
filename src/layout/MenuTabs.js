import React from 'react';
import { Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { findItemByKey } from '@/utils/tools';

import { toJS } from 'mobx';
const MenuTabs = inject('MenuStore')(
    observer((props) => {
        const onChange = (key) => {
            console.log('🤮🤮🤮切换Tab');

            let current = props.MenuStore.MenuTabItems.find((item) => item.key === key);
            let curMenuItem = findItemByKey(props.MenuStore.RoleBasedMenuList, key);
            props.MenuStore.setCurrentMenu(toJS(curMenuItem));

            console.log('👻👻👻👻 replace');
            console.log('current.pushObj: ', current.pushObj);
            props.MenuStore.history.replace(current.pushObj);
        };

        const onEdit = (targetKey, action) => {
            if (action === 'add') {
                // add();
            } else {
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
