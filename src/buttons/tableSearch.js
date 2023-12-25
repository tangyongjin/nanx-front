import React from 'react';
import SearchFormContainer from './TableSearch/searchFormContainer';

export default class TableSearch extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init = async () => {};

    render() {
        return <SearchFormContainer HostedTableStore={this.props.NanxTableStore} />;
    }
}
