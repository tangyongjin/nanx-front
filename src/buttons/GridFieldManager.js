import React from 'react';
import { Card } from 'antd';
import { observer, inject } from 'mobx-react';
import { Tabs } from 'antd';
import FieldPropertyRender from './FieldPropertyRender';

@inject('DataGridStore')
@observer
class GridFieldManager extends React.Component {
    render() {
        let xtitle =
            '当前DataGrid: (' +
            this.props.DataGridStore.DataGridCode +
            '/' +
            this.props.DataGridStore.DataGridTitle +
            ')';
        let allcols = this.props.DataGridStore.ColsDbInfo;

        return (
            <Card title={xtitle}>
                <div>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition={'top'}
                        type="card"
                        style={{
                            height: 388
                        }}
                        items={allcols.map((col, idx) => {
                            const id = String(idx);
                            return {
                                label: col.Field,
                                key: id,
                                children: <FieldPropertyRender col={col} />
                            };
                        })}
                    />
                </div>
            </Card>
        );
    }
}
export default GridFieldManager;
