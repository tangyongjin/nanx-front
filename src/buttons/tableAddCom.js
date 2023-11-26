import TableSchemaForm from '@/routes/NanxTable/NanxTableCom/TableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
import IconRender from '@/routes/NanxTable/NanxTableCom/cellRenders/IconRender';

@inject('NanxTableStore') //
@observer
export default class TableAddCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iconStr: null };
    }

    init = async (buttonSource) => {
        this.setState({ iconStr: buttonSource.icon });
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
            await this.props.refreshTable();
        }
    };

    render() {
        let _width = '650px';
        if (this.props.NanxTableStore.hasTableEditor()) {
            _width = '1150px';
        }
        return (
            <CommonModal
                height="500px"
                width={_width}
                title={
                    <div>
                        {IconRender(this.state.iconStr)}
                        添加数据
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
