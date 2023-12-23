import React from 'react';
import { message } from 'antd';
import SearchFormContainer from './TableSearch/searchFormContainer';

import api from '@/api/api';

export default class FixedQueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsList: []
        };
    }

    //eslint-disable-next-line
    async init(buttonSource) {
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        await this.props.NanxTableStore.showButtonModal();
        await this.getFieldList();
    }

    targetDataGrid() {
        if (this.props.NanxTableStore.selectedRows.length > 0) {
            let _tmprec = this.props.NanxTableStore.selectedRows[0];
            return _tmprec.datagrid_code;
        }
        return null;
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
            }
        };

        let res = await api.dataGrid.fetchDataGridCfg(params);

        let fds = res.data.tableColumnConfig.map(({ title, key }) => ({ label: title, value: key }));
        this.setState({ fieldsList: fds });
    };

    render() {
        return (
            <SearchFormContainer
                HostedTableStore={this.props.NanxTableStore}
                targetDataGrid={this.targetDataGrid()}
                fieldsList={this.state.fieldsList}
                afterEditRefresh={this.props.afterEditRefresh}
            />
        );
    }
}
