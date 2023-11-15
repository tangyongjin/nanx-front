import React from 'react';
import { Table } from 'antd';
import SearchFormContainer from '@/buttons/tableSearch/searchFormContainer';
import { observer, inject } from 'mobx-react';

@inject('TableAsEditorStore')
@observer
export default class TableEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log('TableEditor>>>>>>>>>>props: ', props);
        this.tbStore = props.TableAsEditorStore;
    }

    async componentDidMount() {
        await this.tbStore.setDataGridCode(this.props.uform_para);
        await this.refreshTable();
    }

    refreshTable = async () => {
        await this.tbStore.resetTableStore();
        await this.tbStore.fetchDataGridCfg();
        await this.tbStore.listData('from refreshTable');
    };

    rowSelection() {
        return {
            type: 'radio',
            selectedRowKeys: this.tbStore.selectedRowKeys,
            onChange: async (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
                this.tbStore.rowSelectChange(selectedRowKeys, selectedRows);
            }
        };
    }

    pagination() {
        return {
            total: this.tbStore.total,
            defaultCurrent: 1,
            current: this.tbStore.currentPage,
            pageSize: this.tbStore.pageSize,
            showQuickJumper: true,
            showTotal: () => {
                let pageNum = Math.ceil(this.tbStore.total / this.tbStore.pageSize);
                return `共${pageNum}页/${this.tbStore.total}条数据`;
            },
            showSizeChanger: true
        };
    }

    onRowHandler = (record) => {
        return {
            onClick: async () => {
                console.log(record.role_code);
                console.log(this.props);
                this.props.onChange(record.role_code);
                this.tbStore.rowSelectChange([record.id], [record]);
            }
        };
    };

    render() {
        return (
            <div className="editor_table_wrapper">
                <SearchFormContainer HostedTableStore={this.tbStore} />
                <Table
                    size="small"
                    bordered={true}
                    rowKey={(record) => record.id}
                    columns={this.tbStore.tableColumns}
                    key={this.props.datagrid_code}
                    dataSource={this.tbStore.dataSource}
                    onChange={this.tbStore.TableOnChange}
                    pagination={this.pagination()}
                    rowSelection={this.rowSelection()}
                    onRow={this.onRowHandler}
                />
            </div>
        );
    }
}
