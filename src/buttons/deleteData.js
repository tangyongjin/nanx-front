import React from 'react';
import { Modal, message } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';
const { confirm } = Modal;
@inject('NanxTableStore') // 'myStore' 是你在Provider中提供的store名称
@observer
export default class DeleteData extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async init() {
        if (this.props.NanxTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let _tmprec = this.props.NanxTableStore.selectedRows[0];

        if (_tmprec.hasOwnProperty('ghost_author') && _tmprec.ghost_author != sessionStorage.getItem('user')) {
            message.error('不是自己的数据不能删除');
            return;
        }

        confirm({
            title: '你确定要删出这条记录么?',
            content: '删除后将无法恢复',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                console.log(this.props);

                if (this.props.as_virtual == 'y') {
                    this.deleteVirtualData();
                    this.props.changeValue && this.props.changeValue(this.props.NanxTableStore.dataSource);
                    return;
                }

                this.deleteData();
            },
            onCancel: () => {
                console.log(this.props);
            }
        });
    }

    deleteVirtualData = () => {
        let tempArr = [];
        this.props.NanxTableStore.dataSource.map((item) => {
            if (item.id != this.props.NanxTableStore.selectedRowKeys[0]) {
                tempArr.push(item);
            }
        });
        this.props.NanxTableStore.setDataSource(tempArr);
    };

    async deleteData() {
        let params = {
            data: {
                DataGridCode: this.props.NanxTableStore.datagrid_code,
                selectedRowKeys: this.props.NanxTableStore.selectedRowKeys
            },
            delurl: this.props.NanxTableStore.curd.delurl,
            method: 'POST'
        };
        let json = await api.curd.deleteData(params);

        if (json.code == 200) {
            this.props.refreshTable();
        }
    }

    render() {
        return null;
    }
}
