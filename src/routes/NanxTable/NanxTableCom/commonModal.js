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
                width={this.props.layoutcfg == '2' ? '1100px' : this.props.layoutcfg == '3' ? '1300px' : '650px'}
                destroyOnClose={true}
                title={this.props.title}
                bodyStyle={{
                    height: '600px',
                    overflow: 'auto',
                    bottom: 0
                }}
                visible={this.props.NanxTableStore.buttonModalVisuble}
                onOk={this.props.NanxTableStore.hideButtonModal}
                onCancel={this.props.NanxTableStore.hideButtonModal}
                footer={[
                    <Button className="round-button" key="submit" onClick={this.props.NanxTableStore.hideButtonModal}>
                        关闭
                    </Button>
                ]}>
                {this.props.children}
            </Modal>
        );
    }
}
