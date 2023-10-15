import React from 'react';
import { Form, Input, Card, Radio, Select, Row, Col, Button, message } from 'antd';
import api from '../../../api/api';
import { observer, inject } from 'mobx-react';
const { Option } = Select;

@inject('dmStore')
@observer
class ReferService extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    addDatagridServiceCfg = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if (this.dmstore.DataGridCode === '') {
                    message.error('请选择Actcode', 0.5);
                } else {
                    let obj = {};
                    obj = Object.assign(
                        {
                            reftype: 'service',
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
                <Card title="[Service说明]:" style={{ width: 1000 }}>
                    <div>
                        在流程表单中,为了展示关系信息,有可能需要后台进行复杂的计算,
                        可以配置从主表中选择一个字段,在运行时,后台将根据记录的字段值,
                        作为参数,进行计算,进行展示.由于使用统一的控制器(bpm),则下面的 url只需填写model/function
                        <div stye={{ color: 'red' }}>必须包含/,请确认model及function存在</div>
                    </div>
                    <br />
                    <br />
                    <p>
                        Demox: <br />
                        <br />
                        Somemodel/somefunction($para,$processkey)
                        {
                            // 其中$para 为流程主表的某个字段值。
                            // 返回值必须是数组形式。
                        }
                    </p>
                </Card>
                <br />

                <Form {...formItemLayout} onSubmit={this.addDatagridServiceCfg}>
                    <Form.Item label="动作:">
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
                                <Form.Item label="model/function">
                                    {getFieldDecorator('serviceurl', {
                                        rules: [{ required: true, message: 'Please input sql' }]
                                    })(<Input placeholder="service" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item {...formTailLayout}>
                        <Button style={{ padding: '0px 10px ' }} type="primary" htmlType="submit">
                            添加Service类型的静态信息
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create()(ReferService);
