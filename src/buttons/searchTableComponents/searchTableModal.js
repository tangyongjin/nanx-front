import React from 'react';
import { Modal } from 'antd';
import SearchFormContainer from './searchFormContainer';

export default class SearchTableModal extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.state = {
            visible: false
        };
    }

    init() {
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
            title: '数据检索',
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
        return (
            <Modal width={800} {...modalProps}>
                <SearchFormContainer
                    ref="searchFormContainerRef"
                    setCurrentPage={this.props.commonTableStore.setCurrentPage}
                    rowSelectChange={this.props.parentTable.rowSelectChange.bind(this.props.parentTable)}
                    hideModal={this.onCancelHandle}
                    listData={this.props.parentTable.listData}
                    setQueryCfg={this.props.setSearchQueryConfig}
                    formCfg={this.props.commonTableStore.formCfg}
                    onOk={this.searchQuery}
                    tableColumnsJson={this.props.commonTableStore.tableColumnsJson}
                />
            </Modal>
        );
    }
}
