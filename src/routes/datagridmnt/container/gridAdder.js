import React from 'react';
import { Form, Row, Col, Input, Card, Select, Button, message, AutoComplete } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';
const { Option } = Select;

@inject('dmStore')
@observer
class GridAdder extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    addDataGridCode = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.portaluse = 'y';
                values.multiple = values.multiple == true ? 'y' : 'n';
                let params = {
                    data: values,
                    method: 'POST'
                };
                console.log(values);
                let ret = await api.activity.addDataGridCode(params);

                if (ret.code == 200) {
                    this.dmstore.initAll();
                }
            } else {
                message.error('请检查输入项', 0.5);
            }
        });
    };

    render() {
        let xtitle = '添加ActionCode';
        let biztables = this.dmstore.biztableList;
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={xtitle} style={{ width: '100%' }}>
                <Form onSubmit={this.addDataGridCode}>
                    <Row>
                        <Col span={4}>
                            <Form.Item label="基础表格">
                                {getFieldDecorator('base_table', {
                                    rules: [{ required: true, message: '选择基表' }]
                                })(
                                    <Select showSearch placeholder="选择基表">
                                        {biztables.length &&
                                            biztables.map((item, index) => (
                                                <Option key={index} value={item.value}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            {' '}
                            <Form.Item label="DataGridCode">
                                {getFieldDecorator('datagrid_code', {
                                    rules: [{ required: true }]
                                })(
                                    <AutoComplete placeholder="DataGridCode">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="标题">
                                {getFieldDecorator('datagrid_title', {
                                    rules: [{ required: true, message: '输入标题' }]
                                })(
                                    <AutoComplete placeholder="标题">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Form.Item label="getterurl">
                                {getFieldDecorator('geturl', {
                                    rules: [{ required: true, message: 'geturl' }],
                                    initialValue: 'curd/listData'
                                })(
                                    <AutoComplete placeholder="geturl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>{' '}
                        </Col>
                        <Col span={4}>
                            <Form.Item label="AddUrl">
                                {getFieldDecorator('addurl', {
                                    rules: [{ required: true, message: 'addurl' }],
                                    initialValue: 'curd/addData'
                                })(
                                    <AutoComplete placeholder="addurl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="DeleteUrl">
                                {getFieldDecorator('delurl', {
                                    rules: [{ required: true, message: 'delurl' }],
                                    initialValue: 'curd/deleteData'
                                })(
                                    <AutoComplete placeholder="delurl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="UpdateUrl">
                                {getFieldDecorator('updateurl', {
                                    rules: [{ required: true, message: 'updateurl' }],
                                    initialValue: 'curd/updateData'
                                })(
                                    <AutoComplete placeholder="updateurl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" style={{ padding: '0px 10px ' }} htmlType="submit">
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(GridAdder);
