import '../commonTable.scss';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import api from '@/api/api';
import fetchDataGridCfg from './fetchDataGridCfg';
import listDataParams from './listDataParams';
import commonTableStore from '@/store/commonTableStore';
import getTableColumns from './getTableColumns';
import renderButtons from './renderButtons';
import React from 'react';
import ResizeableTitle from './resizeableTitle';

@observer
export default class CommonTable extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = new commonTableStore();
        this.state = {
            columns: [],
            search_query_cfg: null,
            isFilterSelfData: false,
            query_cfg: this.props.query_cfg ? this.props.query_cfg : null //表格保持自己的query_cfg
        };
    }

    //设置表格自己的query_cfg ,不是store的 query_cfg
    setTableCompomentQueryCfg = async (cfg) => {
        this.setState({ query_cfg: cfg });
    };

    setSearchQueryConfig = async (cfg) => {
        this.setState({ search_query_cfg: cfg });
    };

    async componentDidMount() {
        this.commonTableStore.resetTableStore();
        this.commonTableStore.clearPaginationStore();
        await this.commonTableStore.setActionCode(this.props.datagrid_code);
        await this.refreshTable();
        this.setState({ columns: getTableColumns(this.commonTableStore) });

        // 作为uform插件时的赋值处理
        if (this.props.onChange) {
            this.props.onChange(this.commonTableStore.dataSource);
        }
    }

    getExportExcelPara = async () => {
        await fetchDataGridCfg(this.commonTableStore, this.setTableCompomentQueryCfg);
        if (this.props.as_virtual == 'y') {
            return 'as_virtual=y';
        }

        await this.setState({ search_query_cfg: null });
        let data = listDataParams(this.commonTableStore, this.state);
        let params = {
            data: data,
            method: 'POST'
        };

        params.geturl = toJS(this.commonTableStore.curd).geturl;
        return params;
    };

    refreshTable = async () => {
        await fetchDataGridCfg(this.commonTableStore, this.setTableCompomentQueryCfg);
        if (this.props.as_virtual == 'y') {
            return;
        }
        await this.setState({ search_query_cfg: null }, () => {
            this.listData();
        });
    };

    listData = async () => {
        let data = listDataParams(this.commonTableStore, this.state);
        let params = {
            data: data,
            method: 'POST'
        };

        params.geturl = toJS(this.commonTableStore.curd).geturl;
        if (params.geturl === undefined) {
            return;
        }

        let json = await api.curd.listData(params);
        if (json.code == 200) {
            this.commonTableStore.setDataSource(json.data);
            this.commonTableStore.setTotal(json.total);
            this.setState({ columns: getTableColumns(this.commonTableStore) });
            this.rowSelectChange([], []);
        }
    };

    RenderBthHolder() {
        let HiddenModalContainer = this.commonTableStore.ButtonUsedCom;
        if (this.commonTableStore.ButtonUsedCom) {
            return (
                <HiddenModalContainer
                    ref={async (item) => {
                        await this.commonTableStore.setLazyButtonUsedCom(item);
                    }}
                    parentTable={this}
                    commonTableStore={this.commonTableStore}
                    setQueryCfg={this.setTableCompomentQueryCfg}
                    setSearchQueryConfig={this.setSearchQueryConfig}
                    refreshTable={this.refreshTable}
                />
            );
        }
    }

    async setCurrentPage(currentPage) {
        this.commonTableStore.setCurrentPage(currentPage);
        await this.listData();
    }

    onRowClick(event, record) {
        this.commonTableStore.rowSelectChange([record.id], [record]);
        this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows);
    }

    rowSelectChange(selectedRowKeys, selectedRows) {
        this.commonTableStore.rowSelectChange(selectedRowKeys, selectedRows);
        this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows);
    }

    onShowSizeChange = async (current, pageSize) => {
        this.commonTableStore.setCurrentPage(current);
        this.commonTableStore.setPageSize(pageSize);
        await this.listData();
    };

    getTableProps() {
        return {
            onRow: (record) => {
                return {
                    onClick: (event) => this.onRowClick(event, record) // 点击行选中
                };
            },
            loading: this.commonTableStore.loading,
            rowKey: (record) => record.id,
            bordered: true,
            dataSource: this.commonTableStore.dataSource,
            rowSelection: {
                type: 'radio',
                selectedRowKeys: this.commonTableStore.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => this.rowSelectChange(selectedRowKeys, selectedRows)
            },
            scroll: {
                x: parseInt(this.commonTableStore.table_width)
                // y: '720px'
            },
            pagination: {
                showSizeChanger: true,
                onShowSizeChange: this.onShowSizeChange,
                total: this.commonTableStore.total,
                showLessItems: true,
                defaultCurrent: this.commonTableStore.currentPage,
                current: this.commonTableStore.currentPage,
                pageSize: this.commonTableStore.pageSize,
                showQuickJumper: true,
                showTotal: (count) => {
                    let pageNum = Math.ceil(count / this.commonTableStore.pageSize);
                    return `共${pageNum}页/${count}条数据`;
                },
                onChange: (currentPage) => this.setCurrentPage(currentPage)
            }
        };
    }

    // 后台设置查看自己还是全部的数据
    filterSelfList = (isFilterSelfData) => {
        this.setState({ isFilterSelfData }, () => {
            this.commonTableStore.setCurrentPage(1);
            this.listData();
        });
    };

    render() {
        let styles = {
            padding: '10px'
        };

        let tableProps = this.getTableProps();

        return (
            <div className="table_wrapper" style={styles}>
                {this.RenderBthHolder()}
                <div className="table_button">{renderButtons(this.commonTableStore)}</div>
                <Table
                    size={this.props.size ? 'small' : 'default'}
                    columns={this.state.columns}
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
