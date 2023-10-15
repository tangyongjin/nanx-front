import React from 'react';
import CommonTable from '@/routes/commonAntTable/NanxTableCom/commonTable';
import { Form, Divider, Card } from 'antd';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import ReferGrid from './referGrid';

@inject('dmStore')
@observer
class Gridreferino extends React.Component {
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

    state = {
        updateDirection: 'this',
        confirmDirty: false,
        autoCompleteResult: []
    };

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

    render() {
        let xtitle = '设置ReferinfoArea:' + this.dmstore.current_actname;
        return (
            <Card title={xtitle} style={{ width: '100%' }}>
                <CommonTable
                    ref={this.tbref}
                    datagrid_code="boss_act_referenceinfo_cfg"
                    is_association_process={false}
                    dataGridcode={this.dmstore.current_DataGridCode}
                />

                <Divider style={{ color: 'red' }} orientation="center">
                    |基于Actcode-Service的静态信息|
                </Divider>
                <ReferGrid tbref={this.tbref} />
            </Card>
        );
    }
}

export default Form.create()(Gridreferino);
