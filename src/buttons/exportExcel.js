import React from 'react';
import api from '@/api/api';
import fetchDataGridCfg from '@/routes/NanxTable/NanxTableCom/fetchDataGridCfg';
import listDataParams from '@/routes/NanxTable/NanxTableCom/listDataParams';
import { toJS } from 'mobx';

export default class ExportExcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            excelMsg: {}
        };
        this.init = this.init.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
    }

    init = async () => {};

    exportExcel = async () => {
        let _para = await this.getExportExcelPara();
        let res = await api.curd.exportExcel(_para);
        document.getElementById('excel_prepare').style.display = 'none';
        if (res.code == 200) {
            console.log('Excel文件完成');
            this.setState({
                excelMsg: res.data
            });
        }
    };

    componentDidMount() {
        this.exportExcel();
    }

    async getExportExcelPara() {
        await fetchDataGridCfg(this.props.NanxTableStore);
        let paradata = listDataParams(this.props.NanxTableStore);
        let params = {
            data: paradata
        };

        params.geturl = toJS(this.props.NanxTableStore.curd).geturl;
        return params;
    }

    render() {
        return (
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
                {this.state.excelMsg ? <a href={this.state.excelMsg.url}>{this.state.excelMsg.name}</a> : null}
            </div>
        );
    }
}
