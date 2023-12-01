import React from 'react';
import { Modal, message } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';
import { BsPeople } from 'react-icons/bs';

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
            content: <h4>确定要删出这条记录?</h4>,
            onOk: () => {
                this.deleteData();
            },
            onCancel: () => {},
            okText: '确认删除',
            okButtonProps: {
                type: 'primary',
                style: { color: 'red', backgroundColor: '#343c41', borderColor: '#343c41' }
            },
            cancelButtonProps: {
                danger: true
            }
        });
    }

    async deleteData() {
        let params = {
            data: {
                DataGridCode: this.props.NanxTableStore.datagrid_code,
                selectedRowKeys: this.props.NanxTableStore.selectedRowKeys
            },
            delurl: this.props.NanxTableStore.curd.delurl
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
