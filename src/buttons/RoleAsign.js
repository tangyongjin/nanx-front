import CommonTableForm from '@/routes/NanxTable/NanxTableCom/commonTableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { message } from 'antd';
import api from '@/api/api';
import { GithubOutlined } from '@ant-design/icons';

import { observer, inject } from 'mobx-react';
@inject('NanxTableStore')
@observer
export default class RoleAsign extends React.Component {
    init = async () => {
        await this.props.NanxTableStore.setTableAction('edit');

        if (this.props.NanxTableStore.selectedRows.length != 1) {
            message.error('请选择1个用户.');
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
        return (
            <CommonModal
                height="500px"
                width="1150px"
                title={
                    <div>
                        <GithubOutlined />
                        分配角色
                    </div>
                }>
                <CommonTableForm
                    onChange={this.props.onChange}
                    NanxTableStore={this.props.NanxTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
