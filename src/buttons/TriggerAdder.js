import React from 'react';
import { message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import TriggerAddCom from './trigger/TriggerAddCom';
import { toJS } from 'mobx';
import { AppstoreAddOutlined } from '@ant-design/icons';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';

@inject('GridConfigStore')
@observer
export default class TriggerAdder extends React.Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
    }

    async init() {
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一项');
            return;
        } else {
            let record = selectedRows[0];
            this.props.GridConfigStore.setCurrentActcode(toJS(record).datagrid_code);
            this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
            this.props.GridConfigStore.prepareDataGirdEnv();
            this.props.NanxTableStore.showButtonModal();
        }
    }

    render() {
        let { selectedRows } = this.props.NanxTableStore;
        return selectedRows.length > 0 ? (
            <CommonModal
                width={'1300px'}
                footer={[
                    <Button key="triggerAdd" type="primary" onClick={this.onCancel}>
                        关闭
                    </Button>
                ]}
                title={
                    <div>
                        <AppstoreAddOutlined />
                        添加联动
                    </div>
                }>
                {this.props.GridConfigStore.ColsDbInfo.length == 0 ? null : <TriggerAddCom />}
            </CommonModal>
        ) : null;
    }
}
