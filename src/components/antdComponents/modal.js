import React from 'react'
import { Modal } from 'antd';
import {observer} from 'mobx-react'

@observer
export default class PortalModal extends React.Component {

    render() {
        return (
            <Modal
                width= {this.props.width}
                title={this.props.modalTitle}
                centered
                destroyOnClose
                cancelText='取消'
                okText='确认'
                onCancel={this.props.hideModal}
                onOk={this.props.saveHandle}
                visible={this.props.visiblModal}
            >{this.props.children}</Modal>
        )
    }

}
