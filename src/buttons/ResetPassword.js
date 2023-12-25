import React from 'react';
import { Modal } from 'antd';
import api from '@/api/api';

const { confirm } = Modal;

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async componentDidMount() {
        await this.init();
    }

    async init() {
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
