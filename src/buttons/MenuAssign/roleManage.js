import React from 'react';
import { Button, Popconfirm, Input } from 'antd';
import { inject, observer } from 'mobx-react';
import PortalTable from './table';
import RoleModal from './modal';
import RoleModalContent from './roleModalContent';
import getColumnSearchProps from '@/routes/NanxTable/NanxTableCom/getColumnSearchProps';
import '@/styles/privilige.scss';

@inject('permissionManageStore')
@observer
export default class RoleList extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.permissionManageStore;
        this.state = {
            selectKey: []
        };
    }
    componentDidMount() {
        this.store.getRoleList();
    }

    componentWillUnmount() {
        this.store.clearPagination();
    }

    getOptionButtons(record) {
        return (
            <div className="options">
                <Button
                    className={record.key == this.state.selectKey ? 'marginRihgt10' : 'marginRihgt10'}
                    onClick={(event) => this.store.allocationMenu(event, record)}
                    size="small"
                    type="primary">
                    分配菜单
                </Button>

                <Button
                    className={record.key == this.state.selectKey ? 'marginRihgt10' : 'marginRihgt10'}
                    onClick={(event) => this.store.toPermissionDetail(event, record)}
                    size="small"
                    type="primary">
                    查看权限
                </Button>
                <Button
                    className={record.key == this.state.selectKey ? 'marginRihgt10' : 'marginRihgt10'}
                    onClick={(event) => this.store.toLookUserByRole(event, record)}
                    size="small"
                    type="primary">
                    查看人员
                </Button>
                <Button
                    className={record.key == this.state.selectKey ? 'marginRihgt10' : 'marginRihgt10'}
                    onClick={(event) => this.store.editRowRoleButton(event, record)}
                    size="small"
                    type="primary">
                    编辑
                </Button>
                <Popconfirm
                    title="您确定要删除么?"
                    okText="删除"
                    cancelText="取消"
                    onConfirm={(event) => this.store.deleteRoleRow(event, record)}>
                    <Button type="danger" size="small" htmlType="button">
                        删除
                    </Button>
                </Popconfirm>
            </div>
        );
    }

    getTableColumns() {
        let columns = [
            {
                title: '角色code',
                dataIndex: 'role_code',
                key: 'role_code',
                className: 'role_code',
                sorter: (a, b) => a.role_code.length - b.role_code.length,
                onFilter: (value, record) => record.role_code.includes(value),
                ...getColumnSearchProps('role_code', this.store)
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
                key: 'role_name',
                className: 'role_name',
                sorter: (a, b) => a.role_name.length - b.role_name.length,
                onFilter: (value, record) => record.role_name.includes(value),
                ...getColumnSearchProps('role_name', this.store)
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: 480,
                className: 'chargeStyle',
                render: (text, record) => this.getOptionButtons(record)
            }
        ];
        return columns;
    }

    onSelectChange(selectedRowKeys) {
        console.log(selectedRowKeys);
        if (selectedRowKeys.length > 1) {
            return;
        }
        this.setState({
            selectKey: selectedRowKeys
        });
    }

    getTableProps() {
        return {
            bordered: true,
            dataSource: this.store.roleList,
            selectedRowKeys: this.state.selectKey,
            rowSelectChange: (selectedRowKeys) => this.onSelectChange(selectedRowKeys),
            pagination: {
                total: this.store.pagination.total,
                showLessItems: true,
                defaultCurrent: this.store.pagination.currentPage,
                current: this.store.pagination.currentPage,
                pageSize: this.store.pagination.pageSize,
                showQuickJumper: true,
                showTotal: (count) => {
                    let pageNum = Math.ceil(count / this.store.pagination.pageSize);
                    return '共 ' + pageNum + '页' + '/' + count + ' 条数据';
                },
                onShowSizeChange: this.store.onShowSizeChange,
                onChange: this.store.setCurrentPage
            },
            columns: this.getTableColumns()
        };
    }

    getSearchRoleButtonGrp() {
        return (
            <div className="roleButtonGroup">
                <Button
                    className="marginRihgt10"
                    onClick={(event) => this.store.addRoleButton(event)}
                    size="small"
                    type="primary"
                    style={{ margin: '15px 20px' }}>
                    新增角色
                </Button>
                <div className="searchWrapper">
                    <div className="searForm">
                        <div className="searchInfo">角色code</div>
                        <div className="searcControl">
                            <Input
                                onPressEnter={(event) => this.store.searchRoleHandle(event)}
                                onChange={(event) => this.store.setSearRoleValue(event, 'role_code')}
                            />
                        </div>
                    </div>
                    <div className="searForm">
                        <div className="searchInfo">角色名称</div>
                        <div className="searcControl">
                            <Input
                                onPressEnter={(event) => this.store.searchRoleHandle(event)}
                                onChange={(event) => this.store.setSearRoleValue(event, 'role_name')}
                            />
                        </div>
                    </div>
                    <Button
                        className="marginRihgt10"
                        onClick={(event) => this.store.searchRoleHandle(event)}
                        size="small"
                        type="primary"
                        style={{ margin: '15px 20px' }}>
                        搜索
                    </Button>
                </div>
            </div>
        );
    }

    getRoleModalContent() {
        return <RoleModalContent roleRowData={this.store.roleRowData} />;
    }

    render() {
        let tableProps = this.getTableProps();

        return (
            <div className="custServiceContent">
                {this.getSearchRoleButtonGrp()}

                <PortalTable {...tableProps} />
                <RoleModal
                    modalTitle={this.store.modalTitle}
                    hideModal={this.store.hideModal}
                    visiblModal={this.store.visibleModal}
                    saveHandle={this.store.saveRoleHandle}>
                    <RoleModalContent roleRowData={this.store.roleRowData} setRowData={this.store.setRoleRowData} />
                </RoleModal>
            </div>
        );
    }
}
