import React from 'react';
import { message } from 'antd';
import navigationStore from '@/store/navigationStore';

import api from '@/api/api';

export default class TableDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.init = this.init.bind(this);
    }
    init = async () => {
        console.log(666, this.props.commonTableStore);
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择1条数据.');
            return;
        }
        let rowdata = this.props.commonTableStore.selectedRows[0];
        let data = {
            process_key: navigationStore.currentMenu.process_key,
            uuid: rowdata.uuid,
            nodeKey: null,
            readonly: true,
            init_node: rowdata.flowstatus != '未提交' && rowdata.flowstatus != '未启动' ? 'n' : 'y',
            transactid: rowdata.transactid,
            datagrid_code: navigationStore.currentMenu.datagrid_code,
            page_source: 'detail' // IDC合同专用开关
        };

        let params = '';
        let keys = Object.keys(data);
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${key}=${data[key]}` : `${key}=${data[key]}&`;
        });

        let new_url = `/#/flow/FlowDetail?${params}`;

        window.open(new_url, '_blank');
    };
    render() {
        return null;
    }
}
