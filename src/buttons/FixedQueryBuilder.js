import React from 'react';
import { Modal, message } from 'antd';
import SearchFormContainer from './searchTableComponents/searchFormContainer';
import api from '@/api/api';

export default class FixedQueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.state = {
            visible: false,
            fieldsList: []
        };
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择1个DataGrid.');
            return;
        }
        await this.getFieldList();

        this.showModal();
    }

    onCancelHandle = () => {
        this.setState({
            visible: false
        });
    };

    showModal() {
        this.setState({
            visible: true
        });
    }

    saveFixedQueryConfigure = async () => {
        let _searchLines = await this.refs.fixedBuilderRef.returnQueryLines();
        console.log('_searchLines: ', JSON.stringify(_searchLines));
    };

    getModalProps() {
        return {
            destroyOnClose: true,
            title: '固定QueryConfigure配置',
            bodyStyle: {
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onOk: this.saveFixedQueryConfigure,
            onCancel: () => this.onCancelHandle()
        };
    }

    // 选中的 Datagrid 的列,不是 DataGridMNT 的 列
    getFieldList = async () => {
        let _tmprec = this.props.commonTableStore.selectedRows[0];
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
