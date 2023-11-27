import React from 'react';
import { message, Button } from 'antd';
import MenuDetailCom from './MenuDetailCom';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import IconWrapper from '@/utils/IconWrapper';

export default class MenuDetail extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = { iconStr: null, record: null };
    }

    // eslint-disable-next-line
    async init(buttonSource) {
        this.setState({ iconStr: buttonSource.icon });

        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];
        this.setState({ record: currentrow });
        this.props.NanxTableStore.showButtonModal();
    }

    render() {
        return (
            <div>
                {this.state.record ? (
                    <CommonModal
                        title={
                            <div>
                                {IconWrapper(this.state.iconStr)}
                                菜单分配情况
                            </div>
                        }
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleCancel}>
                                关闭
                            </Button>
                        ]}>
                        <br />
                        <MenuDetailCom menuID={this.state.record.id} />
                    </CommonModal>
                ) : null}
            </div>
        );
    }
}
