import React from 'react';
import { Input, message, Popconfirm, Button, Select, Table, Modal } from 'antd';
import api from '@/api/api';
import cloneDeep from 'lodash/cloneDeep';
import IconRender from '@/routes/NanxTable/NanxTableCom/cellRenders/IconRender';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';

import { BorderOutlined } from '@ant-design/icons';
const { Option } = Select;

export default class GridButtonAdder extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            record: null,
            allButtons: [],
            gridButtons: [],
            gridButtonOrders: [],
            btncode: null
        };
    }

    //eslint-disable-next-line
    async init() {
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];
        console.log(currentrow);
        let params = {};
        let res = await api.button.getAllButtons(params);
        this.setState({
            record: currentrow,
            allButtons: res.data
        });

        this.getDataGridButtons();
        this.props.NanxTableStore.showButtonModal();
    }

    getDataGridButtons = async () => {
        let params = { data: { DataGridCode: this.state.record.datagrid_code }, method: 'POST' };
        let res = await api.button.getGridButtons(params);
        let res2 = cloneDeep(res);
        this.setState({
            open: true,
            gridButtonOrders: res2.buttons,
            gridButtons: res.buttons
        });
    };

    addGridButton = async () => {
        let params = {
            data: { btncode: this.state.btncode, DataGridCode: this.state.record.datagrid_code }
        };
        await api.button.addGridButton(params);
        await this.getDataGridButtons();
    };

    deleteButtonRow = async (e, record) => {
        let params = { data: { button_code: record.button_code, datagrid_code: record.datagrid_code }, method: 'POST' };
        await api.button.deleteGridButton(params);
        await this.getDataGridButtons();
    };

    saveBtnOrder = async (idx, record) => {
        let params = { data: { assign_id: record.assign_id, btnorder: this.state.gridButtonOrders[idx].btnorder } };
        await api.button.saveBtnOrder(params);
        await this.getDataGridButtons();
    };

    getOptionButtons(record, rowIndex) {
        console.log('record: ', record);
        console.log('rowIndex: ', rowIndex);

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
                <Input
                    size="small"
                    style={{ width: '50px' }}
                    onChange={(e) => {
                        const _gridButtonOrders = this.state.gridButtonOrders;
                        _gridButtonOrders[rowIndex]['btnorder'] = e.target.value;
                        this.setState({
                            gridButtonOrders: _gridButtonOrders
                        });
                    }}
                    value={this.state.gridButtonOrders[rowIndex]['btnorder']}
                />
                <Button
                    type="danger"
                    onClick={() => this.saveBtnOrder(rowIndex, record)}
                    size="small"
                    htmlType="button">
                    保存按钮顺序
                </Button>
            </div>
        );
    }

    handleCancel = () => {
        this.setState({ open: false });
    };

    columns = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            render: (text, record, rowIndex) => this.getOptionButtons(record, rowIndex)
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
            title: '图标',
            dataIndex: 'icon',

            render: (text) => {
                return IconRender(text);
            }
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
                    <CommonModal
                        title={
                            <div>
                                <BorderOutlined />
                                分配按钮
                            </div>
                        }
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleCancel}>
                                关闭
                            </Button>
                        ]}
                        okText="确认"
                        onCancel={this.handleCancel}
                        width="1200px"
                        open={this.state.open}
                        destroyOnClose={true}>
                        {this.state.gridButtons.length == 0 ? null : (
                            <div style={{ marginTop: '10px' }}>
                                <h3>已分配的按钮:</h3>
                                <Table
                                    bordered={true}
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
                                    className="longSelect"
                                    value={this.state.btncode}
                                    showSearch
                                    allowClear
                                    placeholder="按钮列表"
                                    onChange={(v) => this.onChange(v)}
                                    name="category">
                                    {this.state.allButtons.length &&
                                        this.state.allButtons.map((item, index) => (
                                            <Option key={index} value={item.button_code}>
                                                <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                                    <span style={{ width: '150px' }}>{item.button_code}</span>
                                                    <span style={{ marginLeft: '30px' }}>
                                                        <span>
                                                            {IconRender(item.icon)} {item.name}
                                                        </span>
                                                    </span>
                                                </div>
                                            </Option>
                                        ))}
                                </Select>
                                <Button onClick={() => this.addGridButton()} style={{ marginLeft: '10px' }}>
                                    添加
                                </Button>
                            </div>
                        )}
                    </CommonModal>
                ) : null}
            </div>
        );
    }
}
