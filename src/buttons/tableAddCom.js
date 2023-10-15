import CommonTableForm from '@/routes/NanxTable/NanxTableCom/commonTableForm';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import React from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import api from '@/api/api';

@observer
export default class TableAddCom extends React.Component {
    state = {
        visible: false
    };

    init(btncode) {
        console.log('button_code', this.props.parentTable.state.button_code);
        // console.log(btncode)

        this.props.commonTableStore.rowSelectChange([], []);
        this.refs.commonModalRef.showModal();
        this.props.commonTableStore.setTableAction('add_table');
    }
    hideModal() {
        this.refs.commonModalRef.onCancelHandle();
    }

    addVirtualData = (formData, changeValue) => {
        console.log('this.props.commonTableStore.triggers', this.props.commonTableStore.triggers);
        formData = this.getGhostData(formData);
        let dataSource = [
            { id: this.props.commonTableStore.dataSource.length + 1, ...formData },
            ...this.props.commonTableStore.dataSource
        ];
        this.props.commonTableStore.setDataSource(dataSource);
        changeValue && changeValue(this.props.commonTableStore.dataSource);
    };

    getGhostData = (formData) => {
        this.props.commonTableStore.triggers.map((item) => {
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
        params.addurl = this.props.commonTableStore.curd.addurl;
        let json = await api.curd.addData(params);
        if (json.code == 200) {
            await this.props.refreshTable();
        }
    };

    saveFormData(fmdata, uuid, changeValue, as_virtual, optionType) {
        if (uuid != '') {
            fmdata.uuid = uuid;
        }
        if (fmdata.customerid && fmdata.customerid != '') {
            fmdata.customerAddr = fmdata.customerid.split('-')[2];
            fmdata.customerid = fmdata.customerid.split('-')[0];
        }

        let data = {
            DataGridCode: this.props.commonTableStore.datagrid_code,
            rawdata: fmdata
        };

        as_virtual == 'y' ? this.addVirtualData(fmdata, changeValue) : this.addRealApi(data);
    }

    render() {
        let tips = this.props.commonTableStore.tips;

        return (
            <CommonModal
                height="500px"
                footer={null}
                title="新增记录"
                ref="commonModalRef"
                layoutcfg={this.props.commonTableStore.layoutcfg}>
                {tips ? (
                    <Card title="帮助信息" style={{ marginBottom: '12px' }}>
                        <p dangerouslySetInnerHTML={{ __html: tips }}></p>
                    </Card>
                ) : (
                    ''
                )}

                <CommonTableForm
                    as_virtual={this.props.as_virtual}
                    editable={true}
                    optionType="add"
                    onChange={this.props.onChange}
                    hideModal={() => this.hideModal()}
                    formCfg={this.props.commonTableStore.formCfg}
                    referinfo={this.props.commonTableStore.referinfo}
                    dataGridcode={this.props.dataGridcode}
                    layoutcfg={this.props.commonTableStore.layoutcfg}
                    staticformcfg={this.props.commonTableStore.staticformcfg}
                    selectedRows={this.props.commonTableStore.selectedRows}
                    commonTableStore={this.props.commonTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
