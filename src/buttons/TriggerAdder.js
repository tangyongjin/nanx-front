import React from 'react';
import { observer, inject } from 'mobx-react';
import TriggerAddCom from './Trigger/TriggerAddCom';
import { toJS } from 'mobx';

@inject('GridConfigStore')
@observer
export default class TriggerAdder extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
    }

    async init() {
        let { selectedRows } = this.props.NanxTableStore;

        let record = selectedRows[0];
        this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
        this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
        this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
        this.props.GridConfigStore.initAll();
        this.props.GridConfigStore.prepareDataGirdEnv();
    }

    render() {
        let { selectedRows } = this.props.NanxTableStore;
        return selectedRows.length > 0 ? (
            <div>{this.props.GridConfigStore.ColsDbInfo.length == 0 ? null : <TriggerAddCom />}</div>
        ) : null;
    }
}
