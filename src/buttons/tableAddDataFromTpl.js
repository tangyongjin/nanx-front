import TableSchemaForm from '@/routes/NanxTable/NanxTableCom/TableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { message } from 'antd';
import api from '@/api/api';
import IconWrapper from '@/utils/IconWrapper';

import { observer, inject } from 'mobx-react';

@inject('NanxTableStore')
@observer
export default class TableAddFromTplCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iconStr: null };
    }

    init = async (buttonSource) => {
        this.setState({ iconStr: buttonSource.icon });
        await this.props.NanxTableStore.setTableAction('add_from_tpl');

        if (this.props.NanxTableStore.selectedRows.length != 1) {
            message.error('请选择1条数据作为添加的模板.');
            return;
        }

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
            await this.props.refreshTable();
        }
    };

    render() {
        return (
            <CommonModal height="500px" title={<div>{IconWrapper(this.state.iconStr)} 添加(从模版)</div>}>
                <TableSchemaForm
                    onChange={this.props.onChange}
                    NanxTableStore={this.props.NanxTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
