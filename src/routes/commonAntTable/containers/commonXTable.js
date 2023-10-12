import React from 'react';
import CommonTable from '../components/commonTableCom/commonTable';

export default class CommonXTable extends React.Component {
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
