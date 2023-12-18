import TableSchemaForm from '@/routes/NanxTable/NanxTableCom/TableForm';
import React from 'react';
import api from '@/api/api';

export default class TableAddCom extends React.Component {
    constructor(props) {
        super(props);
        console.log('TableAddCom', this);
        this.init = this.init.bind(this);
    }

    init = async () => {
        await this.props.NanxTableStore.setTableAction('add');
        await this.props.NanxTableStore.clearSelectedRows();
        await this.props.NanxTableStore.rowSelectChange([], []);
        await this.props.NanxTableStore.showButtonModal();
    };

    saveFormData(fmdata) {
        let data = {
            DataGridCode: this.props.NanxTableStore.datagrid_code,
            rawdata: fmdata
        };
        this.addGridData(data);
    }

    addGridData = async (data) => {
        let params = { data: data, method: 'POST' };
        params.addurl = this.props.NanxTableStore.curd.addurl;
        let json = await api.curd.addData(params);
        if (json.code == 200) {
            await this.props.NanxTableStore.listData('add');
        }
    };

    render() {
        return (
            <TableSchemaForm NanxTableStore={this.props.NanxTableStore} saveFormData={this.saveFormData.bind(this)} />
        );
    }
}
