import React from 'react';
import { Tabs } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const MenuTabs = inject('MenuStore')(
    observer((props) => {
        const onChange = (key) => {
            console.log(key);
            props.MenuStore.setActiveTabKey(key);
            let current = props.MenuStore.MenuTabItems.find((item) => item.key === key);
            console.log('CCcurrent: ', current.pushObj);
            if (!current.pushObj.executed) {
                console.log('执行!');
                props.MenuStore.setExecutedStatusForKey(key);
                props.MenuStore.history.push(current.pushObj);
            } else {
                console.log('已经执行,do nothing');
                // history.replace
                props.MenuStore.history.replace(current.pushObj);
            }
        };

        const onEdit = (targetKey, action) => {
            console.log('action: ', action);
            console.log('targetKey: ', targetKey);
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
