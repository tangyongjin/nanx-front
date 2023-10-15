import React from 'react';
import CommonTable from '@/routes/NanxTable/NanxTableCom/commonTable';
import { Form, Card, message } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';

@inject('dmStore')
@observer
class ButtonCfg extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
        this.tbref = React.createRef();
        this.actcode_watcher = reaction(
            () => {
                return this.dmstore.current_DataGridCode;
            },
            (currcode) => {
                this.refreshCurrentcfg(currcode);
            }
        );
    }

    componentDidMount() {
        if (this.dmstore.current_DataGridCode) {
            this.refreshCurrentcfg(this.dmstore.current_DataGridCode);
        }
        this.refreshCurrentcfg(this.dmstore.current_DataGridCode);
    }

    componentWillUnmount() {
        this.actcode_watcher(); //dispose actcode_watcher
    }

    async refreshCurrentcfg(current_DataGridCode) {
        if (this.tbref.current) {
            let query_cfg = {
                count: 1,
                lines: { and_or_0: 'and', field_0: 'datagrid_code', operator_0: '=', vset_0: current_DataGridCode }
            };
            await this.tbref.current.setTableCompomentQueryCfg(query_cfg);
            await this.tbref.current.listData();
        }
    }

    //添加按钮

    addActionButton = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if (this.dmstore.current_DataGridCode === '') {
                    message.error('请选择ActionCode', 0.5);
                } else {
                    let obj = {};
                    console.log(this.dmstore);

                    obj = Object.assign({ datagrid_code: this.dmstore.current_DataGridCode }, values);

                    let params = {
                        data: obj,
                        method: 'POST'
                    };

                    if (!this.dmstore.current_DataGridCode) {
                        message.error('请选择ActionCode', 0.5);
                        return;
                    }
                    console.log(params);
                    let ret = await api.activity.addActionButton(params);
                    message.info(ret.message);
                }
            } else {
                message.error('请检查输入项', 0.5);
            }
        });
    };

    render() {
        // let xtitle = "设置按钮:" + this.dmstore.current_DataGridCode + "/" + this.dmstore.current_actname
        let xtitle = '设置按钮:' + this.dmstore.current_DataGridCode + '/' + this.dmstore.current_actname;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12 }
        };

        return (
            <Card title={xtitle} style={{ width: '100%' }}>
                <CommonTable
                    ref={this.tbref}
                    datagrid_code="boss_portal_button_actcode"
                    is_association_process={false}
                    dataGridcode={this.dmstore.current_DataGridCode}
                />
            </Card>
        );
    }
}

export default Form.create()(ButtonCfg);
