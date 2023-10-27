import '../commonTable.scss';
import { Button, Table } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import api from '@/api/api';
import columnsRender from './columnsRender';
import fetchDataGridCfg from './fetchDataGridCfg';
import listDataParams from './listDataParams';
import commonTableStore from '@/store/commonTableStore';
import getTextWidth from './commonTableTextTool';
import React from 'react';
import ResizeableTitle from './resizeableTitle';

@observer
export default class CommonTable extends React.Component {
    constructor(props) {
        super(props);

        this.commonTableStore = new commonTableStore();

        this.state = {
            buttonremark: 'false',
            button_code: '',
            buttonUsedComponent: null,
            columns: [],
            search_query_cfg: null,
            isFilterSelfData: false,
            query_cfg: this.props.query_cfg ? this.props.query_cfg : null //表格保持自己的query_cfg
        };
        this.resetTable = this.resetTable.bind(this);
        this.pluginComRef = null;
    }

    // 查询
    inquireModal = async (data) => {
        await this.setState({ query_cfg: data });
        await this.listData();
    };

    searchOrder = async (data) => {
        await this.commonTableStore.setCurrentPage(1);
        await this.setState({ search_query_cfg: data });
        await this.listData();
    };

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
        this.getTableColumns();

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
            this.getTableColumns();
            this.rowSelectChange([], []);
        }
    };

    resetTable() {
        this.setState(
            {
                query_cfg: null
            },
            () => {
                this.listData();
            }
        );
    }

    getComponentByFile = (path) => {
        let _compoment = require(`../../../buttons/${path}`).default;
        return _compoment;
    };

    renderButtons() {
        if (!this.commonTableStore.TableButtonsJson) {
            return null;
        }

        return this.commonTableStore.TableButtonsJson.map((item, index) => {
            return (
                <Button
                    key={index}
                    type={item.ui_type}
                    htmlType="button"
                    onClick={(event) => this.getButtonHandler(event, item)}
                    size="small"
                    style={{ margin: 8 }}>
                    {item.title}
                </Button>
            );
        });
    }

    getButtonHandler(event, item) {
        let _compoment = this.getComponentByFile(item.file_path);
        this.setState(
            {
                button_code: item.button_code,
                buttonUsedComponent: _compoment
            },
            () => {
                this.pluginComRef['init']();
            }
        );
    }

    // commonTable 作为编辑器时候, x-props会传入 as_virtual属性,onChange 属性.
    RenderTablePluginCom() {
        let PluginCom = this.state.buttonUsedComponent;
        if (this.state.buttonUsedComponent) {
            return (
                <PluginCom
                    ref={(item) => {
                        this.pluginComRef = item;
                    }}
                    parentTable={this}
                    as_virtual={this.props.as_virtual}
                    editable={true}
                    onChange={this.props.onChange}
                    commonTableStore={this.commonTableStore}
                    dataGridcode2={this.props.dataGridCode}
                    refreshTable={this.refreshTable}
                    resetTable={this.resetTable}
                    setQueryCfg={this.setTableCompomentQueryCfg}
                    setSearchQueryConfig={this.setSearchQueryConfig}
                    inquireModal={this.inquireModal}
                    searchOrder={this.searchOrder}
                    onCancel={this.props.onCancel}
                />
            );
        }
    }

    handleResize =
        (col, index) =>
        (e, { size }) => {
            const nextColumns = [...this.state.columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width
            };
            this.setState({
                columns: nextColumns
            });
        };

    getTableColumns() {
        let hideColumns = [];
        let columns = [];
        console.log(this.commonTableStore.tableColumnsJson);

        this.commonTableStore.tableColumnsJson.map((item, index) => {
            let column = {
                title: item.title,
                dataIndex: item.key,
                key: item.key,
                width: item.width && item.width != null && item.width != '' ? parseFloat(item.width) : 200,
                sorter: (a, b) => this.sorter(a[item.key], b[item.key]),
                render: (text, record) => {
                    return columnsRender(text, record, item, this.commonTableStore);
                }
            };

            if (hideColumns.includes(item.key) == false) {
                columns.push(column);
            }
        });

        columns.map((item) => {
            let fieldValues = [];
            fieldValues.push(item.title);
            this.commonTableStore.dataSource.forEach((record) => {
                fieldValues.push(record[item.dataIndex]);
            });
            var longest = fieldValues.reduce(function (a, b) {
                if (a == null) {
                    a = '';
                }
                if (b == null) {
                    b = '';
                }
                return a.length > b.length ? a : b;
            });

            if (['resource_logs', 'billsjson'].includes(item.dataIndex)) {
                return (item.width = 200);
            }
            return (item.width = 45 + getTextWidth(longest));
        });

        this.setState({ columns: columns });
    }

    sorter(valueA, valueB) {
        let targetA = valueA != null && valueA.toString().toLowerCase();
        let targetB = valueB != null && valueB.toString().toLowerCase();
        return targetA != null && targetA.localeCompare ? targetA.localeCompare(targetB) : targetA - targetB;
    }

    getResizeColumns() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: (column) => {
                return {
                    // width: column.width ? column.width : 200,
                    onResize: this.handleResize(col, index)
                };
            }
        }));
        return columns;
    }

    async setCurrentPage(currentPage) {
        if (this.commonTableStore.currentPage == currentPage) {
            return;
        }
        this.commonTableStore.setCurrentPage(currentPage);
        await this.listData();
    }

    getTableComponents() {
        return {
            header: {
                cell: ResizeableTitle
            }
        };
    }

    onRowClick(event, record) {
        if (this.props.sendData) {
            let arr = [];
            arr.push(record);
            this.props.sendData(arr);
        }
        if (this.commonTableStore.selectType == 'y') {
            this.commonTableStore.rowcheckChange([record.id], [record]);
        } else {
            this.commonTableStore.rowSelectChange([record.id], [record]);
        }
        this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows);
    }

    rowSelectChange(selectedRowKeys, selectedRows) {
        this.commonTableStore.rowSelectChange(selectedRowKeys, selectedRows);
        this.props.onChange && this.props.onChange(this.commonTableStore.selectedRows);
        if (this.props.sendData) {
            this.props.sendData(selectedRows);
        }
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
                type: this.commonTableStore.selectType == 'y' ? 'checkbox' : 'radio',
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
                {this.RenderTablePluginCom()}

                <div className="table_button">{this.renderButtons()}</div>
                <Table
                    size={this.props.size ? 'small' : 'default'}
                    columns={this.state.columns}
                    key={this.props.datagrid_code}
                    className="commonTable"
                    components={this.getTableComponents()}
                    {...tableProps}
                />
            </div>
        );
    }
}
