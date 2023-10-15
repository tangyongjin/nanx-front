import React from 'react';
import CommonTable from './NanxTableCom/commonTable';

export default class NanxTable extends React.Component {
    render() {
        return (
            <CommonTable
                key={this.props.location.state.datagrid_code}
                datagrid_code={this.props.location.state.datagrid_code}
                ref="commonTableRef"
            />
        );
    }
}
