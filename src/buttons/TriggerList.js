import React from 'react';
import { message } from 'antd';
import { observer, inject } from 'mobx-react';
import TriggerListCom from './Trigger/TriggerListCom';
import { toJS } from 'mobx';

@inject('GridConfigStore')
@observer
export default class TriggerList extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async init(buttonSource) {
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一项');
            return;
        } else {
            let record = selectedRows[0];
            this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
            this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
            this.props.GridConfigStore.prepareDataGirdEnv();
            this.props.NanxTableStore.showButtonModal();
        }
    }

    render() {
        return <TriggerListCom />;
    }
}
