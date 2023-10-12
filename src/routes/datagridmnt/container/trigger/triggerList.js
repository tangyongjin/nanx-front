import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('dmStore')
@observer
export default class TriggerList extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = this.props.dmStore;
    }

    state = {
        group_name: '',
        group_id: ''
    };

    render() {
        console.log(this.dmstore);

        return (
            <div style={{ marginLeft: '5px' }}>
                <h3>
                    管理联动: {this.dmstore.current_DataGridCode}/{this.dmstore.current_actname}
                </h3>

                {this.dmstore.trigger_groups.map((item, idx) => (
                    <Card
                        key={idx}
                        title={item.group_name}
                        extra={<Button onClick={() => this.dmstore.deleteTriggerGroup(item.group_id)}>删除</Button>}
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
                        {item.cfgs.map((xitem, idx) => (
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
