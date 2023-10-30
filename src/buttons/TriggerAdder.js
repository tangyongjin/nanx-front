import React from 'react';
import { Modal, message } from 'antd';
import { observer, inject } from 'mobx-react';
import TriggerAddCom from './trigger/TriggerAddCom';
import { toJS } from 'mobx';

@inject('DataGridStore')
@observer
export default class TriggerAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.init = this.init.bind(this);
    }

    async init() {
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一项');
            return;
        } else {
            let record = selectedRows[0];
            console.log(record);
            this.props.DataGridStore.setCurrentActcode(toJS(record).datagrid_code);
            this.props.DataGridStore.setCurrentActName(toJS(record).datagrid_title);
            this.props.DataGridStore.setCurrentBasetable(toJS(record).base_table);
            this.props.DataGridStore.prepareDataGirdEnv();
            this.setState({ visible: true });
        }
    }

    onCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        console.log(this.props.DataGridStore);

        let { selectedRows } = this.props.NanxTableStore;
        return selectedRows.length > 0 ? (
            <Modal
                visible={this.state.visible}
                destroyOnClose={true}
                onCancel={() => this.onCancel()}
                onOk={() => this.onCancel()}
                width={'1300px'}
                title="添加联动">
                {this.props.DataGridStore.ColsDbInfo.length == 0 ? null : <TriggerAddCom />}
            </Modal>
        ) : null;
    }
}
