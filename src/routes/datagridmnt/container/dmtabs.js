import React from 'react';
import { Card } from 'antd';
import ButtonCfg from './buttoncfg';
import GridEDitor from './gridEditor';
import AddDatagrid from './gridAdder';
import Gridinfo from './gridinfo';

import { observer, inject } from 'mobx-react';

@inject('dmStore')
@observer
export default class Dmtabs extends React.Component {
    state = {
        key: 'tab0',
        noTitleKey: 'app'
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        const tabList = [
            {
                key: 'tab1',
                tab: '添加'
            },
            {
                key: 'tab2',
                tab: '编辑'
            },

            {
                key: 'tab3',
                tab: '按钮配置'
            },

            {
                key: 'tab9',
                tab: 'Info'
            }
        ];

        const contentList = {
            tab1: <AddDatagrid />,
            tab2: <GridEDitor />,
            tab3: <ButtonCfg />,
            tab9: <Gridinfo />
        };

        return (
            <Card
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={(key) => {
                    this.onTabChange(key, 'key');
                }}>
                {contentList[this.state.key]}
            </Card>
        );
    }
}
