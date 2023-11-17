import React from 'react';
import { Modal, message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import GridFieldManager from './GridFieldManager';
import { toJS } from 'mobx';
import { SlidersOutlined } from '@ant-design/icons';

@inject('DataGridStore')
@observer
export default class GridFieldMnt extends React.Component {
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
            message.info('必须选择一个DataGrid');
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
                onCancel={() => this.onCancel()}
                width={'1100px'}
                footer={[
                    <Button key="gidmnt" type="primary" onClick={this.onCancel}>
                        关闭
                    </Button>
                ]}
                title={
                    <div>
                        <SlidersOutlined />
                        字段管理
                    </div>
                }>
                {this.props.DataGridStore.ColsDbInfo.length == 0 ? null : <GridFieldManager />}
            </Modal>
        ) : null;
    }
}
