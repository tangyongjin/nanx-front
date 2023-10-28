import React from 'react';
import { Modal, message } from 'antd';
import { observer, inject } from 'mobx-react';
import TableSortCom from './TableSort/TableSortCom';
import { toJS } from 'mobx';

@inject('dmStore')
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
        this.props.dmStore.clearMaintableColumns();
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一项');
            return;
        } else {
            let record = selectedRows[0];
            this.props.dmStore.setCurrentActcode(toJS(record).datagrid_code);
            this.props.dmStore.initAll();
            this.setState({ visible: true });
        }
    }

    onCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        console.log(this.props.dmStore);

        return (
            <Modal
                visible={this.state.visible}
                destroyOnClose={true}
                onCancel={() => this.onCancel()}
                onOk={() => this.onCancel()}
                width={'1300px'}
                title="字段排序/BUG">
                {this.props.dmStore.maintableColumns.length == 0 ? null : (
                    <TableSortCom
                        maintableColumns={this.props.dmStore.maintableColumns}
                        DataGridCode={this.props.dmStore.DataGridCode}
                    />
                )}
            </Modal>
        );
    }
}
