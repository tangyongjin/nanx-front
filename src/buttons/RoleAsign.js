import React from 'react';
import { message, Popconfirm, Button, Select, Table } from 'antd';
import api from '@/api/api';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import IconRender from '@/routes/NanxTable/NanxTableCom/cellRenders/IconRender';
const { Option } = Select;

export default class RoleAsign extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = { iconStr: null, record: null, allRoles: [], currentRoles: [], role_code: null };
    }

    //eslint-disable-next-line
    async init(buttonSource) {
        this.setState({ iconStr: buttonSource.icon });
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一个用户');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];
        this.setState({ allRoles: [], currentRoles: [] });

        let res = await api.permission.getAllRoles();
        this.setState({
            record: currentrow,
            allRoles: res.roles
        });
        this.props.NanxTableStore.showButtonModal();
        await this.getUserRole();
    }

    onChange(a) {
        this.setState({ role_code: a });
    }

    getUserRole = async () => {
        let params = { data: { user: this.state.record.user } };
        let res = await api.permission.getUserRole(params);
        if (res.role) {
            this.setState({ currentRoles: [res.role] });
        }
    };

    assignUserRole = async () => {
        let params = {
            data: { role_code: this.state.role_code, user: this.state.record.user }
        };
        await api.permission.assignUserRole(params);
        await this.getUserRole();
    };

    deleteUserRole = async (e, record) => {
        this.setState({ currentRoles: [] });
        let params = { data: { user: record.user, role: record.role_code } };
        await api.permission.deleteUserRole(params);
        await this.getUserRole();
    };

    getOperationButtons(record, rowIndex) {
        return (
            <div className="options">
                <Popconfirm
                    title="您确定要删除么?"
                    okText="删除"
                    cancelText="取消"
                    onConfirm={(event) => this.deleteUserRole(event, record)}>
                    <Button type="danger" size="small" htmlType="button">
                        删除
                    </Button>
                </Popconfirm>
            </div>
        );
    }

    columns = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            render: (text, record, rowIndex) => this.getOperationButtons(record, rowIndex)
        },

        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            dataIndex: 'user'
        },
        {
            title: '角色',
            dataIndex: 'role_code'
        }
    ];

    render() {
        return (
            <div>
                {this.state.record ? (
                    <CommonModal
                        title={
                            <div>
                                {IconRender(this.state.iconStr)}
                                分配角色
                            </div>
                        }
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleCancel}>
                                关闭
                            </Button>
                        ]}
                        width="1200px">
                        {this.state.currentRoles.length > 0 ? (
                            <div style={{ marginTop: '10px' }}>
                                <h3>已分配的角色:</h3>
                                <Table
                                    bordered={true}
                                    dataSource={this.state.currentRoles}
                                    size="small"
                                    rowKey={(obj) => obj.id}
                                    columns={this.columns}
                                    pagination={false}
                                />
                            </div>
                        ) : (
                            <div style={{ marginTop: '10px' }}>
                                <h3>当前未分配角色</h3>
                            </div>
                        )}

                        {this.state.allRoles.length == 0 ? null : (
                            <div>
                                <h4>&nbsp;</h4>
                                <h3>选择新分配角色:</h3>
                                <Select
                                    style={{ width: '400px' }}
                                    value={this.state.btncode}
                                    showSearch
                                    allowClear
                                    placeholder="角色列表"
                                    onChange={(v) => this.onChange(v)}
                                    name="category">
                                    {this.state.allRoles.length &&
                                        this.state.allRoles.map((item, index) => (
                                            <Option key={index} value={item.role_code}>
                                                {item.role_code} {item.name}
                                            </Option>
                                        ))}
                                </Select>
                                <Button onClick={() => this.assignUserRole()} style={{ marginLeft: '10px' }}>
                                    分配
                                </Button>
                            </div>
                        )}
                    </CommonModal>
                ) : null}
            </div>
        );
    }
}
