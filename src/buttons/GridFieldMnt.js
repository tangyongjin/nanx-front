import React from 'react';
import { Modal, message } from 'antd';
import { observer, inject } from 'mobx-react';
import GridFieldManager from './GridFieldManager';
import { toJS } from 'mobx';

@inject('DataGridStore')
@observer
export default class GridFieldMnt extends React.Component {
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
            this.props.DataGridStore.initAll();
            this.props.DataGridStore.setCurrentActcode(toJS(record).datagrid_code);
            this.props.DataGridStore.clearMaintableColumns();
            this.props.DataGridStore.setCurrentActName(toJS(record).datagrid_title);
            this.props.DataGridStore.setCurrentBasetable(toJS(record).base_table);
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
                width={'1600px'}
                title="字段管理">
                {this.props.DataGridStore.maintableColumns.length == 0 ? null : (
                    <GridFieldManager
                        setMaintableColumns={this.props.DataGridStore.setMaintableColumns}
                        batchUpdateFieldCfg={this.props.DataGridStore.batchUpdateFieldCfg}
                        saveFieldCfg={this.props.DataGridStore.saveFieldCfg}
                        maintableColumns={this.props.DataGridStore.maintableColumns}
                        DataGridTitle={this.props.DataGridStore.DataGridTitle}
                        DataGridCode={this.props.DataGridStore.DataGridCode}
                        plugins={this.props.DataGridStore.plugins}
                        Categories={this.props.DataGridStore.Categories}
                    />
                )}
            </Modal>
        ) : null;
    }
}
