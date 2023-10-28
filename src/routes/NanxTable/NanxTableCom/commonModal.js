import React from 'react';
import { Modal } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('NanxTableStore')
@observer
export default class CommonModal extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
    }

    state = {
        visible: false
    };

    onCancelHandle() {
        this.setState({
            visible: false
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    getModalProps() {
        return {
            destroyOnClose: true,
            title: this.props.title,
            bodyStyle: {
                height: '600px',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '保存',
            visible: this.state.visible,
            onOk: this.onCancelHandle,
            onCancel: () => this.onCancelHandle()
        };
    }

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal
                maskClosable={false}
                width={this.props.layoutcfg == '2' ? '1100px' : this.props.layoutcfg == '3' ? '1300px' : '650px'}
                {...modalProps}>
                {this.props.children}
            </Modal>
        );
    }
}
