import React from 'react';
import { Modal, message } from 'antd';
import { observer, inject } from 'mobx-react';
import TableSortCom from './TableSort/TableSortCom';
import { toJS } from 'mobx';
import { BarsOutlined } from '@ant-design/icons';

@inject('DataGridStore')
@observer
export default class TableSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.init = this.init.bind(this);
    }

    async init() {
        this.props.DataGridStore.clearColsDbInfo();
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

        return (
            <Modal
                visible={this.state.visible}
                destroyOnClose={true}
                onCancel={() => this.onCancel()}
                onOk={() => this.onCancel()}
                width={'1300px'}
                title={
                    <div>
                        <BarsOutlined />
                        字段排序
                    </div>
                }>
                {this.props.DataGridStore.ColsDbInfo.length == 0 ? null : (
                    <TableSortCom DataGridCode={this.props.DataGridStore.DataGridCode} />
                )}
            </Modal>
        );
    }
}
