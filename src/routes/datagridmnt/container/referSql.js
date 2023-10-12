import React from 'react';
import { Form, Input, Card, Select, Radio, Row, Col, Button, message } from 'antd';
import api from '../../../api/api';
import { observer, inject } from 'mobx-react';
const { TextArea } = Input;

const { Option } = Select;

@inject('dmStore')
@observer
class ReferSql extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    addSqlRefCfg = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if (this.dmstore.current_DataGridCode === '') {
                    message.error('请选择Actcode', 0.5);
                } else {
                    let obj = {};

                    obj = Object.assign(
                        {
                            reftype: 'sql',
                            maintable: this.dmstore.maintable,
                            act_name: this.dmstore.current_actname,
                            datagrid_code: this.dmstore.current_DataGridCode
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
                                vset_0: this.dmstore.current_DataGridCode
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

    render() {
        let maintableColumns = this.dmstore.maintableColumns;
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
            <div>
                <Card title="SQL说明" style={{ width: 1000 }}>
                    <div>
                        在流程表单中,为了展示关系信息,有可能需要复杂的SQL进行展示,
                        可以配置从主表中选择一个字段,在运行时,后台将根据记录的字段值, 查询关联数据,进行展示.
                        <div stye={{ color: 'red' }}>必须包含 ARGS_FROM_MAIN_TABLE.FIELD_VALUE</div>
                    </div>
                    <br />
                    <br />
                    <p>
                        Demo: <br />
                        <br />
                        select bill_money as `金额` , invoice_no as `账单` from boss_contract_bill where
                        boss_contract_bill.contract_no = 'ARGS_FROM_MAIN_TABLE.FIELD_VALUE'
                    </p>
                </Card>
                <br />

                <Form {...formItemLayout} onSubmit={this.addSqlRefCfg}>
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

                    <Form.Item {...formItemLayout} label={'主表'}>
                        <Row gutter={24} style={{ width: 620 }}>
                            <Col span={24}>
                                <Form.Item label="参数字段">
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

                            <Col span={24}>
                                <Form.Item label="sql语句">
                                    {getFieldDecorator('sql', {
                                        rules: [{ required: true, message: 'Please input sql' }]
                                    })(<TextArea rows={4} placeholder="sql" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item {...formTailLayout}>
                        <Button style={{ padding: '0px 10px ' }} type="primary" htmlType="submit">
                            添加sql类型的静态信息
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(ReferSql);
