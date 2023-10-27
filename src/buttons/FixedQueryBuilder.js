import React from 'react';
import { Modal, message } from 'antd';

export default class FixedQueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.state = {
            visible: false
        };
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length <= 0) {
            message.error('请选择一条数据');
            return;
        }
        this.showModal();
    }

    onCancelHandle = () => {
        this.setState({
            visible: false
        });
    };

    showModal() {
        this.setState({
            visible: true
        });
    }

    searchQuery = () => {
        this.refs.searchFormContainerRef.searchHandler();
    };

    getModalProps() {
        return {
            destroyOnClose: true,
            title: '设置FixedQueryConfig',
            bodyStyle: {
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onOk: this.searchQuery,
            onCancel: () => this.onCancelHandle()
        };
    }

    render() {
        let modalProps = this.getModalProps();
        return <Modal width={800} {...modalProps}></Modal>;
    }
}
