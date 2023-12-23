import React from 'react';
import { message } from 'antd';
import MenuDetailCom from './MenuDetailCom';

export default class MenuDetail extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
    }

    // eslint-disable-next-line
    async init(buttonSource) {
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];
        this.setState({ record: currentrow });
        this.props.NanxTableStore.showButtonModal();
    }

    render() {
        return <div>{this.state.record ? <MenuDetailCom menuID={this.state.record.id} /> : null}</div>;
    }
}
