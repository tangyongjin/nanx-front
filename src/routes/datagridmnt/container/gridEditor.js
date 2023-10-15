import React from 'react';
import { Form, Row, Col, Input, Card, Select, Button, message, AutoComplete } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';
import Editor from '@/components/UformExtends/wangeditor';
const { Option } = Select;

@inject('dmStore')
@observer
class GridEditor extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    state = {
        query_cfg_field: '',
        query_cfg_value: '',
        activity_tips: ''
    };

    componentDidUpdate() {}

    setQueryValue = () => {
        console.log(this.state);
        let value = event.target.value;
        this.setState({ query_cfg_value: value });
    };

    setTipsValue = (content) => {
        console.log(content);
        this.setState({ activity_tips: content });
    };

    saveOverrideTips = () => {
        if (this.dmstore.current_DataGridCode === '') {
            message.error('请选择一个DataGrid');
            return;
        }

        if (this.state.activity_tips === '') {
            message.error('请设置Tips');
            return;
        }
        let params = {
            method: 'POST',
            data: { DataGridCode: this.dmstore.current_DataGridCode, tips: this.state.activity_tips }
        };
        console.log(params);
        api.activity.saveTips(params);
    };

    setFieldQuery = (a, b, c) => {
        this.setState({ query_cfg_field: a });
    };

    resetQueryCfg = async () => {
        if (this.dmstore.current_DataGridCode === '') {
            message.error('请选择一个DataGrid');
            return;
        }
    };

    //针对某个activiticode的第一级别 querycfg, 如果存在,则会覆盖 commonTable的query_cfg

    saveOverrideQueryCfg = () => {
        if (this.dmstore.current_DataGridCode === '') {
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
            method: 'POST',
            data: {
                DataGridCode: this.dmstore.current_DataGridCode,
                query_cfg_field: this.state.query_cfg_field,
                query_cfg_value: this.state.query_cfg_value
            }
        };
        console.log(params);
        api.activity.saveOverrideQueryCfg(params);
    };

    ModifyActionCode = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.portaluse = 'y';
                values.multiple = values.multiple === true ? '' : 'n';
                let params = {
                    data: values,
                    method: 'POST'
                };
                console.log(values);

                let ret = await api.activity.modifyActionCode(params);
                if (ret.code == 200) {
                    message.info(ret.message, 1.5);
                    this.dmstore.initAll();
                }
            } else {
                message.error('请检查输入项', 0.5);
            }
        });
    };

    render() {
        let xtitle = '编辑:' + this.dmstore.current_DataGridCode;

        let biztables = this.dmstore.biztableList;
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={xtitle} style={{ width: '100%' }}>
                <Form onSubmit={this.ModifyActionCode}>
                    <Row>
                        <Col span={4}>
                            <Form.Item label="标题">
                                {getFieldDecorator('datagrid_title', {
                                    initialValue: this.dmstore.currentObj.datagrid_title,

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
                                    initialValue: this.dmstore.currentObj.base_table,
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
                                    disabled: true,
                                    initialValue: this.dmstore.currentObj.datagrid_code,
                                    rules: [{ required: true }]
                                })(<Input disabled />)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="宽度">
                                {getFieldDecorator('win_size_width', {
                                    initialValue: this.dmstore.currentObj.win_size_width,

                                    rules: [{ required: true, message: '宽度' }]
                                })(
                                    <AutoComplete placeholder="win_size_width">
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
                                    initialValue: this.dmstore.currentObj.geturl,
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
                                    initialValue: this.dmstore.currentObj.addurl,
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
                                    initialValue: this.dmstore.currentObj.delurl,
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
                                    initialValue: this.dmstore.currentObj.updateurl,
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
                                    initialValue: this.dmstore.currentObj.layoutcfg,
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
                                    value={this.dmstore.currentObj.fixed_query_cfg}
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
                                {this.dmstore.maintableColumns.length &&
                                    this.dmstore.maintableColumns.map((item, index) => (
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

                <div style={{ padding: '20px', marginBottom: '10px', border: '1px solid #343434' }}>
                    <Row>
                        <Col span={2}>Tips</Col>

                        <Col span={6}>
                            <Editor
                                style={{ minWidth: '800px' }}
                                onChange={(event) => this.setTipsValue(event)}
                                default={this.dmstore.currentObj.tips}
                            />
                        </Col>
                    </Row>
                    <Button
                        style={{ marginLeft: '130px', marginTop: '20px' }}
                        type="default"
                        onClick={() => this.saveOverrideTips()}>
                        保存
                    </Button>

                    <br />
                </div>

                <div style={{ padding: '20px', marginBottom: '10px', border: '1px solid #343434' }}>
                    <br />
                    <Row>
                        <Col span={6}>
                            <div style={{ width: '800px', color: 'red' }}>
                                是否根据作者字段筛选(缺省只要含有author字段,则会根据作者字段筛选,如果设置为n,则强制不筛选,使用
                                场景为: 工作量填写记录,后期的节点可以查看前期填写的记录,请到nanx_activity直接修改. ):{' '}
                                <Input.TextArea
                                    style={{ minWidth: '800px' }}
                                    value={this.dmstore.currentObj.checkauthor}
                                />{' '}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        );
    }
}

export default Form.create()(GridEditor);
