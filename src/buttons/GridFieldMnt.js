import React from 'react';
import { message } from 'antd';
import { observer, inject } from 'mobx-react';
import GridFieldManager from './GridFieldManager';
import { toJS } from 'mobx';

@inject('GridConfigStore')
@observer
export default class GridFieldMnt extends React.Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
        this.init = this.init.bind(this);
    }

    async componentWillMount() {
        await this.init();
    }

    async init(buttonSource) {
        console.log('item: ', buttonSource);
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一个DataGrid');
            return;
        } else {
            let record = selectedRows[0];
            console.log(this.props);
            this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
            this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
            this.props.GridConfigStore.initAll();
            this.props.GridConfigStore.prepareDataGirdEnv();
            this.props.NanxTableStore.showButtonModal();
        }
    }

    render() {
        return <GridFieldManager NanxTableStore={this.props.NanxTableStore} />;
    }
}
