import React from 'react';
import api from '@/api/api';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';

export default class ExportExcel extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        excelMsg: {}
    };

    async init() {
        let _para = await this.props.parentTable.getExportExcelPara();
        let res = await api.curd.exportExcel(_para);
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
