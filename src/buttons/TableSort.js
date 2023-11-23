import React from 'react';
import { message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import TableSortCom from './TableSort/TableSortCom';
import { toJS } from 'mobx';
import { BarsOutlined } from '@ant-design/icons';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';

@inject('DataGridStore')
@observer
export default class TableSort extends React.Component {
    constructor(props) {
        super(props);

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
            this.props.DataGridStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.DataGridStore.setCurrentBasetable(toJS(record).base_table);
            this.props.DataGridStore.prepareDataGirdEnv();
            this.props.NanxTableStore.showButtonModal();
        }
    }

    render() {
        return (
            <CommonModal
                footer={[
                    <Button key="submit" type="primary" onClick={this.onCancel}>
                        关闭
                    </Button>
                ]}
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
            </CommonModal>
        );
    }
}
