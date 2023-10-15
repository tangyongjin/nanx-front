import React from 'react';
import { observer } from 'mobx-react';
import CommonModal from '@/routes/commonAntTable/NanxTableCom/commonModal';
import api from '@/api/api';

@observer
export default class ExportExcelRemote extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }
    state = {
        visible: false,
        excelMsg: {}
    };

    async init() {
        let params = {
            data: {
                DataGridCode: this.props.commonTableStore.datagrid_code,
                role: sessionStorage.getItem('role_code'),
                user: sessionStorage.getItem('user'),
                ...this.props.parentTable.listDataParams()
            },
            method: 'POST'
        };

        let res = await api.activity.exportExcel(params);

        if (res.code == 200) {
            this.setState({
                excelMsg: res.data
            });
            this.refs.commonModalRef.showModal();
        }
    }

    hideModal() {
        this.refs.commonModalRef.onCancelHandle();
    }

    render() {
        return (
            <CommonModal
                height="500px"
                cancel={this.hideModal}
                title="导出excel(点击下载)"
                ref="commonModalRef"
                layoutcfg={this.props.commonTableStore.layoutcfg}>
                <a href={this.state.excelMsg.url}>{this.state.excelMsg.name}</a>
            </CommonModal>
        );
    }
}
