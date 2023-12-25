import React from 'react';
import AllocationMenu from './MenuAssign/allocationMenu';

export default class MenuAssign extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            record: null
        };
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
        return <AllocationMenu roleCode={this.state.record.role_code} />;
    }
}
