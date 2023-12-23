import React from 'react';
import { observer, inject } from 'mobx-react';
import TableSortCom from './TableSort/TableSortCom';
import { toJS } from 'mobx';

@inject('GridConfigStore')
@observer
export default class TableSort extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async componentWillMount() {
        await this.init();
    }

    async init() {
        this.props.GridConfigStore.clearColsDbInfo();
        let { selectedRows } = this.props.NanxTableStore;
        let record = selectedRows[0];
        await this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
        await this.props.GridConfigStore.prepareDataGirdEnv();
    }

    render() {
        return this.props.GridConfigStore.ColsDbInfo.length > 0 ? (
            <TableSortCom DataGridCode={this.props.GridConfigStore.DataGridCode} />
        ) : null;
    }
}
