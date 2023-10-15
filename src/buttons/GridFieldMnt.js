import React from 'react';
import { Modal, message } from 'antd';
import { observer, inject } from 'mobx-react';
import GridFieldManager from './GridFieldManager';
import { toJS } from 'mobx';

@inject('dmStore')
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
        let { selectedRows } = this.props.commonTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一项');
            return;
        } else {
            let record = selectedRows[0];
            console.log(record);
            this.props.dmStore.initAll();
            this.props.dmStore.setCurrentActcode(toJS(record).datagrid_code);
            this.props.dmStore.clearMaintableColumns();
            this.props.dmStore.setCurrentActName(toJS(record).datagrid_title);
            this.props.dmStore.setCurrentBasetable(toJS(record).base_table);
            this.props.dmStore.setCurrentActObj(toJS(record));
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

        let { selectedRows } = this.props.commonTableStore;
        return selectedRows.length > 0 ? (
            <Modal
                visible={this.state.visible}
                destroyOnClose={true}
                onCancel={() => this.onCancel()}
                onOk={() => this.onCancel()}
                width={'1300px'}
                title="字段管理">
                {this.props.dmStore.maintableColumns.length == 0 ? null : (
                    <GridFieldManager
                        setMaintableColumns={this.props.dmStore.setMaintableColumns}
                        batchUpdateFieldCfg={this.props.dmStore.batchUpdateFieldCfg}
                        setFieldAttr={this.props.dmStore.setFieldAttr}
                        saveFieldCfg={this.props.dmStore.saveFieldCfg}
                        maintableColumns={this.props.dmStore.maintableColumns}
                        current_actname={this.props.dmStore.current_actname}
                        current_DataGridCode={this.props.dmStore.current_DataGridCode}
                        plugins={this.props.dmStore.plugins}
                        Categories={this.props.dmStore.Categories}
                    />
                )}
            </Modal>
        ) : null;
    }
}
