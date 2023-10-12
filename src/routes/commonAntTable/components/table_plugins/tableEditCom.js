import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react';
import { message } from 'antd';
import CommonModal from '../commonTableCom/commonModal';
import navigationStore from '@/store/navigationStore';

import api from '@/api/api';

export default class TableEditCom extends React.Component {
    state = {
        visible: false
    };

    init = async () => {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择1条数据.');
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0];

        let canstart = false;
        if (_tmprec.hasOwnProperty('flowstatus')) {
            if (_tmprec.flowstatus == null || _tmprec.flowstatus.trim() == '') {
                canstart = true;
            }

            if (_tmprec.flowstatus == '未提交' || _tmprec.flowstatus == '撤回' || _tmprec.flowstatus == '已退回') {
                canstart = true;
            } else {
                let fmdata = {};
                fmdata.uuid = this.props.commonTableStore.selectedRows[0].uuid;
                fmdata.processkey =
                    navigationStore.currentMenu.process_key ||
                    this.props.commonTableStore.selectedRows[0].processDefinitionKey;
                let params = { data: fmdata, method: 'POST' };
                let json = await api.bpm.checkCanEdit(params);
                if (json.code == 200) {
                    json.data == 'y' ? (canstart = true) : (canstart = false);
                }
            }
        } else {
            canstart = true;
        }

        if (_tmprec.hasOwnProperty('ghost_author') && _tmprec.ghost_author != sessionStorage.getItem('user')) {
            message.error('不是自己的数据不能编辑');
            return;
        }

        if (!canstart) {
            message.error('流程已经启动,不能编辑.');
            return;
        }

        this.refs.commonModalRef.showModal();
        this.props.commonTableStore.setTableAction('edit_table');
    };

    hideModal() {
        this.refs.commonModalRef.onCancelHandle();
    }

    saveFormData = (fmdata, changeValue, as_virtual, optionType) => {
        if (fmdata.customerid && fmdata.customerid != '') {
            fmdata.customerAddr = fmdata.customerid.split('-')[1];
            fmdata.customerid = fmdata.customerid.split('-')[0];
        }

        let data = {
            DataGridCode: this.props.commonTableStore.datagrid_code,
            rawdata: fmdata
        };
        if (this.props.as_virtual == 'y') {
            this.updateVirtualData(fmdata);
            return;
        }
        this.updateDateApi(data);
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

    updateVirtualData = (fmdata) => {
        let id = this.props.commonTableStore.selectedRowKeys[0];
        let index = this.props.commonTableStore.dataSource.findIndex((item) => item.id == id);
        fmdata.id = id;
        fmdata = this.getGhostData(fmdata);
        let dataSource = [...this.props.commonTableStore.dataSource];
        dataSource[index] = { ...fmdata };
        this.props.commonTableStore.setDataSource(dataSource);
    };

    updateDateApi = async (fmdata) => {
        let id = this.props.commonTableStore.selectedRowKeys[0];
        fmdata.rawdata.id = id;
        let params = { data: fmdata, method: 'POST' };
        params.updateurl = this.props.commonTableStore.curd.updateurl;
        let json = await api.curd.updateData(params);
        if (json.code == 200) {
            this.props.refreshTable();
        }
    };

    render() {
        return (
            <CommonModal
                height="500px"
                footer={null}
                title="编辑"
                ref="commonModalRef"
                layoutcfg={this.props.commonTableStore.layoutcfg}>
                <CommonTableForm
                    as_virtual={this.props.as_virtual}
                    editable={true}
                    optionType="edit"
                    hideModal={() => this.hideModal()}
                    onChange={this.props.onChange}
                    referinfo={this.props.commonTableStore.referinfo}
                    formCfg={this.props.commonTableStore.formCfg}
                    layoutcfg={this.props.commonTableStore.layoutcfg}
                    staticformcfg={this.props.commonTableStore.staticformcfg}
                    commonTableStore={this.props.commonTableStore}
                    saveFormData={this.saveFormData.bind(this)}
                />
            </CommonModal>
        );
    }
}
