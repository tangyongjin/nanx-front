import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('DataGridStore')
@observer
export default class TriggerListCom extends React.Component {
    constructor(props) {
        super(props);
        this.DataGridStore = this.props.DataGridStore;
    }

    state = {};

    render() {
        console.log(this.DataGridStore);

        return (
            <div style={{ marginLeft: '5px' }}>
                <h3>
                    管理联动: {this.DataGridStore.DataGridCode}/{this.DataGridStore.DataGridTitle}
                </h3>

                {this.DataGridStore.trigger_groups.map((item, idx) => (
                    <Card
                        key={idx}
                        title={item.group_name}
                        extra={
                            <Button onClick={() => this.DataGridStore.deleteTriggerGroup(item.group_id)}>删除</Button>
                        }
                        style={{ width: 1200 }}>
                        <Row>
                            <Col span={1}>ID</Col>
                            <Col span={5}>主表</Col>
                            <Col span={4}>业务表中的列</Col>
                            <Col span={4}>联动表</Col>
                            <Col span={3}>联动表值字段</Col>
                            <Col span={3}>联动表显示字段</Col>
                            <Col span={3}>筛选字段</Col>
                            <Col span={1}>Level</Col>
                        </Row>
                        {item.cfgs.map((xitem) => (
                            <Row key={xitem.id}>
                                <Col span={1}>{xitem.id}</Col>
                                <Col span={5}>{xitem.base_table}</Col>
                                <Col span={4}>{xitem.field_e}</Col>
                                <Col span={4}>{xitem.combo_table}</Col>
                                <Col span={3}>{xitem.value_field}</Col>
                                <Col span={3}>{xitem.list_field}</Col>
                                <Col span={3}>
                                    {xitem.filter_field} {xitem.codetable_category_value}{' '}
                                </Col>
                                <Col span={1}>{xitem.level}</Col>
                            </Row>
                        ))}
                    </Card>
                ))}
            </div>
        );
    }
}
