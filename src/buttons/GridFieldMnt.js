import React from 'react';
import { message, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import GridFieldManager from './GridFieldManager';
import { toJS } from 'mobx';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import IconWrapper from '@/utils/IconWrapper';

@inject('GridConfigStore')
@observer
export default class GridFieldMnt extends React.Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
        this.init = this.init.bind(this);
        this.state = { iconStr: null };
    }

    async init(buttonSource) {
        this.setState({ iconStr: buttonSource.icon });
        console.log('item: ', buttonSource);
        let { selectedRows } = this.props.NanxTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一个DataGrid');
            return;
        } else {
            let record = selectedRows[0];
            this.props.NanxTableStore.showButtonModal();
            this.props.GridConfigStore.setCurrentDataGridCode(toJS(record).datagrid_code);
            this.props.GridConfigStore.setCurrentDatagridTitle(toJS(record).datagrid_title);
            this.props.GridConfigStore.setCurrentBasetable(toJS(record).base_table);
            this.props.GridConfigStore.initAll();
            this.props.GridConfigStore.prepareDataGirdEnv();
        }
    }

    render() {
        let { selectedRows } = this.props.NanxTableStore;
        return selectedRows.length > 0 ? (
            <CommonModal
                width={'1100px'}
                footer={[
                    <Button key="gidmnt" type="primary" onClick={this.onCancel}>
                        关闭
                    </Button>
                ]}
                title={
                    <div>
                        {IconWrapper(this.state.iconStr)}
                        字段管理
                    </div>
                }>
                <GridFieldManager />
            </CommonModal>
        ) : null;
    }
}
