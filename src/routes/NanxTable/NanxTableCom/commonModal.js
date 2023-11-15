import React from 'react';
import { Modal, Button } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('NanxTableStore')
@observer
export default class CommonModal extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
    }

    render() {
        return (
            <Modal
                maskClosable={false}
                width={this.props.width || '650px'}
                destroyOnClose={true}
                title={this.props.title}
                styles={{
                    height: '600px',
                    overflow: 'auto',
                    bottom: 0
                }}
                open={this.props.NanxTableStore.buttonModalVisuble}
                onCancel={this.props.NanxTableStore.hideButtonModal}
                footer={[
                    <Button key="submit" onClick={this.props.NanxTableStore.hideButtonModal}>
                        关闭
                    </Button>
                ]}>
                {this.props.children}
            </Modal>
        );
    }
}
