import React from 'react';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import { toJS } from 'mobx';
import { BugOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import ReactJson from 'react-json-view';

@inject('DataGridStore')
@observer
export default class StoreDebugger extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async init() {
        await this.props.NanxTableStore.showButtonModal();
        console.log(' this.props.NanxTableStore: ', JSON.stringify(this.props.NanxTableStore.formCfg));
    }

    render() {
        return (
            <CommonModal
                cancel={this.hideModal}
                title={
                    <div>
                        <BugOutlined />
                        Debug
                    </div>
                }>
                <div
                    style={{
                        marginTop: '10px',
                        height: '600px',
                        overflow: 'scroll',
                        maxHeight: '620px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    id="excel_prepare">
                    <ReactJson src={this.props.NanxTableStore.formCfg} theme="twilight" />
                </div>
            </CommonModal>
        );
    }
}
