import React from 'react';
import { message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import TableSortCom from './TableSort/TableSortCom';
import { toJS } from 'mobx';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import IconWrapper from '@/utils/IconWrapper';

@inject('GridConfigStore')
@observer
export default class TableSort extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.state = { iconStr: null };
    }

    async init(buttonSource) {
        this.setState({ iconStr: buttonSource.icon });

        this.props.GridConfigStore.clearColsDbInfo();
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一项');
            return;
        } else {
            let record = selectedRows[0];

            this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
            this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
            this.props.GridConfigStore.prepareDataGirdEnv();
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
                        {IconWrapper(this.state.iconStr)}
                        字段排序
                    </div>
                }>
                {this.props.GridConfigStore.ColsDbInfo.length == 0 ? null : (
                    <TableSortCom DataGridCode={this.props.GridConfigStore.DataGridCode} />
                )}
            </CommonModal>
        );
    }
}
