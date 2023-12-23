import React from 'react';
import MenuDetailCom from './MenuDetailCom';

export default class MenuDetail extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
    }

    async componentWillMount() {
        await this.init();
    }

    // eslint-disable-next-line
    async init(buttonSource) {
        let currentrow = this.props.NanxTableStore.selectedRows[0];
        this.setState({ record: currentrow });
    }

    render() {
        return <div>{this.state.record ? <MenuDetailCom menuID={this.state.record.id} /> : null}</div>;
    }
}
