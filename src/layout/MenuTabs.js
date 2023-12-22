import React from 'react';
import { Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const MenuTabs = inject('MenuStore')(
    observer((props) => {
        const onChange = (key) => {
            props.MenuStore.setActiveTabKey(key);
            let current = props.MenuStore.MenuTabItems.find((item) => item.key === key);
            if (!current.pushObj.executed) {
                props.MenuStore.setExecutedStatusForKey(key);
                props.MenuStore.history.push(current.pushObj);
            } else {
                props.MenuStore.history.replace(current.pushObj);
            }
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

// export default  MenuTabs ; //这里要执行一下WithRouter

export default withRouter(MenuTabs); //这里要执行一下WithRouter
