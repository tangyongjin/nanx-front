import React from 'react';
import SearchFormContainer from './TableSearch/searchFormContainer';

export default class TableSearch extends React.Component {
    constructor(props) {
        super(props);
        console.log('TableSearch>props: ', props);
    }

    render() {
        return <SearchFormContainer ModalStore={this.props.ModalStore} NanxTableStore={this.props.NanxTableStore} />;
    }
}
