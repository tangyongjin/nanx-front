import React from 'react';
import { Card } from 'antd';
import { observer, inject } from 'mobx-react';
import { Tabs } from 'antd';
import FieldPropertyRender from './FieldPropertyRender';

const GridFieldManager = inject('GridConfigStore')(
    observer((props) => {
        console.log('props: ', props);

        const onChange = (key) => {
            console.log('key: ', key);
            props.GridConfigStore.getDataGridConfigure();
        };

        const xtitle =
            '当前DataGrid: (' + props.GridConfigStore.DataGridCode + '/' + props.GridConfigStore.DataGridTitle + ')';
        let ColsDbInfo = props.GridConfigStore.ColsDbInfo;

        return (
            <Card title={<h3>{xtitle}</h3>}>
                <div>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition={'top'}
                        onChange={onChange}
                        type="card"
                        style={{
                            height: 478
                        }}
                        items={ColsDbInfo.map((col, idx) => {
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
    })
);

export default GridFieldManager;
