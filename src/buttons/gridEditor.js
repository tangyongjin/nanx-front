import React from 'react';
import { Row, Col, Input, Card, Select, Form, Button, message, AutoComplete, Switch } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';

const { Option } = Select;

@inject('DataGridStore')
@observer
class GridEditor extends React.Component {
    constructor(props) {
        super(props);
        this.DataGridStore = props.DataGridStore;
    }

    state = {
        query_cfg_field: '',
        query_cfg_value: '',
        activity_tips: ''
    };

    componentDidUpdate() {}

    setQueryValue = () => {
        let value = event.target.value;
        this.setState({ query_cfg_value: value });
    };

    setFieldQuery = (a) => {
        this.setState({ query_cfg_field: a });
    };

    resetQueryCfg = async () => {
        if (this.DataGridStore.current_actcode === '') {
            message.error('请选择一个DataGrid');
            return;
        }
    };

    //针对某个activiticode的第一级别 querycfg, 如果存在,则会覆盖 commonTable的query_cfg

    saveOverrideQueryCfg = () => {
        if (this.DataGridStore.current_actcode === '') {
            message.error('请选择一个DataGrid');
            return;
        }

        if (this.state.query_cfg_field === '') {
            message.error('请选择一个字段');
            return;
        }

        if (this.state.query_cfg_value === '') {
            message.error('请设置参数值');
            return;
        }
        let params = {
            data: {
                actcode: this.DataGridStore.current_actcode,
                query_cfg_field: this.state.query_cfg_field,
                query_cfg_value: this.state.query_cfg_value
            }
        };
        api.activity.saveOverrideQueryCfg(params);
    };

    ModifyActionCode = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.portaluse = 'y';
                values.multiple = values.multiple === true ? '' : 'n';
                let params = {
                    data: values
                };

                let ret = await api.activity.modifyActionCode(params);
                if (ret.code == 200) {
                    message.info(ret.message, 1.5);
                    this.DataGridStore.initAll();
                }
            } else {
                message.error('请检查输入项', 0.5);
            }
        });
    };

    render() {
        let xtitle = '编辑:' + this.DataGridStore.current_actcode;

        let biztables = this.DataGridStore.biztableList;
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={xtitle} style={{ width: '100%' }}>
                <Form onSubmit={this.ModifyActionCode}>
                    <Row>
                        <Col span={4}>
                            {' '}
                            <Form.Item label="ActionCode">
                                {getFieldDecorator('activity_code', {
                                    disabled: true,
                                    initialValue: this.DataGridStore.currentObj.activity_code,
                                    rules: [{ required: true, message: 'ActionCode' }]
                                })(<Input disabled />)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="标题">
                                {getFieldDecorator('grid_title', {
                                    initialValue: this.DataGridStore.currentObj.grid_title,

                                    rules: [{ required: true, message: '输入标题' }]
                                })(
                                    <AutoComplete placeholder="标题">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="基础表格">
                                {getFieldDecorator('base_table', {
                                    initialValue: this.DataGridStore.currentObj.base_table,
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
                            <Form.Item label="宽度">
                                {getFieldDecorator('win_size_width', {
                                    initialValue: this.DataGridStore.currentObj.win_size_width,

                                    rules: [{ required: true, message: '宽度' }]
                                })(
                                    <AutoComplete placeholder="win_size_width">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>

                        <Form.Item label="多选">
                            {getFieldDecorator('multiple', {
                                valuePropName: 'checked',
                                initialValue: this.DataGridStore.currentObj.multiple === 'n' ? false : true,
                                rules: [{ required: false, message: '多选' }]
                            })(<Switch style={{ marginLeft: '10px' }} checkedChildren="y" unCheckedChildren="n" />)}
                        </Form.Item>
                    </Row>

                    <Row>
                        <Col span={4}>
                            <Form.Item label="getterurl">
                                {getFieldDecorator('geturl', {
                                    initialValue: this.DataGridStore.currentObj.geturl,
                                    rules: [{ required: true, message: 'geturl' }]
                                })(
                                    <AutoComplete placeholder="geturl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>{' '}
                        </Col>
                        <Col span={4}>
                            <Form.Item label="addurl">
                                {getFieldDecorator('addurl', {
                                    initialValue: this.DataGridStore.currentObj.addurl,
                                    rules: [{ required: true, message: 'addurl' }]
                                })(
                                    <AutoComplete placeholder="addurl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="delurl">
                                {getFieldDecorator('delurl', {
                                    initialValue: this.DataGridStore.currentObj.delurl,
                                    rules: [{ required: true, message: 'delurl' }]
                                })(
                                    <AutoComplete placeholder="delurl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>{' '}
                        </Col>
                        <Col span={4}>
                            {' '}
                            <Form.Item label="updateurl">
                                {getFieldDecorator('updateurl', {
                                    initialValue: this.DataGridStore.currentObj.updateurl,
                                    rules: [{ required: true, message: 'updateurl' }]
                                })(
                                    <AutoComplete placeholder="updateurl">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            {' '}
                            <Form.Item label="layoutcfg">
                                {getFieldDecorator('layoutcfg', {
                                    initialValue: this.DataGridStore.currentObj.layoutcfg,
                                    rules: [{ required: true, message: 'layoutcfg' }]
                                })(
                                    <AutoComplete placeholder="layoutcfg">
                                        <Input />
                                    </AutoComplete>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" style={{ padding: '0px 10px ' }} htmlType="submit">
                            保存Grid
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ padding: '20px', marginBottom: '10px', border: '1px solid #343434' }}>
                    <Row>
                        <Col span={2}>QueryCfg</Col>

                        <Col span={6}>
                            <div>
                                {' '}
                                <Input.TextArea
                                    style={{ minWidth: '800px' }}
                                    disabled
                                    value={this.DataGridStore.currentObj.fixed_query_cfg}
                                />{' '}
                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col span={2}>
                            <Button type="default" btn_idx={this.props.idx} onClick={() => this.resetQueryCfg()}>
                                清空
                            </Button>
                        </Col>
                        <Col span={4}>
                            <Select
                                placeholder="请选择字段"
                                showSearch
                                value={this.state.query_cfg_field}
                                onChange={this.setFieldQuery}
                                style={{ width: '98%' }}>
                                {this.DataGridStore.ColsDbInfo.length &&
                                    this.DataGridStore.ColsDbInfo.map((item, index) => (
                                        <Option key={index} value={item.Field}>
                                            {item.Field}
                                        </Option>
                                    ))}
                            </Select>
                        </Col>
                        <Col span={1}>
                            <div> = </div>
                        </Col>

                        <Col span={6}>
                            <div style={{ marginBottom: '10px' }}>
                                {' '}
                                <Input onChange={(event) => this.setQueryValue(event)} />
                            </div>
                        </Col>

                        <Col span={6}>
                            <Button
                                style={{ marginLeft: '20px', marginBottom: '10px' }}
                                type="default"
                                onClick={() => this.saveOverrideQueryCfg()}>
                                保存
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        );
    }
}

export default GridEditor;
