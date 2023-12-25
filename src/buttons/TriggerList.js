import React from 'react';
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

    async componentWillMount() {
        await this.init();
    }

    async init() {
        let { selectedRows } = this.props.NanxTableStore;

        let record = selectedRows[0];
        this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
        this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
        this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
        this.props.GridConfigStore.prepareDataGirdEnv();
    }

    render() {
        return <TriggerListCom />;
    }
}
