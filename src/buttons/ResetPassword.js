import React from 'react';
import { Modal, message } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';
const { confirm } = Modal;
@inject('NanxTableStore')
@observer
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async init() {
        if (this.props.NanxTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一个用户');
            return;
        }

        confirm({
            title: '你确定要重置密码?',
            content: '新密码为12345678,请尽快更改密码',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.resetPwd();
            }
        });
    }

    async resetPwd() {
        let params = {
            method: 'POST',
            data: {
                mobile: this.props.NanxTableStore.selectedRows[0].mobile
            }
        };
        await api.user.resetPassword(params);
    }

    render() {
        return null;
    }
}
