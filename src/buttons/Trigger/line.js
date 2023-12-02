import React from 'react';
import { Select, Row, Col, Button } from 'antd';
import { inject, observer } from 'mobx-react';

const { Option } = Select;
@inject('GridConfigStore')
@inject('triggerlineStore')
@observer
class Line extends React.Component {
    constructor(props) {
        super(props);

        this.GridConfigStore = props.GridConfigStore;
        this.tgstore = props.triggerlineStore;
    }

    destroyLine(idx) {
        this.props.descCounter(idx);
    }

    render() {
        let biztables = this.GridConfigStore.biztableList;

        return (
            <div style={{ marginBottom: '10px' }}>
                <Row>
                    <Col span={2}>
                        <Button
                            type="default"
                            btn_idx={this.props.idx}
                            onClick={() => this.destroyLine(this.props.idx)}>
                            删除
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="请选择字段"
                            showSearch
                            value={this.tgstore.field_e}
                            onChange={this.tgstore.resetFieldE}
                            style={{ width: '98%' }}>
                            {this.GridConfigStore.ColsDbInfo.length &&
                                this.GridConfigStore.ColsDbInfo.map((item, index) => (
                                    <Option key={index} value={item.Field}>
                                        {item.Field}
                                    </Option>
                                ))}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            placeholder="选择联动表"
                            showSearch
                            value={this.tgstore.combo_table}
                            onChange={this.tgstore.resetCombo_table}
                            style={{ width: '98%' }}>
                            {biztables.length &&
                                biztables.map((item, index) => (
                                    <Option key={index} value={item.value}>
                                        {item.value}
                                    </Option>
                                ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="值字段"
                            showSearch
                            value={this.tgstore.value_field}
                            style={{ width: '98%' }}
                            onChange={this.tgstore.resetValueField}>
                            {this.tgstore.refercolumns.length &&
                                this.tgstore.refercolumns.map((item) => (
                                    <Option key={item.Field} value={item.Field}>
                                        {item.Field}
                                    </Option>
                                ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="显示字段"
                            showSearch
                            style={{ width: '98%' }}
                            value={this.tgstore.list_field}
                            onChange={this.tgstore.resetListField}>
                            {this.tgstore.refercolumns.length &&
                                this.tgstore.refercolumns.map((item, index) => (
                                    <Option key={index} value={item.Field}>
                                        {item.Field}
                                    </Option>
                                ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            placeholder="筛选字段"
                            showSearch
                            disabled={this.props.idx == 1}
                            style={{ width: '98%' }}
                            value={this.tgstore.filter_field}
                            onChange={this.tgstore.resetFilterField}>
                            {this.tgstore.refercolumns.length &&
                                this.tgstore.refercolumns.map((item, index) => (
                                    <Option key={index} value={item.Field}>
                                        {item.Field}
                                    </Option>
                                ))}
                        </Select>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Line;
