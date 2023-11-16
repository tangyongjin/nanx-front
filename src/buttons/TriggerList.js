import React from 'react';
import { Modal, message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import TriggerListCom from './trigger/TriggerListCom';
import { toJS } from 'mobx';
import { FormatPainterOutlined } from '@ant-design/icons';

@inject('DataGridStore')
@observer
export default class TriggerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
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
            this.props.DataGridStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.DataGridStore.setCurrentBasetable(toJS(record).base_table);
            this.props.DataGridStore.prepareDataGirdEnv();
            this.setState({ open: true });
        }
    }

    onCancel = () => {
        this.setState({
            open: false
        });
    };

    render() {
        console.log(this.props.DataGridStore);

        let { selectedRows } = this.props.NanxTableStore;
        return selectedRows.length > 0 ? (
            <Modal
                open={this.state.open}
                destroyOnClose={true}
                width={'1300px'}
                onCancel={this.onCancel}
                footer={[
                    <Button key="triggerList" type="primary" onClick={this.onCancel}>
                        关闭
                    </Button>
                ]}
                title={
                    <div>
                        <FormatPainterOutlined />
                        管理联动
                    </div>
                }>
                {this.props.DataGridStore.ColsDbInfo.length == 0 ? null : <TriggerListCom />}
            </Modal>
        ) : null;
    }
}
