import React from 'react';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { Button, message } from 'antd';
import CommonTable from '@/routes/NanxTable/NanxTableCom/commonTable';
import GridRefer from './gridRefer';
import { SchemaForm } from '@uform/antd';

@observer
export default class ReferpluginCom extends React.Component {
    constructor(props) {
        super(props);
        this.serachtableref = React.createRef();
        console.log(props);
    }

    state = {
        visible: true,
        DataGridCode: null,
        bigtitle: '',
        column: '',
        querycfg: '',
        service: '',
        btntext: '',
        combinedRef: []
    };

    getGridReferenceInfo() {
        console.log(this.state.combinedRef);
        if (this.state.combinedRef.length > 0) {
            return (
                <div header="参考信息" key="1">
                    {this.state.combinedRef.map((one, index) => (
                        <GridRefer xinfo={one} key={index} />
                    ))}
                </div>
            );
        }
    }

    hideModal() {}

    referHandler = async () => {
        this.setState({ visible: true });
        if (this.serachtableref.current) {
            console.log(this.serachtableref.current.commonTableStore.selectedRows);
            if (this.serachtableref.current.commonTableStore.selectedRows.length >= 1) {
                let _srow = this.serachtableref.current.commonTableStore.selectedRows[0];
                console.log(_srow);
                this.props.reportUUID(_srow.uuid);
                this.props.reportOrginPaperno(_srow.paperno);

                let params = {
                    data: {
                        referitemid: this.props.referitemid,
                        srow: _srow,
                        infotitle: this.props.infotitle,
                        reftype: this.props.reftype,
                        serviceurl: this.props.serviceurl
                    },
                    method: 'POST'
                };
                //console.log(params)
                let resp = await api.dataGrid.actionBasedRowPuller(params);
                console.log(resp);
                this.props.uploadfunction(resp);

                if (resp.combinedRef.length > 0) {
                    this.setState({ combinedRef: resp.combinedRef });
                } else {
                    message.message('未找到相关信息', 1);
                }
            }
        }
    };

    callService() {
        this.setState({ visible: true });
    }

    render() {
        let layoutcfg = this.props.layoutcfg;

        return (
            <div className={layoutcfg == 2 ? 'addmodal' : ''}>
                <div style={{ display: this.state.visible ? 'block' : 'none' }}>
                    <CommonTable ref={this.serachtableref} datagrid_code={this.props.refer_actcode} />
                </div>

                <SchemaForm>
                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="button" onClick={this.referHandler} className="marginRihgt10">
                            {this.state.visible ? '查看详情' : this.props.btntext}
                        </Button>
                    </div>
                </SchemaForm>

                <div>{this.getGridReferenceInfo()}</div>
            </div>
        );
    }
}
