import CommonTableForm from '@/routes/NanxTable/NanxTableCom/commonTableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';

@inject('NanxTableStore') // 'myStore' 是你在Provider中提供的store名称
@observer
export default class TableAddCom extends React.Component {
    state = {
        visible: false
    };

    init = async () => {
        await this.props.NanxTableStore.setTableAction('add');
        await this.props.NanxTableStore.rowSelectChange([], []);
        await this.refs.commonModalRef.showModal();
    };

    hideModal() {
        this.refs.commonModalRef.onCancelHandle();
    }

    addVirtualData = (formData, changeValue) => {
        console.log('this.props.NanxTableStore.triggers', this.props.NanxTableStore.triggers);
        formData = this.getGhostData(formData);
        let dataSource = [
            { id: this.props.NanxTableStore.dataSource.length + 1, ...formData },
            ...this.props.NanxTableStore.dataSource
        ];
        this.props.NanxTableStore.setDataSource(dataSource);
        changeValue && changeValue(this.props.NanxTableStore.dataSource);
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

    saveFormData(fmdata, changeValue, as_virtual) {
        let data = {
            DataGridCode: this.props.NanxTableStore.datagrid_code,
            rawdata: fmdata
        };

        as_virtual == 'y' ? this.addVirtualData(fmdata, changeValue) : this.addRealApi(data);
    }

    render() {
        return (
            <CommonModal
                height="500px"
                footer={null}
                title="新增记录"
                ref="commonModalRef"
                layoutcfg={this.props.NanxTableStore.layoutcfg}>
                <CommonTableForm
                    as_virtual={this.props.as_virtual}
                    editable={true}
                    optionType="add"
                    onChange={this.props.onChange}
                    hideModal={() => this.hideModal()}
                    dataGridcode={this.props.dataGridCode}
                    NanxTableStore={this.props.NanxTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
