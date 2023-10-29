import React from 'react';
import { message, Modal } from 'antd';
import AllocationMenu from './MenuAssign/allocationMenu';

export default class MenuAssign extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            record: null,
            visible: false
        };
    }

    // eslint-disable-next-line
    async init() {
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一个角色');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];
        console.log(currentrow);
        this.setState({
            visible: true,
            record: currentrow
        });
    }

    handleOk = async () => {};

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <div>
                {this.state.record ? (
                    <Modal
                        title="分配菜单"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        width="1200px"
                        visible={this.state.visible}
                        destroyOnClose={true}>
                        <AllocationMenu />
                    </Modal>
                ) : null}
            </div>
        );
    }
}
