import React from 'react';
import { Modal, message } from 'antd';
import SearchFormContainer from './tableSearch/searchFormContainer';
import api from '@/api/api';

export default class FixedQueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.state = {
            open: false,
            fieldsList: []
        };
    }

    async init() {
        if (this.props.NanxTableStore.selectedRows.length != 1) {
            message.error('请选择1个DataGrid.');
            return;
        }
        await this.getFieldList();
        this.showModal();
    }

    onCancelHandle = () => {
        this.setState({
            open: false
        });
    };

    showModal() {
        this.setState({
            open: true
        });
    }

    saveFixedQueryConfigure = async () => {
        let _searchLines = await this.refs.fixedBuilderRef.returnQueryLines();
        let _tmprec = this.props.NanxTableStore.selectedRows[0];
        let dataGridCode = _tmprec.datagrid_code;
        let params = {
            data: {
                datagrid_code: dataGridCode,
                fixedQueryLiens: _searchLines
            },
            method: 'POST'
        };
        await api.dataGrid.saveFixedQueryConfigure(params);
        this.props.refreshTable();
    };

    getModalProps() {
        return {
            destroyOnClose: true,
            title: '固定QueryConfigure配置',
            styles: {
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            open: this.state.open,
            onOk: this.saveFixedQueryConfigure,
            onCancel: () => this.onCancelHandle()
        };
    }

    // 选中的 Datagrid 的列,不是 DataGridMNT 的 列
    getFieldList = async () => {
        let _tmprec = this.props.NanxTableStore.selectedRows[0];
        let dataGridCode = _tmprec.datagrid_code;

        let params = {
            data: {
                DataGridCode: dataGridCode,
                role: sessionStorage.getItem('role_code'),
                user: sessionStorage.getItem('user')
            },
            method: 'POST'
        };

        let res = await api.dataGrid.fetchDataGridCfg(params);
        console.log('res: ', res);

        let fds = res.data.tableColumnConfig.map(({ title, key }) => ({ label: title, value: key }));
        this.setState({ fieldsList: fds });
    };

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal width={800} {...modalProps}>
                <SearchFormContainer
                    ref="fixedBuilderRef"
                    hideModal={this.onCancelHandle}
                    fieldsList={this.state.fieldsList}
                    onOk={this.saveFixedQueryConfigure}
                />
            </Modal>
        );
    }
}
