import TableSchemaForm from '@/routes/NanxTable/NanxTableCom/TableForm';
import React from 'react';
import { message } from 'antd';
import api from '@/api/api';

export default class EditCom extends React.Component {
    constructor(props) {
        super(props);
        console.log('EditCom', this);
        // console.log('EditCom', this.props);
        this.init = this.init.bind(this);
    }

    init = async () => {
        console.log('init呼叫>>>>Button props 属性', this.props);
        await this.props.NanxTableStore.setTableAction('edit');
        if (this.props.NanxTableStore.selectedRows.length != 1) {
            message.error('必须请选择1条数据进行相应操作');
            this.props.NanxTableStore.hideButtonModal();
            return;
        }

        let _tmprec = this.props.NanxTableStore.selectedRows[0];

        if (_tmprec.hasOwnProperty('ghost_author') && _tmprec.ghost_author != sessionStorage.getItem('user')) {
            message.error('不是自己的数据不能编辑');
            return;
        }
        this.props.NanxTableStore.showButtonModal();
    };

    saveFormData = (fmdata) => {
        if (fmdata.customerid && fmdata.customerid != '') {
            fmdata.customerAddr = fmdata.customerid.split('-')[1];
            fmdata.customerid = fmdata.customerid.split('-')[0];
        }

        let data = {
            DataGridCode: this.props.NanxTableStore.datagrid_code,
            rawdata: fmdata
        };

        this.updateGridData(data);
    };

    updateGridData = async (fmdata) => {
        let id = this.props.NanxTableStore.selectedRowKeys[0];
        fmdata.rawdata.id = id;
        let params = { data: fmdata, method: 'POST' };
        params.updateurl = this.props.NanxTableStore.curd.updateurl;
        let json = await api.curd.updateData(params);
        if (json.code == 200) {
            this.props.afterEditRefresh();
        }
    };

    // <TableSchemaForm NanxTableStore={this.props.NanxTableStore} saveFormData={this.saveFormData.bind(this)} />

    componentDidMount() {
        console.log('EditCom😵😵😵😵😵😵> componentDidMount:', this.props);
    }

    render() {
        console.log('😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵😵');
        console.log(this.props.NanxTableStore);
        return (
            <TableSchemaForm NanxTableStore={this.props.NanxTableStore} saveFormData={this.saveFormData.bind(this)} />
        );
    }
}
