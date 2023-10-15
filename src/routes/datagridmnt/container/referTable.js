import React from 'react';
import { Form, Input, Select, Row, Col, Radio, Button, message } from 'antd';
import api from '../../../api/api';
import { observer, inject } from 'mobx-react';

const { Option } = Select;

@inject('dmStore')
@observer
class ReferTable extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    state = {
        autoCompleteResult: []
    };

    addTableReferinfo = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if (this.dmstore.DataGridCode === '') {
                    message.error('请选择Actcode', 0.5);
                } else {
                    let obj = {};
                    obj = Object.assign(
                        {
                            reftype: 'tableref',
                            maintable: this.dmstore.maintable,
                            act_name: this.dmstore.current_actname,
                            datagrid_code: this.dmstore.DataGridCode
                        },
                        values
                    );
                    let params = {
                        data: obj,
                        method: 'POST'
                    };
                    await api.activity.addGridReferCfg(params);
                    if (this.props.tbref.current) {
                        let query_cfg = {
                            count: 1,
                            lines: {
                                and_or_0: 'and',
                                field_0: 'datagrid_code',
                                operator_0: '=',
                                vset_0: this.dmstore.DataGridCode
                            }
                        };
                        this.props.tbref.current.setTableCompomentQueryCfg(query_cfg);
                        console.log(this.props.tbref.current.refreshTable());
                    }
                }
            } else {
                message.error('请检查输入项', 0.5);
            }
        });
    };

    onSelectReferTable = (v, f) => {
        this.dmstore.setRelatedtable(v);
        this.props.form.setFieldsValue({
            column_to_update: ''
        });
    };

    handleTitleChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        let biztables = this.dmstore.biztableList;
        let maintableColumns = this.dmstore.maintableColumns;
        let relatedtableColumns = this.dmstore.relatedtableColumns;
        let xtitle = '设置ReferinfoArea:' + this.dmstore.current_processname;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 }
        };

        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.addTableReferinfo}>
                <Form.Item label="动作">
                    {getFieldDecorator('onaction', {
                        rules: [{ required: true, message: '选择类型' }]
                    })(
                        <Radio.Group>
                            <Radio value="edit">编辑时候</Radio>
                            <Radio value="add">添加时候</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="标题">
                    {getFieldDecorator('infotitle', {
                        rules: [{ required: true, message: 'Please input 输入标题' }]
                    })(<Input placeholder="输入标题" />)}
                </Form.Item>
                <Form.Item label="选择参考表">
                    {getFieldDecorator('refertable', {
                        rules: [{ required: true, message: '请选择表格' }]
                    })(
                        <Select
                            showSearch
                            style={{ width: 300 }}
                            placeholder="选择参考表"
                            name="refertable"
                            optionFilterProp="children"
                            onChange={(v) => this.onSelectReferTable(v, 'refertable')}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {biztables.length &&
                                biztables.map((item, index) => (
                                    <Option key={index} value={item.value}>
                                        {item.text}
                                    </Option>
                                ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label={'Where主表'}>
                    <Row gutter={24} style={{ width: 620 }}>
                        <Col span={12}>
                            <Form.Item label="字段">
                                {getFieldDecorator('maincolumn', {
                                    rules: [{ required: false, message: '请选择字段' }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="请选择字段"
                                        allowClear={true}
                                        name="biztable"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {maintableColumns.length &&
                                            maintableColumns.map((item, index) => (
                                                <Option key={index} value={item.Field}>
                                                    {item.Field}
                                                </Option>
                                            ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label=" =参考表字段">
                                {getFieldDecorator('column_to_filter', {
                                    rules: [{ required: false, message: '请选择字段' }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 300 }}
                                        placeholder="请选择字段"
                                        allowClear={true}
                                        name="biztable"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {relatedtableColumns.length &&
                                            relatedtableColumns.map((item, index) => (
                                                <Option key={index} value={item.Field}>
                                                    {item.Field}
                                                </Option>
                                            ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item label="要显示的参考表字段">
                    {getFieldDecorator('colsused', {
                        rules: [{ required: true, message: '请选择字段' }]
                    })(
                        <Select
                            showSearch
                            mode="multiple"
                            style={{ width: 300 }}
                            placeholder="请选择字段"
                            allowClear={true}
                            name="colsused"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {relatedtableColumns.length &&
                                relatedtableColumns.map((item, index) => (
                                    <Option key={index} value={item.Field}>
                                        {item.Field}
                                    </Option>
                                ))}
                        </Select>
                    )}
                </Form.Item>

                <Form.Item {...formTailLayout}>
                    <Button style={{ padding: '0px 10px ' }} type="primary" htmlType="submit">
                        添加Table类型的静态信息
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Form.create()(ReferTable);
