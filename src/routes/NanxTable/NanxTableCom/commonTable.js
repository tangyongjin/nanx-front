import '../commonTable.scss';
import { Table } from 'antd';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import fetchDataGridCfg from './fetchDataGridCfg';
import listDataParams from './listDataParams';
import renderButtons from './renderButtons';
import React from 'react';
import ResizeableTitle from './resizeableTitle';

@inject('commonTableStore')
@observer
export default class CommonTable extends React.Component {
    constructor(props) {
        super(props);
        this.tbStore = props.commonTableStore;
        this.state = {
            isFilterSelfData: false
        };
    }

    async componentDidMount() {
        this.tbStore.resetTableStore();
        this.tbStore.clearPaginationStore();
        await this.tbStore.setDataGridCode(this.props.datagrid_code);
        await this.refreshTable();
    }

    getExportExcelPara = async () => {
        await fetchDataGridCfg(this.tbStore);
        let paradata = listDataParams(this.tbStore);
        let params = {
            data: paradata,
            method: 'POST'
        };

        params.geturl = toJS(this.tbStore.curd).geturl;
        return params;
    };

    refreshTable = async () => {
        await fetchDataGridCfg(this.tbStore);
        await this.tbStore.setSearchQueryConfig([]);
        await this.tbStore.listData();
    };

    RenderBthHolder() {
        let LazyModalContainer = this.tbStore.ButtonUsedCom;
        if (this.tbStore.ButtonUsedCom) {
            return (
                <LazyModalContainer
                    ref={async (item) => {
                        await this.tbStore.setLazyButtonUsedCom(item);
                    }}
                    parentTable={this}
                    commonTableStore={this.tbStore}
                    refreshTable={this.refreshTable}
                />
            );
        }
    }

    getTableProps() {
        return {
            onRow: (record) => {
                return {
                    onClick: () => this.tbStore.rowSelectChange([record.id], [record]) // 点击行选中
                };
            },
            rowKey: (record) => record.id,
            bordered: true,
            dataSource: this.tbStore.dataSource,
            rowSelection: {
                type: 'radio',
                selectedRowKeys: this.tbStore.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) =>
                    this.this.tbStore.rowSelectChange(selectedRowKeys, selectedRows)
            },

            scroll: {
                x: parseInt(this.tbStore.table_width)
            },
            pagination2: this.tbStore.getPageNation(),
            pagination: {
                showSizeChanger: true,
                onShowSizeChange: this.tbStore.onShowSizeChange,
                total: this.tbStore.total,
                showLessItems: true,
                defaultCurrent: this.tbStore.currentPage,
                current: this.tbStore.currentPage,
                pageSize: this.tbStore.pageSize,
                showQuickJumper: true,
                showTotal: (count) => {
                    let pageNum = Math.ceil(count / this.tbStore.pageSize);
                    return `共${pageNum}页/${count}条数据`;
                },
                onChange: (currentPage) => this.tbStore.setCurrentPage(currentPage)
            }
        };
    }

    render() {
        let tableProps = this.getTableProps();

        return (
            <div className="table_wrapper">
                {this.RenderBthHolder()}
                <div className="table_button">{renderButtons(this.tbStore)}</div>
                <Table
                    size={this.props.size ? 'small' : 'default'}
                    columns={this.tbStore.tableColumns}
                    key={this.props.datagrid_code}
                    className="commonTable"
                    components={{
                        header: {
                            cell: ResizeableTitle
                        }
                    }}
                    {...tableProps}
                />
            </div>
        );
    }
}
