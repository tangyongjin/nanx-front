import React from 'react';
import NanxTable from './NanxTableCom/NanxTable';

export default class NanxTableRoute extends React.Component {
    render() {
        return (
            <NanxTable
                key={this.props.location.state.datagrid_code}
                datagrid_code={this.props.location.state.datagrid_code}
                ref="commonTableRef"
            />
        );
    }
}
