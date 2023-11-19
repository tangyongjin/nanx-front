import React from 'react';
import { Row, Col, message, Input, Divider, Button } from 'antd';
import Line from './line';
import { inject, observer } from 'mobx-react';
import triggerlineStore from './triggerlineStore';

@inject('DataGridStore')
@observer
export default class TriggerAddCom extends React.Component {
    constructor(props) {
        super(props);
        this.DataGridStore = this.props.DataGridStore;
    }

    state = {
        linecounter: 0,
        group_name: '',
        lines: []
    };

    increateCounter() {
        let tstore = new triggerlineStore();
        this.state.lines.push(
            <Line
                triggerlineStore={tstore}
                descCounter={this.descCounter.bind(this)}
                idx={this.state.linecounter + 1}
                key={this.state.linecounter + 1}
            />
        );
        this.setState({ linecounter: this.state.linecounter + 1 });
    }

    descCounter(idx) {
        if (idx == this.state.linecounter) {
            this.setState({ linecounter: this.state.linecounter - 1 });
            this.state.lines.pop();
        } else {
            message.info('只能删除最后一条');
        }
    }

    setGroupName = () => {
        let value = event.target.value;
        this.setState({ group_name: value });
    };

    saveTriggerGroup() {
        let triggerObj = {};
        triggerObj.group_name = this.state.group_name;
        triggerObj.counter = this.state.linecounter;
        triggerObj.DataGridCode = this.DataGridStore.DataGridCode;
        triggerObj.lines = [];
        this.state.lines.forEach((element) => {
            let ts = element.props.triggerlineStore;
            triggerObj.lines.push({
                combo_table: ts.combo_table,
                field_e: ts.field_e,
                list_field: ts.list_field,
                value_field: ts.value_field,
                filter_field: ts.filter_field
            });
        });

        this.DataGridStore.saveTriggerGroup(triggerObj);
    }

    render() {
        return (
            <div style={{ marginLeft: '40px', marginTop: '30px' }}>
                <div style={{ marginBottom: '10px' }}>联动组名称:</div>
                <div style={{ marginBottom: '10px' }}>
                    <Input onChange={(event) => this.setGroupName(event)} />
                </div>
                <Row align="bottom">
                    <Col span={2}>
                        <Button type="default" htmlType="submit" onClick={this.increateCounter.bind(this)}>
                            添加
                        </Button>
                    </Col>
                    <Col span={4}>业务表中的列</Col>
                    <Col span={6}>联动表</Col>
                    <Col span={4}>联动表值字段</Col>
                    <Col span={4}>联动表显示字段</Col>
                    <Col span={4}>筛选字段</Col>
                </Row>
                <Divider />

                {this.state.lines.map((item, idx) => (
                    <div key={idx}>{item}</div>
                ))}

                <Row>
                    <Col offset={12} span={4}>
                        <Button type="primary" htmlType="submit" onClick={this.saveTriggerGroup.bind(this)}>
                            保存
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
