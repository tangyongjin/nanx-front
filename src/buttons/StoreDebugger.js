import React from 'react';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import { toJS } from 'mobx';
import { BugOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';

@inject('DataGridStore')
@observer
export default class StoreDebugger extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async init() {
        await this.props.NanxTableStore.showButtonModal();
        console.log(' this.props.NanxTableStore: ', this.props.NanxTableStore);
    }

    render() {
        return (
            <CommonModal
                cancel={this.hideModal}
                title={
                    <div>
                        <BugOutlined />
                        Debu
                    </div>
                }>
                <div
                    style={{
                        marginTop: '10px',
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <div id="excel_prepare">
                        数据准备中...
                        {this.props.NanxTableStore.SERIALNO}
                    </div>
                </div>
            </CommonModal>
        );
    }
}
