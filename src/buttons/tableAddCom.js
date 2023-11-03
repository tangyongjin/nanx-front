import CommonTableForm from '@/routes/NanxTable/NanxTableCom/commonTableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
import { FileAddOutlined } from '@ant-design/icons';

@inject('NanxTableStore') //
@observer
export default class TableAddCom extends React.Component {
    init = async () => {
        await this.props.NanxTableStore.setTableAction('add');
        await this.props.NanxTableStore.rowSelectChange([], []);
        await this.props.NanxTableStore.showButtonModal();
    };

    getGhostData = (formData) => {
        this.props.NanxTableStore.triggers.foreach((item) => {
            formData['ghost_' + item.props.ass_select_field_id] = formData[item.props.ass_select_field_id];
            let option_obj = item.state.optionList.find(
                (optionItem) => optionItem.value == formData[item.props.ass_select_field_id]
            );
            formData[item.props.ass_select_field_id] = option_obj.label;
        });
        return formData;
    };

    addRealApi = async (data) => {
        let params = { data: data, method: 'POST' };
        params.addurl = this.props.NanxTableStore.curd.addurl;
        let json = await api.curd.addData(params);
        if (json.code == 200) {
            await this.props.refreshTable();
        }
    };

    saveFormData(fmdata) {
        let data = {
            DataGridCode: this.props.NanxTableStore.datagrid_code,
            rawdata: fmdata
        };
        this.addRealApi(data);
    }

    render() {
        return (
            <CommonModal
                height="500px"
                footer={null}
                title={
                    <div>
                        <FileAddOutlined />
                        添加数据
                    </div>
                }
                layoutcfg={this.props.NanxTableStore.layoutcfg}>
                <CommonTableForm
                    as_virtual={this.props.as_virtual}
                    editable={true}
                    optionType="add"
                    onChange={this.props.onChange}
                    NanxTableStore={this.props.NanxTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
