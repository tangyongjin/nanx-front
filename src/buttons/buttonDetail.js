import React from 'react';
import { message, Modal } from 'antd';

export default class buttonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.state = {
            button_code: '',
            visible: false
        };
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let currentrow = this.props.commonTableStore.selectedRows[0];
        console.log(currentrow);
        console.log(currentrow.ghost_button_code);

        this.setState({
            visible: true,
            button_code: currentrow.ghost_button_code
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
                <Modal
                    title="按钮详情"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="1200px"
                    visible={this.state.visible}
                    destroyOnClose={true}>
                    <div style={{ fontSize: '16px' }}>
                        {' '}
                        {this.state.button_code}
                        <br />
                    </div>
                </Modal>
            </div>
        );
    }
}
