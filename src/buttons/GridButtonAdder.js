import React from 'react';
import { message, Popconfirm, Button, Select, Table, Modal } from 'antd';
import api from '@/api/api';
const { Option } = Select;

export default class GridButtonAdder extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            record: null,
            allButtons: [],
            gridButtons: [],
            visible: false,
            btncode: null
        };
    }

    onChange(a) {
        this.setState({ btncode: a });
    }

    getDataGridButtons = async () => {
        let params = { data: { DataGridCode: this.state.record.datagrid_code }, method: 'POST' };
        let res = await api.button.getGridButtons(params);
        this.setState({
            visible: true,
            gridButtons: res.buttons
        });
    };

    addGridButton = async () => {
        console.log(this.state);
        let params = {
            data: { btncode: this.state.btncode, DataGridCode: this.state.record.datagrid_code },
            method: 'POST'
        };
        await api.button.addGridButton(params);
        await this.getDataGridButtons();
    };

    deleteButtonRow = async (e, record) => {
        console.log(record.button_code);
        console.log(record.datagrid_code);
        let params = { data: { button_code: record.button_code, datagrid_code: record.datagrid_code }, method: 'POST' };
        await api.button.deleteGridButton(params);
        await this.getDataGridButtons();
    };

    getOptionButtons(record) {
        return (
            <div className="options">
                <Popconfirm
                    title="您确定要删除么?"
                    okText="删除"
                    cancelText="取消"
                    onConfirm={(event) => this.deleteButtonRow(event, record)}>
                    <Button type="danger" size="small" htmlType="button">
                        删除
                    </Button>
                </Popconfirm>
            </div>
        );
    }

    async init() {
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];
        console.log(currentrow);
        let params = { data: {}, method: 'POST' };
        let res = await api.button.getAllButtons(params);
        this.setState({
            visible: true,
            record: currentrow,
            allButtons: res.data
        });

        params = { data: { DataGridCode: this.state.record.datagrid_code }, method: 'POST' };
        res = await api.button.getGridButtons(params);
        this.setState({
            visible: true,
            gridButtons: res.buttons
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    columns = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            render: (text, record) => this.getOptionButtons(record)
        },

        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '按钮名称',
            dataIndex: 'title'
        },
        {
            title: '文件路径',
            dataIndex: 'file_path'
        },
        {
            title: '按钮编码',
            dataIndex: 'button_code'
        },
        {
            title: '组件名称',
            dataIndex: 'component_name'
        },
        {
            title: '按钮顺序',
            dataIndex: 'btnorder'
        }
    ];

    render() {
        return (
            <div>
                {this.state.record ? (
                    <Modal
                        title="分配按钮"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        width="1200px"
                        visible={this.state.visible}
                        destroyOnClose={true}>
                        {this.state.gridButtons.length == 0 ? null : (
                            <div>
                                <h3>已分配的按钮:</h3>
                                <Table
                                    dataSource={this.state.gridButtons}
                                    size="small"
                                    rowKey={(obj) => obj.id}
                                    columns={this.columns}
                                    pagination={false}
                                    rowClassName={'big_table'}
                                />
                            </div>
                        )}

                        {this.state.allButtons.length == 0 ? null : (
                            <div>
                                <h4>&nbsp;</h4>
                                <h3>选择新分配按钮:</h3>
                                <Select
                                    style={{ width: '400px' }}
                                    value={this.state.btncode}
                                    showSearch
                                    allowClear
                                    placeholder="按钮列表"
                                    onChange={(v) => this.onChange(v)}
                                    name="category">
                                    {this.state.allButtons.length &&
                                        this.state.allButtons.map((item, index) => (
                                            <Option key={index} value={item.button_code}>
                                                {item.button_code} {item.name}
                                            </Option>
                                        ))}
                                </Select>
                                <Button onClick={(event) => this.addGridButton()} style={{ marginLeft: '10px' }}>
                                    添加
                                </Button>
                            </div>
                        )}
                    </Modal>
                ) : null}
            </div>
        );
    }
}
