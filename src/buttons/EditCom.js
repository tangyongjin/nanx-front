import TableSchemaForm from '@/routes/NanxTable/NanxTableCom/TableForm';
import React from 'react';
import { message } from 'antd';
import api from '@/api/api';

export default class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async componentWillMount() {
        await this.props.NanxTableStore.setTableAction('edit');
        await this.init();
    }

    init = async () => {
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
    };

    saveFormData = (fmdata) => {
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
            await this.props.NanxTableStore.listData('edit');
        }
    };

    render() {
        return (
            <TableSchemaForm NanxTableStore={this.props.NanxTableStore} saveFormData={this.saveFormData.bind(this)} />
        );
    }
}
