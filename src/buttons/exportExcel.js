import React from 'react';
import api from '@/api/api';
import fetchDataGridCfg from '@/routes/NanxTable/NanxTableCom/fetchDataGridCfg';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import listDataParams from '@/routes/NanxTable/NanxTableCom/listDataParams';
import { toJS } from 'mobx';
import { TableOutlined } from '@ant-design/icons';

export default class ExportExcel extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        // document.getElementById('excel_prepare').style.display = 'block';
    }

    state = {
        excelMsg: {}
    };

    async getExportExcelPara() {
        await fetchDataGridCfg(this.props.NanxTableStore);
        let paradata = listDataParams(this.props.NanxTableStore);
        let params = {
            data: paradata
        };

        params.geturl = toJS(this.props.NanxTableStore.curd).geturl;
        return params;
    }

    async init() {
        await this.props.NanxTableStore.showButtonModal();
        let _para = await this.getExportExcelPara();
        let res = await api.curd.exportExcel(_para);
        document.getElementById('excel_prepare').style.display = 'none';

        if (res.code == 200) {
            this.setState({
                excelMsg: res.data
            });
        }
    }

    render() {
        return (
            <CommonModal
                cancel={this.hideModal}
                title={
                    <div>
                        <TableOutlined />
                        导出excel(点击下载)
                    </div>
                }>
                <div
                    style={{
                        marginTop: '10px',
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <div id="excel_prepare">数据准备中...</div>
                    <a href={this.state.excelMsg.url}>{this.state.excelMsg.name}</a>
                </div>
            </CommonModal>
        );
    }
}
