import React from 'react';
import { Form, Input, Card, Button, message } from 'antd';
import api from '../../../api/api';
import { observer, inject } from 'mobx-react';

@inject('dmStore')
@observer
class ReferGrid extends React.Component {
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
                            reftype: 'grid-service',
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
                <Card title="Service说明" style={{ width: 1000 }}>
                    <div>
                        在编辑或增加数据时候,有时候需要参考其他表格数据,可以配置一个actioncode,
                        进行查询,得到1条记录,然后通过service进行查询. url只需填写model/function
                        <div stye={{ color: 'red' }}>必须包含/,请确认model及function存在</div>
                    </div>
                    <br />
                    <br />
                    <p>
                        Demo: <br />
                        <br />
                        Somemodel/somefunction
                    </p>
                </Card>
                <br />

                <Form {...formItemLayout} onSubmit={this.addDatagridServiceCfg}>
                    <Form.Item {...formItemLayout} label="Table上的按钮编码">
                        {getFieldDecorator('table_button_code', {
                            rules: [{ required: true, message: 'Please input Table上的按钮编码' }]
                        })(<Input placeholder="Table上的按钮编码" />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="标题">
                        {getFieldDecorator('infotitle', {
                            rules: [{ required: true, message: 'Please input 输入标题' }]
                        })(<Input placeholder="输入标题" />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="参考的Actcode">
                        {getFieldDecorator('refer_actcode', {
                            rules: [{ required: true, message: '输入要参考的actcode' }]
                        })(<Input placeholder="输入要参考的actcode" />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="按钮文本">
                        {getFieldDecorator('btntext', {
                            rules: [{ required: true, message: '按钮文本' }]
                        })(<Input placeholder="按钮文本" />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="ServiceUrl">
                        {getFieldDecorator('serviceurl', {
                            rules: [{ required: true, message: 'serviceurl' }]
                        })(<Input placeholder="serviceurl" />)}
                    </Form.Item>

                    <Form.Item {...formTailLayout}>
                        <Button style={{ padding: '0px 10px ' }} type="primary" htmlType="submit">
                            添加基于Actcode查询-service的静态信息
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create()(ReferGrid);
