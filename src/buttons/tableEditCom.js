import TableSchemaForm from '@/routes/NanxTable/NanxTableCom/TableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { message } from 'antd';
import api from '@/api/api';
import { EditOutlined } from '@ant-design/icons';

import { observer, inject } from 'mobx-react';
@inject('NanxTableStore')
@observer
export default class TableEditCom extends React.Component {
    init = async () => {
        await this.props.NanxTableStore.setTableAction('edit');
        if (this.props.NanxTableStore.selectedRows.length != 1) {
            message.error('请选择1条数据.');
            return;
        }

        let _tmprec = this.props.NanxTableStore.selectedRows[0];

        if (_tmprec.hasOwnProperty('ghost_author') && _tmprec.ghost_author != sessionStorage.getItem('user')) {
            message.error('不是自己的数据不能编辑');
            return;
        }
        await this.props.NanxTableStore.showButtonModal();
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

    render() {
        let _width = '650px';
        // form 宽度,因为 hasTableEditor 太窄不好看
        if (this.props.NanxTableStore.hasTableEditor()) {
            _width = '1150px';
        }
        return (
            <CommonModal
                height="500px"
                width={_width}
                title={
                    <div>
                        <EditOutlined />
                        编辑
                    </div>
                }>
                <TableSchemaForm
                    NanxTableStore={this.props.NanxTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
