import React from 'react';
import { Table } from 'antd';
import { observer, inject } from 'mobx-react';
import renderButtons from './renderButtons';

@inject('NanxTableStore')
@observer
export default class NanxTable extends React.Component {
    constructor(props) {
        super(props);
        this.tbStore = props.NanxTableStore;
    }

    async componentDidMount() {
        await this.tbStore.setDataGridCode(this.props.datagrid_code);
        await this.refreshTable();
    }

    refreshTable = async () => {
        await this.tbStore.resetTableStore();
        await this.tbStore.fetchDataGridCfg();
        await this.tbStore.listData('from refreshTable');
    };

    afterEditRefresh = async () => {
        await this.tbStore.listData('edit');
    };

    afterDelteRefresh = async () => {
        await this.tbStore.listData('delete');
    };

    RenderBthHolder() {
        let LazyModalContainer = this.tbStore.ButtonUsedCom;
        if (this.tbStore.ButtonUsedCom) {
            return (
                <LazyModalContainer
                    ref={async (item) => {
                        await this.tbStore.setLazyButtonUsedCom(item);
                    }}
                    NanxTableStore={this.tbStore}
                    refreshTable={this.refreshTable}
                    afterEditRefresh={this.afterEditRefresh}
                    afterDelteRefresh={this.afterEditRefresh}
                />
            );
        }
    }

    getTableProps() {
        return {
            // 点击行选中,不必须点击 radiobutton

            onRow: (record) => {
                return {
                    onClick: async () => this.tbStore.rowSelectChange([record.id], [record])
                };
            },

            rowKey: (record) => record.id,
            bordered: true,
            rowSelection: {
                type: 'radio',
                selectedRowKeys: this.tbStore.selectedRowKeys,
                onChange: async (selectedRowKeys, selectedRows) =>
                    this.tbStore.rowSelectChange(selectedRowKeys, selectedRows)
            },

            pagination: {
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
            }
        };
    }

    render() {
        let tableProps = this.getTableProps();

        return (
            <div className="table_wrapper">
                {this.RenderBthHolder()}
                <div>{renderButtons(this.tbStore)}</div>
                <Table
                    size="small"
                    columns={this.tbStore.tableColumns}
                    key={this.props.datagrid_code}
                    dataSource={this.tbStore.dataSource}
                    onChange={this.tbStore.TableOnChange}
                    {...tableProps}
                />
            </div>
        );
    }
}
