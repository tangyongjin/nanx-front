import React from 'react';
import { message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import TriggerListCom from './trigger/TriggerListCom';
import { toJS } from 'mobx';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import IconWrapper from '@/utils/IconWrapper';

@inject('GridConfigStore')
@observer
export default class TriggerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iconStr: null };
        this.init = this.init.bind(this);
    }

    async init(buttonSource) {
        this.setState({ iconStr: buttonSource.icon });

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
                    <Button key="triggerList" type="primary" onClick={this.onCancel}>
                        关闭
                    </Button>
                ]}
                title={
                    <div>
                        {IconWrapper(this.state.iconStr)}
                        管理联动
                    </div>
                }>
                {this.props.GridConfigStore.ColsDbInfo.length == 0 ? null : <TriggerListCom />}
            </CommonModal>
        ) : null;
    }
}
