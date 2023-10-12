import React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import Dmtabs from './dmtabs';
import api from '@/api/api';

@inject('dmStore')
@observer
export default class datagridmnt extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    state = {
        searchText: '',
        current_DataGridCode: '',
        DataGridCode: '',
        maintable: '',
        memo: '',
        selectedRowKeys: []
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}>
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        )
    });

    // textToHighlight={text.toString()}
    //  textToHighlight="AAA"

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    selectRow = (record) => {
        this.setState({ selectedRowKeys: [record.id] });
        this.changeStoreCfg(record);
    };

    onSelectedRowKeysChange = (selectedRowKeys, records) => {
        let record = records[0];
        this.selectRow(record);
        console.log(record);
    };

    changeStoreCfg(record) {
        console.log(record);

        // this.setState({ current_processkey: toJS(record).processkey })
        this.dmstore.setCurrentActcode(toJS(record).datagrid_code);
        this.dmstore.clearMaintableColumns();
        this.dmstore.setCurrentActName(toJS(record).datagrid_title);
        this.dmstore.setCurrentBasetable(toJS(record).base_table);
        this.dmstore.setCurrentActObj(toJS(record));
    }

    async deleteActioncode(idtodel) {
        let params = { data: { id: idtodel }, method: 'POST' };
        let res = await api.activity.deleteGridCode(params);
        if (res.code == 200) {
            this.dmstore.initAll();
        }
    }

    componentDidMount() {
        this.dmstore.initAll();
    }

    //批处理按钮组
    async onClick(actioncode, type) {
        let params = { method: 'POST', data: { actioncode: actioncode, batch_type: type } };
        let res = await api.activity.batchSetButtons(params);
        console.log(res);
        if (res.code == '200') {
        }
    }

    render() {
        let dataGrids = this.dmstore.dataGrids;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange
        };

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id'
            },

            {
                title: '操作',
                key: 'xcodes',
                render: (text, record) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <Popconfirm
                                title="确定删除此DataGrid_code?"
                                icon={<Icon type="api" style={{ color: 'red' }} />}
                                onConfirm={() => {
                                    console.log(toJS(record));
                                    this.deleteActioncode(record.id);
                                }}>
                                <Button size="small" type="button">
                                    删除
                                </Button>
                            </Popconfirm>
                            <Button
                                size="small"
                                type="button"
                                onClick={() => this.onClick(record.datagrid_code, 'curd_template')}>
                                CURD
                            </Button>
                            <Button
                                size="small"
                                type="button"
                                onClick={() => this.onClick(record.datagrid_code, 'reset')}>
                                重置
                            </Button>
                        </div>
                    );
                }
            },
            {
                title: 'DataGridCode',
                dataIndex: 'datagrid_code',
                ...this.getColumnSearchProps('datagrid_code')
            },

            {
                title: '名称',
                dataIndex: 'datagrid_title',
                ...this.getColumnSearchProps('datagrid_title')
            },
            {
                title: '基础表格',
                dataIndex: 'base_table',
                ...this.getColumnSearchProps('base_table')
            },
            {
                title: 'geturl',
                dataIndex: 'geturl'
            },
            {
                title: 'delurl',
                dataIndex: 'delurl'
            },
            {
                title: 'addurl',
                dataIndex: 'addurl'
            },
            {
                title: 'updateurl',
                dataIndex: 'updateurl'
            },
            {
                title: '布局',
                dataIndex: 'layoutcfg'
            }
        ];

        return (
            <div>
                <div className="bordered">
                    <div>
                        <Table
                            onRow={(record) => ({
                                onClick: () => {
                                    this.selectRow(record);
                                }
                            })}
                            rowKey={(record) => record.id}
                            size="small"
                            columns={columns}
                            rowSelection={rowSelection}
                            dataSource={dataGrids}
                        />
                    </div>
                </div>

                <div>
                    <Dmtabs />
                </div>
            </div>
        );
    }
}
