import React from 'react';
import { message, Modal, Button } from 'antd';
import MenuDetailCom from './MenuDetailCom';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';

export default class MenuDetail extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            record: null
        };
    }

    // eslint-disable-next-line
    async init() {
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
                        title="菜单分配情况"
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        width="1200px"
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
